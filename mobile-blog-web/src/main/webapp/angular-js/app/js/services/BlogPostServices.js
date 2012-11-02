/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

angular.module('BlogPostServices', ['ngResource']).

    service('BlogPostService', function($resource){
        var blogPosts;
        var resource = $resource('../rest/blog/:blogPostId', {}, {});

        var fetchBlogPosts = function() {
            blogPosts = resource.query();
        };

        var fetchBlogPost = function(blogPostId) {
            return resource.get({blogPostId: blogPostId});
        };

        var addBlogPost = function(blogPost, success, error) {
            resource.save(blogPost , success, error);
        };

        return {
            /**
             *
             * @return {*}
             */
            getBlogPosts: function() {
                fetchBlogPosts();
                return blogPosts;
            },


            /**
             *
             * @param blogPostId
             */
            getBlogPost: function(blogPostId) {
                return fetchBlogPost(blogPostId);
            },


            /**
             *
             */
            addBlogPost: addBlogPost
        };

    }).

    service('CommentService', function($resource) {
        var comments = [];
        var resource = $resource('../rest/blog/:blogPostId/comment', {}, {});

        var fetchComments = function(blogPostId) {
            resource.query({blogPostId: blogPostId}, function(data) {
                console.log(data);
                comments = data;
            });
        };

        var addComment = function(comment, blogPostId, success, error) {
            resource.save({blogPostId: blogPostId}, comment, function() {
                fetchComments(blogPostId);
                success();
            }, error);

            comments.push(comment);
        };


        return {
            /**
             *
             * @param blogPostId
             */
            getComments: function(blogPostId) {
                fetchComments(blogPostId);
                return comments;
            },


            /**
             *
             */
            addComment: addComment

        };
    });
