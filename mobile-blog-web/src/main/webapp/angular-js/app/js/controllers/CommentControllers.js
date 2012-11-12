/**
 * @author Till Hermsen
 * @date 12.11.12
 */

angular.module('CommentControllers', ['CommentServices', 'UserServices']).

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
                var blogPostId = $routeParams.blogPostId || undefined;

                if (comment) {
                    comment.author = {};
                    comment.author.id = user.id || undefined;
                }

                CommentService.addComment(comment, blogPostId).
                    success(function() {
                        $scope.comment = undefined;
                    });
            };
        }
    ]);
