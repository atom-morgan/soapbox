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
        .then(function(users) {
          vm.processing = false;
          vm.users = users.data;
        });

      vm.deleteUser = function(id) {
        vm.processing = true;

        User.delete(id)
          .then(function() {
            //get an updated list of users
            User.all()
              .then(function(users) {
                vm.processing = false;
                vm.users = users.data;
              });
          });
      };
    }

})();
