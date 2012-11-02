/**
 * @author Till Hermsen
 * @date 02.11.12
 */

'use strict';

angular.module('DesktopApp', [
    'BlogPostControllers',
    'AuthenticationControllers',
    'BlogPostServices',
    'UserServices',
    'Filters'
]).

    config([
        '$routeProvider',
        '$httpProvider',

        // app routing
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'app/partials/desktop/blog-post-list.html',
                    controller: 'BlogPostListCtrl'
                }).
                when('/post/add', {
                    templateUrl: 'app/partials/desktop/add-blog-post-form.html',
                    controller: 'AddBlogPostCtrl',
                    authRequired: true
                }).
                when('/post/:blogPostId', {
                    templateUrl: 'app/partials/desktop/blog-post.html',
                    controller: 'BlogPostCtrl'
                }).
                when('/login', {
                    templateUrl: 'app/partials/desktop/login-form.html',
                    controller: 'LoginCtrl'
                }).
                when('/register', {
                    templateUrl: 'app/partials/desktop/register-form.html',
                    controller: 'RegisterCtrl'
                }).
                when('/401', {
                    template: '401'
                }).
                when('/404', {
                    template: '404'
                })
                .otherwise({redirectTo: '/404'});
        }
    ]).

    run(function($rootScope, $location, UserService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            var authRequired = next.$route && next.$route.authRequired;
            if (authRequired !== undefined) {
                if (authRequired && !UserService.isLoggedIn()) {
                    $location.url('401');
                }
            }
        });
    }).

    controller('AppCtrl', function($rootScope, $scope, UserService) {
        $scope.index      = 'app/partials/desktop/index.html';
        $scope.header     = 'app/partials/desktop/header.html';
        $scope.sidebar    = 'app/partials/desktop/sidebar.html';
        $scope.navigation = 'app/partials/desktop/navigation.html';

        $scope.isLoggedIn = UserService.isLoggedIn();
        $scope.broadcastBtnEvent = function(event) {
            $rootScope.$broadcast(event);
        };
    });
