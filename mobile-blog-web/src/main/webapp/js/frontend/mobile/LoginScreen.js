App.LoginScreen = function() {
    var inputUser, inputPass;

    var view;

    var init = function() {
        view = new joCard([
            new joTitle("Login"),
            new joFlexcol([
                new joDivider(),
                new joButton("Register").selectEvent.subscribe(onRegisterClicked),
                new joDivider(),
                new joGroup([
                    new joCaption("User Name"),
                    new joFlexrow(inputUser = new joInput("")),
                    new joCaption("Password"),
                    new joFlexrow(inputPass = new joPasswordInput(""))
                ]),
                new joFlexrow([
                    new joButton("Login").selectEvent.subscribe(onLoginClicked),
                ])
            ])
        ]);
    };

    /*
     * Interaction listeners
     */
    var onRegisterClicked = function() {
        App.stack.push(App.RegisterScreen.get());
    }

    var onLoginClicked = function() {
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
