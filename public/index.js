const welcomeBlock = document.getElementById('welcomeBlock');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginForm.style.display = 'none';
signupForm.style.display = 'none';

document.getElementById('login').addEventListener('click', () => {
    welcomeBlock.style.display = 'none';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
})

document.getElementById('submitLoginForm').addEventListener('click', () => {
    //Form validation here----------------------------
    welcomeBlock.style.display = 'block';
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
})


document.getElementById('signup').addEventListener('click', () => {
    welcomeBlock.style.display = 'none';
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
})

document.getElementById('submitSignupForm').addEventListener('click', () => {
    //Form validation here----------------------------
    welcomeBlock.style.display = 'none';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
})