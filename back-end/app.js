  const express = require('express');
  //Importation du package body-parser
  const bodyParser = require('body-parser');
const path = require('path');
const helmet = require("helmet");
const userRoutes = require('./routes/user');

const app = express();


app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// App requiert BodyParser //
app.use(bodyParser.json()); 
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);



module.exports = app;  