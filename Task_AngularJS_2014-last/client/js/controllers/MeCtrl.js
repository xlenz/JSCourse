'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('MeCtrl', function ($scope, $fileUploader, ActiveTab, ApiClient, ApiUrl) {
      ActiveTab.set(2);
      $scope.profile = {};

      loadProfile();

      // create a uploader with options
      var uploader = $scope.uploader = $fileUploader.create({
         scope: $scope,
         alias: 'avatar',
         url: ApiClient.avatar().url,
         headers: ApiClient.avatar().headers,
         queueLimit: 1
      });

      // REGISTER HANDLERS
      uploader.bind('success', function (event, xhr, item, response) {
         loadProfile();
         $scope.profile.avatar += '?' + new Date().getTime();
         uploader.clearQueue();
      });

      uploader.bind('error', function (event, xhr, item, response) {
         console.info('Error', xhr, item, response);
      });

      $scope.submit = function (value) {
         if ($scope.profileForm.$valid) {
            post(value);
         }
      };

      //no error handling here
      var post = function () {
         var promise = ApiClient.updateProfile($scope.profile);
         promise.then(
            function (data) {
               console.log(data);
            },
            function (data) {
               console.error(data);
            }
         );
      };

      function loadProfile() {
         ApiClient.user('me')
            .then(
            function (data) {
               delete data._id;
               $scope.profile = data;
               if ($scope.profile.avatar.indexOf('://') === -1) {
                  $scope.profile.avatar = ApiUrl + '/' + $scope.profile.avatar;
               }
            },
            function (data) {
               console.error(data);
            }
         );
      }

   });
})();
