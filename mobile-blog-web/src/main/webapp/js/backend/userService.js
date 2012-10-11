/**
 * The UserService enables access to:
 *  - user registration
 *  - login / logout
 *  - check if user is logged-in
 *  - retrieve user data
 *
 * @author Till Hermsen
 * @date 11.10.12
 */
userServiceContract = {

    /**
     * Returns user data.
     */
    getUser : function() {},

    /**
     * Returns logged-in status.
     */
    isLoggedIn : function() {},

    /**
     * User login.
     *
     * @param credentials
     * @param callback
     * @param errorCallback
     */
    login : function(credentials, callback, errorCallback) {},

    /**
     * User logout.
     */
    logout : function() {},

    /**
     * Register user.
     *
     * @param user user data
     * @param callback
     * @param errorCallback
     */
    register : function(user, callback, errorCallback) {},

    /**
     *
     *
     * @param id
     * @param callback
     * @param errorCallback
     */
    retrieveUser : function(id, callback, errorCallback) {}

}

userService = {

    hub: null,


    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'userService';
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

        // Provide service
        self.hub.provideService({
            component: self,
            contract:  userServiceContract
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
    getUser : function() {
        // check if user cookie is set
        if ($.fn.cookie("user") != null) {
            return JSON.parse($.fn.cookie("user"));
        }

        return false;
    },

    isLoggedIn : function() {
        // check if loggedIn cookie is set
        if ($.fn.cookie("loggedIn") != null) {
            return true;
        }

        return false;
    },

    login : function(credentials, callback, errorCallback) {
        $.ajax({
            url: "../rest/authentication",
            type: "POST",
            data: credentials,
            cache: false,
            success: function(data) {
//                loggedIn = true;
//                user = data;

                // set loggedIn and user cookie
                $.fn.cookie('loggedIn', 'true');
//                $.fn.cookie('user', JSON.stringify(user));
                $.fn.cookie('user', JSON.stringify(data));

                callback(data);
            },
            error: function(error) {
//                loggedIn = false;
//                user = null;
                var errorMsg = "error login -" + error.status;
                console.log(errorMsg);
                if (errorCallback) {
                    errorCallback(errorMsg);
                }
            }
        });
    },

    logout : function() {
        if ($.fn.cookie("loggedIn") != null) {
            $.fn.cookie("loggedIn", null);
        }
        if ($.fn.cookie("user") != null) {
            $.fn.cookie("user", null);
        }
    },

    register : function(user, callback, errorCallback) {
        $.ajax({
            url: "../rest/user",
            type: "POST",
            cache: false,
            data: user,
            success: function(data) {
                callback(data);
            },
            error: function(error) {
                var errorMsg = "error registering user - " + error.status;
                console.log(errorMsg);
                if (errorCallback) {
                    errorCallback(error);
                }
            }
        });
    },

    retrieveUser : function(id, callback, errorCallback) {
        $.ajax({
            url: "rest/user/" + id,
            cache: false,
            success: function(user) {
                callback(user);
            },
            error: function(error) {
                var errorMsg = "error retrieving user -" + error.status;
                console.log(errorMsg);
                if (errorCallback) {
                    errorCallback(errorMsg);
                }
            }
        });
    }


    /**
     * Private methods.
     */

}
