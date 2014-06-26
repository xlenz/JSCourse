'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.service('ApiClient', function ($http, $q, $location, ApiUrl, Auth) {
         $http.defaults.useXDomain = true;

         var qHttp = function (httpParams) {
            var deferred = $q.defer();

            $http(httpParams).success(function (data) {
               if (!Auth.isAuthenticated()) {
                  Auth.setToken(data.token);
                  $location.url("/me");
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

         this.updateProfile = function (data) {
            var url = ApiUrl + '/user/me';
            var httpParams = {
               method: 'POST',
               data: data,
               url: url,
               headers: {
                  'secret-token': Auth.getToken()
               }
            };

            return qHttp(httpParams);
         };

         this.listUsers = function () {
            var url = ApiUrl + '/user';
            var httpParams = {
               method: 'GET',
               url: url,
               headers: {
                  'secret-token': Auth.getToken()
               }
            };

            return qHttp(httpParams);
         };

         this.user = function (id) {
            var url = ApiUrl + '/user/' + id;
            var httpParams = {
               method: 'GET',
               url: url,
               headers: {
                  'secret-token': Auth.getToken()
               }
            };

            return qHttp(httpParams);
         };

         this.avatar = function () {
            return {
               url: ApiUrl + '/user/me/avatar',
               headers: {
                  'secret-token': Auth.getToken()
               }
            };
         };

      }
   );

})();