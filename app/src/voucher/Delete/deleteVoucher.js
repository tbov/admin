"use strict";

angular.module('myApp.deleteVoucher', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/delete_voucher', {
    controller: 'deleteVoucherCtrl'
  });
}])
.controller('deleteVoucherCtrl', ['$scope', 'deleteVoucherService', function($scope, deleteVoucherService) {
	console.log('delete voucher loaded');

}])
.service('deleteVoucherService', ['$http', function ($http) {

	var DELETE_API_URL, HTTP_CONFIG;


	DELETE_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/delete_voucher';


	this.deleteVoucher = function (model) {


     HTTP_CONFIG = {
     	data: model,
     	headers: {
     		'Content-Type': 'application/json'
     	}
     }
	
			return $http.delete(DELETE_API_URL, HTTP_CONFIG);
	};


}]);