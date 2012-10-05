App.UserService = function() {
    var loggedIn = false;
    var user;

    return {
        getUser : function() {
            // check if user cookie is set
            if ($.fn.cookie("user") != null) {
                return JSON.parse($.fn.cookie("user"));
            }

            return user;
        },

        isLoggedIn : function() {
            // check if loggedIn cookie is set
            if ($.fn.cookie("loggedIn") != null) {
                return true;
            }

            return loggedIn;
        },

        login : function(credentials, callback, errorCallback) {
            $.ajax({
                url: "../rest/authentication",
                type: "POST",
                data: credentials,
                cache: false,
                success: function(data) {
                    loggedIn = true;
                    user = data;

                    // set loggedIn and user cookie
                    $.fn.cookie('loggedIn', 'true');
                    $.fn.cookie('user', JSON.stringify(user));

                    callback(data);
                },
                error: function(error) {
                    loggedIn = false;
                    user = null;
                    var errorMsg = "error adding blog post -" + error.status;
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
    }
}();
