import "./projekt.js"
import "./artefakte.js"
import "./aufgabenbereiche.js"
import "./projekt_artefakt.js"
import "./projekt_aufgabenbereich.js"

let langMap = EN;
let userLang = navigator.language || navigator.userLanguage;
console.log("The language is: " + userLang);
if (userLang === "en-US") {
    langMap = EN;
} else if (userLang === "de-DE"){
    langMap = DE;
}

for (const key in langMap) {
    document.body.innerHTML = document.body.innerHTML.replace(key, langMap.get(key));
}

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
// Check if query has id, if not return to previous page
if (id == null || id === "" || Number.isNaN(id)) {
    window.history.go(-1)
}

function setTitle(title) {
    document.getElementById('titel').innerHTML = title;
}

function setKurzbeschreibung(kurzbeschreibung) {
    document.getElementById('kurzbeschreibung-content').innerHTML = kurzbeschreibung;
}

function setBeschreibung(beschreibung) {
    document.getElementById('beschreibung-content').innerHTML = beschreibung;
}

function addZiel(ziel) {
    const zieleListe = document.getElementById('ziele-content');
    const li = document.createElement('li');
    li.innerHTML = ziel;
    zieleListe.appendChild(li);
}

function clearZiele() {
    const zieleListe = document.getElementById('ziele-content');
    zieleListe.innerHTML = '';
}

// Just for demonstration
if (Number(id) === 1) {
    clearZiele();
    setTitle('Titel 1');
    setKurzbeschreibung('Kurzbeschreibung 1');
    setBeschreibung('Beschreibung 1');
    addZiel('Ziel 1');
    addZiel('Ziel 2');
} else if (Number(id) === 2) {
    clearZiele();
    setTitle('Titel 2');
    setKurzbeschreibung('Kurzbeschreibung 2');
    setBeschreibung('Beschreibung 2');
    addZiel('Ziel 3');
}

const DE = {
    "#title": "StudBoard",
    "#projects": "Projekte",
    "#newProject": "Neues Projekt",
    "#login": "Einloggen",
    "#register": "Registrieren",
    "#username": "Benutzername",
    "#password": "Passwort",

    "#projectTitle": "Titel",
    "#shortDescr": "Kurzbeschreibung",
    "#longDescr": "Langbeschreibung",
    "#goals": "Ziele",
    "#comment": "Kommentar",
    "#rating": "Bewertung",
    "#sendcomment": "Kommentar senden",

    "#imprint": "Impressum",
    "#priacy": "Datenschutz",
    "#disclaimer": "Haftungsausschluss",
    "#contact": "Kontakt",
}
const EN = {
    "#title": "StudBoard",
    "#projects": "Projects",
    "#newProject": "New Projekt",
    "#login": "Login",
    "#register": "Register",
    "#username": "Username",
    "#password": "Password",

    "#projectTitle": "Title",
    "#shortDescr": "Short Description",
    "#longDescr": "Long Description",
    "#goals": "Goals",
    "#comment": "Comment",
    "#rating": "Rating",
    "#sendcomment": "Send Comment",

    "#imprint": "Imprint",
    "#priacy": "Privacy",
    "#disclaimer": "Disclaimer",
    "#contact": "Contact",
}