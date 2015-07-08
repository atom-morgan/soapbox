(function() {
  'use strict';

  angular
    .module('questionCtrl')
    .controller('questionVoteController', questionVoteController);

    questionVoteController.$inject = ['Auth', 'Vote', '$rootScope'];

    function questionVoteController(Auth, Vote, $rootScope) {
      var vm = this;
      vm.voteData = {};

      Auth.getUser()
        .success(function(data) {
          vm.currentUser = data;
        });

      vm.addVote = function(question, vote) {
        var userHasVoted = hasUserVoted(question.voters, vote);
        if (!userHasVoted) {
          vm.voteData.voter = vm.currentUser.username;
          vote === "upvote" ? vm.voteData.upvote = true : vm.voteData.upvote = false;
          vote === "downvote" ? vm.voteData.downvote = true : vm.voteData.downvote = false;

          Vote.vote(question._id, vm.voteData)
            .success(function(data) {
              console.log(data.message);
              var new_vote = initUpdatedVote(question._id, vote);
              $rootScope.$broadcast('vote-updated', new_vote);
            });
        }
      }

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

    }

})();
