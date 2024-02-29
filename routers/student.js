const express = require('express')
//1. create a new router
const router = express.Router();
const Student = require('../model/students')

//2. we need to define the router

//POST Request : create a new student
router.post("/students",async(req,res)=>{
    try {    // res.send("hello form post")
     const user = new Student(req.body)              //request of Student schema by req.body 
    //  console.log(req.body);
     const createUser = await user.save(); 
     res.status(201).send(createUser);
    } catch (e) {
     res.status(400).send(e); 
    } 
 })
 
 //GET Request
 router.get("/students",async(req,res)=>{
    try {   
     const studentsData = await Student.find()
     res.status(201).send(studentsData)
    } catch (e) {
     res.status(400).send(e); 
    } 
 })

 //get the indivisual student data using id
  router.get("/students/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        // console.log(req.params);         //shows id inside curlybracket/obj in terminal
        // console.log(req.params.id);     //shows id only
        const studentData = await Student.findById(_id);
        // console.log(studentData);        //shows StudentData of id  
        if(!studentData){
            res.status(404).send();
        }else{
            res.status(201).send(studentData);
        }
    } catch (e) {
        res.status(400).send(e)
    }
  })
 
//get the indivisual student data using name
  router.get("/student/:name", async(req,res)=>{
    try {
        const name = req.params.name;
        // console.log(req.params.name);    //shows name
        const studentData = await Student.findOne({ name });
        // console.log(studentData);         //studentData object
        if(!studentData){
           return res.status(404).send();
        }else{
            res.status(200).send(studentData);
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
  })

 //Update the students by it id
 router.patch("/students/:id",async(req,res)=>{
    try {
        const _id= req.params.id;
        const UpdateStudents = await Student.findByIdAndUpdate(_id , req.body ,{new : true} );  //without them it works > req.body ,{new : true}
        // console.log(req.body);     //Shows Updated Name
        res.status(201).send(UpdateStudents);
    } catch (e) {
        res.status(400).send(e)
    }
 })
 
 //Delete the students by id
 router.delete("/students/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(_id);
        if(!_id){
         res.status(404).send();
        }
        res.status(201).send(deleteStudent);
    } catch (e) {
        res.status(400).send(e)
    }
 })


 //3. export to import in app.js
 module.exports = router;