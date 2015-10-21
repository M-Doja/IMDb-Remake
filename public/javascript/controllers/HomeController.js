(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);


	function HomeController(HomeFactory) {
		var vm = this;
		// vm.title = 'Welcome to our App!';
		vm.movie = {};

		vm.getMovies = function(){
			HomeFactory.showMovies().then(function(res){
				vm.movie = res;
				console.log(res);
			});
		};
		vm.getMovies();

	}
})();
