const express = require('express')
const router = express();
const db = require(__dirname+'/database')

router.use(express.json());
router.post('/', (req,res) => {

    const visibility = req.body.visibility;
    
    db.executeQuery(`SELECT filepath FROM images WHERE visibility='${visibility}'`)
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