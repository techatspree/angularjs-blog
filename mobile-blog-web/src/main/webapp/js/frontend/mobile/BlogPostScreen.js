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
        var mainContainer = hub.getComponent("mainScreen").getMainContainer();

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

        mainContainer.stack.popEvent.subscribe(function(){
            refreshComments();
        });
    }

    /*
     * interaction listeners
     */
    var onAddCommentClicked = function() {
        var mainContainer = hub.getComponent("mainScreen").getMainContainer();

        if (!App.UserService.isLoggedIn()) {
            mainContainer.stack.push(App.LoginScreen.get());
        }
        else {
            mainContainer.stack.push(App.AddCommentScreen.get());
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
