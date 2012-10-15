describe('BlogPostFrontend', function() {

    beforeEach(function() {
        hub
            .registerComponent(userService, {
                name: 'userService'
            })
            .registerComponent(blogPostBackend, {
                name:'blogPostBackend'
            })
            .registerComponent(blogPostFrontend, {
                name:   'blogPostFrontend',
                selectors: {
                    contentContainer:  '#testContent',
                    blogPostContainer: '#blogPostContainer',
                    commentsContainer: '#commentList'
                },
                templates: {
                    blogListPost: "#bloglistpost-tmpl",
                    blogPost:     "#blogpost-tmpl",
                    comment:      "#comment-tmpl"
                }
            })
            .start();

        $('body').append("<div id='testContent' style='display: none;'></div>");
        loadFixtures("BlogListPost.tmpl");
    });

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });

    it("updates a given node with the list of blog entries", function() {
        var responseMock = JSON.parse('[ { "id":1, "author":{"firstname":"Elvis", "surname":"Presley"}, "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet", "created":"2012-07-12T00:19:32.146+02:00" },{ "id":2, "author":{"firstname":"John", "surname":"Doe"}, "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet", "created":"2012-07-12T00:19:32.146+02:00" } ]');

        spyOn($, "ajax").andCallFake(function(params) {
            params.success(responseMock);
        });

        hub.getComponent("blogPostFrontend").updateWithBlogList();

        console.log("number of blog posts: " + $('#testContent').children().size());
        expect($('#testContent').children().size()).toBe(2);
    });

});
