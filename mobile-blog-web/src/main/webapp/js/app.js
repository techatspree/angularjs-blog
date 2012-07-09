
/* Get the blog template */
function getBlogEntryTemplate() {
	$.ajax({
        url: "template/blog.tmpl",
        dataType: "html",
        success: function( data ) {
            $( "head" ).append( data );
            updateBlogTable();
        }
    });
}

/* Builds the updated table for the member list */
function buildBlogEntriesRows(blogEntries) {
	return _.template( $( "#blog-tmpl" ).html(), {"blogEntries": blogEntries});
}

/* Uses JAX-RS GET to retrieve current member list */
function updateBlogTable() {
   $.ajax({
	   url: "rest/blog",
	   cache: false,
	   success: function(data) {
            $('#blogEntries').empty().append(buildBlogEntriesRows(data));
       },
       error: function(error) {
            console.log("error updating table -" + error.status);
       }
   });
}
