/**
 * @author Till Hermsen
 * @date 11.10.12
 */
var registerScreenContract = {

    init: function() {}

}

var registerScreen = {

    hub: null,

    // joApp elements
    inputFields: {
        inputUser:      null,
        inputPass:      null,
        inputFirstname: null,
        inputSurname:   null,
        inputEmail:     null,
        inputPhone:     null
    },

    validationViews: {
        username:  null,
        password:  null,
        firstname: null,
        surname:   null,
        email:     null,
        phone:     null
    },


    // Services
    userService: null,
    mainScreenService: null,


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
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        this.hub.subscribe(this, "/registerScreen/init", this.initEvent);
    },

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

        var mainContainer = self.mainScreenService.getMainContainer();

        /**
         * Interaction listeners
         */
        var onRegisterClicked = function() {
            var user = {};
            user.username  = self.inputFields.inputUser.getData();
            user.password  = self.inputFields.inputPass.getData();
            user.firstname = self.inputFields.inputFirstname.getData();
            user.surname   = self.inputFields.inputSurname.getData();
            user.email     = self.inputFields.inputEmail.getData();
            user.phone     = self.inputFields.inputPhone.getData();

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


        // View
        var view = new joCard([
            new joTitle("Register"),
            new joGroup([
                new joFlexrow([
                    new joCaption("User Name"),
                    self.validationViews.username = new joView()
                ]),
                new joFlexrow([self.inputFields.inputUser = new joInput()]),
                new joFlexrow([
                    new joCaption("Password"),
                    self.validationViews.password = new joView()
                ]),
                new joFlexrow([self.inputFields.inputPass = new joPasswordInput()]),
                new joFlexrow([
                    new joCaption("First Name"),
                    self.validationViews.firstname = new joView()
                ]),
                new joFlexrow([self.inputFields.inputFirstname = new joInput()]),
                new joFlexrow([
                    new joCaption("Surname"),
                    self.validationViews.surname = new joView()
                ]),
                new joFlexrow([self.inputFields.inputSurname = new joInput()]),
                new joFlexrow([
                    new joCaption("Email"),
                    self.validationViews.email = new joView()
                ]),
                new joFlexrow([self.inputFields.inputEmail = new joInput("", "email")]),
                new joFlexrow([
                    new joCaption("Phone"),
                    self.validationViews.phone = new joView()
                ]),
                new joFlexrow([self.inputFields.inputPhone = new joInput("", "number")])
            ]),
            new joFlexrow([
                new joButton("Register").selectEvent.subscribe(onRegisterClicked)
            ])
        ]);

        mainContainer.stack.push(view);


        // Registering event listener
        self.hub.subscribe(self, "/registerScreen/refresh", self.refreshEvent);

        self.refresh();
    },


    /**
     * Private methods.
     */

    initEvent: function(event) {
        this.init();
    },

    refreshEvent: function(event) {
        this.refresh();
    },

    refresh: function() {
        $.each(this.inputFields, function(index, item) {
            item.setData("");
        });
        
        this.clearValidationErrors();
    },

    showError: function(error) {
        $.each(this.validationViews, function(index, item) {
            if (error[index]) {
                item.setData(
                    '<div class="validationError">' + error[index] + '</div>'
                );
            }
        });
    },

    clearValidationErrors: function() {
        $.each(this.validationViews, function(index, item) {
            item.setData("");
        });
    }

}
