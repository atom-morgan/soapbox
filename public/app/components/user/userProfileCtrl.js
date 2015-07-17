(function() {
  'use strict';

  angular
    .module('userCtrl')
    .controller('userProfileController', userProfileController);

    userProfileController.$inject = ['$routeParams', 'User', 'Auth', 'userData', 'boxCount', 'questionCount', 'voteCount'];

    function userProfileController($routeParams, User, Auth, userData, boxCount, questionCount, voteCount) {
      var vm = this;

      initialize();

      Auth.getUser()
        .success(function(data){
          if (data.username === $routeParams.username) {
            vm.isCurrentUser = true;
          }
        });

      function initialize() {
        vm.userData = userData;
        vm.userData.stats = {};
        vm.userData.stats.boxes = boxCount;
        vm.userData.stats.questions = questionCount;
        vm.userData.stats.upvotes = voteCount;
      }

    }
    
})();
