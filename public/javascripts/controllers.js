/**
 * Created by Kaboyi on 2016/12/22.
 */
angular.module('angularRestfulAuth')
.controller('HomeCtrl',['$rootScope','$scope','$location','$localStorage','Main',function ($rootScope,$scope,$location,$localStorage,Main) {
    $scope.signin=function () {
        var formData={
            email:$scope.email,
            password:$scope.password
        }
        Main.signin(formData,function (res) {
            if(res.type==false){
                alert(res.data)
            }else{
                $localStorage.token=res.data.token
                window.location='/'
            }
        }, function () {
            $rootScope.error='登录失败'
        })
    }
    $scope.signup=function () {
        var formData = {
            email:$scope.email,
            password:$scope.password
        }
        Main.save(formData, function (res) {
            if(res.type==false){
                alert(res.data)
            }else{
                $localStorage.token=res.data.token
                window.location='/'
            }
        }, function () {
            $rootScope.error='注册失败'
        })
    }
    $scope.me = function () {
        Main.me(function (res) {
            $scope.myDetails=res
        }, function () {
            $rootScope.error='显示个人基本信息失败'
        })
    }
    $scope.logout=function () {
        Main.logout(function () {
            window.location='/'
        },function () {
            alert('登出失败')
        })
    }
    $scope.token=$localStorage.token
}])