/**
 * @author Till Hermsen
 * @date 11.10.12
 */
errorControllerContract = {}

errorController = {

    hub: null,

    // Services
    errorViewService: null,


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'errorController';
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
            contract: errorViewContract,
            field: 'errorViewService'
        });

        // Provide service
        self.hub.provideService({
            component: self,
            contract:  errorControllerContract
        });
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        var self = this;

        // Registering event listener
        self.hub.subscribe(self, "/error", self.eventCallback);
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

    eventCallback: function(event) {
        var self = this;
        self.errorViewService.init();
        self.hub.publish(self, "/errorView/refresh", {"data": event.data});
    }

}
