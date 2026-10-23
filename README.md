# Presale Julebord 2026 🎄

4. desember 2026. Christmas Glam med original nisseanimasjon, RSVP og felles gjesteliste.

## Filene du skal se i denne mappen
- `index.html` – nettsiden
- `netlify.toml` – publiseringsoppsett
- `package.json` – avhengighet for database
- `netlify/functions/guests.mjs` – serverfunksjon som lagrer påmeldinger

## Publisering i eksisterende Netlify-prosjekt
1. Last opp **innholdet** i denne mappen til roten av GitHub-repositoriet `presale-julebord-2026` (ikke ZIP-filen og ikke en ekstra overmappe).
2. Kontroller at `index.html`, `netlify.toml`, `package.json` og mappen `netlify` vises i roten på GitHub.
3. Netlify-prosjektet `julebordpresale` må være koblet til GitHub-repositoriet på branch `main`.
4. I Netlify → Project configuration → Environment variables, opprett `ADMIN_PASSWORD` med et langt, unikt passord. Ikke legg passordet i GitHub.
5. Trigger en ny deploy om nødvendig. Kontroller at deploy har installert npm-avhengigheten `@netlify/blobs` og publisert funksjonen `guests`.
6. Åpne https://julebordpresale.netlify.app/. Test med fiktive data. Trykk Skal / Invitert / Kommer ikke og sjekk fra et inkognitovindu.

## Personvern og begrensninger
- Alle med lenken kan se **navn og RSVP-status**. Dette krever samtykke i skjemaet.
- E-post og allergier blir lagret på serveren og **returneres ikke i den offentlige gjestelisten**. De har ingen arrangørvisning ennå.
- Dette er en enkel førsteversjon: samme person kan melde seg på flere ganger, og det finnes ikke en trygg selvbetjent funksjon for å endre/slette svar. Legg til dette før større arrangementer.
- Ikke ta imot reelle allergiopplysninger før dere har avklart tilgang, lagringstid, sletting og personverninformasjon. Bruk kun fiktive testopplysninger i mellomtiden.
- Administratorpassordet er kun for å legge til inviterte. Bruk et sterkt passord og del det ikke.
