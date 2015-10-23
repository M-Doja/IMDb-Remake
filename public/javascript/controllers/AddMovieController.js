(function(){
    "use strict";
    angular.module('app')
    .controller("AddMovieController", AddMovieController);
    function AddMovieController(HomeFactory, $state){
      var vm = this;
      vm.movie = {};

      vm.PostMovie = function(){
        console.log('checking in');
        HomeFactory.addMovie(vm.movie).then(function(){
          $state.go('Home');
        });
      };



 }
})();
