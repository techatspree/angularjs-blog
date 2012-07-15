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
                     new joButton('Add Post', 'btnAddPost')
                            .selectEvent.subscribe(onAddPostClicked),
                     new joDivider(),
                     new joHTML("<div id='blogEntryList' />")
                ])
            )
        ]).setTitle("Blog Demo");
    }

    /*
     * Listeners
     */
    var onAddPostClicked = function() {
        if (!App.UserService.isLoggedIn()) {
            App.postLoginAction = function() {
                App.stack.push(joCache.get("NewPostView"));
            }
            App.scn.showPopup(joCache.get("LoginView"));
        }
        else {
            App.stack.push(joCache.get("NewPostView"));
        }
        return false;
    };

    /*
     * Initializsation
     */

    // Register event listener to refresh the screen when the data changes
    $(document).on('BlogEntryService:change', function(e){
        if ($('#blogEntryList').length == 0) {
            return;
        }

        console.log("change!");
        App.BlogListScreen.refresh();
    });

    return {
        /*
         * Manually refresh the list of blog entries
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