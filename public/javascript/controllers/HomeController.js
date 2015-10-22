(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);


	function HomeController(HomeFactory, $stateParams) {
		var vm = this;
		// vm.title = 'Welcome to our App!';
		vm.movie = {};
		vm.editedmovie = {};
		vm.comment = {};

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

		vm.custom = true;
		vm.toggleCustom = function(){
			vm.custom = vm.custom === false ? true:false;
		};


		vm.getMovies = function(){
			HomeFactory.showMovies().then(function(res){
				vm.movie = res;
				console.log(res);
			});
		};
		vm.getMovies();
		vm.deleteMovie = function(m){
			HomeFactory.deleteMovie(m._id).then(function(){
				vm.movie.splice(vm.movie.indexOf(m),1);
			});
		};


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
