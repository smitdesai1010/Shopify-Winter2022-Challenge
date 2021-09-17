require('dotenv').config({path:'.env'})

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const fileName = 'images/DSC_0054.JPG';

// Performs label detection on the local file
async function start() { 
    const [result] = await client.labelDetection(fileName);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
};

start();
