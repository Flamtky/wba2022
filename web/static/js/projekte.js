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

    "#filter": "Filter:",
    "#allProjects": "Alle Projekte",
    "#myProjects": "Meine Projekte",

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

    "#filter": "Filter:",
    "#allProjects": "All projects",
    "#myProjects": "My projects",

    "#imprint": "Imprint",
    "#priacy": "Privacy",
    "#disclaimer": "Disclaimer",
    "#contact": "Contact",
}