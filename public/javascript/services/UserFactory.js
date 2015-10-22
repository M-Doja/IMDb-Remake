(function() {
  "use strict";
  angular.module('app')
  .factory('UserFactory', UserFactory);
  function UserFactory($http, $q) {
    var o = {};
    o.status = {};

    o.registerUser = function(user) {
        console.log(user);
      var q = $q.defer();
      $http.post('/api/user/register', user).then(function(res) {
        o.setToken(res.data);
        setUser();
        // var user = o.getUser();
        // o.status.username = user.username;
        // o.status._id = user._id;
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.loginUser = function(user) {
      console.log("Second stop of DF journey");
      var q = $q.defer();
      $http.post('/api/user/login', user).then(function(res) {
        console.log("Fifth stop");
        setToken(res.data); //puts the token on localStorage
        setUser();
        // var user = o.getUser();
        // o.status.username = user.username;
        // o.status._id = user._id;
        q.resolve(res.data);
      });
      return q.promise;
    };
    function setUser(){
      var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
      o.status.username = null;
      o.status._id = null;
    }
    function removeUser(){
      o.status.username = null;
      o.status._id = null;

    }
    function getToken() {
      return localStorage.getItem('token');
    };
    function setToken(token) {
      return localStorage.setItem('token',token);
    };
    function removeToken() {
      return localStorage.removeItem('token');
    };
    function logout() {
      removeToken();
      removeUser();
    };

    // o.getUser = function() {
    //   return JSON.parse(urlBase64Decode(o.getToken().split('.')[1]));
    // };



    function urlBase64Decode(str) {
      var output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0: { break; }
        case 2: { output += '=='; break; }
        case 3: { output += '='; break; }
        default: {
          throw 'Illegal base64url string!';
        }
      }
      return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
    }


    // var token = getToken();
    // o.status = {};
    if(getToken()) setUser();
    //   var user = setUser();
    //   o.status.username = user.username;
    //   o.status._id = user._id;
    // }


    // o.getSurveyByUser = function(id){
    //   var q =$q.defer();
    //   $http.get('/api/user/profile/'+ id).then(function(res){
    //     q.resolve(res.data);
    //   });
    //   return q.promise;
    // };

    return o;
}
})();
