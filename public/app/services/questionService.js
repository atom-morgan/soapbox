angular.module('questionService', [])
.factory('Question', function($http) {
  var questionFactory = {};

  questionFactory.create = function(question) {
    return $http.post('/api/question', question);
  };

  return questionFactory;
});
