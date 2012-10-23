/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.LoginView", {
    extend: "Ext.form.Panel",
    id: 'loginView',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Password'
    ],

    config: {
        title: ""
    },

    initialize: function() {
        this.callParent(arguments);

        var fieldset = Ext.create("Ext.form.FieldSet", {
            title: "",
            instructions: ""
        });

        var username = Ext.create("Ext.field.Text", {
            name: 'username',
            label: "Username"
        });

        var password = Ext.create("Ext.field.Password", {
            name: 'password',
            label: 'Password'
        });

        var submitBtn = Ext.create("Ext.Button", {
            text: "Login",
            ui: 'normal',
            id: 'loginSubmitBtn'
        });

        fieldset.add(username);
        fieldset.add(password);

        this.add(fieldset);
        this.add(submitBtn);
    }
});