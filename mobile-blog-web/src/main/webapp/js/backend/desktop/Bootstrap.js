/**
 * The Bootstrap-component starts the desktop app.
 *
 * @author Till Hermsen
 * @date 09.10.12
 */
var bootstrapContract = {}


var bootstrap = {

    hub: null,

    // Services
    routerService: null,

    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'bootstrap';
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

        // Required service
        self.hub.requireService({
            component: self,
            contract: routerContract,
            field: "routerService"
        });

        // We provide the UserContractService:
        self.hub.provideService({
            component: self,
            contract: bootstrapContract
        });
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        var self = this;
        self.hub.subscribe(self, "/templates/loaded", self.startApp);
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

    startApp: function(event) {
        var self = this;
        self.routerService.initRoute();
    }

}