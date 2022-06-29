const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')

const app = express();

app.use(cors());
app.use(bodyparser.json());

//connect mysql database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user_info',
  port: 3306
});

//check database connection

db.connect(err => {
  if (err) {
    console.log('error')
  }
  console.log('Database connected succesful!!!!!!!!')
})


//get All data
app.get('/users', (req, res) => {
  let qrr = `SELECT * FROM users`
  db.query(qrr, (err, results) => {
    if (err) {
      console.log(err, "error")
    }
    if (results.length > 0) {
      res.send({
        message: "All users Data",
        data: results
      })
    }
  })
})

//get single data by id
app.get('/user/:id', (req, res) => {
  //console.log("get data by single user id is:",req.params.id)
  let qrId = req.params.id;
  let qr = `SELECT * FROM users where id =${qrId}`;
  db.query(qr, (err, results) => {
    //  console.log("result is:",results)
    if (err) {
      console.log(err);
    }
    if (results.length > 0) {
      res.send({
        message: "Get data by ID",
        data: results
      })
    }
    else {
      res.send({
        message: "Data not found chhote!!!!!!!"
      })
    }
  })
})

//post data
app.post('/user', (req, res) => {
  // console.log(req.body,"post data success");
  let FullName = req.body.fullname;
  let Email = req.body.email;
  let Mobile = req.body.mobile;

  let qr = `insert into users(fullname,email,mobile)
      value('${FullName}','${Email}',${Mobile})`;
  db.query(qr, (err, results) => {
    console.log("results is:", results)
    if (err) { console.log(err) }
    res.send({
      message: "Data added successfull......",
      data: results
    })
  })
})


//update data
app.put('/user/:id', (req, res) => {
  console.log(req.body, "updated data");
  let Uid = req.params.id;
  let FullName = req.body.fullname;
  let Email = req.body.email;
  let Mobile = req.body.mobile;

   let qr = `update users set fullname=${"'"+req.body.fullname+"'"},email=${"'"+req.body.email+"'"},
   mobile=${"'"+req.body.mobile+"'"} where id =${Uid}`;

    // let qr=`UPDATE users set fullname='${FullName}', email='${Email}' mobile='${Mobile}' where id=${Uid} `;

   db.query(qr, (err, results) => {
    console.log("result is:", results)
    if (err) { console.log(err) }
    res.send({
      message: "Data Updated successfull",
      data: results
    })
  })
})

     //Delete data
app.delete('/user/:id',(req,res)=>{
    let Uid=req.params.id;
       console.log("id is:",Uid);
    let qr=`delete from users where id ='${Uid}' `;
      db.query(qr,(err,results)=>{
         if(err){console.log(err)}
            res.send({
              message:"Data deleted successfull" 
            })
      })
})          
 

app.listen(3000, () => {
  console.log("Server is running in port 3000,election started");
})