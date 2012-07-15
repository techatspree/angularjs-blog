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
            new joGroup(
                new joFlexcol([
                     new joButton('Add Post')
                            .selectEvent.subscribe(onAddPostClicked),
                     new joDivider(),
                     new joHTML("<div id='blogEntryList' />")
                ])
            )
        ]).setTitle("Blog Demo");

        // Register event listener to refresh the screen when the data changes
        $(document).on('BlogEntryService:change', function(e){
            if ($('#blogEntryList').length == 0) {
                return;
            }

            console.log("change!");
            App.BlogListScreen.refresh();
        });
    }

    /*
     * interaction listeners
     */
    var onAddPostClicked = function() {
        if (!App.UserService.isLoggedIn()) {
            App.postLoginAction = function() {
                App.stack.push(App.AddPostScreen.get());
            }
            App.scn.showPopup(App.LoginScreen.get());
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
            App.BlogEntryFrontend.updateWithBlogList($('#blogEntryList'));
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
    }
}();