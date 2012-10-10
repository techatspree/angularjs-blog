/**
 * @author Till Hermsen
 * @date 10.10.12
 */
mainViewContract = {

    init: function() {},

    refresh: function() {}

}

mainView = {

    hub:null,

    // Services
    loginSubView: null,

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
            contract: loginSubViewContract,
            field: "loginSubView"
        });

        // Provide service
        this.hub.provideService({
            component:this,
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

        if (!App.UserService.isLoggedIn()) {
            // bind on click event
            $(self.selectors.loginLogoutBtn).on("click", function(e) {
                self.loginSubView.init();

                // load register form
                $(self.selectors.registerBtn).on("click", function(e) {
                    $(self.selectors.userContainer).html(_.template(App.Register.loadRegisterForm(), {}));

                    $(self.selectors.registerSubmitBtn).on("click", function(e) {
                        App.Register.onRegisterClicked();
                        return false;
                    });
                    return false;
                });

                return false;
            });
        }

        else {
            $(self.selectors.loginLogoutBtn).on("click", function(e) {
                App.UserService.logout();
                location.reload()
                return false;
            });
        }
    },

    refresh: function() {
        if (!App.UserService.isLoggedIn()) {
            $(this.selectors.loginLogoutBtn).html("Login");
        }
        else {
            $(this.selectors.loginLogoutBtn).html("Logout");
        }
    }


    /**
     * Private methods.
     */

}
