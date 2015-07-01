angular.module('userService', [])
.factory('User', function($http) {
  var userFactory = {};

  userFactory.get = function(id) {
    return $http.get('/api/users/' + id); 
  };

  userFactory.getByUsername = function(username) {
    return $http.get('/api/u/' + username); 
  };

  userFactory.all = function() {
    return $http.get('/api/users/'); 
  };

  userFactory.create = function(userData) {
    return $http.post('/api/users/', userData); 
  };

  userFactory.update = function(id, userData) {
    return $http.put('/api/users/' + id, userData); 
  };

  userFactory.delete = function(id) {
    return $http.delete('/api/users/' + id); 
  };

  userFactory.getBoxCount = function(username) {
    return $http.get('/api/users/' + username + '/stats/boxes');
  };

  userFactory.getQuestionCount = function(username) {
    return $http.get('/api/users/' + username + '/stats/questions');
  };

  userFactory.getUpvoteCount = function(username) {
    return $http.get('/api/users/' + username + '/stats/upvotes');
  };

  return userFactory;
  
});
