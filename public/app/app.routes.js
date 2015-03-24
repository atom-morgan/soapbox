angular.module('app.routes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html' 
    })

    .when('/login', {
      templateUrl: 'app/views/pages/login.html',
      controller: 'mainController',
      controllerAs: 'login'
    })

    .when('/register', {
      templateUrl: 'app/views/pages/register.html',
      controller: 'userRegisterController',
      controllerAs: 'register' 
    })

    .when('/u/:username', {
      templateUrl: 'app/views/pages/user/profile.html',
      controller: 'userProfileController',
      controllerAs: 'currentUser' 
    })

    .when('/users', {
      templateUrl: 'app/views/pages/users/all.html',
      controller: 'userController',
      controllerAs: 'user'
    })

    .when('/users/create', {
      templateUrl: 'app/views/pages/users/single.html',
      controller: 'userCreateController',
      controllerAs: 'user'
    })

    .when('/users/:user_id', {
      templateUrl: 'app/views/pages/users/single.html',
      controller: 'userEditController',
      controllerAs: 'user'
    })

    .when('/box/:box_id', {
      templateUrl: 'app/views/pages/boxes/show.html',
      controller: 'boxShowController',
      controllerAs: 'showBox'
    });

  $locationProvider.html5Mode(true);
});
