App.BlogPostScreen = function() {
    var view;
    var blogPostId = 0;
    var btnSubmit;

    var refreshPost = function() {
        if ($('#blogEntryContainer').length > 0) {
            App.BlogEntryFrontend.updateWithBlogPost($('#blogEntryContainer'), blogPostId);
        }
    };

    var refreshComments = function() {
        if ($('#commentList').length > 0) {
            App.BlogEntryFrontend.updateWithComments($('#commentList'), blogPostId);
        }
    };

    var init = function() {
        view = new joCard([
            new joGroup(
                new joFlexcol([
                    new joHTML("<div id='blogEntryContainer' />"),
                    new joDivider(),
                    new joHTML("<h4>Comments</h4>"),
                    new joHTML("<div id='commentList' />"),
                    new joButton("Add comment").selectEvent.subscribe(onAddCommentClicked)
                ])
            )]);

        App.stack.popEvent.subscribe(function(){
            refreshComments();
        });
    }

    /*
     * interaction listeners
     */
    var onAddCommentClicked = function() {
        if (!App.UserService.isLoggedIn()) {
            App.stack.push(App.LoginScreen.get());
        }
        else {
            App.stack.push(App.AddCommentScreen.get());
            App.AddCommentScreen.refresh(blogPostId);
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

            refreshPost();
            refreshComments();
        },

        get : function() {
            if (!view) {
                init();
            }

            return view;
        }
    }
}();
