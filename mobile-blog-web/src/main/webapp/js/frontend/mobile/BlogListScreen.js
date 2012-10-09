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

        var mainContainer = hub.getComponent("mainScreen").getMainContainer();

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



        mainContainer.stack.popEvent.subscribe(function(){
            App.BlogListScreen.refresh();
        });
    };

    /*
     * interaction listeners
     */
    var onAddPostClicked = function() {
        var mainContainer = hub.getComponent("mainScreen").getMainContainer();

        if (!App.UserService.isLoggedIn()) {
            mainContainer.stack.push(App.LoginScreen.get());
        }
        else {
            mainContainer.stack.push(App.AddPostScreen.get());
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
            console.log("load blog posts...")
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