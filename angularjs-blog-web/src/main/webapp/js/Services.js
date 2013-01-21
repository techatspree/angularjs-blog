/**
 * @author Till Hermsen
 * @date 09.01.13
 */

'use strict';

angular.module('Services', []).

    /**
     * BlogPostService
     */
    factory('BlogPostService', [
        '$http',

        function($http) {
            var restUrl = 'rest/blog';

            return {

                /**
                 * Blog post
                 */
                blogPost: {},

                /**
                 * Blog posts
                 */
                blogPosts: [],

                /**
                 * Fetch blog posts
                 *
                 * @return {*}
                 */
                fetchBlogPosts: function() {
                    var self = this;
                    return  $http.get(restUrl).
                        success(function(data) {
                            return self.blogPosts = data;
                        }).
                        error(function(data) {
                            return data;
                        });
                },

                /**
                 * Fetch blog post with the given id
                 *
                 * @param blogPostId
                 * @return {*}
                 */
                fetchBlogPost: function(blogPostId) {
                    var self = this;
                    return  $http.get(restUrl + '/' + blogPostId).
                        success(function(data) {
                            return self.blogPost = data;
                        }).
                        error(function(data) {
                            return data;
                        });
                },


                /**
                 * Add blog post
                 *
                 * @param blogPost
                 * @return {*}
                 */
                addBlogPost: function(blogPost) {
                    return  $http.post(restUrl, blogPost).
                        success(function(data) {
                            return data;
                        }).
                        error(function(data) {
                            return data;
                        });
                }
            };
        }
    ]).



    /**
     * CommentService
     */
    factory('CommentService', [
        '$http',

        function($http) {
            var restUrl = 'rest/blog/';

            return {

                /**
                 * Comments
                 */
                comments: [],

                /**
                 * Fetch comments
                 *
                 * @param blogPostId
                 * @return {*}
                 */
                fetchComments: function(blogPostId) {
                    var self = this;
                    return  $http.get(restUrl + blogPostId + '/comment').
                        success(function(data) {
                            return self.comments = data;
                        }).
                        error(function(data) {
                            return data;
                        });
                },

                /**
                 * Add comment
                 *
                 * @param comment
                 * @param blogPostId
                 * @return {*}
                 */
                addComment: function(comment, blogPostId) {
                    var self = this;
                    return  $http.post(restUrl + blogPostId + '/comment', comment).
                        success(function(data) {
                            self.fetchComments(blogPostId);
                            return data;
                        }).
                        error(function(data) {
                            return data;
                        });
                }
            };
        }
    ]).


    /**
     * UserService
     */
    factory('UserService', [
        '$http',
        '$rootScope',
        '$location',

        function($http, $rootScope, $location) {
            var restConfig, loggedIn;

            restConfig = {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            };

            loggedIn = (sessionStorage.getItem('user')) ? true : false;

            $rootScope.$on('user:logout', function() {
                sessionStorage.removeItem('user');
                loggedIn = false;
                $location.url('/');
            });

            return {

                /**
                 * Login
                 *
                 * @param credentials
                 * @return {*}
                 */
                login: function(credentials) {
                    return  $http.post('rest/authentication', credentials, restConfig).
                        success(function(data) {
                            sessionStorage.setItem('user', angular.toJson(data));
                            loggedIn = true;
                            return data;
                        }).
                        error(function(data) {
                            return data;
                        });
                },


                /**
                 * Register
                 *
                 * @param userData
                 * @return {*}
                 */
                register: function(userData) {
                    return  $http.post('rest/user', userData, restConfig).
                        success(function(data) {
                            return data;
                        }).
                        error(function(data) {
                            return data;
                        });
                },


                /**
                 * Return logged-in status
                 *
                 * @return {Boolean}
                 */
                isLoggedIn: function() {
                    return loggedIn;
                },


                /**
                 * Return user
                 *
                 * @return {*}
                 */
                getUser: function() {
                    return angular.fromJson(sessionStorage.getItem('user'));
                }
            };
        }
    ]);
