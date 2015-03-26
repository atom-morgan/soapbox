angular.module('questionCtrl', [])
.controller('questionCreateController', function(Auth, Question, $routeParams, $rootScope) {
  var vm = this;
  vm.questionData = {};
  vm.questionData.box_id = $routeParams.box_id;

  Auth.getUser()
    .success(function(data) {
      vm.questionData.creator = data.username;
    });

  vm.createQuestion = function() {
    vm.processing = true;
    Question.create(vm.questionData)
      .success(function(data) {
        vm.processing = false;
        $rootScope.$broadcast('new-question-created', data.question);
        vm.questionData.content = '';
      });
  };
});
