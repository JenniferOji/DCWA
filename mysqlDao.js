var pmysql = require('promise-mysql')

//this fil econtains everything to do with mysql

var pool

pmysql.createPool({
    connectionLimit : 3,
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'proj2024mysql'
})
    //resolved - if it can connect 
    .then(p => {
    pool = p
    })
    //rejected - if there was a problem connecting to the database
    .catch(e => {
    console.log("pool error:" + e)
   })


var getStudents = function(){
    return new Promise((resolve, reject) => {
        //sending query from the database
        pool.query('SELECT * FROM student')
            .then((data) => {
                console.log(data)
                resolve(data)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
    })
}



module.exports = {getStudents}