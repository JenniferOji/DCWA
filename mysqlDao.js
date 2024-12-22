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

var studentById = function(id){
    return new Promise((resolve, reject) => {
        //sending query from the database
        pool.query('SELECT * FROM student WHERE sid = ?', [id])
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

// var updateStudent = function(id, name, age){
//     return new Promise((resolve, reject) => {
//         db.collection('students').update({ _id: id }) 
//             .then((documents) => {
//                 resolve(documents);  // Return the fetched documents
//                 console.log("deleted successfully")
//             })
//             .catch((error) => {
//                 reject(error);  // Handle errors
//             });
//     });
    
// }

var getGrades = function(){
    return new Promise((resolve, reject) => {
        //sending query from the database
        pool.query('select s.name AS Student, m.name AS Module, g.grade AS Grade from student s LEFT JOIN grade g ON s.sid=g.sid LEFT join module m ON g.mid=m.mid ORDER BY s.name, g.grade;')
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

module.exports = {getStudents, getGrades, studentById}