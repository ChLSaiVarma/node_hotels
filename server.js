const express = require('express')
const app = express()
const db=require('./db')
const bodyParser = require('body-parser');
const fs= require('fs')
require('dotenv').config();
app.use(bodyParser.json())
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/chicken', function (req, res) {
  res.send('Hello hen rip')
})

//Import person routes
const personRoutes=require('./routes/personRoutes');
const memuItemRoutes=require('./routes/memuItemRoutes');
//use the routers
app.use('/person',personRoutes);
app.use('/menu',memuItemRoutes);
app.post('/items',(req,res)=>{
  res.send("data is safe");
});
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('App is running');
})