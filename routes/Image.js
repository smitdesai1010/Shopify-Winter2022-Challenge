const express = require('express')
const router = express();

router.get('/:filepath', (req,res) => {
    res.sendFile('/images/'+req.params.filepath, { root: './' })
})

module.exports = router;

//https://stackoverflow.com/questions/17515699/node-express-sending-image-files-as-api-response