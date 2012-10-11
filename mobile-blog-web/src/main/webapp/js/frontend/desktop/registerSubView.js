/**
 * @author Till Hermsen
 * @date 11.10.12
 */
registerSubViewContract = {

    init: function() {}

}

registerSubView = {

    hub: null,

    formValidation: [],

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
        var self = this;

        self.hub = theHub;

        // Required services
        self.hub.requireService({
            component: self,
            contract: userServiceContract,
            field: "userService"
        });

        // Provide service
        self.hub.provideService({
            component: self,
            contract:  registerSubViewContract
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
        self.hub.subscribe(self, "/registerSubView/refresh", self.refresh);

        $(self.selectors.userContainer).html($(self.templates.registerForm).html());

        $(self.selectors.registerForm).submit(function(e) {
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

            return false;
        });
    },


    /**
     * Private methods.
     */

    refresh: function(event) {
        var self = this;
        self.clearValidationError();
    },

    showValidationError: function(error) {
        var self = this;

        if (error.username) {
            var data = {
                id: "errorUser",
                errorMessage: error.username
            }

            self.formValidation.username = _.template(
                $(self.templates.formValidationError).html(), {"data": data}
            );

            $(this.formValidation.username).insertAfter(this.selectors.inputUser);
        }

        if (error.password) {
            var data = {
                id: "errorPass",
                errorMessage: error.password
            }

            self.formValidation.password = _.template(
                $(self.templates.formValidationError).html(), {"data": data}
            );

            $(self.formValidation.password).insertAfter(this.selectors.inputPass);
        }

        if (error.firstname) {
            var data = {
                id: "errorFirstname",
                errorMessage: error.firstname
            }

            self.formValidation.firstname = _.template(
                $(self.templates.formValidationError).html(), {"data": data}
            );
            $(this.formValidation.firstname).insertAfter(this.selectors.inputFirstname);
        }

        if (error.surname) {
            var data = {
                id: "errorSurname",
                errorMessage: error.surname
            }

            self.formValidation.surname = _.template(
                $(self.templates.formValidationError).html(), {"data": data}
            );
            $(this.formValidation.surname).insertAfter(this.selectors.surname);
        }

        if (error.email) {
            var data = {
                id: "errorEmail",
                errorMessage: error.email
            }

            self.formValidation.email = _.template(
                $(this.templates.formValidationError).html(), {"data": data}
            );
            $(self.formValidation.email).insertAfter(self.selectors.inputEmail);
        }

        if (error.phone) {
            var data = {
                id: "errorPhone",
                errorMessage: error.phone
            }

            self.formValidation.phone = _.template(
                $(self.templates.formValidationError).html(), {"data": data}
            );
            $(self.formValidation.phone).insertAfter(self.selectors.inputPhone);
        }
    },

    clearValidationError: function() {
        var self = this;

        if (self.formValidation.username)  { $(self.selectors.errorUser).remove() }
        if (self.formValidation.password)  { $(self.selectors.errorPass).remove(); }
        if (self.formValidation.firstname) { $(self.selectors.errorFirstname).remove(); }
        if (self.formValidation.surname)   { $(self.selectors.errorSurname).remove(); }
        if (self.formValidation.email)     { $(self.selectors.errorEmail).remove(); }
        if (self.formValidation.phone)     { $(self.selectors.errorPhone).remove(); }
    }

}
