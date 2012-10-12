/**
 * @author Till Hermsen
 * @date 11.10.12
 */
var blogPostScreenContract = {

    /**
     * Initializes the blog post screen.
     *
     * @param postId
     */
    init: function(postId) {}

}

var blogPostScreen = {

    hub: null,

    // Services
    userService: null,
    blogPostFrontendService: null,
    mainScreenService: null,

    // HTML selectors
    selectors: null,


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'blogPostScreen';
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
        this.hub.requireService({
            component: this,
            contract: mainScreenContract,
            field: "mainScreenService"
        });


        // Provide service
        this.hub.provideService({
            component: this,
            contract: blogPostScreenContract
        });

        // Configuration
        this.selectors = configuration.selectors;
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        this.hub.subscribe(this, "/blogPost/init", this.initEvent)
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

    init: function(postId) {
        if (postId == null) { throw "BlogPostScreen could not be initialized."; }

        var self = this;

        var mainContainer = self.mainScreenService.getMainContainer();

        /**
         * Interaction listeners
         */
        var onAddCommentClicked = function() {
            if (!self.userService.isLoggedIn()) {
                self.hub.publish(self, "/loginScreen/init", {});
            }
            else {
                self.hub.publish(self, "/addCommentScreen/init", {postId: postId});
            }
        };

        mainContainer.stack.popEvent.subscribe(function(){
            self.refresh(postId);
        });


        // View
        var view = new joCard([
            new joGroup(
                new joFlexcol([
                    new joHTML("<div id='blogPostContainer' />"),
                    new joDivider(),
                    new joHTML("<h4>Comments</h4>"),
                    new joHTML("<div id='commentList' />"),
                    new joButton("Add comment").selectEvent.subscribe(onAddCommentClicked)
                ])
            )
        ]);

        mainContainer.stack.push(view);


        // Registering event listener
        self.hub.publish(self, "/blogPostScreen/refresh", self.refreshEvent);

        self.refresh(postId);
    },


    /**
     * Private methods.
     */

    initEvent: function(event) {
        this.init(event.postId);
    },

    refreshEvent: function(event) {
        this.refresh(event.postId);
    },

    refresh: function(postId) {
        if (postId == null) { throw "BlogPostScreen could not be refreshed."; }

        if ($(this.selectors.blogPostContainer).length > 0) {
            this.blogPostFrontendService.updateWithBlogPost(postId);
        }

        if ($(this.selectors.commentList).length > 0) {
            this.blogPostFrontendService.updateWithComments(postId);
        }
    }

}
