const mysql = require('mysql')

console.log(process.env.MYSQL_USERNAME)
console.log(process.env.MYSQL_HOST)

const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}

const con = mysql.createConnection(config)
con.connect(error => {
    if (error) {
       console.log('Error in connecting to the database\n'+error)
       process.exit(1)
    }
    console.log('Connected to the database');
 })


 module.exports = {
    executeQuery : query => {
       return new Promise((resolve, reject) => {
            con.query(query, (error, result) => {
                if (error) reject(err);
                resolve(result);
            })
       })
    }
};