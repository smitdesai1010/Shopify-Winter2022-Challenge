// if (sessionStorage.getItem("userCredential") == null || sessionStorage.getItem("userCredential") == '') {
//     alert('User not logged in');
//     window.location.href = "../index.html";
// }

// const userCredential = JSON.parse(sessionStorage.getItem("userCredential"))
// document.getElementById('name').innerHTML = 'Hello '+userCredential.username+'!';

const home = document.getElementById('home');
const uploadImageForm = document.getElementById('uploadImageForm');
uploadImageForm.style.display = 'none';

document.getElementById('uploadImage').addEventListener('click', () => {
    uploadImageForm.style.display = 'block';
    home.style.display='none';
})


document.getElementById('goBack').addEventListener('click', () => {
    uploadImageForm.style.display = 'none';
    home.style.display='block';
})