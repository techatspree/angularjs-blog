/**
 * @author Till Hermsen
 * @date 11.10.12
 */
var addCommentSubViewContract = {

    /**
     *
     * @param postId
     */
    init: function(postId) {}

}

var addCommentSubView = {

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
        this.hub = theHub;

        // Required services
        this.hub.requireService({
            component: this,
            contract: userServiceContract,
            field: "userService"
        });
        this.hub.requireService({
            component: this,
            contract: blogPostBackendContract,
            field: "blogPostBackendService"
        });

        // Provide service
        this.hub.provideService({
            component: this,
            contract:  addCommentSubViewContract
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

    init: function(postId) {
        var self = this;

        if (self.userService.isLoggedIn()) {
            $(self.selectors.commentList).after($(self.templates.commentForm).html());

            // bind click event to the submit comment button
            $(self.selectors.commentForm).submit(function (e) {
                e.preventDefault();

                var commentFormData = $(self.selectors.commentForm).serializeArray();
                var comment = {};
                comment.content = commentFormData[0].value;

                self.blogPostBackendService.addComment(postId, comment, function() {
                    self.hub.publish(self, "/blogPostView/refresh", {
                        postId: postId
                    });
                });

                self.refresh();
            });
        }

        // Registering event listener
        self.hub.subscribe(self, "/addCommentSubView/refresh", self.refreshEvent);

        self.refresh();
    },


    /**
     * Private methods.
     */

    refreshEvent: function(event) {
        this.refresh();
    },

    refresh: function() {
        this.resetForm();
    },

    resetForm: function() {
        $(this.selectors.commentTextarea).val("");
    }

}
