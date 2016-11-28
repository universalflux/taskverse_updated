let taskverse = angular.module('taskverse', ['ngRoute']);

taskverse.config(($routeProvider) => {
  $routeProvider
  .when('/create_user', {
    templateUrl: 'partials/new_user.html',
    controller: 'UsersController'
  })
  .when('/projects', {
    templateUrl: 'partials/projects.html',
    // controller: 'ProjectsController'
  })
  .when('/assigned_tasks', {
    templateUrl: 'partials/assigned_tasks.html',
    // controller: 'TasksController'
  })
  .when('/new_project', {
    templateUrl: 'partials/new_project.html',
    // controller: 'TasksController'
  })
  .when('/user_profile', {
    templateUrl: 'partials/user_profile.html',
    controller: 'UsersController'
  });
});

taskverse.service('UserService', function($http){
  let service = {};
  let currentUser = {};


  service.loginUser = (data) => {
    console.log("This is the new user function, here is the data: " + data.userName);
    currentUser = data;
    return currentUser;
  };

  service.createUser = (data) => {
    console.log("This is the create user function, here is the data: " + data.userName);
    currentUser = data;
    return currentUser;
  };

  service.returnUser = (callback) => {
    callback(currentUser);
    return currentUser;
  };


  return service;
});

taskverse.controller('UsersController', function($location, UserService){
  let vm = this;
  let thisLocation = location.hash;
  vm.loginBool = false;

  vm.getUser = () => {
    UserService.returnUser((data) => {
      vm.currentUser = data;
    });
  };

  vm.removeLogin = () => {
    vm.loginBool = true;
  };

  vm.loginUser = (data) => {
    $location.path('/assigned_tasks');
    console.log("This is the loginUser function in the controller, here is the data: " + data.userName);
    UserService.loginUser(data);
    vm.getUser();
  };

  vm.createUser = (data) => {
    $location.path('/projects');
    console.log("This is the createUser function in the controller, here is the data: " + data.userName);
    UserService.createUser(data);
    vm.getUser();
  }
});

taskverse.service('ProjectService', function($http){
  let service = {};
  let currentProject = {};
  let projects = [];

  service.createProject = (data) => {
    currentProject = data;
    projects.push(data);
    return currentProject;
  };

  service.getCurrentProject = (callback) => {
    callback(currentProject);
    return currentProject;
  };

  return service;
});

taskverse.controller('ProjectsController', function($location, ProjectService){
  let vm = this;
  vm.getCurrentProject = () => {
    ProjectService.getCurrentProject((data) => {
      vm.currentProject = data;
    });
  };

  vm.createProject = (data) => {
    ProjectService.createProject(data);
    vm.getCurrentProject();
  };

});
