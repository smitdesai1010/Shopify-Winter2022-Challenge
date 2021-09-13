require('dotenv').config({path:'.env'})

const express = require('express');
const login = require('./routes/login')
const signUp = require('./routes/signUp')
const upload = require('./routes/upload')
const search = require('./routes/search')
const image = require('./routes/image')

const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.static('public'));

app.use('/login',login.router);
app.use('/signUp',signUp);
app.use('/upload',upload);
app.use('/search',search);
app.use('/image',image);

app.all('*',(req,res) => {
    res.send('This is a invalid route');
})


app.listen(PORT, () => console.log('Server connected at:', `localhost:${PORT}`));