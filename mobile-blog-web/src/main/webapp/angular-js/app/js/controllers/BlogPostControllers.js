/**
 * @author Till Hermsen
 * @date 02.11.12
 */

angular.module('BlogPostControllers', ['BlogPostServices', 'UserServices']).

    /**
     * BlogPostList Controller
     */
    controller('BlogPostListCtrl',
        function($scope, BlogPostService) {
            $scope.blogPosts = BlogPostService.getBlogPosts();
        }
    ).


    /**
     * BlogPost Controller
     */
    controller('BlogPostCtrl',
        function($scope, $routeParams, BlogPostService, CommentService) {
            $scope.blogPost = BlogPostService.getBlogPost($routeParams.blogPostId);
            $scope.comments = CommentService.getComments($routeParams.blogPostId);

            $scope.addCommentForm = 'app/partials/desktop/add-comment-form.html';
        }
    ).


    /**
     * AddBlogPost Controller
     */
    controller('AddBlogPostCtrl',
        function($scope, $location, BlogPostService, UserService) {
            $scope.addBlogPostSubmit = function(blogPost) {
                console.log("addBlogPostSubmit");
                var user = UserService.getUser();

                if (blogPost) {
                    blogPost.author = {};
                    blogPost.author.id = (user) ? user.id : null;
                }

                var onSuccess = function() {
                    $location.url('/');
                };
                var onError =  function() {};
                BlogPostService.addBlogPost(blogPost, onSuccess, onError);
            };
        }
    ).


    /**
     * AddComment Controller
     */
    controller('AddCommentCtrl',
        function($scope, $routeParams, UserService, CommentService) {
            $scope.addCommentSubmit = function(comment) {
                var user = UserService.getUser();
                var blogPostId = $routeParams.blogPostId;

                if (comment) {
                    comment.author = {};
                    comment.author.id = (user) ? user.id : null;
                }

                var onSuccess = function() {
                    $scope.comment = null;
                };
                var onError =  function() {};

                CommentService.addComment(comment, blogPostId, onSuccess, onError);

                $scope.comment = null;
            };
        }
    );
