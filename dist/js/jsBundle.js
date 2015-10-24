(function() {
    'use strict';
    angular.module('app', ['ui.router'])
        .config(Config);

    function Config($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('Landing', {
                url: '/',
                templateUrl: 'views/LandingPage.html'
            }).state('Home', {
                url: '/home',
                templateUrl: 'views/home.html'
            }).state('AddMovie', {
                url: '/add',
                templateUrl: 'views/AddMovie.html'
            }).state('Login', {
                url: '/login',
                templateUrl: 'views/Login_Register.html',
                controller: 'GlobalController',
                controllerAs: 'vm'
            }).state('EditMovie', {
                url: '/edit/:id',
                templateUrl: 'views/editMovie.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            }).state('Comments', {
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

(function() {
    "use strict";
    angular.module('app')
        .controller("AddMovieController", AddMovieController);

    function AddMovieController(HomeFactory, $state) {
        var vm = this;
        vm.movie = {};

        console.log("we are in addmoviectrl")
        vm.PostMovie = function() {
            console.log("we are in addmoviectrl11");
            HomeFactory.PostMovie(vm.movie).then(function() {
                $state.go('Home');
            });
        };

        vm.testButton = function() {
            console.log("our test is working!!!!!")
        }



    }
})();

(function() {
    "use strict";
    angular.module('app')
        .controller("CommentController", CommentController);

    function CommentController($state, $stateParams, HomeFactory) {
        var vm = this;
        vm.comment = {};

        if ($stateParams.id) {
            HomeFactory.getMoviesById($stateParams.id).then(function(res) {
                vm.movie = res;
            });
        }
        vm.addComment = function() {
            HomeFactory.createComment(vm.comment, $stateParams.id).then(function(res) {
                console.log(res);
                vm.comment = res;
            });
        };

    }
})();

// -------------------------------------
(function() {
    "use strict";
    angular.module('app')
        .controller('GlobalController', GlobalController);

    function GlobalController(UserFactory, $state) {
        var vm = this;
        vm.isLogin = true; //switch between the login and register view on the login_register.html page
        vm.user = {};
        vm.status = UserFactory.status;

        vm.logout = function() {
            UserFactory.logout();
            $state.go('Landing');
        };

        vm.registerUser = function() {
            UserFactory.registerUser(vm.user).then(function() {
                $state.go('Home');
            });
        };

        vm.loginUser = function() {
            UserFactory.loginUser(vm.user).then(function() {
                $state.go('Home');
                vm.user = {};
            });
        };
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .controller('HomeController', HomeController);

    function HomeController(HomeFactory, $state) {
        var vm = this;
        vm.edittedMovie = {};

        // vm.movie = {};
        // vm.comment = {};
        // vm.status = UserFactory.status;


        HomeFactory.showMovies().then(function(res) {
            vm.movie = res;
        });

        vm.deleteMovie = function(m) {
            HomeFactory.deleteMovie(m._id).then(function() {
                vm.movie.splice(vm.movie.indexOf(m), 1);
            });
        };

        vm.getCopy = function(movie) {
            return angular.copy(movie);
        };

        vm.editMovie = function(movieId, movie) {
            //Pass post ID and editted post info as one object to HomeFactory edit function
            HomeFactory.EditMovie({
                IDofMovieToEdit: movieId,
                edittedMovie: movie
            }).then(function(res) {
                console.log(movie);
                console.log(movieId);
                console.log('Made it back');
                vm.edittedMovie = null;
                $state.reload();
                // HomeFactory.showMovies().then(function(res){
                // 	console.log(res);
                // 	vm.movies = res;
                // });
            });
        };
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('AuthInterceptor', AuthInterceptor);


    function AuthInterceptor($window) {
        var o = {
            request: function(config) {
                if ($window.localStorage.getItem('token')) {
                    config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
                }
                return config;
            }
        };
        return o;
    }
})();

(function() {
    'use strict';
    angular.module('app')
        .factory('HomeFactory', HomeFactory);


    function HomeFactory($http, $q) {
        var o = {};
        var editedmovie = {};

        o.showMovies = function() {
            var q = $q.defer();
            $http.get('/api/movies').then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };
        o.getMoviesById = function(id) {
            var q = $q.defer();
            $http.get('/api/movies/' + id).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };
        o.createComment = function(comment, movieId) {
            console.log(comment);
            console.log(movieId);
            var q = $q.defer();
            $http.post('/api/movies/' + movieId + '/comment', comment).then(function(res) {
                q.resolve(comment);
                console.log("back from router");
                console.log(comment); // This is what we want
            });
            return q.promise;
        };
        o.comPost = function(comment) {
            var q = $q.defer();
            $http.post('/api/user/comment', comment).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };
        o.EditMovie = function(id) {
            var q = $q.defer();
            $http.put('/api/movies', id).then(function(res) {
                console.log("at Factory");
                q.resolve(res.data);
            });
            o.showMovies();
            return q.promise;
        };
        o.deleteMovie = function(id) {
            var q = $q.defer();
            $http.delete('/api/movies/' + id).then(function() {
                q.resolve();
            });
            return q.promise;
        };
        o.PostMovie = function(newMovie) {
            var q = $q.defer();
            console.log('add movie');
            $http.post('/api/movies', newMovie).then(function(res) {
                q.resolve(res.data);
            });
            return q.promise;
        };
        return o;
    }
})();

(function() {
    "use strict";
    angular.module('app')
        .factory('UserFactory', UserFactory);

    function UserFactory($http, $q) {
        var o = {};
        o.status = {};

        if (getToken()) {
            setUser();
        }

        o.logout = function() {
            removeToken();
            o.status.username = null;
            o.status._id = null;
        };
        o.registerUser = function(user) {
            console.log(user);
            var q = $q.defer();
            $http.post('/api/user/register', user).then(function(res) {
                o.setToken(res.data);
                setUser();
                var user = o.getUser();
                o.status.username = user.username;
                o.status._id = user._id;
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
                var user = o.getUser();
                o.status.username = user.username;
                o.status._id = user._id;
                q.resolve(res.data);
            });
            return q.promise;
        };

        function setUser() {
            var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
            o.status.username = user.username;
            o.status._id = user._id;
            console.log(o.status);
        }

        function removeUser() {
            o.status.username = null;
            o.status._id = null;

        }

        function getToken() {
            return localStorage.getItem('token');
        };

        function setToken(token) {
            return localStorage.setItem('token', token);
        };

        function removeToken() {
            return localStorage.removeItem('token');
        };

        function logout() {
            removeToken();
            removeUser();
        };

        // o.comPost = function(comment){
        //   var q = $q.defer();
        //   $http.post('/api/user/comment', comment).then(function(res){
        //     q.resolve(res.data);
        //   });
        //   return q.promise;
        // };

        function urlBase64Decode(str) {
            var output = str.replace(/-/g, '+').replace(/_/g, '/');
            switch (output.length % 4) {
                case 0:
                    {
                        break;
                    }
                case 2:
                    {
                        output += '==';
                        break;
                    }
                case 3:
                    {
                        output += '=';
                        break;
                    }
                default:
                    {
                        throw 'Illegal base64url string!';
                    }
            }
            return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
        }

        o.getUser = function() {
            return JSON.parse(urlBase64Decode(getToken().split('.')[1]));
        };



        return o;
    }
})();