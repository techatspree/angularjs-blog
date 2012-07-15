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

    var refresh = function() {
        App.BlogEntryFrontend.updateWithComments($('#commentList'));
    }

	var card = new joCard([
		new joGroup(
		    new joFlexcol([
		        new joHTML("<div id='blogEntryContainer' />"),
		        new joDivider(),
		        new joHTML("<div id='commentList' />"),
	    	    new joButton("Add comment").selectEvent.subscribe(onAddComClicked)
		    ])
		)
	]);

    // TODO: use own eventing
//    App.BlogEntryFrontend.changeEvent.subscribe(function(data) {
//        if ($('#blogEntryContainer').length == 0) {
//            return;
//        }
//
//        refresh();
//    }, this);

	card.setTitle("Blog Demo");

	return card;
});


