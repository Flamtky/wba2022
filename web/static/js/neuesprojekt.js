import "./projekt.js"

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

// if file is uploaded
const inp = document.getElementById('logo-input');

inp.addEventListener('change', function (evt) {
    console.log(evt.target.files[0]);
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.getElementById('logo_showcase');
        img.src = e.target.result;
        img.hidden = false;
    };
    reader.readAsDataURL(file); // convert to base64 string
});

const DE = {
    "#title": "StudBoard",
    "#projects": "Projekte",
    "#newProject": "Neues Projekt",
    "#login": "Einloggen",
    "#register": "Registrieren",
    "#username": "Benutzername",
    "#password": "Passwort",

    "#projectTitle": "Projekttitel",
    "#startDate": "Startdatum",
    "#endDate": "Enddatum",
    "#shortDescr": "Kurzbeschreibung",
    "#longDescr": "Langbeschreibung",
    "#goal1": "1. Projektziel",
    "#goal2": "2. Projektziel",
    "#chooseLogo": "Logo auswählen...",
    "#save": "Speichern",

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

    "#projectTitle": "Project title",
    "#startDate": "Start date",
    "#endDate": "End date",
    "#shortDescr": "Short Description",
    "#longDescr": "Long Description",
    "#goal1": "1. project goal",
    "#goal2": "2. project goal",
    "#chooseLogo": "Choose logo...",
    "#save": "Save",

    "#imprint": "Imprint",
    "#priacy": "Privacy",
    "#disclaimer": "Disclaimer",
    "#contact": "Contact",
}