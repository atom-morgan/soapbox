(function() {
  'use strict';

  angular
    .module('boxCtrl')
    .controller('boxShowController', boxShowController);

    boxShowController.$inject = ['Box', 'Question', 'Auth', '$routeParams', '$scope', 'currentUser', 'boxData', 'questionData'];

    function boxShowController(Box, Question, Auth, $routeParams, $scope, currentUser, boxData, questionData) {
      var vm = this;
      var user_votes;
      vm.box = {};
      vm.box.questions = [];

      initialize();

      function initialize() {
        vm.currentUser = currentUser;
        vm.box = boxData;
        vm.box.questions = questionData;
        user_votes = getUserVotes(vm.box.questions);
      }

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

      vm.isUpvoted = function(id) {
        if (user_votes[id] === "upvote") { return true; }
      };

      vm.isDownvoted = function(id) {
        if (user_votes[id] === "downvote") { return true; }
      };

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
