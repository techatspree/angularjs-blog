joCache.set("BlogListView", function() {
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
    }

	var btnAddPost;

	var card = new joCard([
		new joGroup(
            new joFlexcol([
                 new joFlexrow([
                 btnAddPost = new joButton('Add Post', 'btnAddPost')
                        .selectEvent.subscribe(onAddPostClicked)
                 ]),
                 new joDivider(),
                 new joHTML("<div id='blogEntryList' />")
            ])
		)
	]);

    $.ajax({
        url: "../template/BlogListEntry.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            App.BlogEntryFrontend.updateBlogTable($('#blogEntryList'))  ;
        }
    });

	// hey, you don't have to make messy chained and
	// inlined code; that's a coding style decision
	// Jo doesn't pretend it should make for you.
	card.setTitle("Blog Demo");

	return card;
});


