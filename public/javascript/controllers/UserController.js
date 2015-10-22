(function() {
	'use strict';
	angular.module('app')
	.controller('UserController', UserController);
function UserController(UserFactory, $state) {
  var vm = this;
		  vm.user = {};
	    vm.status = UserFactory.status;
			vm.nav = false;

	    vm.registerUser = function() {
				console.log('Hello World');
	      UserFactory.registerUser(vm.user).then(function() {
					vm.home = false;
	        $state.go('Home');
	      });
	    };

	    vm.loginUser = function() {
	      console.log("First Stop on Data flow journey");
	      UserFactory.loginUser(vm.user).then(function() {
	        $state.go('Home');
	      });
	    };

	    vm.logout = function() {
	      UserFactory.logout();
				// vm.home = true;
	      $state.go('Login');
	    };

			
}
})();
