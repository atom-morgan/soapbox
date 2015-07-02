(function() {
  'use strict';

  angular
    .module('boxCtrl', ['ui.bootstrap'])
    .controller('userBoxesController', userBoxesController);

    userBoxesController.$inject = ['Auth', 'Box', '$scope', '$routeParams', '$modal', 'Question'];

    function userBoxesController(Auth, Box, $scope, $routeParams, $modal, Question) {
      var vm = this;
      vm.selectedTab = 'boxes';

      vm.processing = true;

      vm.getSelectedTabClass = function(tab) {
        return vm.selectedTab === tab ? 'active' : '';
      };

      vm.changeSelectedTab = function() {
        if (vm.selectedTab === 'boxes') {
          vm.selectedTab = 'questions';
        } else {
          vm.selectedTab = 'boxes';
        }
        console.log('CHANGED TO ' + vm.selectedTab);
      };

      Box.getByUsername($routeParams.username)
        .success(function(data) {
          vm.processing = false;
          vm.boxes = data;
        });

      Question.getByUsername($routeParams.username)
        .success(function(data) {
          vm.processing = false;
          vm.questions = data;
        });

      vm.deleteBox = function(box) {
        Box.delete(vm.boxes[box]._id)
          .success(function(data) {
            //update this to remove the one box from local scope (vm.boxes)
            updateBoxes();
          });
      };

      vm.editBox = function(box) {
        vm.type = 'edit';
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

        Auth.getUser()
          .success(function(data) {
            vm.user = data;
            //update this to get the one newly created box
            Box.getByUsername(vm.user.username)
              .success(function(data) {
                vm.processing = false;
                vm.boxes = data;
              });
          });
      }

    }

})();
