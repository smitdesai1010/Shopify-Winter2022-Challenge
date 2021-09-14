const express = require('express')
const router = express();
const jwt = require('jsonwebtoken')
const db = require(__dirname+'/database')

router.use(express.json());
router.post('/', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.executeQuery(`SELECT password FROM users WHERE username='${username}' LIMIT 1`)
    .then(response => {
        if (response.length == 0) {
            res.status(404).send('No account found with the supplied username');
        }

        else if (response[0].password != password) {
            res.status(401).send('Incorrect Password')
        }

        else {
            let token = jwt.sign({username: username},'ShopifyIsCool',{expiresIn: '1h'});
            res.status(200).send(token)
        }
    })
    .catch( error => {
        console.log('Error in Login\n'+error);
        res.status(400).send('Unable to create profile, Please try again later')
    })

})


module.exports = router
