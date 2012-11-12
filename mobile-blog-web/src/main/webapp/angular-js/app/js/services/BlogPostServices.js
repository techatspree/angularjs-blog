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
            var restUrl = '../rest/blog';

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
                    return $http.get(restUrl).
                               then(function(response) {
                                   return self.blogPosts = response.data;
                               });
                },

                /**
                 * Fetch blog post with the given id
                 *
                 * @param blogPostId
                 * @return {*}
                 */
                fetchBlogPost: function(blogPostId) {
                    return $http.get(restUrl + '/' + blogPostId).
                               then(function(response) {
                                   return response.data;
                               });
                },


                /**
                 * Add blog post
                 *
                 * @param blogPost
                 * @return {*}
                 */
                addBlogPost: function(blogPost) {
                    return $http.post(restUrl, blogPost).
                               then(function(response) {
                                   return response.data;
                               });
                }
            };
        }
    ]).


    /**
     *
     */
    factory('CommentService', [
        '$http',

        function($http) {
            var restUrl = '../rest/blog/';

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
                    return $http.get(restUrl + blogPostId + '/comment').
                               then(function(response) {
                                   return self.comments = response.data;
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
                    return $http.post(restUrl + blogPostId + '/comment', comment).
                               then(function(response) {
                                   self.fetchComments(blogPostId);
                                   return response;
                               });
                }
            };
        }
    ]);
