const express = require('express');
const router = express();
const fs = require('fs');
const db = require(__dirname+'/database')
const authorization = require(__dirname+'/authorization')

router.use(authorization);
router.post('/:filepath', (req,res) => {
    db.executeQuery(`Select owner from images where filepath = '${req.params.filepath}'`)
    .then(response => {
        if (response.length == 0) {
            res.status(404).send('No such file exists');
            return;
        }

        if (response[0].owner != res.locals.owner) {
            res.status(401).send('You are not the owner of this image');
            return;
        }

        fs.unlink('images/'+req.params.filepath, (err) => {
            if (err) throw err;

            db.executeQuery(`Delete from images where filepath = '${req.params.filepath}'`);
            res.sendStatus(200);
        })
    })
    .catch(err => {
        console.log('Unable to delete image\n',req.text,err)
        res.status(400).send('Error in deleting the image, please view server logs for more details');
    })

})


module.exports = router;