/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.RegisterView", {
    extend: "Ext.form.Panel",
    id: 'registerView',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Password',
        'Ext.field.Number',
        'Ext.field.Email'
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

        var firstname = Ext.create("Ext.field.Text", {
            name: 'firstname',
            label: 'First Name'
        });

        var lastname = Ext.create("Ext.field.Text", {
            name: 'surname',
            label: 'Last Name'
        });

        var email = Ext.create("Ext.field.Email", {
            name: 'email',
            label: 'Email'
        });

        var phone = Ext.create("Ext.field.Number", {
            name: 'phone',
            label: 'Phone'
        });

        var submitBtn = Ext.create("Ext.Button", {
            text: "Register",
            ui: 'normal',
            id: 'registerSubmitBtn'
        });

        fieldset.add(username);
        fieldset.add(password);
        fieldset.add(firstname);
        fieldset.add(lastname);
        fieldset.add(email);
        fieldset.add(phone);

        this.add(fieldset);
        this.add(submitBtn);
    }
});