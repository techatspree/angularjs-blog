/*
 * Screen to write a new blog post.
 */

App.AddPostScreen = function() {
    var view;
    var inputTitle, inputContent;

    /*
     * UI
     */
    var init = function() {
        view = new joCard([
            new joGroup([
               new joLabel("Title"),
               new joFlexrow(inputTitle = new joInput("")),
               new joLabel("Content"),
               new joFlexrow(inputContent = new joTextarea("")),
            ]),
            new joDivider(),
            new joButton("Submit").selectEvent.subscribe(onSubmitClicked),
        ]);
    }

    /*
     * interaction listeners
     */
    var onSubmitClicked = function() {
        var blogPost = {};
        blogPost.title = inputTitle.getData();
        blogPost.content = inputContent.getData();

        App.BlogEntryService.addBlogEntry(blogPost, function() {
            console.log("success");
            App.stack.pop();
        });
    }

    /*
     * Public interface
     */
    return {
        /*
         * Manually refresh the screen.
         */
        refresh : function() {
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
