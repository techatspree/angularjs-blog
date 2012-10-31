/**
 * @author Till Hermsen
 * @date 25.10.12
 */

'use strict';

angular.module('app', [
    'blogPost.services',
    'user.services',
    'app.filters'
]).

    config([
        '$routeProvider',
        '$httpProvider',

        // app routing
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'app/views/desktop/blog-post-list.html',
                    controller: BlogPostListCtrl,
                    auth: false
                }).
                when('/post/add', {
                    templateUrl: 'app/views/desktop/add-post-form.html',
                    controller: AddBlogPostCtrl,
                    auth: true
                }).
                when('/post/:blogPostId', {
                    templateUrl: 'app/views/desktop/blog-post.html',
                    controller: BlogPostCtrl,
                    auth: false
                }).
                when('/login', {
                    templateUrl: 'app/views/desktop/login-form.html',
                    controller: LoginCtrl,
                    auth: false
                }).
                when('/register', {
                    templateUrl: 'app/views/desktop/register-form.html',
                    controller: RegisterCtrl,
                    auth: false
                }).
                when('/401', {
                    template: '401',
                    auth: false
                }).
                when('/404', {
                    template: '404',
                    auth: false
                })
                .otherwise({redirectTo: '/404'});
        }
    ]).

    run(function($rootScope, $location, user) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            var authRequired = next.$route && next.$route.auth;
            if (authRequired !== undefined) {
                if (authRequired && !user.isLoggedIn()) {
                    $location.url('401');
                }
            }
        });
    });
