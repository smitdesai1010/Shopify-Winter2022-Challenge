require('dotenv').config({path:'.env'})
const db = require('./routes/database')

// db.executeQuery(`INSERT INTO users values('AAA','1')`)
// .then(response => console.log(response.length))
// .catch(error => console.log(error.errno))   //1062

db.executeQuery('SELECT password FROM users WHERE username="C" LIMIT 1')
.then(response => console.log(response.length))
.catch(console.error)

// db.executeQuery(`INSERT INTO users values('AAA','1')`);
// db.executeQuery(`INSERT INTO users values('BBB','2')`);
// db.executeQuery(`INSERT INTO users values('CCC','3')`);
// db.executeQuery(`INSERT INTO users values('DDD','4')`);
// db.executeQuery(`INSERT INTO users values('EEE','5')`);
// db.executeQuery(`INSERT INTO users values('FFF','6')`);