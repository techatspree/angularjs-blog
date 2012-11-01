/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

NavigationCtrl.$inject = ['$rootScope', '$scope', 'user'];

function NavigationCtrl($rootScope, $scope, userService) {

    $scope.isLoggedIn = function() {
        return userService.isLoggedIn();
    };
    $scope.isNotLoggedIn = function() {
        return !userService.isLoggedIn();
    };

    $rootScope.broadcastBtnEvent = function(event) {
        if (event) { $rootScope.$broadcast(event); }
    };
}
