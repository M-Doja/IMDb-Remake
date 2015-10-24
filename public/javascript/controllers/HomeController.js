(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);
	function HomeController(HomeFactory, $state) {
		var vm = this;
		vm.edittedMovie = {};

		// vm.movie = {};
		// vm.comment = {};
		// vm.status = UserFactory.status;


		HomeFactory.showMovies().then(function(res){
				vm.movie = res;
			});

			vm.deleteMovie = function(m){
				HomeFactory.deleteMovie(m._id).then(function(){
					vm.movie.splice(vm.movie.indexOf(m),1);
				});
			};

			vm.getCopy = function(movie) {
					return angular.copy(movie);
			};

			vm.editMovie = function(movieId, movie){
				//Pass post ID and editted post info as one object to HomeFactory edit function
				HomeFactory.EditMovie({IDofMovieToEdit: movieId, edittedMovie: movie}).then(function(res){
					console.log(movie);
					console.log(movieId);
					console.log('Made it back');
					vm.edittedMovie = null;
					$state.reload();
					// HomeFactory.showMovies().then(function(res){
					// 	console.log(res);
					// 	vm.movies = res;
					// });
				});
			};
	}
})();
