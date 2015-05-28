(function() {
  'use strict';

  angular
    .module('userCtrl')
    .controller('userProfileController', userProfileController);

    userProfileController.$inject = ['$routeParams', 'User'];

    function userProfileController($routeParams, User) {
      var vm = this;

      User.getByUsername($routeParams.username)
        .success(function(data) {
          vm.userData = data; 
        });
    }
    
})();
