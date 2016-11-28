const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 8911 || process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/client')));
app.use(morgan('combined'));

require('./server/config/mongoose.js');
require('./server/config/routes')(app);

app.listen(port, (req, res) => {
  console.log("Hello creator, you are now connected to port#" + port + ". Enjoy tweaking my logic.");
});
