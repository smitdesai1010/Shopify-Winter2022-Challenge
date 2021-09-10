const express = require('express')

const app = express();
const PORT = process.env.PORT || 4500;


app.use(express.static('public'));

app.all('*',(req,res) => {
    res.send('This is a invalid route');
})


app.listen(PORT, () => console.log('Server connected at:', `localhost:${PORT}`));