/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

NavigationCtrl.$inject = ['$rootScope', '$scope'];

function NavigationCtrl($rootScope, $scope) {
    $scope.buttons = {};

    $rootScope.$on("navigation:init", function(event, data) {
        if (data) {
//            angular.forEach(data, )

            $scope.buttons = data;
        }
    });

    $rootScope.broadcastBtnEvent = function(event) {
        if (event) {
            console.log("broadcast: " + event)
            $rootScope.$broadcast(event);
        }
    };
}