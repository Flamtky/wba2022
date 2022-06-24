const LANGUAGE = {
    "en-US": {
        "#login": "Login",
        "#logout": "Logout",
        "#register": "Register",
        "#username": "Username",
        "#password": "Password",
    },
    "de-DE": {
        "#login": "Einloggen",
        "#logout": "Abmelden",
        "#register": "Registrieren",
        "#username": "Benutzername",
        "#password": "Passwort",
    }
}

let userLang = navigator.language || navigator.userLanguage
let langMap = LANGUAGE[userLang] || LANGUAGE["en-US"]

for (const key in langMap) {
    document.body.innerHTML = document.body.innerHTML.replaceAll(key, langMap[key])
}

const loginBtn = document.getElementById('login-button');
const registerBtn = document.getElementById('register-button');
const userNameInput = document.getElementById('user-name-input');
const passwordInput = document.getElementById('password-input');

const onLogin = () => {
    document.getElementById('user-name-input').disabled = !document.getElementById('user-name-input').disabled;
    document.getElementById('password-input').disabled = !document.getElementById('password-input').disabled;
    document.getElementById('login-button').textContent = langMap["#logout"] === document.getElementById('login-button').textContent ? langMap["#login"] : langMap["#logout"];
    document.getElementById('register-button').hidden = !document.getElementById('register-button').hidden;
}

onRegister = () => {
    const userName = userNameInput.value;
    const password = passwordInput.value;
    const xhr = new XMLHttpRequest();
    if (userName.trim() === '' || password.trim() === '') {
        alert('Please enter your user name and password');
        return;
    }
    xhr.open('POST', 'api/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        userName: userName,
        password: password
    }));

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                // set session
                // check if sessionStorage is allowed
                if (typeof (Storage) !== 'undefined') {
                    sessionStorage.setItem('userName', userName);
                    sessionStorage.setItem('userId', response.userId);
                    sessionStorage.setItem('token', response.token);
                } else {
                    alert('Sorry, your browser does not support Web Storage...');
                }
            } else {
                alert(response.message);
            }
        } else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
}

console.log(loginBtn)
// If pressed on login button
document.getElementById('login-button').addEventListener('click', function () {
    console.log('login');
    onLogin();
});

// If pressed on register button
document.getElementById('register-button').addEventListener('click', function () {
    onRegister();
});