angular.module('eventCtrl', ['ui.bootstrap'])
.controller('eventCreateController', function($modal) {
  var vm = this;

  vm.open = function() {
    vm.modalInstance = $modal.open({
      templateUrl: 'app/views/pages/event/new.html',
      controller: 'eventCreateController',
      controllerAs: 'event'
    });
  };

  //vm.close = function() {
    //console.log('in close');
    //vm.modalInstance.dismiss('cancel'); 
  //};

});
