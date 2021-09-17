require('dotenv').config({path:'.env'})

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const fileName = 'images/8885d268-cfbb-4466-b0b8-a67dfd2e9ec0.JPG';

// Performs label detection on the local file
async function start() { 
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log(detections)
    console.log('Text:');
    detections.forEach(text => console.log(text.description));
};

start();
