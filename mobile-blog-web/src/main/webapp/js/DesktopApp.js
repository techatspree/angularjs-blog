App = {
	load: function() {
        $.ajax({
            url: "../template/BlogListEntry.tmpl",
            dataType: "html",
            success: function( data ) {
                $( "head" ).append( data );
            }
        });

        for(var i=0; i < $('article').length; i++) {
            $("#postButton" + i).on('click', function() {
                App.openBlogPost(i);
                return false;
            });
        }
	},

	openBlogPost: function(id) {
        document.location.href = "?showPost=" + id;
    }
};