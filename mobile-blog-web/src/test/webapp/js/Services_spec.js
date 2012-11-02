//describe('BlogPostService', function() {
//
//    beforeEach(function() {
//        console.log("test");
//    });
//
//    beforeEach(module('blogPost.services'));
//
//    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, post) {
//        $httpBackend = _$httpBackend_;
//        $httpBackend.expectGET('../rest/blog').
//            respond([ { "id":1, "author":{"firstname":"Elvis", "surname":"Presley"}, "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet", "created":"2012-07-12T00:19:32.146+02:00" },{ "id":2, "author":{"firstname":"John", "surname":"Doe"}, "title":"Lorem ipsum dolor sit amet", "content":"Lorem ipsum dolor sit amet", "created":"2012-07-12T00:19:32.146+02:00" } ]);
//
//
//    }));
//
//    afterEach(function() {
//        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
//    });
//
//
//
//
//    it("should ..", inject(function(post) {
//        var tmp = post.query();
//        $httpBackend.flush();
//        console.log(tmp.length);
//
//        expect(tmp.length).toEqual(2);
//    }));
//
//});
