(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider
			.state('Landing',{
			url: '/',
			templateUrl: 'views/LandingPage.html'
		}).state('Home',{
			url: '/home',
			templateUrl: 'views/Home.html'
		}).state('AddMovie',{
				url: '/add',
				templateUrl: 'views/AddMovie.html'
		}).state('Login',{
				url: '/login',
				templateUrl: 'views/Login_Register.html',
				controller: 'GlobalController',
				controllerAs: 'vm'
		}).state('EditMovie',{
				url: '/edit/:id',
				templateUrl: 'views/editMovie.html',
				controller: 'HomeController',
				controllerAs: 'vm'
		}).state('Comments',{
				url: '/comments/:id',
				templateUrl: 'views/Comments.html',
				controller: 'HomeController',
				controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push('AuthInterceptor');
	}
})();
// npm install --save-dev gulp gulp-uglify gulp-concat gulp-beautify gulp-ng-annotate
//
//
//
//
