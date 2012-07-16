/*
 * Screen to write a new comment.
 */

App.AddCommentScreen = function() {
    var view;
    var inputComment;

    var blogPostId;

    /*
     * UI
     */
    var init = function() {
        view =  new joCard([
            new joGroup([
               new joLabel("Content"),
               new joFlexrow(inputComment = new joTextarea("")),
            ]),
            new joDivider(),
            new joButton("Submit").selectEvent.subscribe(onSubmitClicked),
        ]);
    }

    /*
     * interaction listeners
     */
    var onSubmitClicked = function() {
        var comment = {};
        comment.content = inputComment.getData();

        App.BlogEntryService.addComment(blogPostId, comment, function() {
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
        refresh : function(id) {
            blogPostId = id;
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
