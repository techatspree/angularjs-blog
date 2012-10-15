/**
 * @author Till Hermsen
 * @date 11.10.12
 */
var registerSubViewContract = {

    init: function() {}

}

var registerSubView = {

    hub: null,

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
        return 'registerSubView';
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
            contract:  registerSubViewContract
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
        this.hub.subscribe(this, "/registerSubView/init", this.initEvent);
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

        $(self.selectors.userContainer).html($(self.templates.registerForm).html());

        $(self.selectors.registerForm).submit(function(e) {
            e.preventDefault();

            self.clearValidationError();

            var formData = $(self.selectors.registerForm).serializeArray();

            var userData = {};
            userData.username  = formData[0].value;
            userData.password  = formData[1].value;
            userData.firstname = formData[2].value;
            userData.surname   = formData[3].value;
            userData.email     = formData[4].value;
            userData.phone     = formData[5].value;

            self.userService.register(userData,
                function() {
                    location.reload();
                },
                function(error) {
                    self.showValidationError(JSON.parse(error.response));
                }
            );
        });

        // Registering event listener
        self.hub.subscribe(self, "/registerSubView/refresh", self.refreshEvent);

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
        this.clearValidationError();
    },

    showValidationError: function(error) {
        var self = this;

        $.each(this.validationViews, function(index, item) {
            if (error[index]) {
                var data = {
                    id: "error" + self.capitalize(index),
                    errorMessage: error[index]
                }

                self.validationViews[index] = _.template(
                    $(self.templates.formValidationError).html(), data
                );

                $(self.validationViews[index]).insertAfter(
                    self.selectors["input" + self.capitalize(index)]
                );
            }
        });
    },

    clearValidationError: function() {
        var self = this;
        $.each(this.validationViews, function(index, item) {
            if (item != null) {
                $(self.selectors["error" + self.capitalize(index)]).remove();
            }
        });
    },

    capitalize: function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

}
