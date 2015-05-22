(function() {
  'use strict';

  angular
    .module('userCtrl')
    .controller('userEditController', userEditController);

    userEditController.$inject = ['$routeParams', 'User'];

    function userEditController($routeParams, User) {
      var vm = this;

      vm.type = 'edit';

      //get user data for the user to edit
      //grab id from url via $routeParams
      User.get($routeParams.user_id)
        .success(function(data) {
          vm.userData = data;
        });

      vm.saveUser = function() {
        vm.processing = true;
        vm.message = '';

        User.update($routeParams.user_id, vm.userData)
          .success(function(data) {
            vm.processing = false;

            vm.userData = {};

            vm.message = data.message;
          });
      };
    }

})();
