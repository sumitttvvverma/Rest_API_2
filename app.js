const express = require('express');
const connectDB = require('./db/conn');
const app = express();
const port = process.env.PORT || 7000;

const Student = require('./model/students')

//you dont need express.json() and express.urlencoded() for GET request or Delete request
//we only need it for POST and PUT/PATCH request
//express.json() is a inbuilt method in express to recognize the incoming request object as a JSON object
//its called as middleware ,in your application code : app.use(express.json());
app.use(express.json());

//Router    
const studentRouter = require('./routers/student');
//need to register our router
app.use(studentRouter);    //NOTE: this should be after app.use(express.json());


app.get("/",(req,res)=>{
     res.send("hello port REST api 2 is working at / ");
});

const uri = 'mongodb://localhost:27017/restcurd';
connectDB(uri).then(()=>{
    console.log("connected mongo /app.js")
});


//POST Request : create a new student
// app.post("/students",async(req,res)=>{ same as router.post ./routers/student.js})

//should always on Last
app.listen(port,(req,res)=>{
    console.log(`Server is running at ${port} `);
})