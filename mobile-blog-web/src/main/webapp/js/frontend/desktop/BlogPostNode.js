App.BlogPostNode = function() {
    var view;
    var btnSubmit;

    var init = function() {
        view = "<div id='blogEntryContainer'></div><br/><h4>Comments</h4><div id='commentList'></div>";
    }

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
        },

        get : function() {
            if (!view) {
                init();
            }

            return view;
        }
    }
}();
