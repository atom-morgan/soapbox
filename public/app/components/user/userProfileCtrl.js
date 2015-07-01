(function() {
  'use strict';

  angular
    .module('userCtrl')
    .controller('userProfileController', userProfileController);

    userProfileController.$inject = ['$routeParams', 'User', 'Auth'];

    function userProfileController($routeParams, User, Auth) {
      var vm = this;

      User.getByUsername($routeParams.username)
        .success(function(data) {
          vm.userData = data; 
          vm.userData.stats = {};
        });

      User.getBoxCount($routeParams.username)
        .success(function(data) {
          vm.userData.stats.boxes = data;
        });

      User.getQuestionCount($routeParams.username)
        .success(function(data) {
          vm.userData.stats.questions = data;
        });

      User.getUpvoteCount($routeParams.username)
        .success(function(data) {
          vm.userData.stats.upvotes = data;
        });

      Auth.getUser()
        .success(function(data){
          if (data.username === $routeParams.username) {
            vm.isCurrentUser = true;
          }
        });

    }
    
})();
