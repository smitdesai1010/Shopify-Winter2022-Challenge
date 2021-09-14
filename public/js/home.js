if (sessionStorage.getItem("userCredential") == null || sessionStorage.getItem("userCredential") == '') {
    alert('User not logged in');
    window.location.href = "../index.html";
}

const userCredential = JSON.parse(sessionStorage.getItem("userCredential"))
document.getElementById('name').innerHTML = 'Hello '+userCredential.username+' !';

const home = document.getElementById('home');
const uploadImageForm = document.getElementById('uploadImageForm');
const imageInput = document.getElementById('imageUploaded');
const imagePreview = document.getElementById('imagePreview');
const submitUploadForm = document.getElementById('submitUploadForm');
const viewPublicImage = document.getElementById('viewPublicImage');
const viewUserImage = document.getElementById('viewUserImage');

viewPublicImage.addEventListener('click', () => window.location.href = 'viewImages.html?imageType=Public' )

viewUserImage.addEventListener('click', () => {
    if (userCredential.username == 'GUEST') {
        alert('Guest has no images. Please login to view your images');
        return;
    }

    window.location.href = 'viewImages.html?imageType=myImages'
})


uploadImageForm.style.display = 'none';

document.getElementById('uploadImage').addEventListener('click', () => {

    if (userCredential.username == 'GUEST') {
        alert('Guest cannot upload images. Please login to upload');
        return;
    }

    uploadImageForm.style.display = 'block';
    home.style.display='none';
})

imageInput.addEventListener('change', () => {
    if (imageInput.files) {

        imagePreview.innerHTML = '';        //delete previous reviews

        Array.from(imageInput.files).forEach(img => {
            imagePreview.innerHTML += `
            <div class="d-flex flex-row justify-content-center mt-5">
                <img src="${URL.createObjectURL(img)}" alt="" height="140px" width="140px">

                <div class="mx-3">
                    <div class="form-group" style="width:400px;">
                        <input class="imageName form-control" placeholder="Enter image name">
                        <input class="imageDescription form-control" placeholder="Enter image description" style="margin-top:10px">
                    </div>    
                    
                    <div class="form-group form-check">
                        <input class="imageVisibility form-check-input" type="checkbox" >
                        <label class="form-check-label">Keep the image public?</label>
                    </div>   
                </div>
            </div>`
        });
    }
})

submitUploadForm.addEventListener('click', () => {

    if (imageInput.files.length == 0) {
        alert('No image selected');
        uploadImageForm.reset();
        return;
    }

    if (imageInput.files.length > 10) {
        alert('Only 10 images are allowed');
        uploadImageForm.reset();
        return;
    }

    const formData = new FormData();
    const imageNames = document.getElementsByClassName('imageName');
    const imageDescriptions = document.getElementsByClassName('imageDescription')
    const imageVisibilities = document.getElementsByClassName('imageVisibility');

    Array.from(imageInput.files).forEach(img => {
        formData.append('image',img);
    })

    for (let i = 0; i < imageInput.files.length; ++i) {
        formData.append('imageInfo', JSON.stringify({
            name: imageNames[i].value,
            description: imageDescriptions[i].value,
            publicVisibility: imageVisibilities[i].checked
        }))
    }

    formData.append('owner',JSON.parse(sessionStorage.getItem("userCredential")).username)

    fetch('/upload', {
        headers: {'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("userCredential")).token},
        method: 'POST',
        body: formData,
    })
    .then(res => {
        if (res.status == 200) {
            imagePreview.innerHTML = `<h3>Successfully uploaded ${imageInput.files.length} images</h3>`
            uploadImageForm.reset();
        }
        else {
            throw res.status;
        }
    })
    .catch(err => {
        uploadImageForm.reset();
        console.log('Error in upload: ', err,'\n View server logs for more information')
        imagePreview.innerHTML = 'Unable to upload images, please try again';
    })

})

document.getElementById('goBack').addEventListener('click', () => {
    uploadImageForm.style.display = 'none';
    home.style.display='block';
})


