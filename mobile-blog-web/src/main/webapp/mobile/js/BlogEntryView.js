// using joCache here to defer creation of this
// view until we actually use it
joCache.set("BlogEntryView", function() {
	var card = new joCard([
		new joGroup(
		    new joHTML(" \
		        <div id=\"blogEntryContainer\"></div> \
		    ")
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


