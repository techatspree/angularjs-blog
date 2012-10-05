App.BlogPostNode = function() {

    return {
        /*
         * Manually refresh the screen.
         */
        refresh : function(blogPostId) {

            if ($('#blogEntryContainer').length > 0) {
                App.BlogEntryFrontend.updateWithBlogPost($('#blogEntryContainer'), blogPostId);
            }
            if ($('#commentList').length > 0) {
                App.BlogEntryFrontend.updateWithComments($('#commentList'), blogPostId);
            }

            if (App.UserService.isLoggedIn()) {
                var addCommentForm = $("#addCommentFormContainer");

                if (addCommentForm) {
                    addCommentForm.remove();
                }

                $("#commentList").after(_.template($("#desktopcommentform-tmpl").html(), {}));
                $("#submitComment").on("click", function(e) {
                    App.BlogAddComment.onSubmitClicked(blogPostId);
                    return false;
                });
            }
        },

        get : function() {
            return $("#desktopblogentry-tmpl").html();
        }
    }
}();
