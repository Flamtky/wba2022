const LANGUAGE = {
    "en-US": {
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
    },
    "de-DE": {
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
}

let userLang = navigator.language || navigator.userLanguage
let langMap = LANGUAGE[userLang] || LANGUAGE["en-US"]
console.log("The language is: " + userLang)

for (const key in langMap) {
    document.body.innerHTML = document.body.innerHTML.replaceAll(key, langMap[key])
}

const id = new URL(window.location.href).searchParams.get("id")
// Check if query has id, if not return to previous page
if (id == null || id === "" || Number.isNaN(id)) {
    window.history.go(-1)
}

function setTitle(title) {
    document.getElementById('titel').innerHTML = title
}

function setKurzbeschreibung(kurzbeschreibung) {
    document.getElementById('kurzbeschreibung-content').innerHTML = kurzbeschreibung
}

function setBeschreibung(beschreibung) {
    document.getElementById('beschreibung-content').innerHTML = beschreibung
}

function addZiel(ziel) {
    const zieleListe = document.getElementById('ziele-content')
    const li = document.createElement('li')
    li.innerHTML = ziel
    zieleListe.appendChild(li)
}

function clearZiele() {
    const zieleListe = document.getElementById('ziele-content')
    zieleListe.innerHTML = ''
}
