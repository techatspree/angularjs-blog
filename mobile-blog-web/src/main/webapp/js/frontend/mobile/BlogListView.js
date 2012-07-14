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
            $('#blogEntryList').empty();
            appendBlogEntryRows($('#blogEntryList'), result);
        });
    }

	/* Builds the updated table for the member list */
    var appendBlogEntryRows = function(root, blogEntries) {
         _.each(blogEntries, function(blogEntry) {
            var template = _.template($("#bloglistentry-tmpl" ).html());
            root.append(template({"blogEntry": blogEntry.blogEntry}));
        });

        for(var i=0; i < blogEntries.length; i++) {
        	$("#postButton" + i).onpress(function() {
        	    App.openBlogPost(i);
        	    return false;
        	});
        }
    }

    $.ajax({
        url: "template/BlogListEntry.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            updateBlogTable();
        }
    });

	// hey, you don't have to make messy chained and
	// inlined code; that's a coding style decision
	// Jo doesn't pretend it should make for you.
	card.setTitle("Blog Demo");

	return card;
});


