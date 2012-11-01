/**
 * @author Till Hermsen
 * @date 31.10.12
 */

'use strict';

AddBlogPostCtrl.$inject = ['$scope', '$location', 'post', 'user'];

function AddBlogPostCtrl($scope, $location, postService, userService) {
    $scope.submit = function(blogPost) {
        var user = userService.getUser();

        blogPost.author = {};
        blogPost.author.id = (user) ? user.id : null;

        var success = function() {
            $location.url('/');
        };
        var error =  function() {};
        postService.save(blogPost, success, error);
    };
}
