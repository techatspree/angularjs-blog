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

    var retrieveBlogEntry = function() {
        // TODO: Error handling
        App.BlogEntryService.retrieveBlogEntry(App.currentBlogPostId, function(result){
            $('#blogEntryContainer').empty().append(buildBlogEntry(result));
        });
    };

	/* Builds the updated table for the member list */
    var buildBlogEntry = function(blogEntry) {
        return _.template( $( "#blogentry-tmpl" ).html(), {"blogEntry": blogEntry});
    }

    $.ajax({
        url: "../template/BlogEntry.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            retrieveBlogEntry();
        }
    });

	// hey, you don't have to make messy chained and
	// inlined code; that's a coding style decision
	// Jo doesn't pretend it should make for you.
	card.setTitle("Blog Demo");

	return card;
});


