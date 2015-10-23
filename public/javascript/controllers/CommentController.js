(function(){
    "use strict";
    angular.module('app')
    .controller("CommentController", CommentController);
    function CommentController($state, $stateParams, HomeFactory){
      var vm = this;
      vm.commment = {};

      if ($stateParams.id){
        HomeFactory.getMoviesById($stateParams.id).then(function(res){
          vm.movie = res;
      });
    }
      vm.addComment = function(){
        HomeFactory.createComment(vm.comment, $stateParams.id).then(function(res){
          vm.movie = res;
        });
      };
    }
  })();
