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

const DE = {
    "#title": "StudBoard",
    "#projects": "Projekte",
    "#newProject": "Neues Projekt",
    "#login": "Einloggen",
    "#register": "Registrieren",
    "#username": "Benutzername",
    "#password": "Passwort",

    "#welcome1": "Willkommen bei ",
    "#welcome2": "StudBoard",
    "#shortDescr": "Kurzbeschreibung",
    "#intro": "Hier findest du alle Projekte, die du erstellt hast.",
    "#newestProjects": "Neueste Projekte",

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

    "#welcome1": "Welcome to ",
    "#welcome2": "StudBoard",
    "#shortDescr": "Short Description",
    "#intro": "Here you will find all projects, you created.",
    "#newestProjects": "Newest projects",

    "#imprint": "Imprint",
    "#priacy": "Privacy",
    "#disclaimer": "Disclaimer",
    "#contact": "Contact",
}