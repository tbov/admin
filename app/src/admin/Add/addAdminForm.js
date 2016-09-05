/**
* @fileoverview - Add Admin
* @author - Jay Khawaja
*/
"use strict";

angular.module('myApp.adminAdd', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add_admin', {
    templateUrl: 'app/src/admin/Add/addAdminForm.html',
    controller: 'adminAddCtrl'
  });
}])
.controller('adminAddCtrl', ['$scope', '$window','adminAddService', 'authService', function($scope, $window, adminAddService, authService) {
  	   


    if (!!!authService.isUserLoggedIn()) {
       $window.location.href = "#!/login";
    };

    $scope.success = "";
    $scope.error = "";

    $scope.adminAddModel = {
          email : "",
          password :""
    }

  	$scope.add = function(model) {
      console.log('add model', model);
      if (angular.isObject(model)) {
  		  adminAddService.add(model)
        .success(function(res, headers, status, config) {
            console.log('success res', res);
            if (res.status === true) {
               $scope.success = "Admin Successfully added";
            }
        })
        .error(function(res, headers, status, config) {
          console.log('error res', res);
          if (res.status === false) {
            $scope.error = "There seems to be problem. Please try again later";
          } else {
            $scope.error = "Sorry cannot reach the server at the moment";
          } 
        })
      }

  	}
}])
.service('adminAddService', ['$http' ,'$window', 'authService', function($http, $window, authService){

var SESSION_TOKEN, SOURCE_ID, ADMIN_ADD_API_URL, ADD_ADMIN_URLheaders;

  SESSION_TOKEN = authService.getToken();
  SOURCE_ID = authService.getSourceId();


this.add = function (model) 
{
      return $http.post(ADMIN_ADD_API_URL, model);
};

var ADD_ADMIN_URLheaders = {

        /**@const */    
        headers: 
        { 
            'Content-Type': 'application/json',
            'token': SESSION_TOKEN,
            'source_id': SOURCE_ID
        }
        
     };

  ADMIN_ADD_API_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/sign_up/admin';

}]);