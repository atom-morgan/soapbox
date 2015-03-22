angular.module('boxService', [])
.factory('Box', function($http) {
  var boxFactory = {};

  boxFactory.getByUsername = function(username) {
    return $http.get('/api/users/' + username + '/box/'); 
  };

  boxFactory.create = function(boxData) {
    return $http.post('/api/box', boxData); 
  };

  return boxFactory;
});
