/**
 * The Router-component detects the requested route and initializes it.
 *
 * @author Till Hermsen
 * @date 09.10.12
 */
routerContract = {

    /**
     * Detects and initializes requested route.
     */
    initRoute: function() {}

}


router = {

    hub: null,

    // Services
    mainView:     null,
    blogListView: null,
    blogPostView: null,
    addPostView:  null,


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'router';
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
            contract: mainViewContract,
            field: "mainView"
        });
        this.hub.requireService({
            component: this,
            contract: blogListViewContract,
            field: "blogListView"
        });
        this.hub.requireService({
            component: this,
            contract: blogPostViewContract,
            field: "blogPostView"
        });
        this.hub.requireService({
            component: this,
            contract: addPostViewContract,
            field: "addPostView"
        });

        // We provide the UserContractService:
        this.hub.provideService({
            component: this,
            contract: routerContract
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
    // needs refactoring!!
    initRoute: function() {
        var self = this;

        var keyValueHash = self.getKeyValueHash();

        var postId = keyValueHash['showPost'];
        var pageId = keyValueHash['page'];

        // load main view
        self.mainView.init();
        self.mainView.refresh();

        // singe blog post route
        if (postId != null) {
            self.blogPostView.init(postId);
            self.blogPostView.refresh(postId);
        }

        // page routes
        else if(pageId != null) {
            // pages which require logged-in user
            if (App.UserService.isLoggedIn()) {
                // add post route
                if (pageId == "addPost") {
                    self.addPostView.init();
                    self.addPostView.refresh();
                }
            } else {
                self.hub.publish(this, "/error", {error: "403"});
            }

            // pages which don't require logged-in user
        }

        // main route, lists all blog posts
        else {
            self.blogListView.init();
            self.blogListView.refresh();
        }
    },


    /**
     * Private methods.
     */

    /**
     * Detects keyValueHash
     *
     * @return keyValueHash
     */
    getKeyValueHash: function() {
        var searchString = window.location.search.substring(1),
            params = searchString.split("&"),
            keyValueHash = {};

        for (var i = 0; i < params.length; i++) {
            var val = params[i].split("=");
            keyValueHash[unescape(val[0])] = unescape(val[1]);
        }

        return keyValueHash;
    }

}
