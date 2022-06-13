import Projekt from "./projekt.js"

const LANGUAGE = {
    "en-US": {
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
    },
    "de-DE": {
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
}

let userLang = navigator.language || navigator.userLanguage
let langMap = LANGUAGE[userLang] || LANGUAGE["en-US"]
console.log("The language is: " + userLang)

for (const key in langMap) {
    document.body.innerHTML = document.body.innerHTML.replaceAll(key, langMap[key])
}

// API Call
const getAllProjects = async () => {
    const response = await fetch("http://localhost:8080/WBA-Projekt-1.0-SNAPSHOT/api/projekt")
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

const addProjectToList = (newProject) => {
    // get template id="project-template"
    const template = document.getElementById("project-template")
    // clone template
    const clone = template.content.cloneNode(true)
    // set new title
    clone.querySelector("h2").innerHTML = newProject.name
    // title href
    clone.querySelector("a").href = "/projektdetails.html?id=" + newProject.id
    // set new description
    clone.querySelector("p").innerHTML = newProject.beschreibung
    // side bar
    const sideBar = document.getElementById("project_overview").firstElementChild
    // add li 
    const newLi = document.createElement("li")
    newLi.className = "overview_project_name"
    const newA = document.createElement("a")
    newA.href = "/projektdetails.html?id=" + newProject.id
    newA.innerHTML = newProject.name
    newLi.appendChild(newA)
    sideBar.appendChild(newLi)
    return clone
}

const clearProjectList = () => {
    const projectList = document.getElementById("project_grid")
    // dont delete the template
    while (projectList.lastChild != null) {
        const child = projectList.lastChild
        if (child.id !== "project-template") {
            projectList.removeChild(child)
        }
        // if length is 1, the template is still there -> break
        if (projectList.childElementCount === 1) {
            break
        }
    }

    // clear side bar
    const sideBar = document.getElementById("project_overview").firstElementChild
    sideBar.innerHTML = ""
}

clearProjectList()

getAllProjects().then(projects => {
    if (projects == null) return
    for (const project of projects) {
        const newProject = addProjectToList(new Projekt(project.projektID, project.name, project.beschreibung, project.logoPath, project.startDate))
        const projectList = document.getElementById("project_grid")
        projectList.appendChild(newProject)
    }
}).catch(error => {
    console.log(error)
})

export {LANGUAGE}
