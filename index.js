var express = require('express')
var mysqlDAO = require('./mysqlDao')
let ejs = require('ejs');

var app = express()

//must be set after the app variable 
app.set('view engine', 'ejs')

//when it starts running on port 3004 it calls the function 
app.listen(3004, () => {
    console.log("Running on port 3004")

})

app.get("/", (req, res) => {
    mysqlDAO.getStudents()
    .then((data) => {
        //res.send(data)
        //sending the students file instead of the raw data - passing in the students db to the students filel
        //console.log(JSON.stringify(data)) - locating th eerror and seeing the data it outputs 
        res.render("students", {studentList: data})
    })
    .catch((error) => {
        res.send(error)
    })
});

