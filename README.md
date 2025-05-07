# whereitsat2

Where it's at är till för biljettbokning av lokala musikevent, byggd med React, Vite och Zustand.

---

## Externa bibliotek

I detta projekt har jag valt tre externa bibliotek utöver de vi gått igenom i kursen:

1. **Framer Motion**  
2. **React-Confetti**  
3. **UUID**  


### 1. Framer Motion

Framer Motion är ett smidigt animationsverktyg för React som låter dig lägga till rörelse och övergångar utan att behöva pyssla med komplicerade CSS-keyframes eller tidsinställda JavaScript-funktioner.

* Du använder komponenter som `<motion.div>` eller `<motion.article>` istället för vanliga `<div>` och `<article>`.
* Med prop\:arna `initial`, `animate` och `transition` styr du hur elementet ska starta, hur det ska sluta och vilka inställningar (längd, fördröjning, easing) som ska gälla.
* Biblioteket tar hand om själva interpoleringen, vilket ger dig flytande animationer i 60 FPS.

**Varför passar Framer Motion här?**
Where it’s @ handlar om att göra upplevelsen lekfull och inbjudande. Med Framer Motion kan vi:

* Ge Events-sidan en mjuk inzoomning eller fade-in när listan laddas.
* Lägga till behagliga fade-in-effekter på detaljsidan för att låta innehållet framträda gradvis.
* Animera knapptryckningar för att ge omedelbar, visuell feedback när användaren interagerar.

---

### 2. React-Confetti

React-Confetti är en komponent som ritar konfetti i ett bakgrundslager via HTML5-canvas.

* Installera paketet och importera `<Confetti />` i den komponent där du vill ha konfetti.
* När `<Confetti />` renderas sätter den igång en konfetti-animation bakgrundslager.
* Du kontrollerar hur länge konfettin syns genom att conditionellt rendera komponenten under en timer (t.ex. 10 sekunder som jag har gjort i appen).

**Varför passar React-Confetti här?**
När användaren köper biljetter är det härligt med lite firande:

* Konfettin fångar uppmärksamheten och gör köpupplevelsen minnesvärd.
* Lätt att lägga till, utan att behöva bygga egen animationslogik.
* Skapar direkt positiv feedback som uppmuntrar till fler köp.

---

### 3. UUID

UUID-biblioteket genererar unika identifierare (UUIDv4) helt i klienten, utan nätverksanrop.

* Du importerar funktionen med `import { v4 as uuidv4 } from 'uuid';`.
* Varje gång du anropar `uuidv4()` får du en ny, slumpmässig sträng som garanterat är unik.

**Varför passar UUID här?**
För att hålla koll på varje biljett behöver vi unika `id`:

* React-nycklar i listor kräver unika värden för att renderingen ska bli korrekt.
* När flera användare köper samtidigt vill vi undvika krockar mellan biljett-id\:n.
* All logik sker i klienten, vilket gör det enkelt och snabbt utan externa beroenden.
