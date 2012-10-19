/**
 * @author Till Hermsen
 * @date 18.10.12
 */
Ext.define("Blog.controller.MainController", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            mainView: 'mainview',
            blogList: 'list',
            addPostBtn: '#addPostBtn'
        },
        control: {
            addPostBtn: {
                addPost: function(btn) {
                    console.log("main controller: add post btn");


                    this.getMainView().push({


                        xtype: 'formpanel',
                        title: 'Add post',
                        items: [
                            {
                                xtype: 'fieldset',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        name : 'title',
                                        label: 'Title'
                                    },
                                    {
                                        xtype: 'textarea',
                                        name : 'content',
                                        label: 'Content'
                                    }
                                ]
                            }
                        ]

                    });
                }
            },

            blogList: {
                showBlogPost: function(list, record) {
                    console.log("record:");
                    console.log(record);

                    var postsStore = Ext.StoreManager.get('posts');
//                    console.log("Posts: ");
//                    console.log(postsStore);

                    var store = Ext.StoreManager.get('comments');
//                    store.setProxy({
//                        type: 'rest',
//                        url: '../rest/blog/17/comment'
//                    });
                    store._proxy._url = store._proxy._url.replace('{id}', record.internalId);

                    store.load();
//                    console.log("Comments: ");
//                    console.log(store);

                    var data = record.data;

                    data['comments'] = store.getData();


                    console.log("Data:");
                    console.log(data);


                    var template = Ext.XTemplate.from(Ext.get('blogpost'));

                    var commentsTpl = Ext.XTemplate.from(Ext.get('comment'));


                    this.getMainView().push({
                        xtype: 'container',
                        title: record.data.title,
                        scrollable: true,
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'panel',
                                width: '100%',
                                height: 'auto',
                                html: template.apply(record.data),
                                styleHtmlContent: true
                            },
                            {
                                xtype: 'dataview',
                                scrollable: false,
                                width: '100%',
                                height: 'auto',
                                store: 'comments',
//                                store: {
//                                    fields: ['name', 'age'],
//                                    data: [
//                                        {name: 'Jamie',  age: 100},
//                                        {name: 'Rob',   age: 21},
//                                        {name: 'Tommy', age: 24},
//                                        {name: 'Jacky', age: 24},
//                                        {name: 'Ed',   age: 26}
//                                    ]
//                                },



//                                html: commentsTpl.apply(data),
                                itemTpl: commentsTpl,
                                styleHtmlContent: true
                            }
                        ]

//                        xtype: 'panel',
//                        scrollable: true,
//                        title: record.data.title,
//                        html: template.apply(record.data),
//                        styleHtmlContent: true,
//                        items: [
//                            {
//                                xtype: 'panel',
//                                html: "<div>test</div>"
//                            }
//                        ]
                    });
                }
            }

        }
    },

});