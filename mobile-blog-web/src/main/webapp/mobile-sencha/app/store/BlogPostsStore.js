/**
 * @author Till Hermsen
 * @date 19.10.12
 */
Ext.define("Blog.store.BlogPostsStore", {
    extend: "Ext.data.Store",
    config: {
        storeId: 'blogPostsStore',
        model: 'Blog.model.BlogPostModel',
        proxy:{
            type: 'ajax',
            url: '../rest/blog',
            reader: {
                type:  'json'
            }

        },

//        data: [
//            {
//                "id":1,
//                "title":"Blog Post - 1",
//                "content":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
//                "author":{
//                    "id":3,
//                    "firstname":"Jerry",
//                    "surname":"Francis",
//                    "email":"jfrancis@akquinet.de",
//                    "username":"jfrancis",
//                    "phone":null
//                },
//                "created":1350546355340
//            },
//
//            {
//                "id":2,
//                "title":"Blog Post - 2",
//                "content":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
//                "author":{
//                    "id":3,
//                    "firstname":"Jerry",
//                    "surname":"Francis",
//                    "email":"jfrancis@akquinet.de",
//                    "username":"jfrancis",
//                    "phone":null
//                },
//                "created":1350546355344
//            }
//        ],
        autoLoad: true
    }
});