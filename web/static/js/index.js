import Aufgabenbereich from "./aufgabenbereich.js"
import Artefakt from "./artefakt.js";

const LANGUAGE = {
    "en-US": {
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

// API Call
const getAllAufgabenbereiche = async () => {
    const response = await fetch("http://localhost:8080/WBA-Projekt-1.0-SNAPSHOT/api/aufgabenbereich")
    if (response.ok || response.status === 404) {
        try {
            return await response.json()
        } catch (error) {
            console.error(error)
        }
    }
    console.log("Error: " + response.status)
    return null
}

getAllAufgabenbereiche().then(aufgabenbereiche => {
    for (const aufgabenbereich of aufgabenbereiche) {
        console.log(new Aufgabenbereich(aufgabenbereich.aufgabenbereichID, aufgabenbereich.name, aufgabenbereich.beschreibung))
    }
}).catch(error => {
    console.error(error)
})

const getAllArtefacts = async () => {
    const response = await fetch("http://localhost:8080/WBA-Projekt-1.0-SNAPSHOT/api/artefakt")
    if (response.ok || response.status === 404) {
        try {
            return await response.json()
        } catch (error) {
            console.error(error)
        }
    }
    console.log("Error: " + response.status)
    return null
}

getAllArtefacts().then(artefacts => {
    if (artefacts == null) return
    for (const artefact of artefacts) {
        console.log(new Artefakt(artefact.artefaktID, artefact.name, artefact.beschreibung, artefact.geplanteZeit))
    }
}).catch(error => {
    console.log(error)
})

function prepareArtefact() {
    let name = window.prompt("Name des Artefakts:", "name");
    let beschreibung = window.prompt("Beschreibung:", "beschreibung");
    let geplanteZeit = window.prompt("Geplante Zeit:", "geplanteZeit");
    geplanteZeit = parseInt(geplanteZeit)
    if (isNaN(geplanteZeit)) {
        alert("Geplante Zeit ist keine Zahl")
        return
    }
    const artefact = new Artefakt(
        undefined,
        name,
        beschreibung,
        geplanteZeit
        )
    console.log(artefact)
    artefact.pushToDB().then(response => {
        //navigateTo('/projekte.html')
    }).catch(error => {
        console.log(error)
        alert("Error: " + error.message)
    })
}

function prepareAufgabenbereich() {
    let name = window.prompt("Name des Aufgabenbereichs:", "name");
    let beschreibung = window.prompt("Beschreibung:", "beschreibung");
    const aufgabenbereich = new Aufgabenbereich(
        undefined,
        name,
        beschreibung
    )
    console.log(aufgabenbereich)
    aufgabenbereich.pushToDB().then(response => {
        //navigateTo('/projekte.html')
    }).catch(error => {
        console.log(error)
        alert("Error: " + error.message)
    })
}

prepareArtefact()
prepareAufgabenbereich()

export {LANGUAGE}
