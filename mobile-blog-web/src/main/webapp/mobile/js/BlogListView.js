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
        return false;
    }

	var btnAddPost;

	var card = new joCard([
		new joGroup(
            new joFlexcol([
                 new joButton('Add Post', 'btnAddPost')
                        .selectEvent.subscribe(onAddPostClicked),
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
            App.BlogEntryFrontend.updateWithBlogList($('#blogEntryList'))  ;
        }
    });

	card.setTitle("Blog Demo");

	return card;
});


