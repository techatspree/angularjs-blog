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
    userService:          null,
    mainContainerService: null,


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
            contract: mainContainerContract,
            field: "mainContainerService"
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
        var keyValueHash = this.getKeyValueHash();

        var postId = keyValueHash['showPost'];
        var pageId = keyValueHash['page'];

        // load main view
        this.mainContainerService.init();


        // singe blog post route
        if (postId != null) {
            this.hub.publish(this, "/blogPostView/init", {postId: postId});
        }

        // page routes
        else if(pageId != null) {
            // following pages require logged-in user
            if (self.userService.isLoggedIn()) {
                // add post route
                if (pageId == "addPost") {
                    this.hub.publish(this, "/addPostView/init", {});
                }
            } else {
                self.hub.publish(this, "/errorView/init", {
                    data: {
                        errorId: "403",
                        message: "access denied"
                    }
                });
            }
        }

        // main route, lists all blog posts
        else {
            this.hub.publish(this, "/blogListView/init", {});
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
