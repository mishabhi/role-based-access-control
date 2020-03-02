const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const userRoutes = require('./app/routes/users');
const collectionRoutes = require('./app/routes/collections');
const groupRoutes = require('./app/routes/groups')

const AuthenticationService = require('./app/auth/AuthenticationService');

require("dotenv").config({
  path: path.join(__dirname, ".env")
});

const app = express();
const PORT = process.env.PORT || 3003;

mongoose.connect('mongodb://' + process.env.DB_SERVER + '/' + process.env.DB_NAME, { useNewUrlParser: true })
.then(() => {
  console.log('Successfully Connected to the Database.')
})
.catch(error => {
  console.log("Error while connecting to database. Halting the startup. " + error);
  process.exit();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(AuthenticationService.authenticate);
app.use('/api/v1', userRoutes);
app.use('/api/v1', collectionRoutes);
app.use('/api/v1', groupRoutes);

// 500 type error is used when error comes from database
app.use((error, req, res, next) => {		    
  res.status(error.status || 500).json({message: error.message});  
  return next(new Error(error));
});

app.listen(PORT, () => {
  console.log('Server started and is listening on Port:', PORT)
})
