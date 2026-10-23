PRESALE JULEBORD 2026 — DELT GJESTELISTE

Denne versjonen bruker Netlify Functions + Netlify Blobs. FormSubmit brukes IKKE.

PUBLISERING (VIKTIG):
1. Netlify Drop / opplasting av bare HTML/ZIP er IKKE nok for denne løsningen.
2. Last opp hele prosjektet til et GitHub-repository (index.html, package.json, netlify.toml og netlify/functions/guests.mjs).
3. I Netlify: eksisterende nettsted julebordpresale -> Project configuration / Build & deploy -> koble repository for kontinuerlig deploy. Kontroller publish directory = . og functions directory = netlify/functions.
4. Under Site configuration -> Environment variables: legg til ADMIN_PASSWORD med et langt, unikt passord. Start ny deploy etterpå. Ikke legg passordet i HTML eller GitHub.
5. Test /.netlify/functions/guests (skal vise {"guests":[]}) og send en RSVP. Se at navnet vises på en annen enhet.
6. Netlify Blobs lagrer påmeldingene på serveren. Public API viser bare navn og status; e-post og allergier returneres ikke.

VIKTIG PERSONVERN:
Alle med lenken kan se navn og RSVP-status. Gjester må aktivt godta dette. E-post og allergier lagres i samme private serverlager, men blir aldri sendt til nettleseren via den offentlige gjestelisten. Administratorgrensesnittet kan legge til inviterte, men har ikke en egen visning av allergier; avtal separat trygg tilgang til matbehov før dere bruker dem. Ingen automatisk e-postvarsling er satt opp. Slett opplysninger etter arrangementet og lag en personvernerklæring med ansvarlig arrangør og kontaktadresse før offentlig lansering.

MERK: "Invitert" legges til av arrangør via passord. Gjester kan svare "Skal" eller "Kommer ikke". Statusene er separate oppføringer; dette er ikke et komplett invitasjons-/oppfølgingssystem som kobler gjestens svar til en forhåndsopprettet invitasjon.
