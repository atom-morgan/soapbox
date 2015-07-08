angular.module('userApp', [
  'ngAnimate',
  'app.routes',
  'authService',
  'userService',
  'boxService',
  'questionService',
  'voteService',
  'authCtrl',
  'userCtrl',
  'boxCtrl',
  'questionCtrl',
  'ui.bootstrap'
])

.config(function($httpProvider) {
  //attach auth interceptor to http requests
  $httpProvider.interceptors.push('AuthInterceptor');
});
