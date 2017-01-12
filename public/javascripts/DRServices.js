/**
 * Created by Kaboyi on 2016/12/22.
 */
angular.module('DRApp')
    .factory('Main', ['$http', '$localStorage', function ($http, $localStorage) {
        var baseUrl = ''

        function changeUser(user) {
            angular.extend(currentUser, user)
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/')
            switch (output.length % 4) {
                case 0:
                    break
                case 2:
                    output += '=='
                    break
                case 3:
                    output += '='
                    break
                default:
                    throw '非法的base64url字符串'
            }
            return window.atob(output)
        }

        function getUserFromToken() {
            var token = $localStorage.token
            var user = {}
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1]
                user = JSON.parse(urlBase64Decode(encoded))
            }
            return user
        }

        var currentUser = getUserFromToken()
        return {
            save: function (data, success, error) {//注册(signup)
                $http.post(baseUrl + '/signup', data).success(success).error(error)
            },
            signin: function (data, success, error) {//登录
                $http.post(baseUrl + '/authenticate', data).success(success).error(error)
            },
            me: function (success, error) {
                $http.get(baseUrl + '/me').success(success).error(error)
            },
            logout: function (success) {
                changeUser({})
                delete $localStorage.token
                success()
            },
        }
    }])