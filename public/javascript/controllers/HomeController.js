(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);


	function HomeController(HomeFactory) {
		var vm = this;
		// vm.title = 'Welcome to our App!';
		vm.movie = {};
		vm.editedmovie = {};


		vm.custom = true;
		vm.toggleCustom = function(){
			vm.custom = vm.custom ===false ? true:false;
		};


		vm.getMovies = function(){
			HomeFactory.showMovies().then(function(res){
				vm.movie = res;
				console.log(res);
			});
		};
		vm.getMovies();

		vm.editMovie = function(movieId){
			console.log(movieId);
			console.log(vm.editedmovie);
			HomeFactory.EditMovie({IDofMovieToEdit: movieId, editedmovie: vm.editedmovie}).then(function(res){
				console.log('Made it back');
				vm.MovieEditted = null;
				vm.showEdit = false;

				HomeFactory.showMovies().then(function(res){
					vm.movie = res;
				});
			});

		};


	}
})();
