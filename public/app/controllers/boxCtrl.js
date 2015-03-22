angular.module('boxCtrl', ['ui.bootstrap'])
.controller('boxCreateController', function($modal, Auth) {
  var vm = this;

  Auth.getUser()
    .success(function(data) {
      vm.users = data; 
    });

  vm.open = function() {
    vm.modalInstance = $modal.open({
      templateUrl: 'app/views/pages/boxes/new.html',
      controller: 'boxCreateController',
      controllerAs: 'box'
    });
  };

  //vm.close = function() {
    //console.log('in close');
    //vm.modalInstance.dismiss('cancel'); 
  //};

})

.controller('boxController', function(Auth, Box) {
  var vm = this;

  vm.processing = true;

  Auth.getUser()
    .success(function(data) {
      vm.users = data; 
      Box.getByUsername(vm.users.username)
        .success(function(data) {
          vm.processing = false;
          vm.boxes = data; 
        });
    });



});
