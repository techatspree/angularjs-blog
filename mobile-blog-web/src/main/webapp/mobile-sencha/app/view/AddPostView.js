/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.AddPostView", {

    extend: "Ext.form.Panel",
    id: 'addPostView',

    config: {
        title: ""
    },

    initialize: function() {
        this.callParent(arguments);

        var fieldset = Ext.create("Ext.form.FieldSet", {
            title: '',
            description: ''
        });

        var title = Ext.create("Ext.field.Text", {
            name: 'title',
            label: 'Title'
        });

        var content = Ext.create("Ext.field.TextArea", {
            name: 'content',
            label: 'Content'
        });

        var submitBtn = Ext.create("Ext.Button", {
            text: "Submit",
            ui: 'normal',
            id: 'addPostSubmitBtn'
        });

        fieldset.add(title);
        fieldset.add(content);

        this.add(fieldset);
        this.add(submitBtn);
    }

});
