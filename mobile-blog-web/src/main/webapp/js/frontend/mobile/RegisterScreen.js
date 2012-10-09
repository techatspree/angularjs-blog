App.RegisterScreen = function() {
    var inputUser, inputPass;
    var inputFirstname, inputSurname, inputEmail, inputPhone;

    var validateUsername, validatePassword;
    var validateFirstname, validateSurname, validateEmail, validatePhone;

    var view;

    var init = function() {
        view = new joCard([
            new joTitle("Register"),
            new joGroup([
                new joFlexrow([new joCaption("User Name"), validateUsername = new joView()]),
                new joFlexrow([inputUser = new joInput()]),
                new joFlexrow([new joCaption("Password"), validatePassword = new joView()]),
                new joFlexrow([inputPass = new joPasswordInput()]),
                new joFlexrow([new joCaption("First Name"), validateFirstname = new joView()]),
                new joFlexrow([inputFirstname = new joInput()]),
                new joFlexrow([new joCaption("Surname"), validateSurname = new joView()]),
                new joFlexrow([inputSurname = new joInput()]),
                new joFlexrow([new joCaption("Email"), validateEmail = new joView()]),
                new joFlexrow([inputEmail = new joInput("", "email")]),
                new joFlexrow([new joCaption("Phone"), validatePhone = new joView()]),
                new joFlexrow([inputPhone = new joInput("", "number")]),
            ]),
            new joFlexrow([
                new joButton("Register").selectEvent.subscribe(onRegisterClicked),
            ])
        ]);
    };

    var showError = function(error) {
        if (error.username) {validateUsername.setData('<div class="validationError">' + error.username + '</div>');}
        if (error.password) {validatePassword.setData('<div class="validationError">' + error.password + '</div>');}
        if (error.firstname) {validateFirstname.setData('<div class="validationError">' + error.firstname + '</div>');}
        if (error.surname) {validateSurname.setData('<div class="validationError">' + error.surname + '</div>');}
        if (error.email) {validateEmail.setData('<div class="validationError">' + error.email + '</div>');}
        if (error.phone) {validatePhone.setData('<div class="validationError">' + error.phone + '</div>');}
    };

    var clearValidationErrors = function() {
        validateUsername.setData("");
        validatePassword.setData("");
        validateFirstname.setData("");
        validateSurname.setData("");
        validateEmail.setData("");
        validatePhone.setData("");
    };

    /*
     * Interaction listeners
     */
    function onRegisterClicked() {
        var mainContainer = hub.getComponent("mainScreen").getMainContainer();

        var user = {};
        user.username = inputUser.getData();
        user.password = inputPass.getData();
        user.firstname = inputFirstname.getData();
        user.surname = inputSurname.getData();
        user.email = inputEmail.getData();
        user.phone = inputPhone.getData();

        // perform login
        clearValidationErrors();
        App.UserService.register(user,
            function(data) {
                mainContainer.stack.pop();
            },
            function(error) {
                showError(JSON.parse(error.response));
            });

        mainContainer.scn.hidePopup();
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
