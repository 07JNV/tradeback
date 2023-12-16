
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var userRouter = require("./routes/userRoutes");



const cors = require("cors");
require("dotenv").config();
const db=process.env.MONGODB_URL;
// console.log(db);

app.use(express.json());
app.use(cors());




app.get("/",(req,res)=>{
  res.send("hello");
})



app.use("/users",userRouter);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://'+db);

app.listen(8000,(req,res)=>{
  console.log("server started on port 8000");
})









 


















