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

function LoginCtrl($scope, Login, $http) {
    $scope.login = function(user) {

        var transform = function(data){
            if (data) { return $.param(data); }
            return null;
        }

        $http({
            method: 'POST',
            url: '../rest/authentication',
            data: user,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).
        success(function(data, status, headers, config) {
            sessionStorage.setItem('user', angular.toJson(data));
        }).
        error(function(data, status, headers, config) {
            console.log(status)
        });
    }
}

function RegisterCtrl($scope, $http) {
    $scope.register = function(userData) {

        // fix
        if (!userData.email) {
            console.log("no email")
            userData.email = ""
        };

        var transform = function(data){
            if (data) { return $.param(data); }
            return null;
        }

        $http({
            url: '../rest/user',
            method: "POST",
            data: userData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform
        }).
        success(function(data, status, headers, config) {
            console.log(data);
        }).
        error(function(data, status, headers, config) {
            console.log(status);
        });
    }
}
