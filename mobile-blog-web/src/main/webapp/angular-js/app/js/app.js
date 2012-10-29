/**
 * @author Till Hermsen
 * @date 25.10.12
 */

'use strict';

angular.module('router', ['BlogPostServices', 'UserServices', 'BlogPostFilters']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/blog', {
                templateUrl: 'app/views/blog-post-list.html',
                controller: BlogPostListCtrl
            }).
            when('/blog/:blogPostId', {
                templateUrl: 'app/views/blog-post.html',
                controller: BlogPostCtrl
            }).
            when('/addPost', {
                templateUrl: 'app/views/add-post-form.html',
                controller: AddBlogPostCtrl
            }).
            when('/login', {
                templateUrl: 'app/views/login-form.html',
                controller: LoginCtrl
            }).
            when('/register', {
                templateUrl: 'app/views/register-form.html',
                controller: RegisterCtrl
            }).
            otherwise({redirectTo: '/blog'});
    }]).
    run(function($rootScope, $location, User) {
        var userRoutes = [
            'addPost'
        ];

        $rootScope.$on('$routeChangeStart', function(event, next, current) {
//            console.log("route: ");
//            console.log(next);
        });
    });
