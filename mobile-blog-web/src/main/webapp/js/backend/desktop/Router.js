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


    // views
//    svc: [],
    blogListView: null,

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
        // all desktop and mobile components??
        this.hub.requireService({
            component: this,
            contract: blogPostBackend,
            field: "blogListView"
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
    start: function() {
        console.log("router started");
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
    // needs refactoring!!
    initRoute: function() {
        var keyValueHash = this.getKeyValueHash();

        var postID = keyValueHash['showPost'];
        var pageID = keyValueHash['page'];

        if (postID != null) {
            $("#content").append(App.BlogPostNode.get());
            App.BlogPostNode.refresh(postID);
        }

        else if(pageID != null && pageID == "addPost") {
            if (App.UserService.isLoggedIn()) {
                $("#content").html(_.template($("#desktopaddpostform-tmpl").html(), {}));
                $("#addPostForm").submit(function(e) {
                    App.BlogAddPost.onSubmitClicked();
                    return false;
                });
            } else {
                $("#content").html("please login");
            }
        }

        else {
//            this.blogListView.init();
//            this.blogListView.refresh();

//            for(var i=0; i < $('article').length; i++) {
//                $("#postButton" + i).on('click', function() {
//                    App.openBlogPost(i);
//                    return false;
//                });
//            }
//
//            hub.getComponent("blogPostFrontend").updateWithBlogList($('#content'));
//
//            // add post button
//            if (App.UserService.isLoggedIn()) {
//                $($("#desktopaddpostbtn-tmpl").html()).insertBefore('#content');
//                $("#addPostBtn").on("click", function(e) {
//                    document.location.href = "?page=addPost";
//                });
//            }
        }

        // add login / logout button
        if (App.UserService.isLoggedIn()) {
            var data = {
                id    : 'logoutBtn',
                title : 'Logout'
            };
            $("#user").html(_.template($("#desktoploginlogoutbtn-tmpl").html(), data));

        } else {
            var data = {
                id    : 'loginBtn',
                title : 'Login'
            };
            $("#user").html(_.template($("#desktoploginlogoutbtn-tmpl").html(), data));
        }

        // load login form
        $("#loginBtn").on("click", function(e) {
            $("#user").html(_.template(App.Login.loadLoginForm(), {}));

            // login
            $("#loginSubmit").on("click", function(e) {
                App.Login.onLoginClicked();
                return false;
            });

            // load register form
            $("#registerBtn").on("click", function(e) {
                $("#user").html(_.template(App.Register.loadRegisterForm(), {}));

                $("#registerSubmit").on("click", function(e) {
                    App.Register.onRegisterClicked();
                    return false;
                });
                return false;
            });

            return false;
        });

        // logout
        $("#logoutBtn").on("click", function(e) {
            App.UserService.logout();
            location.reload()

            return false;
        });
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
