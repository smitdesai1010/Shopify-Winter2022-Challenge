const express = require('express')
const router = express();
const db = require(__dirname+'/database')

router.use(express.json());

router.post('/', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    // db.executeQuery('SELECT * FROM users WHERE username='+username)
    // .then( response => {

    // })
    // .catch( error => {

    // })

})

module.exports = router;