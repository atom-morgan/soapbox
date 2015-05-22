(function() {
  'use strict';

  angular
    .module('boxCtrl')
    .controller('boxCreateController', boxCreateController);

    boxCreateController.$inject = ['Box', '$modalInstance', 'currentUser', 'formType', '$rootScope'];

    function boxCreateController(Box, $modalInstance, currentUser, formType, $rootScope) {
      var vm = this;
      vm.boxData = {};
      vm.boxData.creator = currentUser.username;
      vm.type = formType;

      vm.createBox = function() {
        Box.create(vm.boxData)
          .success(function(data) {
            $rootScope.$broadcast('new-box-created', vm.boxData);
            $modalInstance.close();
          });
      };

      vm.closeModal = function() {
        $modalInstance.dismiss('cancel');
      };
    }

})();
