/**
 * @author Till Hermsen
 * @date 31.10.12
 */

BlogPostListCtrl.$inject = ['$rootScope', '$scope', 'post', 'user'];

function BlogPostListCtrl($rootScope, $scope, blogPostService, user) {
    var buttons = [];
    if (user.isLoggedIn()) {
        buttons = [
            {
                title: 'Add Post',
                href: '#/post/add',
                event: ''
            },
            {
                title: 'Logout',
                event: 'user:logout'
            }
        ];
    } else {
        buttons = [
            {
                title: 'Login',
                href: '#/login',
                event: ''
            }
        ];
    }
    $rootScope.$broadcast("navigation:init", buttons);

    $scope.blogPostList = blogPostService.query();
}