/**
 * Created by Kaboyi on 2016/12/22.
 */
angular.module('DRApp')
	.controller('DRHomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function ($rootScope, $scope, $location, $localStorage, Main) {
		$rootScope.title = '封魔录O';
		$scope.signin = function () {//登录
			var formData = {
				email: $scope.email,
				password: $scope.password
			};
			Main.signin(formData, function (res) {
				console.log('X', res.data);
				if (res.type === false)
					alert(res.data);
				else {
					$localStorage.token = res.data.token;
					window.location = '/'
				}
			}, function () {
				console.log('失败', arguments);
				$rootScope.error = '签到失败'
			})
		};
		$scope.signup = function () {//注册
			var formData = {
				email: $scope.email,
				password: $scope.password
			};
			Main.save(formData, function (res) {
				if (res.type == false)
					alert(res.data);
				else {
					$localStorage.token = res.data.token;
					window.location = '/'
				}
			}, function () {
				$rootScope.error = '注册失败'
			})
		};
		$scope.me = function () {
			console.log('ME');
			Main.me(function (res) {
				$scope.myDetails = res
			}, function () {
				$rootScope.error = '无法获取详细信息'
			})
		};
		$scope.logout = function () {
			Main.logout(function () {
				window.location = '/'
			}, function () {
				alert('登出失败')
			})
		};
		$scope.submit = function () {
			var formData = {
				_id: $scope._id,
				title: $scope.title,
				desc: $scope.desc
			};
			Main.updateGame(formData, function (res) {
				$scope.msg = res;
			}, function () {
				$rootScope.error = '保存失败!'
			})
		}
		$scope.token = $localStorage.token
	}])
// .controller('DRMeCtrl', ['$rootScope', '$scope', '$location', 'Main', function ($rootScope, $scope, $location, Main) {
// Main.me(function (res) {
// 	$scope.myDetails = res;
// }, function () {
// 	$rootScope.error = '获取详细信息失败';
// })
// }]);