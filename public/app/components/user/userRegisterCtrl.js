(function() {
  'use strict';

  angular
    .module('userCtrl')
    .controller('userRegisterController', userRegisterController);

    userRegisterController.$inject = ['User', 'Auth', '$location'];

    function userRegisterController(User, Auth, $location) {
      var vm = this;

      vm.registerUser = function() {
        vm.processing = true;

        User.create(vm.userData)
          .success(function(user) {
            Auth.login(vm.userData.username, vm.userData.password)
              .success(function(data) {
                vm.processing = false;
                if (data.success) {
                  $location.path('/u/' + vm.userData.username);
                }
              });
          }); 
      };
    }

})();
