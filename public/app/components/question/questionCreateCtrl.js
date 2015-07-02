(function() {
  'use strict';

  angular
    .module('questionCtrl', [])
    .controller('questionCreateController', questionCreateController);

    questionCreateController.$inject = ['Auth', 'Question', '$routeParams', '$rootScope', 'Box'];

    function questionCreateController(Auth, Question, $routeParams, $rootScope, Box) {
      var vm = this;
      vm.questionData = {};
      vm.questionData.box_id = $routeParams.box_id;

      Auth.getUser()
        .success(function(data) {
          vm.questionData.creator = data.username;
        });

      Box.getById($routeParams.box_id)
        .success(function(data) {
          vm.questionData.box_title = data.title;
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
    }

})();
