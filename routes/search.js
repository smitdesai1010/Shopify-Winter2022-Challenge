const express = require('express')
const router = express();
const db = require(__dirname+'/database')

router.use(express.json());
router.post('/', (req,res) => {
    let query = 'SELECT filepath FROM images';

    if (req.body.imageType == 'Public') query += ` WHERE visibility='public'`;
    else                                query += ` WHERE owner='${req.body.owner}'`;
    if (req.body.name != null)          query += ` AND name like '%${req.body.name}%'`;
    if (req.body.extension != null)     query += ` AND extension='${req.body.extension}'`; 
    if (req.body.startDate != null)     query += ` AND uploadDate>='${req.body.startDate}'`;
    if (req.body.endDate != null)       query += ` AND uploadDate<='${req.body.endDate}'`;
    if (req.body.minSize != null)       query += ` AND size>='${req.body.minSize}'`;
    if (req.body.maxSize != null)       query += ` AND size<='${req.body.maxSize}'`;
    if (req.body.description != null)   query += ` AND description like '%${req.body.description}%'`;

    db.executeQuery(query)
    .then(response => {
        if (response.length == 0) {
            res.sendStatus(404);
        }
        else {
            res.status(200).send(response)
        }
    })
    .catch( error => {
        console.log('Error in loading images\n'+error);
        res.sendStatus(400);
    })

})

module.exports = router;