require('dotenv').config({path:'.env'})

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const fileName = 'images/2a65dee5-7e11-4dae-8f50-f63f5a230ff8.JPG';

// Performs label detection on the local file
async function start() { 
    const [result] = await client.labelDetection(fileName);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
};

start();
