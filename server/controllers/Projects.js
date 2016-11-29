let mongoose = require('mongoose');
let Project = mongoose.model('Project');

module.exports = (() => {
  return {
    // Place controller methods here.
    getAll: (req, res) => {
      Project.find({}, (err, content) => {
        if (err) {
          console.log("Trouble obtaining the projects.");
        } else {
          res.json(content);
        }
      })
    },
    create: (req, res) => {
      console.log(req.body);
      Project.findOne({projectName: req.body.name}, (err, obtained) => {
        if(obtained){
          console.log("Uh oh.");
        } else {
          console.log("Couldn't find the project in the DB.  Now we must create one.");
          Project.create({projectName: req.body.name}, (err, created) => {
            if (err) {
              console.log("Error creating new project");
            } else {
              console.log("Project successfully created : " + created);
              res.json(created);
            }
          });
        }
      });
    }
  }
})();
