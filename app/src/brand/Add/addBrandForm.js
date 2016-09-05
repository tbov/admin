'use strict';

angular.module('myApp.addBrand', ['ngRoute'])

.config(['$routeProvider', 'cloudinaryProvider', function($routeProvider, cloudinaryProvider) {
  $routeProvider.when('/add_brand', {
    templateUrl: 'app/src/brand/Add/addBrandForm.html',
    controller: 'addBrandFormCtrl'
  });

      cloudinaryProvider
      .set("cloud_name", "df5kf6ocq")
      .set("upload_preset", "pocovtmu");

}])
.controller('addBrandFormCtrl', ['$scope','$window', '$timeout', 'authService', 'addBrandService', 'Upload', 'cloudinary', function($scope, $window, $timeout, authService ,addBrandService, Upload, cloudinary) {
    
       if (!!!authService.isUserLoggedIn()) {
         $window.location.href = "#!/login";
      };
      
  	$scope.success = "";
    $scope.error = "";
    $scope.files = "";

	$scope.brandModel = {
		
			name : "",
      image: {
          id: "",
          url: ""
      }
		
	};

      var IMAGE_ADD_API_URL = "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload";
      var d = new Date();
      $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
      

  $scope.uploadFile = function (files) {

    console.log('brand model', $scope.brandModel);
   
   $scope.files = files;
    if(!$scope.files) return;

        angular.forEach($scope.files, function(file){
           if (file && !file.$error) {  
           
           
            
             var CLOUDINARY_DATA = {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            };

   

              file.upload = Upload.upload({
                  url:  IMAGE_ADD_API_URL,
                  data: CLOUDINARY_DATA
              });         

             file.upload.then(function (response) {
                $timeout(function () {  
                  file.result = response.data;
              
                  $scope.brandModel.image.id = response.data.public_id;
                  $scope.brandModel.image.url = response.data.secure_url;
                });
              }, function (response) {
               
                 
                  $scope.error = response.status + ': Sorry, cannot upload image at the moment. Please try later';
              }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                file.status = "Uploading... " + file.progress + "%";
              }); 
           }
        })


	};

  $scope.submit = function (model) {
     
        if (angular.isObject(model)) {
           addBrandService.addBrand(model)
           .success(function(res, headers, status, config){
             
              if (res.status === true) {
                  $scope.success = "Voucher has been successfully added!";
              };
           })
           .error(function(res, headers, status, config){
              console.log('error res', res);
              $scope.error = "Sorry, cannot upload voucher at the moment. Please inform your web amin";
           })
        
        }
  }


}])
.service('addBrandService', [ '$http', '$window', 'authService',function ($http, $window, authService){


var SESSION_TOKEN, SOURCE_ID, ADD_BRAND_API_URL, URL_HEADERS;

ADD_BRAND_API_URL = "https://book-of-vouchers.herokuapp.com/api/v1/admin/add_brand";
SESSION_TOKEN = authService.getToken();
SOURCE_ID = authService.getSourceId();


  var URL_HEADERS = {

        /**@const */    
        headers: 
        { 
            'Content-Type': "application/json",
            'token': SESSION_TOKEN,
            'source_id': SOURCE_ID
        }
        
     };

    this.addBrand = function (model) {
      return $http.put(ADD_BRAND_API_URL, model)
  };

}])