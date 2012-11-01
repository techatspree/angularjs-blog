/**
 * @author Till Hermsen
 * @date 01.11.12
 */

'use strict';

AddCommentCtrl.$inject = ['$scope', '$routeParams', 'user', 'comment'];

function AddCommentCtrl($scope, $routeParams, userService, commentService) {
    $scope.addCommentSubmit = function(comment) {
        var user = userService.getUser();

        comment.author = {};
        comment.author.id = (user) ? user.id : null;

        var success = function() {
            $scope.data.comments = commentService.query({blogPostId: $routeParams.blogPostId});
            $scope.comment.content = '';
        };
        var error =  function() {};

        commentService.save(
            {blogPostId: $routeParams.blogPostId},
            comment, success, error
        );
    };
}
