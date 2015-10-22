(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);


	function HomeFactory($http, $q) {
		var o = {};
		var editedmovie = {};




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
			$http.get('/api/movies').then(function(res){
			q.resolve(res.data);
			});
			return q.promise;
		};

		o.deleteMovie = function(id){
			var q = $q.defer();
			$http.delete('/api/movies/' + id).then(function(){
				q.resolve();
			});
			return q.promise;
		};

		o.EditMovie = function(id){
			var q= $q.defer();
			$http.put('/api/movies', id).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.getMoviesById = function(id){
			var q = $q.defer();
			$http.get('/api/movies/' + id).then(function(){
				q.resolve(res.data);
			});
			return q.promise;
		};

		o.createComment = function( comment, movieId){
			console.log(comment);
			var q = $q.defer();
			$http.post('/api/movies/' + movieId + '/comment', comment).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};



		return o;
	}
})();
