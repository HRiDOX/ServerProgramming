
const bodyParser = require("body-parser");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const router = require("./routes");
const app = express();
const port = 3000;
const passport = require('passport');

const fileUpload = require('express-fileupload');

const session = require('express-session');


require('./config/passport')(passport);

const database_url =  "mongodb://localhost:27017/UserDB"

mongoose.connect( database_url , { useNewUrlParser:true },(err) => {
    if (!err) {
        console.log('MongoDB Connected')
    } else {
        console.log('Error' + err);
    }
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  fileUpload({
      limits: {
          fileSize: 10000000,
      },
      abortOnLimit: true,
  })
);
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
