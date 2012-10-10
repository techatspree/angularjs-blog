/**
 * @author Till Hermsen
 * @date 10.10.12
 */
loginSubViewContract = {

    init: function() {},

    refresh: function() {}

}

loginSubView = {

    hub: null,

    // Services

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

        $(self.selectors.userContainer).html($(self.templates.loginForm).html());

        $(self.selectors.loginForm).submit(function(e) {
            self.clearValidationError();

            var credentials = $(self.selectors.loginForm).serializeArray();
            var user = {};
            user.username = credentials[0].value;
            user.password = credentials[1].value

            App.UserService.login(user,
                function(user) {
                    location.reload();
                },
                function(error) {
                    self.showValidationError(error);
                }
            );

            return false;
        });
    },

    refresh: function() {
        this.clearValidationError();
    },

    /**
     * Private methods.
     */

    showValidationError: function(error) {
        var data = {
            id: "errorLogin",
            errorMessage: "Login failed!"
        };
        $(_.template($(this.templates.formValidationError).html(), data))
            .insertAfter(this.selectors.loginForm);
    },

    clearValidationError: function() {
        $(this.selectors.error).remove();
    }

}
