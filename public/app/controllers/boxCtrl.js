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

})

.controller('boxController', function(Auth, Box, $scope, $modal) {
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

  vm.editBox = function(box) {
    vm.type == 'edit';
    var modalInstance = $modal.open({
      templateUrl: 'app/views/pages/boxes/new.html',
      controller: 'boxEditController',
      controllerAs: 'box',
      resolve: {
        boxData: function() {
          return vm.boxes[box];
        },
        formType: function() {
          return 'edit';
        }
      }
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

.controller('boxCreateController', function(Box, $modalInstance, currentUser, formType, $rootScope) {
  var vm = this;
  vm.boxData = {};
  vm.boxData.creator = currentUser.username;
  vm.type = formType;

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

.controller('boxEditController', function(Box, $modalInstance, boxData, formType, $rootScope) {
  var vm = this;
  vm.boxData = boxData;
  vm.type = formType;

  vm.createBox = function() {
    Box.update(vm.boxData._id, vm.boxData)
      .success(function(data) {
        $rootScope.$broadcast('new-box-created', vm.boxData);
        $modalInstance.close();
      });
  };

  vm.closeModal = function() {
    $modalInstance.dismiss('cancel');
  };
})

.controller('boxShowController', function(Box, Question, $routeParams, $scope) {
  var vm = this;
  vm.box = {};
  vm.box.questions = [];

  /* TO DO - Fix these two calls */
  Box.getById($routeParams.box_id)
    .success(function(data) {
      vm.box = data;
    });

  Question.getForBox($routeParams.box_id)
    .success(function(data) {
      vm.box.questions = data;
    });

  $scope.$on('new-question-created', function(event, newQuestion) {
    vm.box.questions.push(newQuestion);
  });
});
