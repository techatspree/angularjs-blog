/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

angular.module('user.services', []).

    factory('user', [
        '$http',

        function($http) {
            return {
                /**
                 *
                 * @param credentials
                 * @param callback
                 * @param errorCallback
                 */
                login: function(credentials) {
                    var config = {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                    };

                    return $http.post('../rest/authentication', credentials, config);
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
                    return false;
                },


                /**
                 *
                 * @param userData
                 * @return {*}
                 */
                register: function(userData) {
                    var config = {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                    };

                    return $http.post('../rest/user', userData, config);
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

    run(function($rootScope, $location, $route, user) {
        $rootScope.$on('user:logout', function() {
            if (user.logout()) {
                $location.url('/');
                $route.reload();
            }
        });
    });
