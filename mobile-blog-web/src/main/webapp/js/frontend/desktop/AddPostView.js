/**
 * @author Till Hermsen
 * @date 10.10.12
 */
var addPostViewContract = {

    init: function() {}

}

var addPostView = {

    hub: null,

    // Services
    blogPostBackendService: null,

    // HTML Templates
    templates: null,

    // HTML selectors
    selectors: null,

    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'addPostView';
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

        // Provide service
        this.hub.provideService({
            component:this,
            contract: addPostViewContract
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

        $(self.selectors.content).html($(self.templates.addPostForm).html());

        $(self.selectors.addPostForm).submit(function(e) {
            e.preventDefault();

            var postData = $(self.selectors.addPostForm).serializeArray();
            var blogPost = {};
            blogPost.title   = postData[0].value;
            blogPost.content = postData[1].value;

            self.blogPostBackendService.addBlogPost(blogPost, function() {
                document.location.href = "/blog";
            });
        });

        // Registering event listener
        self.hub.subscribe(self, "/addPostView", self.refreshEvent);

        self.refresh();
    },


    /**
     * Private methods.
     */

    refreshEvent: function(event) {
        this.refresh();
    },

    refresh: function() {}

}
