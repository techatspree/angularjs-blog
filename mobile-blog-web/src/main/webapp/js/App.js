/**
 * App module
 *
 * @author Till Hermsen
 * @date 02.11.12
 */

'use strict';

angular.module('App', [
    'Services',
    'Controllers',
    'Filters'
]).

    config([
        '$routeProvider',

        // app routing
        function($routeProvider) {
            $routeProvider.

                /**
                 * Main route (blog post list)
                 *
                 * Controllers: BlogPostListController
                 */
                when('/', {
                    templateUrl: 'partials/blog-post-list.html',
                    resolve: {
                        blogPosts: ['BlogPostService', function(BlogPostService) {
                            return BlogPostService.fetchBlogPosts();
                        }]
                    }
                }).


                /**
                 * Add blog post route (authentication required)
                 *
                 * Controllers: AddBlogPostController
                 */
                when('/post/add', {
                    templateUrl: 'partials/add-blog-post-form.html',
                    authRequired: true
                }).


                /**
                 * Blog post route
                 *
                 * Controllers: BlogPostController, AddCommentController
                 */
                when('/post/:blogPostId', {
                    templateUrl: 'partials/blog-post.html',
                    resolve: {
                         blogPost: [
                             '$route',
                             'BlogPostService',

                             function($route, BlogPostService) {
                                 var blogPostId = $route.current.params.blogPostId;
                                 return BlogPostService.fetchBlogPost(blogPostId);
                             }
                         ],

                         commentList: [
                             '$route',
                             'CommentService',

                             function($route, CommentService) {
                                 var blogPostId = $route.current.params.blogPostId;
                                return CommentService.fetchComments(blogPostId);
                             }
                         ]
                    }
                }).


                /**
                 * Login route
                 *
                 * Controllers: LoginController
                 */
                when('/login', {
                    templateUrl: 'partials/login-form.html'
                }).


                /**
                 * Registration route
                 *
                 * Controllers: RegistrationController
                 */
                when('/register', {
                    templateUrl: 'partials/register-form.html'
                }).


                /**
                 * HTTP 401 Unauthorized
                 */
                when('/401', { template: '<h1>401 Error</h1>' }).


                /**
                 * HTTP 404 Not Found
                 */
                when('/404', { template: '<h1>404 Error</h1>' })


                /**
                 * Redirect to "/404" when no other route definition is matched
                 */
                .otherwise({ redirectTo: '/404' });
        }
    ]).

    run([
        '$rootScope',
        '$location',
        'UserService',

        function($rootScope, $location, UserService) {
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                var authRequired = next.$route && next.$route.authRequired;
                if (authRequired !== undefined) {
                    if (authRequired && !UserService.isLoggedIn()) {
                        $location.url('401');
                    }
                }
            });
        }
    ]).

    controller('AppController', [
        '$rootScope',
        'UserService',

        function($rootScope, UserService) {
            $rootScope.userService = UserService;

            $rootScope.broadcastBtnEvent = function(event) {
                $rootScope.$broadcast(event);
            };
        }
    ]);
