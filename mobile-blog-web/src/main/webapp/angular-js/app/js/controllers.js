/**
 * @author Till Hermsen
 * @date 25.10.12
 */

'use strict';

/**
 * Site Controller
 *
 * @param $scope
 * @param $location
 * @param User
 * @constructor
 */
SiteCtrl.$inject = ['$rootScope', '$scope', '$location', 'User'];

function SiteCtrl($rootScope, $scope, $location, User) {
    $scope.header         = 'app/views/header.html';
    $scope.sidebar        = 'app/views/sidebar.html';
    $scope.mainNavigation = 'app/views/main-navigation.html';

    // Navigation buttons
    $scope.buttons = {};
    $rootScope.$on("initMainNavigation", function(event, data) {
        if (data) {
            $scope.buttons = data;
        }
    });
    $scope.showButton = function(loggedIn) {
        switch (loggedIn) {
            case true:
                return User.isLoggedIn();
                break;
            case false:
                return !User.isLoggedIn();
                break;
        }
    };

    // login / logout button
    $scope.loginLogoutToggle = function(button) {
        switch (button) {
            case 'login':
                return !User.isLoggedIn();
                break;
            case 'logout':
                return User.isLoggedIn();
                break;
        }
    }

    $scope.logout = function() {
        sessionStorage.removeItem('user');
        $location.path('#/blog');
    }
}


/**
 * Blog List View Controller
 *
 * @param $scope
 * @param BlogPost
 * @constructor
 */
BlogPostListCtrl.$inject = ['$rootScope', '$scope', 'BlogPost'];

function BlogPostListCtrl($rootScope, $scope, BlogPost) {
    var buttons = [
        {
            title: 'Add Post',
            href: '#/addPost',
            loggedIn: true
        }
    ];
    $rootScope.$broadcast("initMainNavigation", buttons);
    $scope.blogPosts = BlogPost.query();

}



/**
 * Blog Post View Controller
 *
 * @param $scope
 * @param $routeParams
 * @param BlogPost
 * @param Comment
 * @constructor
 */
BlogPostCtrl.$inject = ['$scope', '$routeParams', 'BlogPost', 'Comment'];

function BlogPostCtrl($scope, $routeParams, BlogPost, Comment) {
    $scope.blogPost = BlogPost.get({blogPostId: $routeParams.blogPostId});
    $scope.comments = Comment.query({blogPostId: $routeParams.blogPostId});
}



/**
 * Login View Controller
 *
 * @param $scope
 * @param $location
 * @param $http
 * @constructor
 */
LoginCtrl.$inject = ['$scope', '$location', '$http'];

function LoginCtrl($scope, $location, $http) {
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
            $location.path('#/blog');
        }).
        error(function(data, status, headers, config) {
            console.log(status)
        });
    }
}


/**
 * Register View Controller
 *
 * @param $scope
 * @param $location
 * @param $http
 * @constructor
 */
RegisterCtrl.$inject = ['$scope', '$location', '$http'];

function RegisterCtrl($scope, $location, $http) {
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
            $location.path('#/login');
        }).
        error(function(data, status, headers, config) {
            console.log(status);
        });
    }
}



AddBlogPostCtrl.$inject = ['$scope'];
function AddBlogPostCtrl($scope) {

}
