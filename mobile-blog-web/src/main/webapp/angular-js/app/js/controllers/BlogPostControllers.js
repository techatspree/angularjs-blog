/**
 * @author Till Hermsen
 * @date 02.11.12
 */

angular.module('BlogPostControllers', ['BlogPostServices', 'UserServices']).

    /**
     * BlogPostList Controller
     */
    controller('BlogPostListController', [
        '$scope',
        'BlogPostService',

        function($scope, BlogPostService) {
            $scope.blogPostService = BlogPostService;
        }
    ]).


    /**
     * BlogPost Controller
     */
    controller('BlogPostController', [
        '$scope',
        'blogPost',
        'CommentService',

        function($scope, blogPost, CommentService) {
            $scope.blogPost = blogPost.data;
            $scope.commentService = CommentService;

            $scope.addCommentForm = 'app/partials/desktop/add-comment-form.html';
        }
    ]).


    /**
     * AddBlogPost Controller
     */
    controller('AddBlogPostController', [
        '$scope',
        '$location',
        'BlogPostService',
        'UserService',

        function($scope, $location, BlogPostService, UserService) {
            $scope.addBlogPostSubmit = function(blogPost) {
                var user = UserService.getUser();

                if (blogPost) {
                    blogPost.author = {};
                    blogPost.author.id = user.id || undefined;
                }

                BlogPostService.addBlogPost(blogPost).
                    success(function() {
                        $location.url('/');
                    });
            };
        }
    ]).


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
                var blogPostId = $routeParams.blogPostId;

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
