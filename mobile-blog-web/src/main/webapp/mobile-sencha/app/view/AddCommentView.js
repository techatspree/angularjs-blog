/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.view.AddCommentView", {

    extend: "Ext.form.Panel",
    id: 'addCommentView',

    config: {
        title: ""
    },

    initialize: function() {
        this.callParent(arguments);

        var fieldset = Ext.create("Ext.form.FieldSet", {
            title: "",
            description: ""
        });

        var content = Ext.create("Ext.field.TextArea", {
            name: "content",
            label: "Content"
        });

        var submitBtn = Ext.create("Ext.Button", {
            text: "Submit",
            ui: 'normal',
            id: 'addCommentSubmitBtn'
        });


        fieldset.add(content);
        this.add(fieldset);
        this.add(submitBtn);
    }

});
