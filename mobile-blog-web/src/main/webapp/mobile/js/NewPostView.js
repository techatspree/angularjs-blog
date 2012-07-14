joCache.set("NewPostView", function() {
    var card = new joCard([
        new joGroup([
            new joLabel("Title"),
            new joFlexrow(new joInput("")),
            new joLabel("Content"),
            new joFlexrow(new joTextarea("")),
            new joFlexrow([
                new joLabel("Left Aligned").setStyle({className:"left", marginTop:"2px"}),
                new joInput("From CSS").setStyle({width: "150px", marginBottom: "0"})
            ])
        ]),
        new joDivider(),
        new joButton("Submit")
    ]);

    card.setTitle("New Blog Post");

    return card;
});
