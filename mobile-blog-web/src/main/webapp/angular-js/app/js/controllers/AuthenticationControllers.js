/**
 * @author Till Hermsen
 * @date 02.11.12
 */

angular.module('AuthenticationControllers', ['UserServices']).

    /**
     * Login Controller
     */
    controller('LoginCtrl',
        function($scope, $location, UserService) {
            $scope.error;

            $scope.loginSubmit = function(credentials) {
                credentials = (credentials) ? $.param(credentials) : null;

                var success = function(data) {
                    console.log("login: success");
                    $location.url('/');
                };
                var error = function(data) {
                    console.log("login: error");
                    $scope.error = 'Login failed!';
                };

                UserService.login(credentials, success, error);
            }
        }
    ).


    /**
     * Register Ctrl
     */
    controller('RegisterCtrl',
        function($scope, $location, UserService) {
            $scope.error;

            $scope.registerSubmit = function(userData) {
                userData = (userData) ? $.param(userData) : null;

                var success = function() {
                    console.log("register: success");
                    $location.url('/login');
                };
                var error = function(data) {
                    console.log("register: error");
                    $scope.error = data;
                };

                UserService.register(userData, success, error);
            }
        }
    );
