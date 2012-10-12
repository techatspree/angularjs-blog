/**
 * @author Till Hermsen
 * @date 11.10.12
 */
var errorControllerContract = {}

var errorController = {

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
        this.hub = theHub;

        // Required services
        this.hub.requireService({
            component: this,
            contract: errorViewContract,
            field: 'errorViewService'
        });

        // Provide service
        this.hub.provideService({
            component: this,
            contract:  errorControllerContract
        });
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        // Registering event listener
        this.hub.subscribe(this, "/error", this.loadView);
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

    loadView: function(event) {
        this.errorViewService.init();
        this.hub.publish(this, "/errorView/refresh", {"data": event.data});
    }

}
