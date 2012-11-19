/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

angular.module('UserServices', []).

    factory('UserService', [
        '$http',

        function($http) {
            var restConfig = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            };

            var loggedIn = (sessionStorage.getItem('user')) ? true : false;

            return {

                /**
                 * Login
                 *
                 * @param credentials
                 * @return {*}
                 */
                login: function(credentials) {
                    return  $http.post('rest/authentication', credentials, restConfig).
                                success(function(data) {
                                    sessionStorage.setItem('user', angular.toJson(data));
                                    loggedIn = true;
                                    return data;
                                }).
                                error(function(data) {
                                    return data;
                                });
                },


                /**
                 * Logout
                 *
                 * @return {Boolean}
                 */
                logout: function() {
                    if (sessionStorage.getItem('user')) {
                        sessionStorage.removeItem('user');
                        loggedIn = false;
                        return true;
                    }
                    return false;
                },


                /**
                 * Register
                 *
                 * @param userData
                 * @return {*}
                 */
                register: function(userData) {
                    return  $http.post('rest/user', userData, restConfig).
                                success(function(data) {
                                    return data;
                                }).
                                error(function(data) {
                                    return data;
                                });
                },


                /**
                 * Return logged-in status
                 *
                 * @return {Boolean}
                 */
                isLoggedIn: function() {
                    return loggedIn;
                },


                /**
                 * Return user
                 *
                 * @return {*}
                 */
                getUser: function() {
                    return angular.fromJson(sessionStorage.getItem('user'));
                }
            };
        }
    ]).

    run(function($rootScope, $location, $route, UserService) {
        // listen for logout event
        $rootScope.$on('user:logout', function() {
            if (UserService.logout()) {
                $location.url('/');
            }
        });
    });
