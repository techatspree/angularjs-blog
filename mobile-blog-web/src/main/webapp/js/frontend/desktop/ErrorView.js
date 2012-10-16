/**
 *
 *
 * @author Till Hermsen
 * @date 10.10.12
 */
var errorViewContract = {}

var errorView = {

    hub:null,

    // HTML templates
    templates: null,

    // HTML selectors
    selectors: null,

    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'errorView';
    },

    /**
     * Configure method. This method is called when the
     * component is registered on the hub.
     * @param theHub the hub
     * @param the object used to configure this component
     */
    configure: function(theHub, configuration) {
        this.hub = theHub;

        // Provide service
        this.hub.provideService({
            component: this,
            contract:  errorViewContract
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
        this.hub.subscribe(this, "/errorView/init", this.init);
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
        // Registering event listener
        this.hub.subscribe(this, "/errorView/refresh", this.refresh);

        this.refresh(event);
    },

    refresh: function(event) {
        $(this.selectors.content).html(
            _.template($(this.templates.error).html(), {"data": event.data})
        );
    }

}
