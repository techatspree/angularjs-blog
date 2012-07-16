App.BlogPostScreen = function() {
    var view;
    var blogPostId = 0;
    var btnSubmit;

    var init = function() {
        view = new joGroup(
            new joFlexcol([
                new joHTML("<div id='blogEntryContainer' />"),
                new joDivider(),
                new joHTML("<h4>Comments</h4>"),
                new joHTML("<div id='commentList' />"),
                new joButton("Add comment").selectEvent.subscribe(onAddCommentClicked)
            ])
        ).setTitle("Blog Post")
    }

    /*
     * interaction listeners
     */
    var onAddCommentClicked = function() {
        if (!App.UserService.isLoggedIn()) {
            App.postLoginAction = function() {
                App.stack.push(App.AddCommentScreen.get());
            }
            App.stack.push(App.LoginScreen.get());
        }
        else {
            App.stack.push(App.AddCommentScreen.get());
        }
    }

    return {
        /*
         * Manually refresh the screen.
         */
        refresh : function(id) {
            if (id) {
                blogPostId = id;
            }

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
