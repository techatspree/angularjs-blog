/**
 * @author Till Hermsen
 * @date 22.10.12
 */
Ext.define("Blog.controller.AuthController", {
    extend: "Ext.app.Controller",

    config: {
        refs: {
            mainView: '#mainView',
            loginView: '#loginView',
            loginBtn: '#loginBtn'

        },
        config: {
            loginBtn: {
                showLoginView: 'showLoginView'
            }
        }
    },

    showLoginView: function() {
        console.log("auth controller show login view");
        var mainView = this.getMainView(),
            view = this.getLoginView();

        mainView.push(view);


    }


});