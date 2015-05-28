(function() {
  'use strict';

  angular
    .module('boxCtrl')
    .controller('boxShowController', boxShowController);

    boxShowController.$inject = ['Box', 'Question', 'Auth', '$routeParams', '$scope'];

    function boxShowController(Box, Question, Auth, $routeParams, $scope) {
      var vm = this;
      var user_votes;
      vm.box = {};
      vm.box.questions = [];

      /* TO DO - Fix these three calls */
      Auth.getUser()
        .success(function(data) {
          vm.currentUser = data;
        });

      Box.getById($routeParams.box_id)
        .success(function(data) {
          vm.box = data;
        });

      Question.getForBox($routeParams.box_id)
        .success(function(data) {
          vm.box.questions = data;
          user_votes = getUserVotes(vm.box.questions);
        });

      vm.isUpvoted = function(id) {
        if (user_votes[id] === "upvote") { return true; }
      };

      vm.isDownvoted = function(id) {
        if (user_votes[id] === "downvote") { return true; }
      };

      function getUserVotes(voteData) {
        var questions = {};
        for (var i=0; i < voteData.length; i++) {
          var id = voteData[i]._id;
          voteData[i].voters.map(function(vote) {
            if (vote.voter == vm.currentUser.username) {
              if (vote.upvote === true) { questions[id] = "upvote"; }
              if (vote.downvote === true) { questions[id] = "downvote"; }
            }
          });
        }
        return questions;
      }

      $scope.$on('new-question-created', function(event, newQuestion) {
        vm.box.questions.push(newQuestion);
      });

      $scope.$on('vote-updated', function(event, newVote) {
        user_votes[newVote.id] = newVote.vote;
        vm.box.questions.filter(function(question) {
          if (question._id === newVote.id) {
            newVote.vote === "upvote" ? question.votes++ : question.votes--;
          }
        });
      });
    }

})();
