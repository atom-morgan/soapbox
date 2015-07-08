angular.module('voteService', [])
.factory('Vote', function($http) {
  var voteFactory = {};

  voteFactory.vote = function(question_id, voteData) {
    return $http.put('/api/vote/' + question_id, voteData);
  };

  return voteFactory;
});
