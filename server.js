//student name: Vishal Sharma
//Student id: C0867422
const express = require("express")
const bodyParser = require("body-parser")
const cros = require('cors')
const app = express();
app.use(cros())
const mongoose = require("mongoose")
const dbConfig= require('./config/database.config.js')


mongoose.connect(dbConfig.url).then(()=>{
    console.log("Successfully connected to database")
    
}).catch(err=>{
    console.log("could not connect:",err);
    process.exit();
})

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

require('./app/routes/user.routes.js')(app);

app.listen(8080,()=>{
    console.log("server is listening on port 8080")
})