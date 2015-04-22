angular.module('questionCtrl', [])
.controller('questionCreateController', function(Auth, Question, $routeParams, $rootScope) {
  var vm = this;
  vm.questionData = {};
  vm.questionData.box_id = $routeParams.box_id;

  Auth.getUser()
    .success(function(data) {
      vm.questionData.creator = data.username;
    });

  vm.createQuestion = function() {
    vm.processing = true;
    Question.create(vm.questionData)
      .success(function(data) {
        vm.processing = false;
        $rootScope.$broadcast('new-question-created', data.question);
        vm.questionData.content = '';
      });
  };
})

.controller('questionVoteController', function(Auth, Question) {
  var vm = this;
  vm.voteData = {};

  Auth.getUser()
    .success(function(data) {
      vm.currentUser = data;
    });

  vm.upvote = function(question) {
    vm.voteData.voter = vm.currentUser.username;
    vm.voteData.upvote = true;
    vm.voteData.downvote = false;
    Question.vote(question._id, vm.voteData)
      .success(function(data) {
        console.log(data.message);
      });
  };

  vm.downvote = function(question) {
    vm.voteData.voter = vm.currentUser.username;
    vm.voteData.upvote = false;
    vm.voteData.downvote = true;
    Question.vote(question._id, vm.voteData)
      .success(function(data) {
        console.log(data.message);
      });
  };
});
