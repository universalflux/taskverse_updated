var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/task_verse');
var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach((file) => {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
});
