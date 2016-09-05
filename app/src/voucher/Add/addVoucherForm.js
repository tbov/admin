/**
* @fileoverview - Add Voucher
* @author - Jay Khawaja
*/

"use strict";
angular.module('myApp.addVoucher', ['ngRoute'])

.config(['$routeProvider', 'cloudinaryProvider', function($routeProvider, cloudinaryProvider) {
  $routeProvider.when('/add_voucher', {
    templateUrl: 'app/src/voucher/Add/addVoucherForm.html',
    controller: 'addVoucherFormCtrl'
  });

    cloudinaryProvider
      .set("cloud_name", "df5kf6ocq")
      .set("upload_preset", "pocovtmu");

}])
.controller('addVoucherFormCtrl', ['$scope' ,'$window', '$timeout' , 'authService', 'Upload', 'cloudinary', 'addVoucherService', function($scope, $window, $timeout, authService, Upload, cloudinary, addVoucherService) {

        
         if (!!!authService.isUserLoggedIn()) {
	         $window.location.href = "#!/login";
		    };

    	
       $scope.success = "";
       $scope.error = "";
       $scope.brands = "";
       $scope.files = "";

       $scope.VoucherDataModel = {
              "voucher": {
                  "brand": "",
                  "product": {
                      "location": {
                          "coordinates": {
                              "latitude": "",
                              "longitude": ""
                              },
                          "address": ""
                      },
                      "description": "",
                      "name": ""
                  },
                  "valid": "",
                  "expiry": "",
                  "featured": "false",
                  "max_redeems": "100",
                  "city": "1",
                  "category": "1",
                  "discount": {
                      "value": "10",
                      "symbol": "%"
                      }
                  },
              "image": {
                  "id": "",
                  "url": ""
              }
          };

      var IMAGE_ADD_API_URL = "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload";
      var d = new Date();
      $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
      
      $scope.uploadFile = function (files) {
       

        $scope.files = files;
        if (!$scope.files) return;

        angular.forEach($scope.files, function(file){
           if (file && !file.$error) {  
            
             var CLOUDINARY_DATA = {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            };

            var HEADER = {
                    'Content-Type': undefined,
                    'token': undefined,
                    'source_id': undefined
            }

              file.upload = Upload.upload({
                  url:  IMAGE_ADD_API_URL,
                  data: CLOUDINARY_DATA,
                  headers: HEADER
              });         

             file.upload.then(function (response) {
                $timeout(function () {  
                  file.result = response.data;
                  $scope.VoucherDataModel.image.id = response.data.public_id;
                  $scope.VoucherDataModel.image.url = response.data.secure_url;
                  console.log('image id', 
                  $scope.VoucherDataModel.image.id);
                  console.log('image url', 
                  $scope.VoucherDataModel.image.url);
                  
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
      }

      
      $scope.submit = function (model) {
        if (angular.isObject(model)) {
           addVoucherService.addVoucher(model)
           .success(function(res, headers, status, config){
              if (res.status === true) {
                  $scope.success = "Voucher has been successfully added!";
                  $window.alert($scope.success);
                  $window.location.href="#!/dashboard";
              };
           })
           .error(function(res, headers, status, config){
              $scope.error = "Sorry, cannot upload voucher at the moment. Please inform your web amin";
           })
        }
      }

      //GET BRANDS
      addVoucherService.getBrands()
      .success(function(res, headers, status, config) {

         if (res.status === true){
             if (res.data.brands.length > 0) {
                $scope.brands = res.data.brands;
             } 
         } else {
            $scope.error = "Sorry cannot reach the server at the moment";
          } 
      })
      .error(function(res, headers, status, config){
        console.log('brands err res is', res);
      });


}])
.service('addVoucherService', ['$http', '$window', 'authService', function($http, $window, authService) {
  var SESSION_TOKEN, SOURCE_ID, ADD_VOUCHER_URL, ADD_VOUCHER_URL_URLheaders;
  
  SESSION_TOKEN = authService.getToken();
  SOURCE_ID = authService.getSourceId();

  ADD_VOUCHER_URL = "https://book-of-vouchers.herokuapp.com/api/v1/admin/add_voucher";
  ADD_VOUCHER_URL_URLheaders = {

        /**@const */    
        headers: 
        { 
            'Content-Type': "application/json",
            'token': SESSION_TOKEN,
            'source_id': SOURCE_ID
        }
        
     };

  this.addVoucher = function(model) {
    return $http.put(ADD_VOUCHER_URL, model, ADD_VOUCHER_URL_URLheaders );
  }


  var GET_BRANDS_URL, GET_BRANDS_URLheaders; 
  
  GET_BRANDS_URL = 'https://book-of-vouchers.herokuapp.com/api/v1/admin/brands';
  GET_BRANDS_URLheaders = {

        /**@const */    
        headers: 
        { 
            'token': SESSION_TOKEN,
            'source_id': SOURCE_ID
        }
        
     };

    this.getBrands = function () {
      return $http.get(GET_BRANDS_URL, GET_BRANDS_URLheaders);
    };
    
}])
