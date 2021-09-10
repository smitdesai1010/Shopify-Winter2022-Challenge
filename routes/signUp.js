const express = require('express')
const router = express();
const db = require(__dirname+'/database')

router.use(express.json());

router.post('/', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.executeQuery(`INSERT INTO users values('${username}','${password}')`)
    .then( response => {
        res.status(200).send('User profile created successfully')
    })
    .catch( error => {
        console.log('Error in SignUp\n'+error);

        if (error.errno == 1062) {
            res.status(409).send('A profile with a username exists already')
        }

        else {
            res.status(400).send('Unable to create profile, Please try again later')
        }
    })

})

module.exports = router;