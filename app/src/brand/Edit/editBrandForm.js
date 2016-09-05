"use strict";

angular.module('myApp.editBrand', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/edit_brand', {
    templateUrl: 'app/src/brand/Edit/editBrandForm.html',
    controller: 'editBrandFormCtrl'
  });
}])

.controller('editBrandFormCtrl', ['$scope', 'editBrandService', function($scope, editBrandService) {
	 $scope.edit = function () {
	 	editBrandService.edit();
	 };
}])
.service('editBrandService', [ '$http', function ($http){

var editBrandService= function ($http) {
	this.http_ = $http;
}

editBrandService.prototype.edit = function () {
	console.log('edit brand');
}

}]);