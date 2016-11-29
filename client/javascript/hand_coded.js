let taskverse = angular.module('taskverse', ['ngRoute']);

taskverse.config(($routeProvider) => {
  $routeProvider
  .when('/create_user', {
    templateUrl: 'partials/new_user.html',
    controller: 'UsersController'
  })
  .when('/projects', {
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsController'
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
  })
  // .when('/index', {
  //   templateUrl: '/',
  //   controller: 'UsersController'
  // })
});

taskverse.service('UserService', function($http){
  let service = {};
  let currentUser = {};;


  service.loginUser = (data, callback) => {
    console.log("Data before it goes into the database: " + data.userName);
    $http.post('/login_user', data).then((data) => {
    console.log("This is the new user function, here is the data: " + data.data.userName);
    currentUser = data.data;
    callback(currentUser);
    return currentUser;
  });
  };

  service.createUser = (data, callback) => {
    console.log(data);
    $http.post('/create_user', data).then((data) => {
    console.log("This is the create user function, here is the data: " + data.data.userName);
    currentUser = data.data;
    callback(currentUser);
    return currentUser;
  });
  };

  service.returnUser = (callback) => {
    callback(currentUser);
    return currentUser;
  };


  return service;
});

taskverse.controller('UsersController', function($route, $location, UserService){
  let vm = this;


  vm.loginBool = false;
  vm.hideViewPort = true;
  console.log(location.hash);

  vm.getUser = () => {
    UserService.returnUser((data) => {
      vm.currentUser = data;
    });
  };

  vm.removeLogin = () => {
    vm.loginBool = true;
    if(location.hash == '#/create_user') {
    vm.hideViewPort = false;
  } else {
    vm.hideViewPort = true;
  }
  };

  vm.loginUser = (data) => {
    $location.path('/assigned_tasks');
    console.log("This is the loginUser function in the controller, here is the data: " + data.userName);
    UserService.loginUser(data, (incoming) => {
      vm.currentUser = incoming;
      console.log(vm.currentUser);
    });
    vm.potUser = {};
  };

  vm.createUser = (data) => {
    $location.path('/projects');
    console.log("This is the createUser function in the controller, here is the data: " + data.userName);
    UserService.createUser(data, (incoming) => {
      vm.currentUser = incoming;
    });
    // vm.getUser();
    vm.newUser = {};
  }
});

taskverse.service('ProjectService', function($http){
  let service = {};
  let currentProject = {};
  let projects = [];

  service.retrieveProjects = (callback) => {
    $http.get('/projects').then((data) => {
      projects = data.data;
      console.log(projects);
      callback(projects);
      return projects;
    });
  };

  service.createProject = (data) => {
    console.log(data.name + " made it to the createProject function in the service.");
    $http.post('/create_project', data).then((data) => {
    currentProject = data;
    return currentProject;
    });
  };

  service.getCurrentProject = (callback) => {
    callback(currentProject);
    return currentProject;
  };

  service.getProjects = (callback) => {
    callback(projects);
    return projects;
  };

  return service;
});

taskverse.controller('ProjectsController', function($location, ProjectService){
  let vm = this;

  vm.pullProjectsFromDb = () => {
  ProjectService.retrieveProjects((data) => {
    vm.projectList = data;
  });
};

  vm.getProjects = () => {
  ProjectService.getProjects((data) => {
    vm.projectList = data;
    vm.pullProjectsFromDb();
  });
  };

  vm.getProjects();

  vm.getCurrentProject = () => {
    ProjectService.getCurrentProject((data) => {
      vm.currentProject = data;
    });
  };

  vm.createProject = (data) => {
    console.log(data.name + " made it to the createProject function in the controller.");
    ProjectService.createProject(data);
    vm.getCurrentProject();
    vm.getProjects();
    vm.newProject = {};
  };

});
