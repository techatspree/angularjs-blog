/**
 * @author Till Hermsen
 * @date 02.11.12
 */

angular.module('AuthenticationControllers', ['UserServices']).

    /**
     * Login Controller
     */
    controller('LoginController', [
        '$scope',
        '$location',
        'UserService',

        function($scope, $location, UserService) {
            $scope.error;
            $scope.user;

            $scope.loginSubmit = function(credentials) {
                credentials = (credentials) ? $.param(credentials) : undefined;

                UserService.login(credentials).
                    then(function() {
                        $scope.user = undefined;
                        $location.url('/');
                    }, function() {
                        $scope.error = 'Login failed!';
                    });
            }
        }
    ]).


    /**
     * Register Controller
     */
    controller('RegisterController', [
        '$scope',
        '$location',
        'UserService',

        function($scope, $location, UserService) {
            $scope.error;
            $scope.user;

            $scope.registerSubmit = function(userData) {
                userData = (userData) ? $.param(userData) : undefined;

                UserService.register(userData).
                    then(function() {
                        $scope.user = undefined;
                        $location.url('/login');
                    }, function(response) {
                        $scope.error = response.data;
                    });
            }
        }
    ]);
