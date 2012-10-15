/**
 * The Router-component detects the requested route and initializes it.
 *
 * @author Till Hermsen
 * @date 09.10.12
 */
var routerContract = {

    /**
     * Detects and initializes requested route.
     */
    initRoute: function() {}

}


var router = {

    hub: null,

    // Services
    userService:         null,
    mainViewService:     null,
    blogListViewService: null,
    blogPostViewService: null,
    addPostViewService:  null,


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
        var self = this;

        self.hub = theHub;

        // Required services
        self.hub.requireService({
            component: this,
            contract: userServiceContract,
            field: "userService"
        });
        self.hub.requireService({
            component: this,
            contract: mainViewContract,
            field: "mainViewService"
        });
        self.hub.requireService({
            component: this,
            contract: blogListViewContract,
            field: "blogListViewService"
        });
        self.hub.requireService({
            component: this,
            contract: blogPostViewContract,
            field: "blogPostViewService"
        });
        self.hub.requireService({
            component: this,
            contract: addPostViewContract,
            field: "addPostViewService"
        });

        // We provide the UserContractService:
        self.hub.provideService({
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
        self.mainViewService.init();


        // singe blog post route
        if (postId != null) {
            self.blogPostViewService.init(postId);
        }

        // page routes
        else if(pageId != null) {
            // following pages require logged-in user
            if (self.userService.isLoggedIn()) {
                // add post route
                if (pageId == "addPost") {
                    self.addPostViewService.init();
                }
            } else {
                self.hub.publish(this, "/error", {
                    data: {
                        errorId: "403",
                        message: "access denied"
                    }
                });
            }
        }

        // main route, lists all blog posts
        else {
            self.blogListViewService.init();
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
