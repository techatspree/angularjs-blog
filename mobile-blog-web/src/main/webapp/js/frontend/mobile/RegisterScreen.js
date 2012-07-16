App.RegisterScreen = function() {
    var inputUser, inputPass;
    var inputFirstname, inputSurname, inputEmail, inputPhone;

    var view;

    var init = function() {
        view = new joCard([
            new joTitle("Register"),
            new joGroup([
                new joCaption("User Name"),
                new joFlexrow(inputUser = new joInput("")),
                new joCaption("Password"),
                new joFlexrow(inputPass = new joPasswordInput("")),
                new joCaption("First Name"),
                new joFlexrow(inputFirstname = new joInput("")),
                new joCaption("Last Name"),
                new joFlexrow(inputSurname = new joInput("")),
                new joCaption("Email"),
                new joFlexrow(inputEmail = new joInput("")),
                new joCaption("Phone"),
                new joFlexrow(inputPhone = new joInput("")),
            ]),
            new joFlexrow([
                new joButton("Register").selectEvent.subscribe(onRegisterClicked)
            ])
        ]);
    };

    /*
     * Interaction listeners
     */
    function onRegisterClicked() {
        console.log("hide popup");

        var user = {};
        user.username = inputUser.getData();
        user.password = inputPass.getData();
        user.firstname = inputFirstname.getData();
        user.surname = inputSurname.getData();
        user.email = inputEmail.getData();
        user.phone = inputPhone.getData();

        // perform login
        App.UserService.register(user,
            function(data) {
                console.log("success");
                App.scn.hidePopup();
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
            inputFirstname.setData("");
            inputSurname.setData("");
            inputEmail.setData("");
            inputPhone.setData("");
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
