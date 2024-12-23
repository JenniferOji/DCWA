var express = require('express')
var mysqlDAO = require('./mysqlDao')
var mongoDao = require('./mongoDao')
const bodyParser = require('body-parser'); //pull from req body

let ejs = require('ejs');

var app = express()

//middlewear to parse body 
app.use(bodyParser.urlencoded({ extended: true }));


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

app.get("/students/add", (req, res) => {
    res.render("newStudent")

})

app.post("/students/add", (req, res) => {
    const {sid, name, age} = req.body;
    mysqlDAO.addStudent(sid, name, age) 
        .then(() => {
            res.redirect("/students")
        })
        .catch((error) => {
            res.send("an error occured")
        });
})


app.get("/students/edit/:sid", (req, res) => {
    mysqlDAO.studentById(req.params.sid)
    .then((data) => {
        console.log(data)
        res.render("updateStudent", {student: data}); 
    })
    .catch((error) => {
        res.send(error)
    })
})

app.post("/students/edit/:sid", (req, res) => {
    const { sid, name, age } = req.body;
    mysqlDAO.updateStudent(sid, name, age) 
        .then(() => {
            res.redirect("/students")
        })
        .catch((error) => {
            res.send(error)
        });
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

app.get("/lecturers/delete/:id", (req, res) => {
    res.send(req.params.id)    
    mongoDao.deleteLecturer(req.params.id)
})

