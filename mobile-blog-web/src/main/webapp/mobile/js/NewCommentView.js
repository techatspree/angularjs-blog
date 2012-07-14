joCache.set("NewCommentView", function() {
    var card = new joCard([
        new joGroup([
            new joLabel("Title"),
            new joFlexrow(new joInput("")),
            new joLabel("Content"),
            new joFlexrow(new joTextarea("")),
        ]),
        new joDivider(),
        new joButton("Submit")
    ]);

    card.setTitle("New Comment");

    return card;
});
