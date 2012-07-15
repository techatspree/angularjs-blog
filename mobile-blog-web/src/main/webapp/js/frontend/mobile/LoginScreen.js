App.LoginScreen = function() {
    var inputUser, inputPass;

    var view;

    var init = function() {
        view = [
            new joTitle("Login"),
            new joGroup([
                new joCaption("User Name"),
                new joFlexrow(inputUser = new joInput("")),
                new joCaption("Password"),
                new joFlexrow(inputPass = new joPasswordInput(""))
            ]),
            new joFlexrow([
                new joButton("Login").selectEvent.subscribe(onLoginClicked),
                new joButton("Cancel").selectEvent.subscribe(function() {
                    App.LoginScreen.refresh();
                    App.scn.hidePopup();
            })
            ])
        ];
    };

    /*
     * Interaction listeners
     */
    function onLoginClicked() {
        console.log("hide popup");

        // perform login
        App.UserService.login(inputUser.getData(), inputPass.getData(), App.postLoginAction,
            function(data) {
                // TODO: success case, token handling
            },
            function(error) {
                // TODO: failure case
            });

        App.scn.hidePopup();
    }

    return {
        refresh: function() {
            inputUser.setData("");
            inputPass.setData("");
        },

        /*
         * Return the root view. Initialize if necessary.
         */
        get : function() {
            if (!view) {
                init();
            }

            return view;
        }
    }
}();
