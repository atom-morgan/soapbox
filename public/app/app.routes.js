angular.module('app.routes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html' 
    })

    .when('/login', {
      templateUrl: 'app/views/pages/login.html',
      controller: 'authController',
      controllerAs: 'auth'
    })

    .when('/register', {
      templateUrl: 'app/views/pages/register.html',
      controller: 'userRegisterController',
      controllerAs: 'register' 
    })

    .when('/u/:username', {
      templateUrl: 'app/views/pages/user/profile.html',
      controller: 'userProfileController',
      controllerAs: 'currentUser',
      resolve: {
        userData: function(User, $route) {
          return User.getByUsername($route.current.params.username).then(function(user) {
            return user.data;
          });
        },
        boxCount: function(User, $route) {
          return User.getBoxCount($route.current.params.username).then(function(boxes) {
            return boxes.data;
          });
        },
        questionCount: function(User, $route) {
          return User.getQuestionCount($route.current.params.username).then(function(questions) {
            return questions.data;
          });
        },
        voteCount: function(User, $route) {
          return User.getUpvoteCount($route.current.params.username).then(function(votes) {
            return votes.data;
          });
        }
      }
    })

    .when('/users', {
      templateUrl: 'app/views/pages/users/all.html',
      controller: 'usersController',
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
      controllerAs: 'showBox',
      resolve: {
        currentUser: function(Auth) {
          return Auth.getUser().then(function(user) {
            return user.data;
          });
        },
        boxData: function(Box, $route) {
          return Box.getById($route.current.params.box_id).then(function(box) {
            return box.data;
          });
        },
        questionData: function(Question, $route) {
          return Question.getForBox($route.current.params.box_id).then(function(question) {
            return question.data;
          });
        },
      }
    });

  $locationProvider.html5Mode(true);
});
