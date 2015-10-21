(function() {
  "use strict";
  angular.module('app')
  .controller('GlobalController', GlobalController);
  function GlobalController(HomeFactory, $state) {
    var vm = this;
    vm.user = {};
    vm.nav = true;

    vm.showNav = function(){
      console.log('hey!');
      vm.nav = false;
    };

  //   vm.status = UserFactory.status;
  //
  //   vm.registerUser = function() {
  //     UserFactory.registerUser(vm.user).then(function() {
  //       $state.go('Home');
  //     });
  //   };
  //
  //   vm.loginUser = function() {
  //     console.log("First Stop on Data flow journey");
  //     UserFactory.loginUser(vm.user).then(function() {
  //       $state.go('Home');
  //     });
  //   };
  //
  //   vm.logout = function() {
  //     UserFactory.logout();
  //     $state.go('Login');
  //   };
  }
})();
