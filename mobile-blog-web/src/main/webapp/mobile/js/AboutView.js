//App.AboutView = function(){
//    return {}
//}


// using joCache here to defer creation of this
// view until we actually use it
joCache.set("AboutView", function() {
	var htmlElement = new joHTML();

	var card = new joCard([
		new joTitle("About this app"),
		new joGroup(
		    htmlElement
		)
	]);

	card.setTitle("Blog Demo");

    $.ajax({
        url: "html/about.html",
        dataType: "html",
        success: function(data) {
            htmlElement.setData(data);
        }
    });

	return card;
});





//		new joGroup(
//		    new joHTML(" \
//		        <p> \
//                    This is a cool AeroGear Demo. \
//                </p> \
//		    ")
//		)