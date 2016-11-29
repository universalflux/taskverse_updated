let users = require('./../controllers/Users.js');
let tasks = require('./../controllers/Tasks.js');
let projects = require('./../controllers/Projects.js');

module.exports = (app) => {
  // place routes here, make sure to place the $GET's before the $POST's
  app.get('/projects', (req, res) => {
    projects.getAll(req, res);
  });
  app.post('/create_project', (req, res) => {
    projects.create(req, res);
  });
  app.post('/create_user', (req, res) => {
    users.create(req, res);
  });
  app.post('/login_user', (req, res) => {
    users.login(req, res);
  });
};
