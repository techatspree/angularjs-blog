App.LoginScreen = function() {
    var inputUser, inputPass;

    var view;

    var init = function() {
        view = new joCard([
            new joTitle("Login"),
            new joFlexcol([
                new joDivider(),
                new joGroup([
                    new joCaption("User Name"),
                    new joFlexrow(inputUser = new joInput("")),
                    new joCaption("Password"),
                    new joFlexrow(inputPass = new joPasswordInput(""))
                ]),
                new joButton("Login").selectEvent.subscribe(onLoginClicked),
                new joDivider(),
                new joButton("Register").selectEvent.subscribe(onRegisterClicked),
            ])
        ]);
    };

    /*
     * Interaction listeners
     */
    var onRegisterClicked = function() {
        var mainContainer = hub.getComponent("mainScreen").getMainContainer();

        mainContainer.stack.push(App.RegisterScreen.get());
        App.RegisterScreen.refresh();
    }

    var onLoginClicked = function() {
        var mainContainer = hub.getComponent("mainScreen").getMainContainer();

        var user = {};
        user.username = inputUser.getData();
        user.password = inputPass.getData();

        // perform login
        App.UserService.login(user,
            function(user) {
                mainContainer.stack.pop();
            },
            function(error) {
                mainContainer.scn.alert("Login", "Login failed");
            });

        mainContainer.scn.hidePopup();
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
