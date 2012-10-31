/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

angular.module('user.services', []).

    factory('user', [
        '$http',

        function($http) {

            /**
             *
             * @param data
             * @return {*}
             */
            var urlEncode = function(data) {
                if (data) { return $.param(data); }
                return null;
            }


            /**
             *
             * @param credentials
             */
            function login(credentials) {
                $http({
                    method: 'POST',
                    url: '../rest/authentication',
                    data: credentials,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    transformRequest: urlEncode
                }).
                    success(function(data, status, headers, config) {
                        sessionStorage.setItem('user', angular.toJson(data));
                        return true;
                    }).
                    error(function(data, status, headers, config) {
                        console.log(status);
                        return false;
                    });
            }


            /**
             *
             * @return {Boolean}
             */
            function logout() {
                if (sessionStorage.getItem('user')) {
                    sessionStorage.removeItem('user');
                    return true;
                }
                return false;
            }


            /**
             *
             * @param user
             */
            function register(userData) {
                $http({
                    url: '../rest/user',
                    method: "POST",
                    data: userData,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                    transformRequest: urlEncode
                }).
                    success(function(data, status, headers, config) {
                        console.log(data);
                        return true;
                    }).
                    error(function(data, status, headers, config) {
                        console.log(status);
                        return false;
                    });
            }


            /**
             *
             * @return {Boolean}
             */
            function isLoggedIn() {
                var user = sessionStorage.getItem('user');
                if (user) { return true; }
                return false;
            }


            /**
             *
             * @return {*}
             */
            function retrieve() {
                var user = sessionStorage.getItem('user');
                if (user) { return user; }
                return false;
            }


            /**
             *
             */
            return {
                login: login,
                logout: logout,
                isLoggedIn: isLoggedIn,
                register: register,
                retrieve: retrieve
            }
        }
    ]).

    run(function($rootScope, $location, user) {
        $rootScope.$on('user:logout', function() {
            if (user.logout()) {
                $location.url('/');
            }
        });
    });
