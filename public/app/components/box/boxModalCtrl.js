(function() {
  'use strict';

  angular
    .module('boxCtrl')
    .controller('boxModalController', boxModalController);

    boxModalController.$inject = ['$modal', 'Auth'];

    function boxModalController($modal, Auth) {
      var vm = this;

      Auth.getUser()
        .success(function(data) {
          vm.currentUser = data;
        });

      vm.open = function() {
        var modalInstance = $modal.open({
          templateUrl: 'app/views/pages/boxes/new.html',
          controller: 'boxCreateController',
          controllerAs: 'box',
          resolve: {
            currentUser: function() {
              return vm.currentUser;
            },
            formType: function() {
              return 'create';
            }
          }
        });
      };
    }

})();
