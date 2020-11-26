const express = require("express");
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');
const customer = require("./controllers/customer");
const admin = require("./controllers/admin");
const app = express();

app.set("view engine", "ejs");

app.use("/assets", express.static("assets"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

app.use('/', customer);
app.use('/admin', admin);

//server startup
app.listen(5000, (error) => {
  console.log("express server started at 5000...");
});
