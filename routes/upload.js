const express = require('express')
const router = express();
const multer = require('multer');
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

        const name = imageInfo[i].name; //!= '' ? imageInfo[i].name : req.files[i].filename.substr(0,req.files[i].filename.indexOf('.'));
        const extension = req.files[i].originalname.substr(req.files[i].originalname.indexOf('.') + 1);
        const visibility = imageInfo[i].publicVisibility ? 'public' : 'private';

        const query = `INSERT into images(name,filepath,extension,size,owner,visibility,description) 
                     VALUES("${name}","${req.files[i].filename}","${extension}","${req.files[i].size}", "${res.locals.owner}" ,"${visibility}", "${imageInfo[i].description}")`
        
        db.executeQuery(query)
        .catch( error => {
            console.log('Error in uploading image\n',error)
            res.sendStatus(500);
            return;
        })
    }

    res.sendStatus(200);

})

module.exports = router;