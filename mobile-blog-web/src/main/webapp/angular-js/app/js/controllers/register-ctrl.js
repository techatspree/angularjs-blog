/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

RegisterCtrl.$inject = ['$scope', 'user'];

function RegisterCtrl($scope, userService) {
    $scope.error;

    $scope.register = function(userData) {
        userData = (userData) ? $.param(userData) : null;

        var register = userService.register(userData);

        register.success(function() {
            history.back();
        });

        register.error(function(data) {
            $scope.error = data;
        });
    }
}
