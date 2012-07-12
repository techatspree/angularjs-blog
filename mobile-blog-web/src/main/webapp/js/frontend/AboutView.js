//App.AboutView = function(){
//    return {}
//}


// using joCache here to defer creation of this
// view until we actually use it
joCache.set("about", function() {
	// some inline data and chaining going on here,
	// dont be afraid, it'll all make sense later
	var card = new joCard([
		new joTitle("About this app"),
		new joGroup(
		    new joHTML(" \
		        <p> \
                    This is a cool AeroGear Demo. \
                </p> \
		    ")
		)
	]);

	// hey, you don't have to make messy chained and
	// inlined code; that's a coding style decision
	// Jo doesn't pretend it should make for you.
//	card.setTitle("Jo Kitchen Sink Demo");

	return card;
});
