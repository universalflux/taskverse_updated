var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (() => {
  return {
    login: (req, res) => {
      console.log(req.body.userName);
      console.log('This is the data in the login method: ' + req.body);
      User.findOne({userName: req.body.userName}, (err, result) => {
        if(!result){
          console.log('Could not find user in the database');
        } else {
          console.log("User has been located: " + result);
          res.json(result);
        }
      })
    },
    create: (req, res) => {
      console.log(req.body);
      User.findOne({userName: req.body.userName}, (err, result) => {
        if(!result){
          console.log('User not found, now we have to create him.');
          User.create(req.body, (err, result) => {
            if(err){
              console.log("User cannot be created.");
            } else {
              console.log('User successfully created: ' + result);
              res.json(result);
            }
          });
        } else {
          console.log('User is already in the system. You must login.');
        }
      });
    }
  }
})();
