joCache.set("LoginView", function() {
	var inputUser, inputPass;

	var popup = [
		new joTitle("Login"),
		new joGroup([
			new joCaption("User Name"),
			new joFlexrow(inputUser = new joInput("")),
			new joCaption("Password"),
			new joFlexrow(inputPass = new joPasswordInput(""))
		]),
        new joFlexrow([
		    new joButton("Login").selectEvent.subscribe(onLoginClicked),
		    new joButton("Cancel").selectEvent.subscribe(function(){App.scn.hidePopup();})
		])
	];

	function onLoginClicked() {
		console.log("hide popup");

        // perform login
        App.UserService.login(inputUser.getData(), inputPass.getData(), function() {
            App.stack.push(joCache.get("NewPostView"));
        });

		App.scn.hidePopup();
	}

	return popup;
});