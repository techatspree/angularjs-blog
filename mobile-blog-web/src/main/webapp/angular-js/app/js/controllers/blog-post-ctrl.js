/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

BlogPostCtrl.$inject = [
    '$scope',
    '$routeParams',
    'post',
    'comment',
    'user'
];

function BlogPostCtrl(
    $scope,
    $routeParams,
    postService, commentService, userService
) {
    $scope.blogPost = postService.get({blogPostId: $routeParams.blogPostId});
    $scope.data = {
        comments: commentService.query({blogPostId: $routeParams.blogPostId})
    };

    $scope.addCommentForm = 'app/views/desktop/add-comment-form.html';
    $scope.showAddCommentForm = function() {
        return userService.isLoggedIn();
    };
}
