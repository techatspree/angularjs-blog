/**
 * @author Till Hermsen
 * @date 11.10.12
 */
var blogListScreenContract = {

    /**
     * Initializes the blog list screen.
     */
    init: function() {}

}


var blogListScreen = {

    hub: null,

    // Services
    userService: null,
    mainScreenService: null,
    blogPostScreenService: null,
    blogPostFrontendService: null,

    // HTML selectors
    selectors: null,


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'blogListScreen';
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
            contract: mainScreenContract,
            field: "mainScreenService"
        });
        this.hub.requireService({
            component: this,
            contract: blogPostScreenContract,
            field: "blogPostScreenService"
        });
        this.hub.requireService({
            component: this,
            contract: blogPostFrontendContract,
            field: "blogPostFrontendService"
        });


        // Provide service
        this.hub.provideService({
            component: this,
            contract:  blogListScreenContract
        });

        // Configuration
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

        var mainContainer = self.mainScreenService.getMainContainer();

        // Interactions listener
        var onAddPostClicked = function() {
            if (!self.userService.isLoggedIn()) {
                self.hub.publish(self, "/loginScreen/init", {});
            }
            else {
                self.hub.publish(self, "/addPostScreen/init", {});
            }
            return false;
        };

        mainContainer.stack.popEvent.subscribe(function(){
            self.refresh();
        });


        // View
        var view = new joCard([
            new joTitle("Blog Post Demo"),
            new joGroup(
                new joFlexcol([
                    new joButton('Add Post').selectEvent.subscribe(onAddPostClicked),
                    new joDivider(),
                    new joHTML("<div id='blogPostList' />")
                ])
            )
        ]).setTitle("Blog Demo");

        mainContainer.stack.push(view);


        // Registering event listener
        self.hub.subscribe(self, "/blogListScreen/refresh", self.refreshEvent);

        self.refresh();
    },


    /**
     * Private methods.
     */
    refreshEvent: function(event) {
        this.refresh();
    },

    refresh: function() {
        if ($(this.selectors.blogPostList).length == 0) {
            return;
        }

        this.blogPostFrontendService.updateWithBlogList();
    }

}
