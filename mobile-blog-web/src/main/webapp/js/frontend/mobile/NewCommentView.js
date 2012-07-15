joCache.set("NewCommentView", function() {
    var inputComment;

    var onSubmitClick = function() {
        var comment = {};
        comment.content = inputComment.getData();

        App.BlogEntryService.addComment(App.currentBlogPostId, comment, function() {
            App.stack.pop();
        });
    }

    var card = new joCard([
        new joGroup([
            new joLabel("Content"),
            new joFlexrow(inputComment = new joTextarea("")),
        ]),
        new joDivider(),
        new joButton("Submit").selectEvent.subscribe(onSubmitClick)
    ]);

    card.setTitle("New Comment");

    return card;
});
