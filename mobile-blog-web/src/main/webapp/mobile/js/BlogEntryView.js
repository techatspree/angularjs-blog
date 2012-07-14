// using joCache here to defer creation of this
// view until we actually use it
joCache.set("BlogEntryView", function() {
	var onAddComClicked = function() {
        if (!App.UserService.isLoggedIn()) {
            App.postLoginAction = function() {
                App.stack.push(joCache.get("NewCommentView"));
            }
            App.scn.showPopup(joCache.get("LoginView"));
        }
        else {
            App.stack.push(joCache.get("NewCommentView"));
        }
	}

	var card = new joCard([
		new joGroup(
		    new joFlexcol([
		        new joHTML("<div id='blogEntryContainer' />"),
		        new joDivider(),
	    	    new joButton("Add comment").selectEvent.subscribe(onAddComClicked)
		    ])
		)
	]);

    $.ajax({
        url: "../template/BlogEntry.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            App.BlogEntryFrontend.updateWithBlogPost($('#blogEntryContainer'), App.currentBlogPostId);
        }
    });

	// hey, you don't have to make messy chained and
	// inlined code; that's a coding style decision
	// Jo doesn't pretend it should make for you.
	card.setTitle("Blog Demo");

	return card;
});


