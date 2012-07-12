// using joCache here to defer creation of this
// view until we actually use it
joCache.set("BlogListView", function() {
	var card = new joCard([
		new joGroup(
		    new joHTML(" \
		        <div id=\"blogEntryList\"></div> \
		    ")
		)
	]);

    var updateBlogTable = function() {
        // TODO: Error handling
        App.BlogEntryService.retrieveBlogEntries(function(result){
            $('#blogEntryList').empty().append(buildBlogEntryRows(result));
        });
    };

	/* Builds the updated table for the member list */
    var buildBlogEntryRows = function(blogEntries) {
        return _.template( $( "#blogentrylist-tmpl" ).html(), {"blogEntries": blogEntries});
    }

    $.ajax({
        url: "template/BlogEntryList.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            updateBlogTable();
        }
    });

	// hey, you don't have to make messy chained and
	// inlined code; that's a coding style decision
	// Jo doesn't pretend it should make for you.
	card.setTitle("Aerogear Blog Demo");

	return card;
});


