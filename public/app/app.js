angular.module('userApp', [
  'ngAnimate',
  'app.routes',
  'authService',
  'mainCtrl',
  'userCtrl',
  'userService'  
])

.config(function($httpProvider) {
  //attach auth interceptor to http requests
  $httpProvider.interceptors.push('AuthInterceptor');
});
