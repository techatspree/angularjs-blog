/**
 * @author Till Hermsen
 * @date 02.11.12
 */

'use strict';

angular.module('MobileApp', []).

    config([
        '$routeProvider',
        '$httpProvider',

        // app routing
        function($routeProvider) {}
    ]).

    run(function() {
    }).

    controller('AppCtrl', function($scope) {
        $scope.index      = 'app/views/mobile/index.html';
        $scope.header     = 'app/views/mobile/header.html';
        $scope.sidebar    = 'app/views/mobile/sidebar.html';
        $scope.navigation = 'app/views/mobile/navigation.html';
    });
