/**
 * Created by Kaboyi on 2016/12/22.
 */
angular.module('DRApp', [
    'ngStorage',
    'ngRoute',
    'angular-loading-bar'])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/home.html',
                controller: 'DRHomeCtrl'
            })
            .when('/signin', {
                templateUrl: '/partials/signin.html',
                controller: 'DRHomeCtrl'
            })
            .when('/signup', {
                templateUrl: '/partials/signup.html',
                controller: 'DRHomeCtrl'
            })
            .when('/me', {
                templateUrl: '/partials/me.html',
                controller: 'DRHomeCtrl'
            })
            .when('/me/updateGame', {
                templateUrl: '/partials/me.html',
                controller: 'DRHomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {}
                    if ($localStorage.token)
                        config.headers.Authorization = 'KA_' + $localStorage.token
                    return config
                },
                'responseError': function (res) {
                    if (res.status == 401 || res.status == 403)
                        $location.path('/signin')
                    return $q.reject(res)
                }
            }
        }])
    }])