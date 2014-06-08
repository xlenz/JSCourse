'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.service('ApiClient', function ($http, $window, $q, ApiUrl, Auth) {
         $http.defaults.useXDomain = true;

         var qHttp = function (httpParams) {
            var deferred = $q.defer();

            $http(httpParams).success(function (data) {
               if (!Auth.isAuthenticated()) {
                  Auth.setToken(data.token);
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