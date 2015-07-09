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

  questionFactory.update = function(question_id, questionData) {
    return $http.put('/api/question/' + question_id, questionData);
  };

  questionFactory.delete = function(question_id, question) {
    //Config to pass a body with a DELETE request
    var config = {
      method: "DELETE",
      url: '/api/question/' + question_id,
      data: question,
      headers: {"Content-Type": "application/json;charset=utf-8"}
    };
    return $http(config);
  };

  return questionFactory;
});
