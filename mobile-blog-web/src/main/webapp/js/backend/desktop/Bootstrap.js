/**
 * The Bootstrap-component starts the desktop app.
 *
 * @author Till Hermsen
 * @date 09.10.12
 */
bootstrapContract = {}


bootstrap = {

    hub: null,
    router: null,

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
        this.hub = theHub;

        // Required service
        this.hub.requireService({
            component: this,
            contract: routerContract,
            field: "router"
        });

        // We provide the UserContractService:
        this.hub.provideService({
            component: this,
            contract: bootstrapContract
        });
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        this.hub.subscribe(this, "/templates/loaded", this.startApp);
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
        this.router.initRoute();
    }

}