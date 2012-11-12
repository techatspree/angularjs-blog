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

        // app routing
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'app/partials/desktop/blog-post-list.html',
                    controller: 'BlogPostListController',
                    resolve: {
                        blogPosts: function(BlogPostService) {
                            return BlogPostService.fetchBlogPosts();
                        }
                    }
                }).
                when('/post/add', {
                    templateUrl: 'app/partials/desktop/add-blog-post-form.html',
                    controller: 'AddBlogPostController',
                    authRequired: true
                }).
                when('/post/:blogPostId', {
                    templateUrl: 'app/partials/desktop/blog-post.html',
                    controller: 'BlogPostController',
                    resolve: {
                         blogPost: function($route, BlogPostService) {
                             return BlogPostService.fetchBlogPost($route.current.params.blogPostId);
                         },
                         commentList: function($route, CommentService) {
                             return CommentService.fetchComments($route.current.params.blogPostId);
                         }
                    }
                }).
                when('/login', {
                    templateUrl: 'app/partials/desktop/login-form.html',
                    controller: 'LoginController'
                }).
                when('/register', {
                    templateUrl: 'app/partials/desktop/register-form.html',
                    controller: 'RegisterController'
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

        $rootScope.index      = 'app/partials/desktop/index.html';
        $rootScope.header     = 'app/partials/desktop/header.html';
        $rootScope.sidebar    = 'app/partials/desktop/sidebar.html';
        $rootScope.navigation = 'app/partials/desktop/navigation.html';

        $rootScope.userService = UserService;

        $rootScope.broadcastBtnEvent = function(event) {
            $rootScope.$broadcast(event);
        };
    });
