/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.controller.UserServiceController", {
    extend: "Ext.app.Controller",

    loggedIn: false,

    config: {
        refs: {},
        control: {}
    },


    login: function(credentials, callback, errorCallback) {
        Ext.Ajax.request({
            url: "../rest/authentication",
            method: "POST",
            params: credentials,
            success: function(response) {
                sessionStorage.setItem('isLoggedIn', true);
                callback();
            },
            failure: function(response) {
                errorCallback();
            }
        });
    },

    isLoggedIn: function() {
        var status = (sessionStorage.getItem('isLoggedIn'))
            ? (sessionStorage.getItem('isLoggedIn'))
            : false;

        return status;
    }
});