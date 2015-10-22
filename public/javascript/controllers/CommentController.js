(function(){
    "use strict";
    angular.module('app')
    .controller("CommentController", CommentController);
    function CommentController($state, UserFactory){
      var commment = '';
      var vm = this;

      vm.commentPost = function(){
        comment = 
        console.log('1st stop');
        HomeFactory.comPost(comment).then(function(){
          $state.go('Home');
        });
      };




    }
  })();
