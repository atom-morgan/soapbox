angular.module('boxService', [])
.factory('Box', function($http) {
  var boxFactory = {};

  boxFactory.getByUsername = function(username) {
    return $http.get('/api/users/' + username + '/box/'); 
  };

  boxFactory.create = function(boxData) {
    return $http.post('/api/box', boxData);
  };

  boxFactory.getById = function(id) {
    return $http.get('/api/box/' + id);
  };

  boxFactory.update = function(id, boxData) {
    return $http.put('/api/box/' + id, boxData);
  };

  boxFactory.delete = function(box) {
    return $http.delete('/api/box/' + box);
  };

  return boxFactory;
});
