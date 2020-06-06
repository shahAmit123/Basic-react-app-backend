const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
const port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/studentsDB",{userNewUrlParser : true});

const studentSchema = new mongoose.Schema ({
    name : String,
    class : String,
    section : String,
    rollno : Number,
    marks : String,
    status : String
});

const Student = mongoose.model("Student", studentSchema);

// populate initial database
let student;
student = new Student ({
    name : "Rahul",
    class : "12th",
    section : 'B',
    rollno : 12454,
    marks : 'Not Assigned',
    status : "None"
});
student.save();

student = new Student ({
    name : "Raj",
    class : "12th",
    section : 'B',
    rollno : 45124,
    marks : 'Not Assigned',
    status : "None"
});
student.save();

student = new Student ({
    name : "Vijay",
    class : "12th",
    section : 'B',
    rollno : 78945,
    marks : 'Not Assigned',
    status : "None"
});
student.save();

student = new Student ({
    name : "Kartik",
    class : "12th",
    section : 'B',
    rollno : 78451,
    marks : 'Not Assigned',
    status : "None"
});
student.save();

student = new Student ({
    name : "Aditya",
    class : "12th",
    section : 'B',
    rollno : 78125,
    marks : 'Not Assigned',
    status : "None"
});
student.save();


// GET request
app.get("/getdata", function (req, res) {
    Student.find((err,student)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(student);
        }
    });    
});


// PUT request 
app.put("/updatedata/:id",function(req,res) {
    Student.updateOne({_id : req.params.id},
    {marks : req.body.marks.toString(), status : req.body.status.toString()},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("successfully submited");
        }
    } )
    res.end();
})

app.listen(port,() => console.log(`The server is runnning on port ${port}`))