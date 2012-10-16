/**
 *
 * @author Till Hermsen
 * @date 09.10.12
 */
var blogListViewContract = {}

var blogListView = {

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
        this.hub = theHub;

        // Required services
        this.hub.requireService({
            component: this,
            contract: userServiceContract,
            field: "userService"
        });
        this.hub.requireService({
            component: this,
            contract: blogPostFrontendContract,
            field: "blogPostFrontendService"
        });

        // We provide the UserContractService:
        this.hub.provideService({
            component: this,
            contract: blogListViewContract
        });

        // Set HTML selectors
        this.selectors = configuration.selectors;
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        this.hub.subscribe(this, "/blogListView/init", this.init);
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
        var self = this;

        // add post button
        if (self.userService.isLoggedIn()) {
            $(self.selectors.addPostBtn).show();
            $(self.selectors.addPostBtn).on("click", function(e) {
                document.location.href = "?page=addPost";
                return false;
            });
        }

        // Registering event listener
        self.hub.subscribe(self, "/blogListView/refresh", self.refresh);

        self.refresh(null);
    },

    refresh: function(event) {
        this.blogPostFrontendService.updateWithBlogList();
    }

}
