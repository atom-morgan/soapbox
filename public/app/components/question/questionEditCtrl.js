(function() {
  'use strict';

  angular
    .module('questionCtrl')
    .controller('questionEditController', questionEditController);

    questionEditController.$inject = ['Question', '$modalInstance', 'questionData', 'formType', '$rootScope'];

    function questionEditController(Question, $modalInstance, questionData, formType, $rootScope) {
      var vm = this;
      vm.questionData = questionData;
      vm.type = formType;

      vm.createQuestion = function() {
        Question.update(vm.questionData._id, vm.questionData)
          .success(function(data) {
            $modalInstance.close();
          });
      };

      vm.closeModal = function() {
        $modalInstance.dismiss('cancel'); 
      };
    }
})();
