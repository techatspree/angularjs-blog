joCache.set("NewPostView", function() {
    var inputTitle, inputContent;

    var card = new joCard([
        new joGroup([
            new joLabel("Title"),
            new joFlexrow(inputTitle = new joInput("")),
            new joLabel("Content"),
            new joFlexrow(inputContent = new joTextarea("")),
        ]),
        new joDivider(),
        new joButton("Submit").selectEvent.subscribe(function() {
            var blogPost = {};
            blogPost.title = inputTitle.getData();
            blogPost.content = inputContent.getData();

            App.BlogEntryService.addBlogEntry(blogPost, function(){
                console.log("success");
                App.stack.pop();
            });
        })
    ]);

    card.setTitle("New Blog Post");

    return card;
});
