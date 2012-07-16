App.UserService = function() {
    var loggedIn = false;
    var user;

    return {
        getUser : function() {
            return user;
        },

        isLoggedIn : function() {
            return loggedIn;
        },

        // TODO: Error handling
        login : function(credentials, callback, errorCallback) {
            $.ajax({
                url: "../rest/authentication",
                type: "POST",
                data: credentials,
                cache: false,
                success: function(data) {
                    loggedIn = true;
                    user = data;
                    callback(data);
                },
                error: function(error) {
                    loggedIn = false;
                    user = null;
                    // TODO: Show error at correct position in UI?
                    var errorMsg = "error adding blog post -" + error.status;
                    console.log(errorMsg);
                    if (errorCallback) {
                        errorCallback(errorMsg);
                    }
                }
            });
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
                    // TODO: Show error at correct position in UI?
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
                // TODO: Replace with REST call
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
    }
}();
