const imageContainer = document.getElementById('images');
const urlParams = new URLSearchParams(window.location.search);
const imageType = urlParams.get('imageType') == undefined ? 'public' : urlParams.get('imageType');
document.getElementById('imageType').innerHTML = imageType == 'myImages' ? 'My Images' : 'Public Images';

const body = {
    imageType: imageType
};

if (imageType == 'myImages')    body.owner = 'smit';
searchImages(body);     //when page loads


document.getElementById('search').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const extension = document.getElementById('extension').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const minSize = document.getElementById('minSize').value;
    const maxSize = document.getElementById('maxSize').value;
    const description = document.getElementById('description').value;
    
    // console.log(name)
    // console.log(extension)
    // console.log(startDate)
    // console.log(endDate)
    // console.log(minSize)
    // console.log(maxSize)
    // console.log(description)

    if (name != '')         body.name = name;
    if (extension != 'All') body.extension = extension;
    if (startDate != '')    body.startDate = startDate;
    if (endDate != '')      body.endDate = endDate;
    if (minSize != '')      body.minSize = minSize;
    if (maxSize != '')      body.maxSize = maxSize;
    if (description != '')  body.description = description;

    console.log(body)
    searchImages(body)
})



function searchImages(body) {

    imageContainer.innerHTML = '';  //reseting content

    fetch('/search', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(body)
    })
    .then(res => {
        if (res.status != 200)  throw res.status;
        return res.json();
    })
    .then(json => {
        if (json.length == 0)
            imageContainer.innerHTML = 'No images found';
    
        json.forEach(img => {
            imageContainer.innerHTML += `<img src="${'http://localhost:4500/image/'+img.filepath}" height="400" width="400" class="m-3">`
        })
    })
    .catch(err => {
        imageContainer.innerHTML = 'Unable to load images';
        console.log('Unable to load images, Status Code: ',err);
    })
}

