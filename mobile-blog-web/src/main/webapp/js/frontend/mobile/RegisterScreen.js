/**
 * @author Till Hermsen
 * @date 11.10.12
 */
registerScreenContract = {

    init: function() {}

}

registerScreen = {

    hub: null,

    // joApp elements
    inputUser:      null,
    inputPass:      null,
    inputFirstname: null,
    inputSurname:   null,
    inputEmail:     null,
    inputPhone:     null,

    validateUsername:  null,
    validatePassword:  null,
    validateFirstname: null,
    validateSurname:   null,
    validateEmail:     null,
    validatePhone:     null,


    // Services
    userService: null,
    mainScreenService: null,

    // HTML Templates

    // HTML selectors


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'registerScreen';
    },

    /**
     * Configure method. This method is called when the
     * component is registered on the hub.
     * @param theHub the hub
     * @param the object used to configure this component
     */
    configure: function(theHub, configuration) {
        this.hub = theHub;

        // Required services
        this.hub.requireService({
            component: this,
            contract: userServiceContract,
            field: "userService"
        });
        this.hub.requireService({
            component: this,
            contract: mainScreenContract,
            field: "mainScreenService"
        });

        // Provide service
        this.hub.provideService({
            component: this,
            contract: registerScreenContract
        });

        // Configuration
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {},

    /**
     * The Stop method is called when the hub stops or
     * just after the component removal if the hub is
     * not stopped. No events can be send in this method.
     */
    stop: function() {},


    /**
     * Contract methods.
     */

    init: function() {
        var self = this;

        self.hub.subscribe(self, "/registerScreen/refresh", self.refresh);

        var mainContainer = self.mainScreenService.getMainContainer();

        /**
         * Interaction listeners
         */
        var onRegisterClicked = function() {
            var user = {};
            user.username  = self.inputUser.getData();
            user.password  = self.inputPass.getData();
            user.firstname = self.inputFirstname.getData();
            user.surname   = self.inputSurname.getData();
            user.email     = self.inputEmail.getData();
            user.phone     = self.inputPhone.getData();

            // perform login
            self.clearValidationErrors();
            self.userService.register(user,
                function(data) {
                    mainContainer.stack.pop();
                },
                function(error) {
                    self.showError(JSON.parse(error.response));
                });

            mainContainer.scn.hidePopup();
        }


        var view = new joCard([
            new joTitle("Register"),
            new joGroup([
                new joFlexrow([new joCaption("User Name"), self.validateUsername = new joView()]),
                new joFlexrow([self.inputUser = new joInput()]),
                new joFlexrow([new joCaption("Password"), self.validatePassword = new joView()]),
                new joFlexrow([self.inputPass = new joPasswordInput()]),
                new joFlexrow([new joCaption("First Name"), self.validateFirstname = new joView()]),
                new joFlexrow([self.inputFirstname = new joInput()]),
                new joFlexrow([new joCaption("Surname"), self.validateSurname = new joView()]),
                new joFlexrow([self.inputSurname = new joInput()]),
                new joFlexrow([new joCaption("Email"), self.validateEmail = new joView()]),
                new joFlexrow([self.inputEmail = new joInput("", "email")]),
                new joFlexrow([new joCaption("Phone"), self.validatePhone = new joView()]),
                new joFlexrow([self.inputPhone = new joInput("", "number")]),
            ]),
            new joFlexrow([
                new joButton("Register").selectEvent.subscribe(onRegisterClicked),
            ])
        ]);

        mainContainer.stack.push(view);


        self.refresh(null);
    },


    /**
     * Private methods.
     */

    refresh: function(event) {

    },

    showError: function(error) {
        if (error.username)  {this.validateUsername.setData('<div class="validationError">' + error.username + '</div>');}
        if (error.password)  {this.validatePassword.setData('<div class="validationError">' + error.password + '</div>');}
        if (error.firstname) {this.validateFirstname.setData('<div class="validationError">' + error.firstname + '</div>');}
        if (error.surname)   {this.validateSurname.setData('<div class="validationError">' + error.surname + '</div>');}
        if (error.email)     {this.validateEmail.setData('<div class="validationError">' + error.email + '</div>');}
        if (error.phone)     {this.validatePhone.setData('<div class="validationError">' + error.phone + '</div>');}
    },

    clearValidationErrors: function() {
        this.validateUsername.setData("");
        this.validatePassword.setData("");
        this.validateFirstname.setData("");
        this.validateSurname.setData("");
        this.validateEmail.setData("");
        this.validatePhone.setData("");
    }

}
