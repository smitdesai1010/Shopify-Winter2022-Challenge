const imageContainer = document.getElementById('images');
const urlParams = new URLSearchParams(window.location.search);
const visibility = urlParams.get('imageVisibility');
document.getElementById('visibilityType').innerHTML = visibility + ' Images';

fetch('/search', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({
        visibility: 'public'
    })
})
.then(res => {
    if (res.status != 200)  throw res.status;
    return res.json();
})
.then(json => {
    console.log(json);
    json.forEach(img => {
        imageContainer.innerHTML += `<img src="${'http://localhost:4500/image/'+img.filepath}" height="200" width="200" class="m-3">`
    })
})
.catch(err => {
    imageContainer.innerHTML = 'Unable to load images';
    console.log('Unable to load images, Status Code: ',err);
})