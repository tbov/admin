'use strict';

angular.module('myApp.editVoucher', ['ngRoute'])

.config(['$routeProvider', 'cloudinaryProvider',function($routeProvider, cloudinaryProvider) {
  $routeProvider.when('/edit_voucher', {
    templateUrl: 'app/src/voucher/Edit/editVoucherForm.html',
    controller: 'editVoucherFormCtrl'
  });

    cloudinaryProvider
      .set("cloud_name", "df5kf6ocq")
      .set("upload_preset", "pocovtmu");

}])

.controller('editVoucherFormCtrl', ['$scope' ,'$window' , '$sessionStorage' , '$localStorage', 'authService','editVoucherService', 'addVoucherService', 'cloudinary', function($scope, $window, $sessionStorage, $localStorage, authService,editVoucherService, addVoucherService, cloudinary) {
	
     if (!!!authService.isUserLoggedIn()) {
	     $window.location.href = "#!/login";
    };


	$scope.$storage = $localStorage;
	$scope.success = "";
	$scope.error = "";
	$scope.brands = "";
	$scope.files = "";
	$scope.loading = true;
	$scope.editVoucherModel = {};
	// $scope.editVoucherModel.image = {};
	// $scope.editVoucherModel.image.id = "";
	// $scope.editVoucherModel.image.url = "";


	// GET EDIT VOUCHER DETAILS
	var voucherId = $sessionStorage.editVoucherId || undefined;
	var retrievedVouchers = $scope.$storage.vouchers || undefined;
	$scope.editVoucherModel.id = voucherId; 
	console.log('edit voucher id is', voucherId);


	console.log('retrieving vouchers', retrievedVouchers);

	if (retrievedVouchers) {
		$scope.editVoucherModel.voucher = editVoucherService.extractVoucherById(voucherId, retrievedVouchers);
		$scope.files = $scope.editVoucherModel.voucher.product.image;
		// $scope.editVoucherModel.image.url = $scope.editVoucherModel.voucher.product.image;
	}
	
	var newModel = {
		id: voucherId
	}
	// SUBMIT EDIT VOUCHER DETAILS
	$scope.submit = function (model) {
		var jsonModel = angular.toJson(model);
		console.log(jsonModel);
		editVoucherService.edit(jsonModel)
		.success(function(res, headers, status, config){
		   console.log('success res', res);
		   console.log('success config', config);
		})
		.error(function(res, headers, status, config){
			console.log('err res', res);
	
		})
		delete $sessionStorage.voucherId;
	}

	   //GET BRANDS
	 addVoucherService.getBrands()
	  .success(function(res, headers, status, config) {
	  	$scope.loading = false;
	     if (res.status === true){
	         if (res.data.brands.length > 0) {
	            $scope.brands = res.data.brands;
	         } 
	     } else {
	        $scope.error = "Sorry cannot reach the server at the moment";
	      } 
	  })
	  .error(function(res, headers, status, config){
	  	$scope.loading = false;
	    console.log('brands err res is', res);
	 });

     // UPLOAD IMAGE
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
                  $scope.editVoucherModel.image  = {};
                  $scope.editVoucherModel.image.id = response.data.public_id;
                  $scope.editVoucherModel.image.url = response.data.secure_url;
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



}])
.service('editVoucherService', ['$http' , '$window', '$filter', 'authService', function ($http, $window, $filter, authService) {
	 var SESSION_TOKEN, SOURCE_ID, EDIT_VOUCHER_URL, EDIT_VOUCHER_URL_URLheaders, HTTP_CONFIG;
  	
  	 SESSION_TOKEN = authService.getToken();
 	 SOURCE_ID = authService.getSourceId();
 	 EDIT_VOUCHER_URL =  'https://book-of-vouchers.herokuapp.com/api/v1/admin/edit_voucher';
 	 EDIT_VOUCHER_URL_URLheaders = {

        /**@const */    
        headers: 
        { 
            'Content-Type': "application/json",
            'token': SESSION_TOKEN,
            'source_id': SOURCE_ID
        }
        
     };

	this.edit = function (model) {

	HTTP_CONFIG = {
     	 headers: { 
            'Content-Type': "application/json"
        }
     }	
    	return $http.put(EDIT_VOUCHER_URL, model, HTTP_CONFIG);
	}

	this.extractVoucherById = function(voucherId, vouchers) {

			var vId = voucherId;
			var list = vouchers;
			var filteredResult = $filter('filter')(list, {id: vId});
			console.log('filteredResult', filteredResult);
			if (filteredResult['0']){
				return filteredResult['0'];
			}
	}

}]);