(function() {
  'use strict';

  angular
    .module('boxCtrl')
    .controller('boxEditController', boxEditController);

    boxEditController.$inject = ['Box', '$modalInstance', 'boxData', 'formType', '$rootScope'];

    function boxEditController(Box, $modalInstance, boxData, formType, $rootScope) {
      var vm = this;
      vm.boxData = boxData;
      vm.type = formType;

      vm.createBox = function() {
        Box.update(vm.boxData._id, vm.boxData)
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
