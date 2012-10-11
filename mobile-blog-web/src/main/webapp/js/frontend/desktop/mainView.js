/**
 * Blog MainView (static content)
 *
 * @author Till Hermsen
 * @date 10.10.12
 */
mainViewContract = {

    /**
     * Initializes the view.
     */
    init: function() {}

}

mainView = {

    hub:null,

    // Services
    userService: null,
    loginSubViewService: null,
    registerSubViewService: null,

    // HTML Templates
    templates: null,

    // HTML selectors
    selectors: null,


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName:function () {
        return 'mainView';
    },

    /**
     * Configure method. This method is called when the
     * component is registered on the hub.
     * @param theHub the hub
     * @param the object used to configure this component
     */
    configure: function(theHub, configuration) {
        var self = this;

        self.hub = theHub;

        // Required services
        self.hub.requireService({
            component: self,
            contract: userServiceContract,
            field: "userService"
        });
        self.hub.requireService({
            component: self,
            contract: loginSubViewContract,
            field: "loginSubViewService"
        });
        self.hub.requireService({
            component: self,
            contract: registerSubViewContract,
            field: "registerSubViewService"
        });

        // Provide service
        self.hub.provideService({
            component: self,
            contract: mainViewContract
        });

        // Configuration
        self.templates = configuration.templates;
        self.selectors = configuration.selectors;
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

        // Registering event listener
        self.hub.subscribe(self, "/mainView/refresh", self.refresh);

        $(self.selectors.body).prepend($(self.templates.main).html());

        if (!self.userService.isLoggedIn()) {
            // bind on click event
            $(self.selectors.loginLogoutBtn).on("click", function(e) {
                self.loginSubViewService.init();

                // load register form
                $(self.selectors.registerBtn).on("click", function(e) {
                    self.registerSubViewService.init();

                    return false;
                });

                return false;
            });
        }

        else {
            $(self.selectors.loginLogoutBtn).on("click", function(e) {
                self.userService.logout();
                location.reload()
                return false;
            });
        }
    },


    /**
     * Private methods.
     */

    refresh: function(event) {
        var self = this;

        if (!self.userService.isLoggedIn()) {
            $(self.selectors.loginLogoutBtn).html("Login");
        }
        else {
            $(self.selectors.loginLogoutBtn).html("Logout");
        }
    }

}
