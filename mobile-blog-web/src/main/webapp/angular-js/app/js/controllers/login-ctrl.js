/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

LoginCtrl.$inject = ['$scope', 'user'];

function LoginCtrl($scope, userService) {
    $scope.error;

    $scope.login = function(credentials) {
        credentials = (credentials) ? $.param(credentials) : null;

        var login = userService.login(credentials);
        login.success(function(data) {
            sessionStorage.setItem('user', angular.toJson(data));
            history.back();
        });
        login.error(function() {
            $scope.error = 'Login failed!';
        });
    }
}
