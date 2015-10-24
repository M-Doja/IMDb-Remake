(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);


	function HomeFactory($http, $q) {
		var o = {};
		var editedmovie = {};

		o.showMovies = function(){
			var q = $q.defer();
			$http.get('/api/movies').then(function(res){
			q.resolve(res.data);
			});
			return q.promise;
		};
		o.getMoviesById = function(id){
			var q = $q.defer();
			$http.get('/api/movies/' + id).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.createComment = function(comment, movieId){
			console.log(comment);
			console.log(movieId);
			var q = $q.defer();
			$http.post('/api/movies/' + movieId + '/comment', comment).then(function(res){
				q.resolve(comment);
				console.log("back from router");
				console.log(comment); // This is what we want
			});
			return q.promise;
		};
		o.comPost = function(comment){
			var q = $q.defer();
			$http.post('/api/user/comment', comment).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};
		o.EditMovie = function(id){
			var q= $q.defer();
			$http.put('/api/movies', id).then(function(res){
			console.log("at Factory");
				q.resolve(res.data);
			});
			o.showMovies();
			return q.promise;
		};
		o.deleteMovie = function(id){
			var q = $q.defer();
			$http.delete('/api/movies/' + id).then(function(){
				q.resolve();
			});
			return q.promise;
		};
		o.PostMovie = function(newMovie){
			var q = $q.defer();
			console.log('add movie');
			$http.post('/api/movies', newMovie ).then(function(res){
				q.resolve(res.data);
			});
			return q.promise;
		};
		return o;
	}
})();
