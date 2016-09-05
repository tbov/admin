/**
* @todo: make a rest call 
* @todo: manage token 
* @todo: add ng sanitize
* @fileoverview - Holds the logic for login controller.
*/
"use strict";

angular.module('myApp.adminLogin', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'app/src/admin/Login/login.html',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl', ['$scope',  '$http', '$window', '$localStorage','loginControllerService', 'authService',  function($scope, $http, $window, $localStorage,loginControllerService, authService) {
		
 		$scope.$storage = $localStorage;
		/*
		* Model to store and send login data
		*/
		$scope.loginModel = {};


		/**
		* Send login data to backend
		*/
		$scope.login = function (model) {

		$scope.error="";
	
			if (angular.isObject(model)) {


					loginControllerService.login(model)
					.success(function(res, headers, status, config){


						if (angular.isObject(res)) {
						  if (res.status === true) {
		                	 $scope.$storage.token = res.data.token;	
		                	 $scope.$storage.source_id = res.data.source_id;
		                	 // $localStorage.token = res.data.token;	
		                	 // $localStorage.source_id = res.data.source_id;
				            // $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.sessionStorage['token'];
			                 authService.isLoggedIn = true;
		                     $window.location.href = '#!/dashboard';
						 		
						  }
					  }
					})
					.error(function(res, headers, status, config){

						if (angular.isObject(res)) {
							if (res.status === false) {
								var msg = res.message || ""; 
									$scope.error = msg;
							}
						}
					});	
			  }
			};
}])
.service('loginControllerService',[ '$http', function ($http){

     
	this.login = function (model){
	  // console.log('login service with model', model);
 	 	return $http.post(LOGIN_API_URL, model);
  };

	var URLheaders = {

        /**@const */    
        headers: 
        { 
            'Content-Type': 'application/json'
        }
        
     };

	var LOGIN_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/sign_in/admin';
}])