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
    res.render("newStudent", {errors: [], student:[]}) //passing an empty array of errors and students

})

app.post("/students/add", (req, res) => {
    const { sid, name, age } = req.body;
    //an array for holding the errors 
    let errors = [];

    //checking if the student ID already exists
    mysqlDAO.studentById(sid)
    .then((data) => {
        if (data.length > 0) { //checkin if an empty set was not returned 
            errors.push("Student ID " + sid + " already exists.");
        } 
        if (sid.length !== 4) {
            errors.push("Student ID should be 4 characters.");
        }
        if (name.length < 2) {
            errors.push("Student Name should be at least 2 characters.");
        }
        if (age < 18) {
            errors.push("Student age should be at least 18.");
        }

        //if there are errors it re renders the newStudent page
        if (errors.length > 0) {
            return res.render("newStudent", {errors, student: { sid, name, age } })
        }

        //adding the student if there are no errors
        return mysqlDAO.addStudent(sid, name, age)
        .then(() => {
            res.redirect("/students");
        });

    })
    .catch((error) => {
        console.log(error)
    });

});

app.get("/students/edit/:sid", (req, res) => {
    mysqlDAO.studentById(req.params.sid)
    .then((data) => {
        console.log(data)
        res.render("updateStudent", {errors: [], student: data}); 
    })
    .catch((error) => {
        res.send(error)
    })
})

app.post("/students/edit/:sid", (req, res) => {
    const { sid, name, age } = req.body;
    //an array for holding the errors 
    let errors = [];
    let student = [sid,name,age]
    //pushing errors to the array
    if (name.length < 2) {
        errors.push("Student Name should be at least 2 characters.");
    }
    if (age < 18) {
        errors.push("Student age should be at least 18.");
    }

    //if there are errors it re renders the updateStudent page
    if (errors.length > 0) {
        return res.render("updateStudent", {errors, student});
    }

    //updatung the student if there are no errors 
    mysqlDAO.updateStudent(sid, name, age) 
        .then(() => {
            res.redirect("/students")
        })
        .catch((error) => {
            res.send(error)
        });
});

app.get("/grades", (req, res) => {
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

app.get("/lecturers/delete/:lid", (req, res) => {
    const lid = req.params.lid; //lid from re param
    mysqlDAO.getModuleLecturer(lid)
    .then(exists => {//the result of the function
        if (exists) {//checkin the result
            //res.send("Cannot delete lecturer, they have associated modules.");       
            res.render("deletion", {lid})
        } 
        else {
            //deleting lecturer if he/she has no associated modules
            mongoDao.deleteLecturer(lid)
            .then(() => {
                res.redirect("/lecturers")
            })
            .catch((error) => {
                res.send(error)
            });                
        }
    })
    .catch((error) => {
        res.send(error)
    });
    
})

app.get("/modules", (req, res) => {
    mysqlDAO.getModules()
    .then((data) => {
        //res.send(data)
        //sending the students file instead of the raw data - passing in the students db to the students filel
        //console.log(JSON.stringify(data)) - locating th eerror and seeing the data it outputs 
        res.render("modules", {moduleList: data})
    })
    .catch((error) => {
        res.send(error)
    })
});

