import Projekt from "./projekt.js"

const LANGUAGE = {
    "en-US": {
        "#projects": "Projects",
        "#newProject": "New Projekt",

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
        "#projects": "Projekte",
        "#newProject": "Neues Projekt",

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

const setTitle = (title) => {
    if (title == null) return;
    document.getElementById('titel').innerHTML = title
}

const setKurzbeschreibung = (kurzbeschreibung) => {
    if (kurzbeschreibung == null) return;
    document.getElementById('kurzbeschreibung-content').innerHTML = kurzbeschreibung
}

const setBeschreibung = (beschreibung) => {
    if (beschreibung == null) return;
    document.getElementById('beschreibung-content').innerHTML = beschreibung
}

const addZiel = (ziel) => {
    if (ziel == null)
        return;
    const zieleListe = document.getElementById('ziele-content')
    const li = document.createElement('li')
    li.innerHTML = ziel
    zieleListe.appendChild(li)
}

const setLogo = (logoPath) => {
    const logo = document.getElementById('project-logo')
    if (logoPath != null && logoPath !== "") {
        logo.src = logoPath
    } else {
        logo.src = "images/projects/1.png"
    }
}


const clearZiele = () => {
    const zieleListe = document.getElementById('ziele-content')
    zieleListe.innerHTML = ''
}

const setProjektDetails = (projekt) => {
    setTitle(projekt?.name)
    setKurzbeschreibung(projekt?.kurzbeschreibung)
    setBeschreibung(projekt?.beschreibung)
    setLogo(projekt?.logoPath)
    if (projekt != null)
        clearZiele()
    for (const ziel of projekt?.ziele ?? []) {
        addZiel(ziel)
    }
}

// API Call
const getProjektDetails = async (id) => {
    const response = await fetch("http://localhost:8080/WBA-Projekt-1.0-SNAPSHOT/api/projekt?id=" + id)
    if (response.ok) {
        try {
            return await response.json()
        } catch (error) {
            console.error(error)
        }
    }
    if (response.status === 404) {
        window.history.go(-1)
    }
    console.log("Error: " + response.status)
    return null
}

getProjektDetails(id).then(response => {
    const projekt = new Projekt(response.projektID, response.name, response.beschreibung, response.logoPath, response.startDate)
    setProjektDetails(projekt)
}).catch(error => {
    console.error(error)
})

// Get Comments from Local Storage
const getComments = () => {
    const comments = localStorage.getItem('comments')
    if (comments != null) {
        // sort by date
        return JSON.parse(comments).sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
    }
    return []
}

// Add Comment to Local Storage
const addComment = (text, rating) => {
    if (text == null || text === "" || rating == "0")
        return;
    const comment = {
        text: text,
        rating: rating,
        date: new Date()
    }

    const comments = getComments()
    comments.push(comment)
    localStorage.setItem('comments', JSON.stringify(comments))
}

document.getElementsByClassName('comment_form')[0].addEventListener('submit', (e) => {
    e.preventDefault()

    const text = document.getElementById('comment').value
    const rating = document.getElementById('rating').value
    addComment(text, rating)
    document.getElementById('comment').value = ""
    document.getElementById('rating').value = "1"
})

export {LANGUAGE}
