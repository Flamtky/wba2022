const LANGUAGE = {
    "en-US": {
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
    },
    "de-DE": {
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
}

let userLang = navigator.language || navigator.userLanguage
let langMap = LANGUAGE[userLang] || LANGUAGE["en-US"]
console.log("The language is: " + userLang)

for (const key in langMap) {
    document.body.innerHTML = document.body.innerHTML.replaceAll(key, langMap[key])
}
