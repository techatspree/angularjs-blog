/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

BlogPostCtrl.$inject = ['$rootScope', '$scope', '$routeParams', 'post', 'comment'];

function BlogPostCtrl($rootScope, $scope, $routeParams, post, comment) {
    $rootScope.$broadcast('navigation:init', []);

    $scope.blogPost = post.get({blogPostId: $routeParams.blogPostId});
    $scope.comments = comment.query({blogPostId: $routeParams.blogPostId});
}