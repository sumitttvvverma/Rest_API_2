"# Rest_API_2" 
REST > REpresentational State Transfer Application Programming Interface

npm init -y
npm i express mongoose@5.0.18 validator nodemon
package.json > in scripts > 
    "start": "node app.js",
    "dev": "nodemon app.js"

in app.js >
write > const express = require('express'); & const app = express();  &  const port = 7000;
app.get("/",(req,res)=>{ res.send("port REST api 2 is working at / "); });
app.listen(port,(req,res)=>{  console.log(`Server is running at ${port} `);  }); 
terminal > npm run dev 
check it > http://localhost:7000/ 

<----End---->

add MongoDB >
db/conn.js
add > const mongoose = require('mongoose');     //this one is for mongoose@5.0.18
then create async function 'connectDB' with argument 'uri'  
then add try catch in it  
add > await mongoose.connect(uri);
after that > let db = mongoose.connection;  
then > await db.createCollection('collection')                  
then > module.exports to connectDB
Now in app.js >
import connectDB from ./db/conn
add > const uri = 'mongodb://localhost:27017/restcurd';
after that >
    connectDB(uri).then(()=>{
    console.log("connected mongo /app.js")
    });  
Now npm run dev   
check on postman > get request > http://localhost:7000/ 

<----End---->

The main purpose no start > Get , Post , delete , patch  

create > model/students.js
import mongoose , validator
create > const studentSchema = new mongoose.Schema({})
provide in it > name:{} , email:{} , phone:{} , address:{}
add type , required , minlength , validator in them
USE validator like in them if want >
            validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email")}
                           }
after that >
const Student = mongoose.model('Student', studentSchema)
module.exports = Student;                           

Now in app.js >
import Student > const Student = require('./model/students')

POST Request > create a new student > for that in app.js before app.listen
create >   app.post("/students",async (req,res)=>{})
pass it it >  const user = new Student(req.body)   
if u console req.body in post request it will undefine right Now
So for that >

express.json() >
express.json() is a inbuilt method in express to recognize the incoming request object as a JSON object
we only need express.json() for POST and PUT/PATCH request
add in app.js > app.use(express.json());
after that > go postman ,POST method - http://localhost:7000/students 
select body > then > raw >then switch to > JSON
now write >{
    "name":"varun",    "email":"varun@gmail.com",    "phone":7654235349,    "address":"puna"
           }
now u see console of req.body shows this data in terminal

Now back to inside app.post() async func>
after declare user , create > const createUser = await user.save(); 
then > res.status(201).send(createUser);
wrap it in try-catch
now go and postman and do send again now data is saved in > database- restcurd >collection- Student

<----End---->

Router => 
for post, get, patch, delete they all are written in app.js and it will make code complicated 
for the solution we use Router in it 
first create file > routers/student.js 
inside it >
import express ,
create new router > const router = new express.Router();
cut and paste app.post() > and 'app' replace with 'router' here
import Student > ../model/students , Student Schema for app.post variable
Now module.exports = router;
Now in app.js >
import >   const studentRouter = require('./routers/student');
need to register our router after that >   
app.use(studentRouter);  <== this should be after app.use(express.json()) ,for post patch
now check on postman work or not

<----End---->

GET request >
in routers/student.js >
create >  router.get("/students",async(req,res)=> {  })
inside in it >
create > const studentsData = await Student.find()
after that > res.status(201).send(studentsData)
wrap it in trycatch
save and run and check on postman > write path and switch to get > work

<----End---->

get the indivisual student data using id >
router.get("/students/:id", async(req,res)=>{ })
inside in it > const _id = req.params.id; //se id mil jaygi
then > const studentData = await Student.findById(_id);  //se student data mil jayga
then > res.status(201).send(studentData);

<----End---->

get the indivisual student data using name >
 router.get("/student/:name", async(req,res)=>{})
 inside in it > const name = req.params.name;
 create > const studentData = await Student.findOne({ name });
 then >  res.status(200).send(studentData);
 on postman >
  check any Example > http://localhost:7000/student/vikas

<----End---->

Update request > put / patch >
By Id >
 router.patch("/students/:id",async(req,res)=>{})
 inside it > const _id= req.params.id;
 add >   const UpdateStudents = await Student.findByIdAndUpdate(_id , req.body ,{new : true} );
 after > res.status(201).send(UpdateStudents);
on postman > select patch , add url with id , select body, click raw , select JSON

<----End---->

Delete request > 
By Id >
  router.delete("/students/:id", async(req,res)=>{})
  inside it >  const _id = req.params.id;
  add >     const deleteStudent = await Student.findByIdAndDelete(_id);
  after >   res.status(201).send(deleteStudent);
  on postman > url with id , select delete , send and it will delete
