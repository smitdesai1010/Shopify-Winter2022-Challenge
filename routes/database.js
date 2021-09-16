const mysql = require('mysql')

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
 })


 module.exports = {
    executeQuery : queryString => {
       return new Promise((resolve, reject) => {
            con.query(queryString, (error, result) => {
                if (error) reject(error);
                resolve(result);
            })
       })
    }
};


//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server