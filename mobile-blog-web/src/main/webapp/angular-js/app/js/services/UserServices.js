/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

angular.module('UserServices', []).

    service('UserService', [
        '$http',

        function($http) {

            var httpPost = function(url, data, success, error) {
                var config = {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                };

                $http.post(url, data, config).success(success).error(error);
            };


            return {
                /**
                 *
                 * @param credentials
                 * @param callback
                 * @param errorCallback
                 */
                login: function(credentials, success, error) {
                    httpPost('../rest/authentication', credentials, function(data) {
                        sessionStorage.setItem('user', angular.toJson(data));
                        success();
                    }, error);
                },


                /**
                 *
                 * @return {Boolean}
                 */
                logout: function() {
                    if (sessionStorage.getItem('user')) {
                        sessionStorage.removeItem('user');
                        return true;
                    }
                    return false
                },


                /**
                 *
                 * @param userData
                 * @return {*}
                 */
                register: function(userData, success, error) {
                    httpPost('../rest/user', userData, success, error);
                },


                /**
                 *
                 * @return {Boolean}
                 */
                isLoggedIn: function() {
                    var user = sessionStorage.getItem('user');
                    if (user) { return true; }
                    return false;
                },


                /**
                 *
                 * @return {*}
                 */
                getUser: function() {
                    var user = sessionStorage.getItem('user');
                    if (user) { return angular.fromJson(user); }
                    return false;
                }
            };
        }
    ]).

    run(function($rootScope, $location, $route, UserService) {
        $rootScope.$on('user:logout', function() {
            if (UserService.logout()) {
                $location.url('/');
                $route.reload();
            }
        });
    });
