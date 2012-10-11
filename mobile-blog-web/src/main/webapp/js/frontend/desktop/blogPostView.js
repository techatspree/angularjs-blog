/**
 * @author Till Hermsen
 * @date 10.10.12
 */
blogPostViewContract = {

    /**
     * Initializes blog post view.
     *
     * @param postId
     */
    init: function (postId) {}

}


blogPostView = {

    hub: null,

    // Services
    blogPostFrontendService: null,
    addCommentSubViewService: null,

    // Templates
    templates: null,

    // HTML selectors
    selectors: null,


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function () {
        return 'blogPostView';
    },

    /**
     * Configure method. This method is called when the
     * component is registered on the hub.
     * @param theHub the hub
     * @param the object used to configure this component
     */
    configure: function (theHub, configuration) {
        var self = this;

        self.hub = theHub;

        // Required services
        self.hub.requireService({
            component: self,
            contract:  blogPostFrontendContract,
            field:     "blogPostFrontendService"
        });
        self.hub.requireService({
            component: self,
            contract: addCommentSubViewContract,
            field: "addCommentSubViewService"
        });

        // Provide service
        self.hub.provideService({
            component:self,
            contract: blogPostViewContract
        });

        // Configuration
        self.templates = configuration.templates;
        self.selectors = configuration.selectors;
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function () {},

    /**
     * The Stop method is called when the hub stops or
     * just after the component removal if the hub is
     * not stopped. No events can be send in this method.
     */
    stop: function () {},


    /**
     * Contract methods.
     */

    init: function (postId) {
        var self = this;

        // Registering event listener
        self.hub.subscribe(self, "/blogPostView/refresh", self.refresh);

        // adding blog post template
        $(self.selectors.content).append($(self.templates.blogPost).html());


        self.addCommentSubViewService.init(postId);
    },


    /**
     * Private methods.
     */
    refresh: function (event) {
        var self = this,
            postId = event.postId;

        if ($(self.selectors.blogPostContainer).length > 0) {
            self.blogPostFrontendService.updateWithBlogPost(postId);
        }

        if ($(self.selectors.commentList).length > 0) {
            self.blogPostFrontendService.updateWithComments(postId);
        }
    }

}
