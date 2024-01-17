const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const connectDB = require('./server/database/connection');

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080
//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//set views engine
app.set('view engine','ejs');
// app.set("views",path.resolve(__dirname,"views/ejs"));

//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));

//load router
app.use('/', require('./server/routes/router'));




app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})