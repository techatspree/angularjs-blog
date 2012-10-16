/**
 * The BlogPostFrontend
 *
 * @author Till Hermsen
 * @date 08.10.12
 */
var blogPostFrontendContract = {

    /**
     * Lists all blog posts.
     */
    updateWithBlogList : function() {},

    /**
     * Lists blog post with given postId.
     *
     * @param postId
     */
    updateWithBlogPost : function(postId) {},

    /**
     * Lists all comments for given postId.
     *
     * @param postId
     */
    updateWithComments : function(postId) {}

}


var blogPostFrontend = {

    hub: null,

    // Services
    blogPostBackendService: null,

    // HTML templates
    templates: null,

    // HTML selectors
    selectors: null,

    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'blogPostFrontend';
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

        // We provide the UserContractService:
        this.hub.provideService({
            component: this,
            contract: blogPostFrontendContract
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

    updateWithBlogList : function() {
        var self = this;

        self.blogPostBackendService.retrieveBlogPosts(
            function(result) {
                $(self.selectors.contentContainer).empty();
                $.each(result, function(index, blogPost) {
                    if (blogPost.content.length > 300) {
                        blogPost.content = $.trim(blogPost.content).substring(0, 300)
                            .split(" ").slice(0, -1).join(" ") + "...";
                    }
                    blogPost.content.replace(/\n/g, '<br />');
                    blogPost.created = new Date(blogPost.created).toUTCString();

                    self.appendTemplateDataToNode(
                        self.selectors.contentContainer,
                        blogPost,
                        self.templates.blogListPost
                    );

                    var readMoreBtn = $("#readMoreBtn" + blogPost.id);
                    if (readMoreBtn.length > 0) {
                        readMoreBtn.on("click", function() {
                            self.hub.publish(self, "/blogPost/init", {postId: blogPost.id});
                        });
                    }
                });
            },
            function(error) {}
        );
    },

    updateWithBlogPost : function(postId) {
        var self = this;

        self.blogPostBackendService.retrieveBlogPost(postId,
            function(blogPost) {
                $(self.selectors.blogPostContainer).empty();
                blogPost.content.replace(/\n/g, '<br />');
                blogPost.created = new Date(blogPost.created).toUTCString();

                self.appendTemplateDataToNode(
                    self.selectors.blogPostContainer,
                    blogPost,
                    self.templates.blogPost
                );
            },
            function(error){}
        );
    },

    updateWithComments : function(postId) {
        var self = this;

        self.blogPostBackendService.retrieveComments(postId,
            function(result){
                $(self.selectors.commentsContainer).empty();
                $.each(result, function(index, comment) {
                    comment.content.replace(/\n/g, '<br />');
                    comment.created = new Date(comment.created).toUTCString();
                    self.appendTemplateDataToNode(
                        self.selectors.commentsContainer,
                        comment,
                        self.templates.comment
                    );
                });
            },
            function(error) {}
        );
    },


    /**
     * Private methods.
     */

    /**
     *
     * @param data
     * @param templateId
     */
    appendTemplateDataToNode : function(nodeId, data, templateId) {
        var templateFunc = _.template($(templateId).html());
        $(nodeId).append(templateFunc({"data": data}));
    }

}