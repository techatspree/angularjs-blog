/**
 * @author Till Hermsen
 * @date 11.10.12
 */
loginScreenContract = {

    init: function() {}

}

loginScreen = {

    hub: null,

    // joApp elements
    inputUser: null,
    inputPass: null,

    // Services
    userService: null,
    mainScreenService: null,
    registerScreenService: null,

    // HTML Templates

    // HTML selectors


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'loginScreen';
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
        this.hub.requireService({
            component: this,
            contract: registerScreenContract,
            field: "registerScreenService"
        });

        // Provide service
        this.hub.provideService({
            component: this,
            contract:  loginScreenContract
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

        self.hub.subscribe(this, "/loginScreen/refresh", self.refresh);

        var mainContainer = self.mainScreenService.getMainContainer();

        /**
         * Interaction listeners
         */
        var onRegisterClicked = function() {
            self.registerScreenService.init();
        }

        var onLoginClicked = function() {
            var user = {};
            user.username = self.inputUser.getData();
            user.password = self.inputPass.getData();

            // perform login
            self.userService.login(user,
                function(user) {
                    mainContainer.stack.pop();
                },
                function(error) {
                    mainContainer.scn.alert("Login", "Login failed");
                });

            mainContainer.scn.hidePopup();
        }


        var view = new joCard([
            new joTitle("Login"),
            new joFlexcol([
                new joDivider(),
                new joGroup([
                    new joCaption("User Name"),
                    new joFlexrow(self.inputUser = new joInput("")),
                    new joCaption("Password"),
                    new joFlexrow(self.inputPass = new joPasswordInput(""))
                ]),
                new joButton("Login").selectEvent.subscribe(onLoginClicked),
                new joDivider(),
                new joButton("Register").selectEvent.subscribe(onRegisterClicked)
            ])
        ]);

        mainContainer.stack.push(view);

        self.refresh(null);
    },


    /**
     * Private methods.
     */

    refresh: function(event) {
        this.inputUser.setData("");
        this.inputPass.setData("");
    }

}
