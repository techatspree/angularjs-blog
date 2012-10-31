/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

LoginCtrl.$inject = ['$rootScope', '$scope', '$location', 'user'];

function LoginCtrl($rootScope, $scope, $location, user) {
    if (user.isLoggedIn()) {
        $location.url("/");
    }

    $rootScope.$broadcast('navigation:init', []);

    $scope.login = function(credentials) {
        if (user.login(credentials)) {
            console.log("logged-in");
            history.back();
        }
    }
}