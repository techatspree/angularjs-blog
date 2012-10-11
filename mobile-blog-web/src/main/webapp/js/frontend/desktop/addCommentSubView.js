/**
 * @author Till Hermsen
 * @date 11.10.12
 */
addCommentSubViewContract = {

    init: function() {postId}

}

addCommentSubView = {

    hub: null,

    // Services
    userService: null,
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
        return 'addCommentSubView';
    },

    /**
     * Configure method. This method is called when the
     * component is registered on the hub.
     * @param theHub the hub
     * @param the object used to configure this component
     */
    configure: function(theHub, configuration) {
        var self = this;

        self.hub = theHub;

        // Required services
        self.hub.requireService({
            component: self,
            contract: userServiceContract,
            field: "userService"
        });
        self.hub.requireService({
            component: self,
            contract: blogPostBackendContract,
            field: "blogPostBackendService"
        });

        // Provide service
        self.hub.provideService({
            component: self,
            contract:  addCommentSubViewContract
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

    init: function(postId) {
        var self = this;

        // Registering event listener
        self.hub.subscribe(self, "/addCommentSubView/refresh", self.refresh);

        if (self.userService.isLoggedIn()) {
            $(self.selectors.commentList).after($(self.templates.commentForm).html());

            // bind click event to the submit comment button
            $(self.selectors.commentForm).submit(function (e) {
                var commentFormData = $(self.selectors.commentForm).serializeArray();
                var comment = {};
                comment.content = commentFormData[0].value;

                self.blogPostBackendService.addComment(postId, comment, function() {
                    self.hub.publish(self, "/blogPostView/refresh", {
                        postId: postId
                    });
                });

                self.resetForm();

                return false;
            });
        }

    },


    /**
     * Private methods.
     */

    refresh: function(event) {
        var self = this;
        self.resetForm();
    },

    resetForm: function() {
        var self = this;
        $(self.selectors.commentTextarea).val("");
    }

}
