'use strict';

(function () {
   var app = angular.module('angularSpa', ['ngRoute']);

   app.constant('ApiUrl', 'http://localhost:3000');

   app.config(function ($routeProvider) {
      $routeProvider
         .when('/login', {
            templateUrl: 'view/login.html',
            controller: 'LoginCtrl'
         })
         .when('/signup', {
            templateUrl: 'view/signup.html',
            controller: 'SignupCtrl'
         })
         .when('/list', {
            templateUrl: 'view/list.html',
            controller: 'ListCtrl'
         })
         .when('/me', {
            templateUrl: 'view/me.html',
            controller: 'MeCtrl'
         })
         .otherwise({
            redirectTo: '/login'
         });
   });

   app.factory('ActiveTab', function () {
      var activeTab = 0;
      return {
         get: function () {
            return activeTab;
         },
         set: function (id) {
            activeTab = id;
         }
      };
   });

   app.factory('Token', function () {
      var token = null;
      return {
         get: function () {
            return token;
         },
         set: function (_token) {
            token = _token;
         }
      };
   });

   app.service('ApiClient', function ($http, $window, $q, ApiUrl, Token) {
         $http.defaults.useXDomain = true;

         var qHttp = function (httpParams) {
            var deferred = $q.defer();

            $http(httpParams).success(function (data) {
               if (Token.get() === null) {
                  Token.set(data.token);
                  $window.location.href = '#me';
               }
               deferred.resolve(data);
            }).error(function (data) {
               deferred.reject(data);
            });

            return deferred.promise;
         };

         this.login = function (data) {
            var url = ApiUrl + '/signin';
            var httpParams = {
               method: 'POST',
               data: data,
               url: url
            };

            return qHttp(httpParams);
         };

         this.signup = function (data) {
            var url = ApiUrl + '/signup';
            var httpParams = {
               method: 'POST',
               data: data,
               url: url
            };

            return qHttp(httpParams);
         };
      }
   );

})();
