/*
 * The TemplateManager enables access to all HTML templates we require.
 */
templateManagerContract =  {}


templateManager = {
    hub: null,

    templateNames: null,


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
        var self = this;

        self.hub = theHub;
        // We provide the UserContractService:
        self.hub.provideService({
            component: self,
            contract: templateManagerContract
        });

        if (configuration.templateNames === null) {
            throw "templates was null";
        }
        self.templateNames = configuration.templateNames;
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        var self = this;
        self.fetchTemplates();
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
                        self.hub.publish(self, "/templates/loaded", {
                            templatesLoaded: true
                        });
                    }
                },
                error: function(error) {
                    throw "Failed to fetch template " + template + " (" + error + ")";
                }
            });
        }

        loadTemplate(0);
    }

}