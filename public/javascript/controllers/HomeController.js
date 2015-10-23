(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);
	function HomeController(HomeFactory) {
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

			vm.getCopy = function(movie){
				return angular.copy(movie);
			};

			vm.editMovie = function(movieId){
				//Pass post ID and editted post info as one object to HomeFactory edit function
				HomeFactory.EditMovie({IDofMovieToEdit: movieId, edittedMovie: vm.edittedMovie}).then(function(res){
					console.log('Made it back');
					vm.edittedMovie = null;
					HomeFactory.showMovies().then(function(res){
						vm.movies = res;
					});
				});
			};
	}
})();
