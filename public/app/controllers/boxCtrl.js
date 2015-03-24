angular.module('boxCtrl', ['ui.bootstrap'])
.controller('boxModalController', function($modal, Auth) {
  var vm = this;

  Auth.getUser()
    .success(function(data) {
      vm.currentUser = data;
    });

  vm.open = function() {
    var modalInstance = $modal.open({
      templateUrl: 'app/views/pages/boxes/new.html',
      controller: 'boxCreateController',
      controllerAs: 'newBox',
      resolve: {
        currentUser: function() {
          return vm.currentUser;
        }
      }
    });
  };

})

.controller('boxController', function(Auth, Box, $scope) {
  var vm = this;

  vm.processing = true;

  Auth.getUser()
    .success(function(data) {
      vm.user = data;
      Box.getByUsername(vm.user.username)
        .success(function(data) {
          vm.processing = false;
          vm.boxes = data; 
        });
    });

  vm.deleteBox = function(box) {
    Box.delete(vm.boxes[box]._id)
      .success(function(data) {
        //update this to remove the one box from local scope (vm.boxes)
        updateBoxes();
      });
  };

  $scope.$on('new-box-created', function(event, msg) {
    console.log('msg is ' + JSON.stringify(msg, null, ' '));
    updateBoxes();
  });

  function updateBoxes() {
    vm.processing = true;
    //update this to get the one newly created box
    Box.getByUsername(vm.user.username)
      .success(function(data) {
        vm.processing = false;
        vm.boxes = data;
      });
  };

})

.controller('boxCreateController', function(Box, $modalInstance, currentUser, $rootScope) {
  var vm = this;
  vm.boxData = {};
  vm.boxData.creator = currentUser.username;

  vm.createBox = function() {
    Box.create(vm.boxData)
      .success(function(data) {
        $rootScope.$broadcast('new-box-created', vm.boxData);
        $modalInstance.close();
      });
  };

  vm.closeModal = function() {
    $modalInstance.dismiss('cancel');
  };

})

.controller('boxShowController', function(Box, $routeParams) {
  var vm = this;

  Box.getById($routeParams.box_id)
    .success(function(data) {
      vm.box = data;
    });
});
