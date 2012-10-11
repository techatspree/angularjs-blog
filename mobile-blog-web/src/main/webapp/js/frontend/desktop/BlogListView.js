/**
 *
 * @author Till Hermsen
 * @date 09.10.12
 */
blogListViewContract = {

    /**
     *
     */
    init: function() {}

}

blogListView = {

    hub: null,

    // Services
    userService: null,
    blogPostFrontendService: null,

    // HTML selectors
    selectors: null,

    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'blogListView';
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
        self.hub.requireService({
            component: self,
            contract: blogPostFrontendContract,
            field: "blogPostFrontendService"
        });

        // We provide the UserContractService:
        self.hub.provideService({
            component: self,
            contract: blogListViewContract
        });

        // Set HTML selectors
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
        self.hub.subscribe(self, "/blogListView/refresh", self.refresh);


        // add post button
        if (self.userService.isLoggedIn()) {
            $(self.selectors.addPostBtn).show();
            $(self.selectors.addPostBtn).on("click", function(e) {
                document.location.href = "?page=addPost";
                return false;
            });
        }
    },


    /**
     * Private methods.
     */

    refresh: function(event) {
        var self = this;

        var readMoreBtnTarget = function(id) {
            document.location.href = "?showPost=" + id;
        }

        self.blogPostFrontendService.updateWithBlogList(readMoreBtnTarget);
    }

}
