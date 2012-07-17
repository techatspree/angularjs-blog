App = {
	fetchTemplates: function() {
        $.ajax({
            url: "../js/template/BlogListEntry.tmpl",
            dataType: "html",
            success: function(data) {
                $("head").append(data);
            }
        });

        $.ajax({
            url: "../js/template/BlogEntry.tmpl",
            dataType: "html",
            success: function(data) {
                $("head").append(data);
            }
        });

        $.ajax({
            url: "../js/template/Comment.tmpl",
            dataType: "html",
            success: function(data) {
                $("head").append(data);
            }
        });
	},

	load: function() {
	    App.fetchTemplates();

	    var searchString = window.location.search.substring(1),
                    params = searchString.split("&"),
                    keyValueHash = {};

	    for (var i = 0; i < params.length; i++) {
	        var val = params[i].split("=");
	        keyValueHash[unescape(val[0])] = unescape(val[1]);
	    }

        var postID = keyValueHash['showPost'];

	    if(postID != null)
	    {
            $("#content").append(App.BlogPostNode.get());
            App.BlogPostNode.refresh(postID);
	    }
	    else{
            $.ajax({
                url: "../js/template/BlogListEntry.tmpl",
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

            App.BlogEntryFrontend.updateWithBlogList($('#content'));
        }
	},

	openBlogPost: function(id) {
        document.location.href = "?showPost=" + id;
    }
};