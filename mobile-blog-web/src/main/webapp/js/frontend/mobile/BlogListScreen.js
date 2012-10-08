/*
 * Screen with the list of blog posts.
 */

App.BlogListScreen = function() {
    var view;
    var btnAddPost;

    /*
     * UI
     */
    var init = function() {
        view = new joCard([
            new joTitle("Blog Post Demo"),
            new joGroup(
                new joFlexcol([
                     new joButton('Add Post').selectEvent.subscribe(onAddPostClicked),
                     new joDivider(),
                     new joHTML("<div id='blogEntryList' />")
                ])
            )
        ]).setTitle("Blog Demo");

        App.stack.popEvent.subscribe(function(){
            App.BlogListScreen.refresh();
        });
    };

    /*
     * interaction listeners
     */
    var onAddPostClicked = function() {
        if (!App.UserService.isLoggedIn()) {
            App.stack.push(App.LoginScreen.get());
        }
        else {
            App.stack.push(App.AddPostScreen.get());
        }
        return false;
    };

    /*
     * Public interface
     */
    return {
        /*
         * Manually refresh the screen.
         */
        refresh : function() {
            if ($('#blogEntryList').length == 0) {
                return;
            }
            hub.getComponent("blogPostFrontend").updateWithBlogList();
        },

        /*
         * Return the root view. Initialize if necessary.
         */
        get : function() {
            if (!view) {
                init();
            }

            return view;
        }
    };
}();