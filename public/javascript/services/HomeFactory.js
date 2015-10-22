(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);


	function HomeFactory($http, $q) {
		var o = {};
		o.addMovie = function(newMovie){
			var q = $q.defer();
			$http.post('/api/movies', newMovie ).then(function(res){
				q.resolve(res.data);
				console.log(res.data);
			});
			return q.promise;
		};

		o.showMovies = function(){
			var q = $q.defer();
			console.log('getting here');
			$http.get('/api/movies').then(function(res){
			q.resolve(res.data);
			});
			return q.promise;
		};
		var editedmovie = {};



		o.EditMovie = function(id){
			console.log(id);
			var q= $q.defer();
			$http.put('/api/movies', id).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};


		return o;
	}
})();
