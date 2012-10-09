/*
 * The TemplateManager enables access to all HTML templates we require.
 */
templateManagerContract =  {
    /**
     * Fetches the templates with the given names from the template location on
     * the server and adds it to the DOM.
     *
     * @param templateNames an array of the names of the templates to fetch
     * @param callback function to call on success
     */
//    fetchTemplates: function() {}
}


templateManager = {
    hub: null,
    templateNames: null,

    // First we are a component, so we need to implement the 4 methods required to be a valid component:

    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'templateManager';
    },

    /**
     * Configure method. This method is called when the
     * component is registered on the hub.
     * @param theHub the hub
     * @param the object used to configure this component
     */
    configure: function(theHub, configuration) {
        this.hub = theHub;
        // We provide the UserContractService:
        this.hub.provideService({
            component: this,
            contract: templateManagerContract
        });

        if (configuration.templateNames === null) {
            throw "templates was null";
        }
        this.templateNames = configuration.templateNames;
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        this.fetchTemplates();
    },

    /**
     * The Stop method is called when the hub stops or
     * just after the component removal if the hub is
     * not stopped. No events can be send in this method.
     */
    stop: function() {},

    /*
     * Contract methods.
     */



    /**
     * Private methods.
     */

    fetchTemplates: function() {
        var self = this;

        var loadTemplate = function(index) {
            var template = self.templateNames[index];
            $.ajax({
                url: "../js/template/" + template + ".tmpl",
                dataType: "html",
                success: function(data) {
                    $("head").append(data);
                    index++;
                    if (index < self.templateNames.length) {
                        loadTemplate(index);
                    } else {
                        console.log("templates loaded");
                        self.sendTemplatesLoadedEvent();
                    }
                },
                error: function(error) {
                    throw "Failed to fetch template " + template + " (" + error + ")";
                }
            });
        }

        loadTemplate(0);
    },

    sendTemplatesLoadedEvent: function() {
        this.hub.publish(this, "/templates/loaded", {
            templatesLoaded: true
        });
    }

}