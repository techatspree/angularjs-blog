/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

angular.module('BlogPostServices', ['ngResource']).

    factory('BlogPostService', function($resource){
        var blogPosts;

        var resource = $resource('../rest/blog/:blogPostId', {}, {});

        var fetchBlogPosts = function() {
            blogPosts = resource.query();
        };
        var fetchBlogPost = function(blogPostId) {
            return resource.get( {blogPostId: blogPostId} );
        };

        return {
            /**
             *
             * @return {*}
             */
            getBlogPosts: function() {
                if (typeof blogPosts == 'undefined') { fetchBlogPosts(); }
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
             * @param blogPost
             * @param success
             * @param error
             */
            addBlogPost: function(blogPost, success, error) {
                resource.save(blogPost , function(data) {
                    blogPosts.unshift(data);
                    success();
                }, error);
            }
        };

    }).

    factory('CommentService', function($resource) {
        var comments;

        var resource = $resource('../rest/blog/:blogPostId/comment', {}, {});

        var fetchComments = function(blogPostId) {
            comments = resource.query( {blogPostId: blogPostId} );
        };

        return {
            /**
             *
             * @param blogPostId
             */
            getComments: function(blogPostId) {
                if (typeof comments == 'undefined') { fetchComments(blogPostId); }
                return comments;
            },


            /**
             *
             * @param comment
             * @param blogPostId
             * @param success
             * @param error
             */
            addComment: function(comment, blogPostId, success, error) {
                resource.save({blogPostId: blogPostId}, comment, function(data) {
                    comments.push(data);
                    success();
                }, error);
            }
        };
    });
