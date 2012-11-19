/**
 * @author Till Hermsen
 * @date 02.11.12
 */

'use strict';

angular.module('App', [
    'BlogPostControllers',
    'CommentControllers',
    'AuthenticationControllers',
    'RegistrationControllers',

    'BlogPostServices',
    'CommentServices',
    'UserServices',

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
                    templateUrl: 'partials/blog-post-list.html'
//                    resolve: {
//                        blogPosts: ['BlogPostService', function(BlogPostService) {
//                            return BlogPostService.fetchBlogPosts();
//                        }]
//                    }
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
                    templateUrl: 'partials/blog-post.html'
//                    resolve: {
//                         blogPost: ['BlogPostService',
//                             function($route, BlogPostService) {
//                                 return BlogPostService.fetchBlogPost(
//                                     $route.current.params.blogPostId
//                                 );
//                             }
//                         ],
//                         commentList: ['CommentService',
//                             function($route, CommentService) {
//                                return CommentService.fetchComments(
//                                    $route.current.params.blogPostId
//                                );
//                             }
//                         ]
//                    }
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
                 * Controllers: RegisterController
                 */
                when('/register', {
                    templateUrl: 'partials/register-form.html'
                }).


                /**
                 * HTTP 401 Unauthorized
                 */
                when('/401', { template: '401' }).


                /**
                 * HTTP 404 Not Found
                 */
                when('/404', { template: '404' })


                /**
                 * Redirect to "/404" when no other route definition is matched
                 */
                .otherwise({ redirectTo: '/404' });
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

        $rootScope.index      = 'partials/index.html';
        $rootScope.header     = 'partials/header.html';
        $rootScope.sidebar    = 'partials/sidebar.html';
        $rootScope.navigation = 'partials/navigation.html';

        $rootScope.addCommentForm = 'partials/add-comment-form.html';
    }).

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
