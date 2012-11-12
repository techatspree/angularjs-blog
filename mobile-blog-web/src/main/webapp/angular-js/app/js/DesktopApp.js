/**
 * @author Till Hermsen
 * @date 02.11.12
 */

'use strict';

angular.module('DesktopApp', [
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
                    templateUrl: 'app/partials/desktop/blog-post-list.html'
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
                    templateUrl: 'app/partials/desktop/add-blog-post-form.html',
                    authRequired: true
                }).


                /**
                 * Blog post route
                 *
                 * Controllers: BlogPostController, AddCommentController
                 */
                when('/post/:blogPostId', {
                    templateUrl: 'app/partials/desktop/blog-post.html'
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
                    templateUrl: 'app/partials/desktop/login-form.html'
                }).


                /**
                 * Registration route
                 *
                 * Controllers: RegisterController
                 */
                when('/register', {
                    templateUrl: 'app/partials/desktop/register-form.html'
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

        $rootScope.index      = 'app/partials/desktop/index.html';
        $rootScope.header     = 'app/partials/desktop/header.html';
        $rootScope.sidebar    = 'app/partials/desktop/sidebar.html';
        $rootScope.navigation = 'app/partials/desktop/navigation.html';
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
