(function() {
  'use strict';

  angular
    .module('userCtrl', [])
    .controller('usersController', usersController);

    usersController.$inject = ['User'];

    function usersController(User) {
      var vm = this;
      
      vm.processing = true;

      User.all()
        .success(function(data) {
          vm.processing = false;

          vm.users = data;
        });

      vm.deleteUser = function(id) {
        vm.processing = true;

        User.delete(id)
          .success(function(data) {

            //get an updated list of users
            User.all()
              .success(function(data) {
                vm.processing = false;
                vm.users = data;
              });
          });
      };
    }

})();
