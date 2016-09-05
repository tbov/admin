"use strict"
// TODO: REMOVE
angular.module('myApp.fileupload', [])
// .directive("fileModel",function() {
// 	return {
// 		restrict: 'EA',
// 		scope: {
// 			setFileData: "&"
// 		},
// 		link: function(scope, ele, attrs) {
// 			ele.on('change', function() {
// 				scope.$apply(function() {
// 					var val = ele[0].files[0];
// 					scope.setFileData({ value: val });
// 				});
// 			});
// 		}
// 	}
// })
// .directive('fileModel', ['$parse', function ($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var model = $parse(attrs.fileModel);
//             var modelSetter = model.assign;
            
//             element.bind('change', function(){
//                 scope.$apply(function(){
//                     modelSetter(scope, element[0].files[0]);
//                 });
//             });
//         }
//     };
// }]);
.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});
