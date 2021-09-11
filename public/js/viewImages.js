const urlParams = new URLSearchParams(window.location.search);
const visibility = urlParams.get('imageVisibility');
document.getElementById('visibilityType').innerHTML = visibility + ' Images';