angular.module('questionService', [])
.factory('Question', function($http) {
  var questionFactory = {};

  questionFactory.create = function(question) {
    return $http.post('/api/question', question);
  };

  questionFactory.getForBox = function(box_id) {
    return $http.get('/api/questions/' + box_id);
  };

  questionFactory.vote = function(question_id, voteData) {
    return $http.put('/api/question/' + question_id, voteData);
  };

  return questionFactory;
});
