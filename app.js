require('dotenv').config({path:'.env'})

const express = require('express');
const login = require('./routes/login')
const signUp = require('./routes/signUp')
const upload = require('./routes/upload')

const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.static('public'));

app.use('/login',login);
app.use('/signUp',signUp);
app.use('/upload',upload)

app.all('*',(req,res) => {
    res.send('This is a invalid route');
})


app.listen(PORT, () => console.log('Server connected at:', `localhost:${PORT}`));