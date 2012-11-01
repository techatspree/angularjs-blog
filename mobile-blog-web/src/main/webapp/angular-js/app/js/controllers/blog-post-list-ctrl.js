/**
 * @author Till Hermsen
 * @date 31.10.12
 */

BlogPostListCtrl.$inject = ['$scope', 'post', 'user'];

function BlogPostListCtrl($scope, postService, userService) {
    $scope.blogPostList = postService.query();
}
