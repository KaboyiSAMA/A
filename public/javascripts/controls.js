/**
 * Created by Kaboyi on 2016/12/17.
 */
"use strict";
/*
Controllers
 */
angular.module('angularRestfulAuth')
	.controller('HomeCtrl',
		['$rooScope', '$scope', '$location', '$localStorage', 'Main',
		function($rootScope, $scope, $location, $localStorage, Main){
			$scope.signin=function(){
				var formData = {
					email:$scope.email,
					password:$scope.password
				}
			}
		}])