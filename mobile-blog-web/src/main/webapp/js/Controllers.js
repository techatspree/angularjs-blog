/**
 * Controllers module
 *
 * @author Till Hermsen
 * @date 09.01.13
 */

'use strict';

angular.module('Controllers', []).

    /**
     * Login Controller
     */
    controller('LoginController', [
        '$scope',
        '$location',
        'UserService',

        function($scope, $location, UserService) {
            $scope.error;
            $scope.user;

            $scope.loginSubmit = function(credentials) {
                credentials = (credentials) ? $.param(credentials) : null;

                UserService.login(credentials).
                    success(function() {
                        $scope.user = null;
                        $location.url('/');
                    }).
                    error(function() {
                        $scope.error = 'Login failed!';
                    });
            }
        }
    ]).


    /**
     * BlogPostList Controller
     */
    controller('BlogPostListController', [
        '$scope',
        'BlogPostService',

        function($scope, BlogPostService) {
            $scope.blogPostService = BlogPostService;
        }
    ]).


    /**
     * BlogPost Controller
     */
    controller('BlogPostController', [
        '$scope',
        'BlogPostService',
        'CommentService',

        function($scope, BlogPostService, CommentService) {
            $scope.blogPost = BlogPostService.blogPost;
            $scope.commentService = CommentService;
        }
    ]).


    /**
     * AddBlogPost Controller
     */
    controller('AddBlogPostController', [
        '$scope',
        '$location',
        'BlogPostService',
        'UserService',

        function($scope, $location, BlogPostService, UserService) {
            $scope.addBlogPostSubmit = function(blogPost) {
                var user = UserService.getUser();

                if (blogPost) {
                    blogPost.author = {};
                    blogPost.author.id = user.id || null;
                }

                BlogPostService.addBlogPost(blogPost).
                    success(function() {
                        $location.url('/');
                    });
            };
        }
    ]).


    /**
     * AddComment Controller
     */
    controller('AddCommentController', [
        '$scope',
        '$routeParams',
        'CommentService',
        'UserService',

        function($scope, $routeParams, CommentService, UserService) {
            $scope.addCommentSubmit = function(comment) {
                var user = UserService.getUser();
                var blogPostId = $routeParams.blogPostId || null;

                if (comment) {
                    comment.author = {};
                    comment.author.id = user.id || null;
                }

                CommentService.addComment(comment, blogPostId).
                    success(function() {
                        $scope.comment = null;
                    });
            };
        }
    ]).


    /**
     * Registration Controller
     */
    controller('RegistrationController', [
        '$scope',
        '$location',
        'UserService',

        function($scope, $location, UserService) {
            $scope.error;
            $scope.user;

            $scope.registerSubmit = function(userData) {
                userData = (userData) ? $.param(userData) : null;

                UserService.register(userData).
                    success(function() {
                        $scope.user = null;
                        $location.url('/login');
                    }).
                    error(function(data) {
                        $scope.error = data;
                    });
            }
        }
    ]);
