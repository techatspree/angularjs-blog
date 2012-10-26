/**
 * @author Till Hermsen
 * @date 25.10.12
 */

'use strict';

function BlogPostListCtrl($scope, BlogPosts) {
    $scope.blogPosts = BlogPosts.query();
}

function BlogPostCtrl($scope, $routeParams, BlogPosts, Comments) {
    $scope.blogPost = BlogPosts.get({blogPostId: $routeParams.blogPostId});
    $scope.comments = Comments.query({blogPostId: $routeParams.blogPostId});
}
