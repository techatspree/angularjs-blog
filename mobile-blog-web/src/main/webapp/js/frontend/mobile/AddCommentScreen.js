/**
 * @author Till Hermsen
 * @date 12.10.12
 */
var addCommentScreenContract = {

    init: function(postId) {}

}

var addCommentScreen = {

    hub: null,

    // joApp elements
    inputComment: null,

    // Services
    mainScreenService: null,
    blogPostBackendService: null,

    // HTML Templates

    // HTML selectors


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'addCommentScreen';
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
            contract: mainScreenContract,
            field: "mainScreenService"
        });
        this.hub.requireService({
            component: this,
            contract: blogPostBackendContract,
            field: "blogPostBackendService"
        });

        // Provide service
        this.hub.provideService({
            component: this,
            contract:  addCommentScreenContract
        });

        // Configuration
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        this.hub.subscribe(this, "/addCommentScreen/init", this.initEvent);
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
        if (postId == null) { throw "AddCommentScreen could not be initialized."; }

        var self = this;

        var mainContainer = self.mainScreenService.getMainContainer();

        /**
         * Interaction listeners
         */
        var onSubmitClicked = function() {
            var comment = {};
            comment.content = self.inputComment.getData();

            self.inputComment.setData("");

            self.blogPostBackendService.addComment(postId, comment, function() {
                mainContainer.stack.pop();
            });
        }


        // View
        var view =  new joCard([
            new joGroup([
                new joLabel("Content"),
                new joFlexrow(self.inputComment = new joTextarea(""))
            ]),
            new joDivider(),
            new joButton("Submit").selectEvent.subscribe(onSubmitClicked)
        ]);

        mainContainer.stack.push(view);

        // Registering event listener
        self.hub.subscribe(self, "/addCommentScreen/refresh", self.refreshEvent);

        self.refresh();
    },


    /**
     * Private methods.
     */
    initEvent: function(event) {
        this.init(event.postId);
    },

    refreshEvent: function(event) {
        this.refresh();
    },

    refresh: function() {
        this.inputComment.setData("");
    }

}
