/**
 * Blog MainView (static content)
 *
 * @author Till Hermsen
 * @date 10.10.12
 */
var mainViewContract = {

    /**
     * Initializes the view.
     */
    init: function() {}

}

var mainView = {

    hub:null,

    // Services
    userService: null,

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
        this.hub = theHub;

        // Required services
        this.hub.requireService({
            component: this,
            contract: userServiceContract,
            field: "userService"
        });

        // Provide service
        this.hub.provideService({
            component: this,
            contract: mainViewContract
        });

        // Configuration
        this.templates = configuration.templates;
        this.selectors = configuration.selectors;
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

        // Template
        $(self.selectors.body).prepend($(self.templates.main).html());

        /**
         * Interaction listeners
         */
        if (!self.userService.isLoggedIn()) {
            // bind on click event
            $(self.selectors.loginLogoutBtn).on("click", function(e) {
                self.hub.publish(self, "/loginSubView/init", {});
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

        // Registering event listener
        self.hub.subscribe(self, "/mainView/refresh", self.refreshEvent);

        self.refresh();
    },


    /**
     * Private methods.
     */

    refreshEvent: function(event) {
        this.refresh();
    },

    refresh: function() {
        if (!this.userService.isLoggedIn()) {
            $(this.selectors.loginLogoutBtn).html("Login");
        }
        else {
            $(this.selectors.loginLogoutBtn).html("Logout");
        }
    }

}
