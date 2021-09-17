const express = require('express')
const router = express();
const db = require(__dirname+'/database')
const authorization = require(__dirname+'/authorization')

router.use(express.json());

router.post('/public', (req,res) => {
    let query = 'SELECT filepath FROM images';
    if (req.body.labels != null)    query += ',imageLabels';
    if (req.body.OCR != null)       query += ',imageOCRs'
    query += ` WHERE visibility='public'`;
    searchDatabase(req, res, query);
})

router.use('/private',authorization);
router.post('/private', (req,res) => {
    let query = 'SELECT filepath FROM images';
    if (req.body.labels != null)    query += ',imageLabels';
    if (req.body.OCR != null)       query += ',imageOCRs'
    query += ` WHERE owner='${res.locals.owner}'`;
    searchDatabase(req, res, query);
})


function searchDatabase(req,res,query) {

    // isArray = (a) => {
    //     return (!!a) && (a.constructor === Array);
    // };

    // if (!isArray(req.body.labels) || !isArray(req.body.OCR)) {
    //     res.sendstatus(403);
    //     return;
    // }

    if (req.body.name != null)          query += ` AND name like '%${req.body.name}%'`;
    if (req.body.extension != null)     query += ` AND extension='${req.body.extension}'`; 
    if (req.body.startDate != null)     query += ` AND uploadDate>='${req.body.startDate}'`;
    if (req.body.endDate != null)       query += ` AND uploadDate<='${req.body.endDate}'`;
    if (req.body.minSize != null)       query += ` AND size>='${req.body.minSize}'`;
    if (req.body.maxSize != null)       query += ` AND size<='${req.body.maxSize}'`;
    if (req.body.description != null)   query += ` AND description like '%${req.body.description}%'`;
    
    if (req.body.labels != null) {
        query += ` AND imageLabels.label in (`;
        req.body.labels.forEach(label => query += `'${label}',`)
        query = query.substr(0, query.length-1);    //removing last comma
        query += `) AND imageLabels.imageId = images.id`;
    }

    if (req.body.OCR != null) {
        query += ` AND imageOCRs.text in (`;
        req.body.OCR.forEach(label => query += `'${label}',`)
        query = query.substr(0, query.length-1);    //removing last comma
        query += `) AND imageOCRs.imageId = images.id`;
    }

    db.executeQuery(query)
    .then(response => {
        res.status(200).send(response)
    })
    .catch( error => {
        console.log('Error in loading images\n'+error);
        res.sendStatus(400);
    })
}


module.exports = router;