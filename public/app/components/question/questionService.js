angular.module('questionService', [])
.factory('Question', function($http) {
  var questionFactory = {};

  questionFactory.create = function(question) {
    return $http.post('/api/question', question);
  };

  questionFactory.getForBox = function(box_id) {
    return $http.get('/api/questions/' + box_id);
  };

  questionFactory.getByUsername = function(username) {
    return $http.get('/api/questions/u/' + username);
  };

  questionFactory.vote = function(question_id, voteData) {
    return $http.put('/api/question/' + question_id, voteData);
  };

  return questionFactory;
});
