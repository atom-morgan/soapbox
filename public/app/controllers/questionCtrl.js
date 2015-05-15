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

.controller('questionVoteController', function(Auth, Question, $rootScope) {
  var vm = this;
  vm.voteData = {};

  Auth.getUser()
    .success(function(data) {
      vm.currentUser = data;
    });

  vm.upvote = function(question) {
    var userHasVoted = hasUserVoted(question.voters, "upvote");
    if (!userHasVoted) {
      vm.voteData.voter = vm.currentUser.username;
      vm.voteData.upvote = true;
      vm.voteData.downvote = false;

      Question.vote(question._id, vm.voteData)
        .success(function(data) {
          console.log(data.message);
          var new_vote = initUpdatedVote(question._id, "upvote");
          $rootScope.$broadcast('vote-updated', new_vote);
        });
    }
  };

  vm.downvote = function(question) {
    var userHasVoted = hasUserVoted(question.voters, "downvote");
    if (!userHasVoted) {
      vm.voteData.voter = vm.currentUser.username;
      vm.voteData.upvote = false;
      vm.voteData.downvote = true;

      Question.vote(question._id, vm.voteData)
        .success(function(data) {
          console.log(data.message);
          var new_vote = initUpdatedVote(question._id, "downvote");
          $rootScope.$broadcast('vote-updated', new_vote);
        });
    }
  };

  function initUpdatedVote(question_id, vote) {
    var new_vote = {};
    new_vote.id = question_id;
    new_vote.vote = vote;
    return new_vote;
  }

  function hasUserVoted(votes, voteType) {
    var userVoteIndex = votes.map(function(vote) {
      return vote.voter;
    }).lastIndexOf(vm.currentUser.username);

    if (userVoteIndex !== -1) { return votes[userVoteIndex][voteType]; }
  }
});
