const welcomeBlock = document.getElementById('welcomeBlock');
const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');

loginForm.style.display = 'none';
signUpForm.style.display = 'none';

document.getElementById('login').addEventListener('click', () => {
    welcomeBlock.style.display = 'none';
    loginForm.style.display = 'block';
    signUpForm.style.display = 'none';
})

document.getElementById('guest').addEventListener('click', () => {
    const json = {
        username: 'GUEST', 
        token: ''
    };

    sessionStorage.setItem("userCredential", JSON.stringify(json));
    window.location.href = 'page/home.html';
})

document.getElementById('submitLoginForm').addEventListener('click', () => {
    
    const USERNAME = document.getElementById('usernameLoginInput').value;
    const PASSWORD = document.getElementById('passwordLoginInput').value;

    if (USERNAME == '') {
        alert('Username is required');
        return;
    }

    if (PASSWORD == '') {
        alert('Password is required');
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            username: USERNAME,
            password: PASSWORD
        })
    })
    .then(res => {
        if (res.status != 200) {
            throw res.status;
        }

        return res.text();
    })
    .then(token => {

        const json = {
            username: document.getElementById('usernameLoginInput').value, 
            token: token
        };

        sessionStorage.setItem("userCredential", JSON.stringify(json));

        alert('Login Successfull');
        window.location.href = 'page/home.html';

        document.getElementById('usernameLoginInput').value = '';
        document.getElementById('passwordLoginInput').value = '';
        welcomeBlock.style.display = 'block';
        loginForm.style.display = 'none';
        signUpForm.style.display = 'none';
    })
    .catch(err => {
        let errorMessage = 'Unable to create profile, Please try again later'
         
        if (err == 404) {
            errorMessage = 'No Profile found with the given username';
        }
        
        if (err == 401) {
            errorMessage = 'Incorrect Password';
        }

        alert(errorMessage);
        console.error(errorMessage);
    })
})


document.getElementById('signUp').addEventListener('click', () => {
    welcomeBlock.style.display = 'none';
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';
})

document.getElementById('submitSignUpForm').addEventListener('click', () => {

    const USERNAME = document.getElementById('usernameSignUpInput').value;
    const PASSWORD = document.getElementById('passwordSignUpInput').value;
    const PASSWORDAGAIN = document.getElementById('passwordSignUpInputAgain').value;

    if (USERNAME == 'GUEST') {
        alert('Reserved username. Please choose another username')
        return;
    }

    if (USERNAME == '') {
        alert('Username is required');
        return;
    }

    if (PASSWORD == '') {
        alert('Password is required');
        return;
    }

    if (PASSWORD !== PASSWORDAGAIN) {
        alert('Passwords donot match');
        return;
    }

    fetch('/signUp', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            username: USERNAME,
            password: PASSWORD
        })
    })
    .then(res => {
        if (res.status != 200) {
            throw res.status;
        }

        alert('User profile created successfully');
    
        document.getElementById('usernameSignUpInput').value = '';
        document.getElementById('passwordSignUpInput').value = '';
        welcomeBlock.style.display = 'none';
        loginForm.style.display = 'block';
        signUpForm.style.display = 'none';
    })
    .catch(err => {
        let errorMessage = 'Unable to create profile, Please try again later'
         
        if (err == 409) {
            errorMessage = 'A profile with a username exists already';
        }

        alert(errorMessage);
        console.error(errorMessage);
    })

})