/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

RegisterCtrl.$inject = ['$rootScope', '$scope', '$location', 'user'];

function RegisterCtrl($rootScope, $scope, $location, user) {
    if (user.isLoggedIn()) {
        $location.url("/");
    }

    $rootScope.$broadcast('navigation:init', []);

    $scope.register = function(userData) {
        console.log(user.register(userData));
//        if(user.register(userData)) {
//            console.log("registered");
//            history.back();
//        }
    }
}
