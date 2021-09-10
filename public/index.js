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

document.getElementById('submitLoginForm').addEventListener('click', () => {
    //Form validation here----------------------------
    welcomeBlock.style.display = 'block';
    loginForm.style.display = 'none';
    signUpForm.style.display = 'none';
})


document.getElementById('signUp').addEventListener('click', () => {
    welcomeBlock.style.display = 'none';
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';
})

document.getElementById('submitSignUpForm').addEventListener('click', () => {
    //Form validation here----------------------------
    welcomeBlock.style.display = 'none';
    loginForm.style.display = 'block';
    signUpForm.style.display = 'none';
})