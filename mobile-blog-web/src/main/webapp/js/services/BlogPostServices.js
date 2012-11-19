/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

angular.module('BlogPostServices', []).

    /**
     *
     */
    factory('BlogPostService', [
        '$http',

        function($http) {
            var restUrl = 'rest/blog';

            return {

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
                    return  $http.get(restUrl + '/' + blogPostId).
                                success(function(data) {
                                    return data;
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
    ]);
