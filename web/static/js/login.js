const loginBtn = document.getElementById('login-button');
const registerBtn = document.getElementById('register-button');
const userNameInput = document.getElementById('user-name-input');
const passwordInput = document.getElementById('password-input');

// If pressed on login button
loginBtn.addEventListener('click', function () {
    const userName = userNameInput.value;
    const password = passwordInput.value;
    const xhr = new XMLHttpRequest();
    if (userName.trim() === '' || password.trim() === '') {
        alert('Please enter your user name and password');
        return;
    }
    xhr.open('POST', 'api/login');
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
});

// If pressed on register button
registerBtn.addEventListener('click', function () {
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
});
