(function(){
    "use strict";
    angular.module('app')
    .controller("AddMovieController", AddMovieController);
    function AddMovieController(HomeFactory, $state){
      var vm = this;
      vm.movie = {};

console.log("we are in addmoviectrl")
      vm.PostMovie = function(){
        console.log("we are in addmoviectrl11");
        HomeFactory.PostMovie(vm.movie).then(function(){
          $state.go('Home');
        });
      };

      vm.testButton = function(){
        console.log("our test is working!!!!!")
      }



 }
})();
