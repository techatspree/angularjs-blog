/**
 * @author Till Hermsen
 * @date 10.10.12
 */
var loginSubViewContract = {}

var loginSubView = {

    hub: null,

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
    getComponentName: function() {
        return 'loginSubView';
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
            contract:  loginSubViewContract
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
    start: function() {
        this.hub.subscribe(this, "/loginSubView/init", this.init);
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


    /**
     * Private methods.
     */

    init: function(event) {
        var self = this;

        $(self.selectors.userContainer).html($(self.templates.loginForm).html());

        $(self.selectors.loginForm).submit(function(e) {
            e.preventDefault();

            self.clearValidationError();

            var credentials = $(self.selectors.loginForm).serializeArray();
            var user = {};
            user.username = credentials[0].value;
            user.password = credentials[1].value

            self.userService.login(user,
                function(user) {
                    location.reload();
                },
                function(error) {
                    self.showValidationError(error);
                }
            );
        });

        $(self.selectors.registerBtn).on("click", function(e) {
            e.preventDefault();
            self.hub.publish(self, "/registerSubView/init", {});
        });

        // Registering event listener
        self.hub.subscribe(self, "/loginSubView/refresh", self.refresh);

        self.refresh(null);
    },

    refresh: function(event) {
        this.clearValidationError();
    },

    showValidationError: function(error) {
        var data = {
            id: "errorLogin",
            errorMessage: "Login failed!"
        };

        $(_.template($(this.templates.formValidationError).html(),data))
            .insertAfter(this.selectors.loginForm);
    },

    clearValidationError: function() {
        $(this.selectors.error).remove();
    }

}
