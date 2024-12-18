var express = require('express')
var mysqlDAO = require('./mysqlDao')
var mongoDao = require('./mongoDao')

let ejs = require('ejs');

var app = express()

//must be set after the app variable 
app.set('view engine', 'ejs')

//when it starts running on port 3004 it calls the function 
app.listen(3004, () => {
    console.log("Running on port 3004")

})

app.get("/", (req, res) => {
    res.render("home")
});

app.get("/students", (req, res) => {
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

app.get("/Grades", (req, res) => {
    mysqlDAO.getGrades()
    .then((data) => {
        res.render("grades", {gradeList: data})
    })
    .catch((error) => {
        res.send(error)
    })
});


app.get("/lecturers", (req, res) => {
    mongoDao.findAll()
    .then((data) => {
        // console.log(data)
        // res.send(data)
        res.render("lecturers", {LecturerList: data})

    })
    .catch((error) => {
        console.log(JSON.stringify(error))
        res.send(error)
    })
})

