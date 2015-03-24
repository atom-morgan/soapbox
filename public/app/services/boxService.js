angular.module('boxService', [])
.factory('Box', function($http) {
  var boxFactory = {};

  boxFactory.getByUsername = function(username) {
    return $http.get('/api/users/' + username + '/box/'); 
  };

  boxFactory.getById = function(id) {
    return $http.get('/api/box/' + id);
  };

  boxFactory.create = function(boxData) {
    return $http.post('/api/box', boxData); 
  };

  boxFactory.delete = function(box) {
    return $http.delete('/api/box/' + box);
  };

  return boxFactory;
});
