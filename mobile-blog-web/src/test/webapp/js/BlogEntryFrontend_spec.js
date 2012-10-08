//describe('the BlogEntryFrontend',function(){
//
//    beforeEach(function() {
//        loadFixtures("BlogListEntry.tmpl");
//
////        $('#testNode').remove();
//        $('body').append('<div id="testNode" />');
//
//        hub
//            .registerComponent(templateManager, {
//                name: 'templateManager'
//            })
//            .registerComponent(blogPostBackend, {
//                name: 'blogPostBackend'
//            })
//            .registerComponent(blogPostFrontend, {
//                name: 'blogPostFrontend',
//                contentContainer: "#testNode",
//                blogPostContainer: '',
//                commentsContainer: ''
//            })
//            .start();
//
//        // Mock AJAX template fetching that would have been
//        // done in production code
//        spyOn(App, 'fetchTemplates').andReturn(true);
//    });
//
//    afterEach(function() {
//    });
//
//    it("updates a given node with the list of blog entries", function() {
//        var responseMock = JSON.parse('[ { "id":1, "author":{"firstname":"Elvis", "lastname":"Presley"}, "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet", "created":"2012-07-12T00:19:32.146+02:00" },{ "id":2, "author":{"firstname":"John", "lastname":"Doe"}, "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet", "created":"2012-07-12T00:19:32.146+02:00" } ]');
//
//        spyOn($, "ajax").andCallFake(function(params) {
//            params.success(responseMock);
//        });
//
//        hub.getComponent("blogPostFrontend").updateWithBlogList();
//
//        expect($('#testNode').children().size()).toBe(2);
////        expect(true);
//    });
//
//});