/**
 * @author Till Hermsen
 * @date 11.10.12
 */
var addPostScreenContract = {}

var addPostScreen = {

    hub: null,

    // joApp elements
    inputTitle: null,
    inputContent: null,

    // Services
    blogPostBackendService: null,
    mainContainerService: null,


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'addPostScreen';
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
            contract: blogPostBackendContract,
            field: "blogPostBackendService"
        });
        this.hub.requireService({
            component: this,
            contract: mainContainerContract,
            field: "mainContainerService"
        });

        // Provide service
        this.hub.provideService({
            component: this,
            contract: addPostScreenContract
        });

        // Configuration
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        this.hub.subscribe(this, "/addPostScreen/init", this.init);
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

        var mainContainer = self.mainContainerService.getMainContainer();


        /**
         * Interaction listeners
         */
        var onSubmitClicked = function() {
            var blogPost = {};
            blogPost.title   = self.inputTitle.getData();
            blogPost.content = self.inputContent.getData();

            self.blogPostBackendService.addBlogPost(blogPost, function() {
                console.log("success");
                mainContainer.stack.pop();
            });
        };


        // View
        var view = new joCard([
            new joGroup([
                new joLabel("Title"),
                new joFlexrow(self.inputTitle = new joInput("")),
                new joLabel("Content"),
                new joFlexrow(self.inputContent = new joTextarea(""))
            ]),
            new joDivider(),
            new joButton("Submit").selectEvent.subscribe(onSubmitClicked)
        ]);

        mainContainer.stack.push(view);


        // Registering event listener
        self.hub.subscribe(self, "/addPostScreen/refresh", self.refresh);

        self.refresh(null);
    },

    refresh: function(event) {
        this.inputTitle.setData("");
        this.inputContent.setData("");
    }

}
