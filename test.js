require('dotenv').config({path:'.env'})

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const fileName = 'images/download.jfif';

// Performs label detection on the local file
async function start() { 
    const [result] = await client.labelDetection(fileName) 
    console.log(result)
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
};

start();
