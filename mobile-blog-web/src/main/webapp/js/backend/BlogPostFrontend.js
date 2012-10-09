/**
 * Author: Till Hermsen
 * Date: 08.10.12
 */
blogPostFrontendContract = {

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


blogPostFrontend = {

    hub: null,

    blogPostBackend: null,

    contentContainer: null,
    blogPostContainer: null,
    commentsContainer: null,

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
            field: "blogPostBackend"
        });

        // set nodeIds
        this.contentContainer  = configuration.contentContainer;
        this.blogPostContainer = configuration.blogPostContainer;
        this.commentsContainer = configuration.commentsContainer;

        // We provide the UserContractService:
        this.hub.provideService({
            component: this,
            contract: blogPostFrontendContract
        });
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
        var template = "#bloglistentry-tmpl";

        this.blogPostBackend.retrieveBlogPosts(
            function(result) {
                $(self.contentContainer).empty();
                $.each(result, function(index, blogPost) {
                    if (blogPost.content.length > 300) {
                        blogPost.content = $.trim(blogPost.content).substring(0, 300)
                            .split(" ").slice(0, -1).join(" ") + "...";
                    }
                    blogPost.content.replace(/\n/g, '<br />');
                    blogPost.created = new Date(blogPost.created).toUTCString();

                    self.appendTemplateDataToNode(self.contentContainer, blogPost, template);
                    var postButtons = $("#postButton" + blogPost.id);
                    if (postButtons.length > 0) {
                        postButtons.onpress(function() {
                            App.openBlogPost(blogPost.id);
                            return false;
                        });
                    }
                });
            },
            function(error) {}
        );
    },

    updateWithBlogPost : function(postId) {
        var self = this;
        var template = "#blogentry-tmpl";

        this.blogPostBackend.retrieveBlogPost(postId,
            function(blogPost) {
                $(self.blogPostContainer).empty();
                blogPost.content.replace(/\n/g, '<br />');
                blogPost.created = new Date(blogPost.created).toUTCString();

                self.appendTemplateDataToNode(self.blogPostContainer, blogPost, template);
            },
            function(error){}
        );
    },

    updateWithComments : function(postId) {
        var self = this;
        var template = "#comment-tmpl";

        this.blogPostBackend.retrieveComments(postId,
            function(result){
                $(self.commentsContainer).empty();
                $.each(result, function(index, comment) {
                    comment.content.replace(/\n/g, '<br />');
                    comment.created = new Date(comment.created).toUTCString();
                    self.appendTemplateDataToNode(self.commentsContainer, comment, template);
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