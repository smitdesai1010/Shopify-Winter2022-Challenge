const express = require('express')
const router = express();
const multer = require('multer');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const { v4: uuidv4 } = require('uuid');
const db = require(__dirname+'/database')
const authorization = require(__dirname+'/authorization')


const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './images/');
     },
    filename: (req, file, callBack) => {
        const filename = uuidv4()+file.originalname.substr(file.originalname.indexOf('.'))
        callBack(null , filename);
    }
});

let upload = multer({ storage: storage });

router.use(authorization)
router.post('/', upload.array('image',10), (req, res) => {
    
    let imageInfo = Array.isArray(req.body.imageInfo) ? req.body.imageInfo.map(JSON.parse) : [JSON.parse(req.body.imageInfo)]

    for (let i = 0; i < imageInfo.length; i++) {
        const imageID = (Math.random()*10**9).toFixed();
        const name = imageInfo[i].name == '' ? req.files[i].originalname : imageInfo[i].name; 
        const extension = req.files[i].originalname.substr(req.files[i].originalname.indexOf('.') + 1);
        const visibility = imageInfo[i].publicVisibility ? 'public' : 'private';

        const query = `INSERT into images(id,name,filepath,extension,size,owner,visibility,description) 
                       VALUES("${imageID}","${name}","${req.files[i].filename}","${extension}","${req.files[i].size}", "${res.locals.owner}" ,"${visibility}", "${imageInfo[i].description}")`
        
        db.executeQuery(query)
        .then(response => {
            identifyLabels(imageID, req.files[i].path);
            performOCR(imageID, req.files[i].path);
        })
        .catch( error => {
            console.log('Error in uploading image\n',error)
            res.sendStatus(500);
            return;
        })
    }

    res.sendStatus(200);
})

function identifyLabels(imageId, fileName) {
    client.labelDetection(fileName)
    .then( ([result]) => {
        const labels = result.labelAnnotations;
        
        let query = 'INSERT into imageLabels values'
        labels.forEach(label => query += `("${imageId}","${label.description}"),`)
    
        query = query.substr(0, query.length-1); //removing last comma

        db.executeQuery(query)
        .catch( error => {
            console.log('Error in entering imagelabels\n',imageId,fileName,'\n',error)
            return;
        })
    })
}

function performOCR(imageId, fileName) {
    client.textDetection(fileName)
    .then( ([result]) => {
        const texts = result.textAnnotations;

        let query = 'INSERT into imageOCRs values'
        texts.forEach(text => { 
            if (text == '')     return;
            query += `("${imageId}","${text.description}"),`
        })
    
        query = query.substr(0, query.length-1); //removing last comma
        db.executeQuery(query)
        .catch( error => {
            console.log('Error in entering imageOCR\n',imageId,fileName,'\n',error)
            return;
        })
    })
}

module.exports = router;