describe('BlogPostService', function() {

    beforeEach(module('BlogPostServices'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('BlogPostList', function() {
        var data = getJSONFixture('blog-post-list.json'),
            responseData;

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('rest/blog').respond(data);
        }));

        it('should send get request to "rest/blog"', inject(function(BlogPostService) {
            BlogPostService.fetchBlogPosts().
                success(function(data) {
                    responseData = data;
                });
            $httpBackend.flush();
        }));

        it("expect two blog posts", function() {
            expect(responseData.length).toEqual(2);
        });
    });


    describe('BlogPost', function() {
        var data = getJSONFixture('blog-post.json'),
            responseData;

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('rest/blog/xyz').respond(data);
        }));

        it('should send get request to "rest/blog/xyz"', inject(function(BlogPostService) {
            BlogPostService.fetchBlogPost('xyz').
                success(function(data) {
                    responseData = data;
                });
            $httpBackend.flush();
        }));

        it("expect response data to equal data", function() {
            expect(responseData).toEqual(data);
        });
    });

});
