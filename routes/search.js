const express = require('express')
const router = express();
const db = require(__dirname+'/database')
const authorization = require(__dirname+'/authorization')

router.use(express.json());

router.post('/public', (req,res) => {
    let query = 'SELECT filepath FROM images WHERE visibility="public"';
    searchDatabase(req, res, query);
})

router.use('/private',authorization);
router.post('/private', (req,res) => {
    let query = `SELECT filepath FROM images WHERE owner='${res.locals.owner}'`;
    searchDatabase(req, res, query); 
})


function searchDatabase(req,res,query) {
    if (req.body.name != null)          query += ` AND name like '%${req.body.name}%'`;
    if (req.body.extension != null)     query += ` AND extension='${req.body.extension}'`; 
    if (req.body.startDate != null)     query += ` AND uploadDate>='${req.body.startDate}'`;
    if (req.body.endDate != null)       query += ` AND uploadDate<='${req.body.endDate}'`;
    if (req.body.minSize != null)       query += ` AND size>='${req.body.minSize}'`;
    if (req.body.maxSize != null)       query += ` AND size<='${req.body.maxSize}'`;
    if (req.body.description != null)   query += ` AND description like '%${req.body.description}%'`;

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