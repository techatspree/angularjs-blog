/**
 * @author Till Hermsen
 * @date 22.10.12
 */
Ext.define("Blog.controller.AuthController", {
    extend: "Ext.app.Controller",

    config: {
        refs: {
            mainView: '#mainView',
            loginBtn: { selector: "button[id='loginBtn']" },
            loginSubmit: { selector: 'button[id="loginSubmitBtn"]' },
            registerBtn: { selector: "button[id='registerBtn']" },
            loginView: { selector: "formpanel[id='loginView']" },
            registerView: { selector: "formpanel[id='registerView']" }
        },
        control: {
            loginBtn: {
                tap: 'showLoginView'
            },
            loginSubmit: {
                tap: 'loginSubmit'
            },
            loginView: {
                activate: 'onActivateLoginView'
            },
            registerBtn: {
                tap: 'showRegisterView'
            },
            registerView: {
                activate: 'onActivateRegisterView'
            }

        }
    },

    showLoginView: function(btn, e, eOpts) {
        var mainView = this.getMainView(),
            view     = Ext.create("Blog.view.LoginView");

        mainView.push(view);
    },

    onActivateLoginView: function(self) {
        var buttons = [
            { id: "registerBtn", loggedIn: false }
        ];
        self.fireEvent("showButtons", buttons);

        self.setTitle("Login")
    },

    showRegisterView: function() {
        var mainView = this.getMainView(),
            view     = Ext.create("Blog.view.RegisterView");

        mainView.push(view);
    },
    onActivateRegisterView: function(self) {
        var buttons = [];
        self.fireEvent("showButtons", buttons);

        self.setTitle("Register");
    },

    loginSubmit: function() {
        var userService = this.getApplication().getController('UserServiceController');

        var credentials = this.getLoginView().getValues();

        var user = {};

        user.username = credentials.username;
        user.password = credentials.password;

        var mainView = this.getMainView();

        var callback = function() {
            mainView.pop();
        };

        var errorCallback = function() {
            Ext.Msg.alert('Login', 'Login failed!', Ext.emptyFn);
        }


        userService.login(credentials, callback, errorCallback);
    }

});
