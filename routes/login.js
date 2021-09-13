const express = require('express')
const router = express();
const { v4: uuidv4 } = require('uuid');
const db = require(__dirname+'/database')

const cache = [];

router.use(express.json());
router.post('/', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.executeQuery(`SELECT password FROM users WHERE username='${username}' LIMIT 1`)
    .then(response => {
        if (response.length == 0) {
            res.sendStatus(404);
        }

        else if (response[0].password != password) {
            res.status(401).send('Incorrect Password')
        }

        else {
            cache[username] = uuidv4();
            res.status(200).send(cache[username])
        }
    })
    .catch( error => {
        console.log('Error in Login\n'+error);
        res.status(400).send('Unable to create profile, Please try again later')
    })

})



module.exports = {
    router : router,
    authorize: (username, token) => {
            if (!(username in cache))    return false;
            if (cache[username] != token) return false;
            return true;
    }
};