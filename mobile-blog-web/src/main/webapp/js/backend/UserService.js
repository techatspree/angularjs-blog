App.UserService = function() {
    var loggedIn = false;

    return {
        isLoggedIn : function() {
            // TODO: implement
            return loggedIn;
        },

        // TODO: Error handling
        login : function(username, password, postLoginAction, callback, errorCallback) {
            console.log(username + ":" + password);
            loggedIn = true;

            callback();
            postLoginAction();
        },

        register : function(user, callback, errorCallback) {
            $.ajax({
                url: "../rest/user",
                contentType: "application/json",
                dataType: "json",
                type: "POST",
                cache: false,
                data: JSON.stringify(user),
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
