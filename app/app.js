'use strict';

// Declare app level module which depends on views, and components init
angular.module('myApp', [
  'ngRoute',
  'ngStorage',
  'ngFileUpload',
  'myApp.auth',
  'myApp.tokenInterceptor',
  'cloudinary',
  'myApp.adminLogin',
  'myApp.adminDashboard',
  'myApp.adminAdd',
  'myApp.addVoucher',
  'myApp.deleteVoucher',
  'myApp.editVoucher',
  'myApp.addBrand',
  'myApp.editBrand',
  'myApp.version'
])
.config(['$locationProvider', '$routeProvider', '$httpProvider',function($locationProvider, $routeProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});

  $httpProvider.interceptors.push('myHttpInterceptor');
}]);
