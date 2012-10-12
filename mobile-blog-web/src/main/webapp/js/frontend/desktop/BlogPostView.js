/**
 * @author Till Hermsen
 * @date 10.10.12
 */
var blogPostViewContract = {

    /**
     * Initializes blog post view.
     *
     * @param postId
     */
    init: function (postId) {}

}


var blogPostView = {

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
        this.hub = theHub;

        // Required services
        this.hub.requireService({
            component: this,
            contract:  blogPostFrontendContract,
            field:     "blogPostFrontendService"
        });
        this.hub.requireService({
            component: this,
            contract: addCommentSubViewContract,
            field: "addCommentSubViewService"
        });

        // Provide service
        this.hub.provideService({
            component:this,
            contract: blogPostViewContract
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
    start: function () {
        this.hub.subscribe(this, "/blogPost/init", this.initEvent);
    },

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
        if (postId == null) { throw "BlogPostView could not be initialized."; }

        // adding blog post template
        $(this.selectors.content).append($(this.templates.blogPost).html());

        this.addCommentSubViewService.init(postId);

        // Registering event listener
        this.hub.subscribe(this, "/blogPostView/refresh", this.refreshEvent);

        this.refresh(postId);
    },


    /**
     * Private methods.
     */

    initEvent: function(event) {
        document.location.href= "?showPost=" + event.postId;
    },

    refreshEvent: function(event) {
        this.refresh(event.postId);
    },

    refresh: function(postId) {
        if (postId == null) { throw "BlogPostView could not be refreshed."; }

        if ($(this.selectors.blogPostContainer).length > 0) {
            this.blogPostFrontendService.updateWithBlogPost(postId);
        }

        if ($(this.selectors.commentList).length > 0) {
            this.blogPostFrontendService.updateWithComments(postId);
        }
    }

}
