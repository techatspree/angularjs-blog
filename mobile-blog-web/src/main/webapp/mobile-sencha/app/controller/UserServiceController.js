/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.controller.UserServiceController", {
    extend: "Ext.app.Controller",

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
                sessionStorage.setItem('user', response.responseText);
                callback();
            },
            failure: function(response) {
                errorCallback();
            }
        });
    },

    isLoggedIn: function() {
        return (sessionStorage.getItem('user')) ? true : false;
    },

    register: function(data, callback, errorCallback) {
        Ext.Ajax.request({
            url: "../rest/user",
            method: 'POST',
            params: data,
            success: function(response) {
                callback();
            },
            failure: function(response) {
                errorCallback();
            }
        });
    },

    getUser: function() {
        var user = Ext.JSON.decode(sessionStorage.getItem('user'));
        if (user) { return user; }
        return false;
    }
});