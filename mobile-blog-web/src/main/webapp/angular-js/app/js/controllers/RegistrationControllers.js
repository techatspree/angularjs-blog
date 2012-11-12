/**
 * @author Till Hermsen
 * @date 12.11.12
 */

angular.module('RegistrationControllers', ['UserServices']).

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
                    success(function() {
                        $scope.user = undefined;
                        $location.url('/login');
                    }).
                    error(function(data) {
                        $scope.error = data;
                    });
            }
        }
    ]);
