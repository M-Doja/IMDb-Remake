(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('Landing',{
			url: '/',
			templateUrl: 'views/LandingPage.html'
		}).state('Home',{
			url: '/home',
			templateUrl: 'views/home.html'
		}).state('AddMovie',{
				url: '/add',
				templateUrl: 'views/AddMovie.html'
		}).state('Login',{
				url: '/login',
				templateUrl: 'views/movieLogin.html',
				controller: 'UserController',
				controllerAs: 'vm'
		}).state('Register',{
				url: '/register',
				templateUrl: 'views/register.html',
				controller: 'UserController',
				controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();