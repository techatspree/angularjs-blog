App.BlogPostScreen = function() {
    var view;
    var postId = 0;

    var refreshPost = function() {
        if ($('#blogEntryContainer').length > 0) {
            hub.getComponent("blogPostFrontend").updateWithBlogPost(postId);
        }
    };

    var refreshComments = function() {
        if ($('#commentList').length > 0) {
            hub.getComponent("blogPostFrontend").updateWithComments(postId);
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
            App.AddCommentScreen.refresh(postId);
        }
    }

    return {
        /*
         * Manually refresh the screen.
         */
        refresh : function(id) {
            if (id) {
                postId = id;
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
