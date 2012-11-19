/**
 * @author Till Hermsen
 * @date 12.11.12
 */

angular.module('CommentServices', []).

    /**
     *
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
    ]);
