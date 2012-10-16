/**
 * @author Till Hermsen
 * @date 12.10.12
 */
var addCommentScreenContract = {}

var addCommentScreen = {

    hub: null,

    // joApp elements
    inputComment: null,

    // Services
    mainContainerService: null,
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
            contract: mainContainerContract,
            field: "mainContainerService"
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
        this.hub.subscribe(this, "/addCommentScreen/init", this.init);
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


    /**
     * Private methods.
     */

    init: function(event) {
        if (event.postId == null) { throw "AddCommentScreen could not be initialized."; }

        var self = this,
            postId = event.postId,
            mainContainer = self.mainContainerService.getMainContainer();

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
        self.hub.subscribe(self, "/addCommentScreen/refresh", self.refresh);

        self.refresh(null);
    },

    refresh: function(event) {
        this.inputComment.setData("");
    }

}
