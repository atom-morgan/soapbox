(function() {
  'use strict';

  angular
    .module('userCtrl')
    .controller('userCreateController', userCreateController);

    userCreateController.$inject = ['User'];

    function userCreateController(User) {
      var vm = this;

      //variable to hide/show elements of the view
      //differentiates between create or edit pages
      vm.type = 'create';

      vm.saveUser = function() {
        vm.processing = true;

        vm.message = '';

        User.create(vm.userData)
          .success(function(data) {
            vm.processing = false;

            vm.userData = {};
            vm.message = data.message;
          });
      };
    }

})();
