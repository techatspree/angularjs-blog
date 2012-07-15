// TODO: second test, some doc

describe('the BlogEntryFrontend',function(){
    beforeEach(function() {
        loadFixtures("BlogListEntry.tmpl");

        // Mock AJAX template fetching that would have been
        // done in production code
        spyOn(App, 'fetchTemplates').andReturn(true);
    });

    afterEach(function() {
    });

    it("updates a given node with the list of blog entries", function() {
        var responseMock = JSON.parse('[ { "author":{"firstname":"Elvis", "lastname":"Presley"}, "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet", "created":"2012-07-12T00:19:32.146+02:00" },{ "author":{"firstname":"John", "lastname":"Doe"}, "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet", "created":"2012-07-12T00:19:32.146+02:00" } ]');

        spyOn($, "ajax").andCallFake(function(params) {
            params.success(responseMock);
        });

//        var fakeData = "";
//        spyOn($, "ajax").andCallFake(function(params) {
//            params.success(fakeData);
//        });

        var node = $('<div />');

        App.BlogEntryFrontend.updateWithBlogList(node);

        expect(node.children().size()).toBe(2);
    });

});