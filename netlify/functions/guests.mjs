import { getStore } from '@netlify/blobs';
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
const clean=(s,max=120)=>typeof s==='string'?s.trim().slice(0,max):'';
const store=()=>getStore({name:'julebord-rsvp',consistency:'strong'});
export default async (request)=>{
 try{
  const db=store();
  if(request.method==='GET'){
   const all=[];
   // Netlify Blobs may return an async iterable when listing with pagination.
   const listing=await db.list({prefix:'guest/',paginate:true});
   const entries=[];
   const collect=(part)=>{
    if(!part)return;
    if(Array.isArray(part))entries.push(...part);
    else if(Array.isArray(part.blobs))entries.push(...part.blobs);
    else if(part.key)entries.push(part);
   };
   if(listing && typeof listing[Symbol.asyncIterator]==='function'){
    for await(const part of listing)collect(part);
   }else collect(listing);
   for(const item of entries){
    const g=await db.get(item.key,{type:'json'});
    if(g&&g.name&&['skal','invitert','kommer-ikke'].includes(g.status))all.push({name:g.name,status:g.status});
   }
   return json({guests:all.sort((a,b)=>a.name.localeCompare(b.name,'no'))});
  }
  if(request.method!=='POST')return json({error:'Metode ikke tillatt'},405);
  const body=await request.json();
  if(body.action==='admin-list'||body.action==='delete'){
   if(!process.env.ADMIN_PASSWORD)return json({error:'Administratorpassord er ikke konfigurert'},503);
   if(typeof body.adminPassword!=='string'||body.adminPassword!==process.env.ADMIN_PASSWORD)return json({error:'Feil administratorpassord'},403);
   if(body.action==='delete'){
    const id=body.id;
    if(typeof id!=='string'||!/^[0-9a-f-]{36}$/.test(id))return json({error:'Ugyldig gjeste-ID'},400);
    const key='guest/'+id;
    const found=await db.get(key,{type:'json'});
    if(!found)return json({error:'Gjesten finnes ikke'},404);
    await db.delete(key);
    return json({ok:true});
   }
   const listing=await db.list({prefix:'guest/',paginate:true});
   const entries=[];
   const collect=part=>{if(!part)return;if(Array.isArray(part))entries.push(...part);else if(Array.isArray(part.blobs))entries.push(...part.blobs);else if(part.key)entries.push(part)};
   if(listing&&typeof listing[Symbol.asyncIterator]==='function'){for await(const part of listing)collect(part)}else collect(listing);
   const guests=[];
   for(const item of entries){const g=await db.get(item.key,{type:'json'});if(g&&g.name)guests.push({id:item.key.slice(6),name:g.name,status:g.status})}
   return json({guests:guests.sort((a,b)=>a.name.localeCompare(b.name,'no'))});
  }const name=clean(body.name);const status=clean(body.status,30);
  if(name.length<2||!['skal','kommer-ikke','invitert'].includes(status))return json({error:'Ugyldig navn eller status'},400);
  const admin=status==='invitert';
  if(admin){if(!process.env.ADMIN_PASSWORD)return json({error:'Administratorpassord er ikke konfigurert i Netlify'},503);if(body.adminPassword!==process.env.ADMIN_PASSWORD)return json({error:'Feil administratorpassord'},403)}
  else if(!body.consent)return json({error:'Du må samtykke til offentlig visning av navn og status'},400);
  const email=clean(body.email,200).toLowerCase();
  if(!admin&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({error:'Ugyldig e-postadresse'},400);
  // Separate key per RSVP avoids lost writes from simultaneous submissions.
  const id=crypto.randomUUID();
  await db.setJSON('guest/'+id,{name,status,email:admin?'':email,allergies:admin?'':clean(body.allergies,100),dietnotes:admin?'':clean(body.dietnotes,500),createdAt:new Date().toISOString()});
  return json({ok:true,status},201);
 }catch(err){console.error('Guest API error',err);return json({error:'Serverfeil. Prøv igjen senere.'},500)}
};
