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
    init: function (postId) {},

    /**
     * Loads data into the blog post view.
     *
     * @param postId
     */
    refresh: function (postId) {}

}


blogPostView = {

    hub: null,

    // Services
    blogPostBackend: null,
    blogPostFrontend: null,

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
            contract:  blogPostBackendContract,
            field:     "blogPostBackend"
        });
        this.hub.requireService({
            component: this,
            contract:  blogPostFrontendContract,
            field:     "blogPostFrontend"
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

        // adding blog post template
        $(self.selectors.content).append($(self.templates.blogPost).html());

        // adding add comment form
        if (App.UserService.isLoggedIn()) {
            $(self.selectors.commentList).after($(self.templates.commentForm).html());

            // bind click event to the submit comment button
            $(self.selectors.submitCommentBtn).on("click", function (e) {
                var commentFormData = $(self.selectors.commentForm).serializeArray();
                var comment = {};
                comment.content = commentFormData[0].value;

                $(self.selectors.commentTextarea).val("");

                self.blogPostBackend.addComment(postId, comment, function() {
                   self.refresh(postId);
                });

                return false;
            });
        }
    },

    refresh: function (postId) {
        var self = this;

        if ($(self.selectors.blogPostContainer).length > 0) {
            self.blogPostFrontend.updateWithBlogPost(postId);
        }

        if ($(self.selectors.commentList).length > 0) {
            self.blogPostFrontend.updateWithComments(postId);
        }
    }


    /**
     * Private methods.
     */

}
