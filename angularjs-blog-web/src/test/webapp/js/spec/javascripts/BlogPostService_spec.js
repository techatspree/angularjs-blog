describe('BlogPostService test suite', function() {

    beforeEach(module('Services'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });

    describe('BlogPostList test', function() {
        var data, responseData,
            requestMethod, requestUrl;

        it('should send get request to "rest/blog"', inject(
            function($httpBackend, BlogPostService) {
                data = getJSONFixture('blog-post-list.json');
                $httpBackend.expectGET('rest/blog').respond(data);

                BlogPostService.fetchBlogPosts().
                    success(function(data, status, headers, config) {
                        responseData = data;
                        requestMethod = config.method;
                        requestUrl = config.url;
                    });

                $httpBackend.flush();

                expect(responseData).not.toBe(undefined);
                expect(requestMethod).toEqual("GET");
                expect(requestUrl).toEqual("rest/blog");
            }
        ));
    });

    describe('BlogPost test', function() {
        var data, responseData,
            requestMethod, requestUrl;

        it('should send get request to "rest/blog/xyz"', inject(
            function($httpBackend, BlogPostService) {
                data = getJSONFixture('blog-post.json'),
                $httpBackend.expectGET('rest/blog/xyz').respond(data);

                BlogPostService.fetchBlogPost('xyz').
                    success(function(data, status, headers, config) {
                        responseData = data;
                        requestMethod = config.method;
                        requestUrl = config.url;
                    });

                $httpBackend.flush();

                expect(responseData).not.toBe(undefined);
                expect(requestMethod).toEqual("GET");
                expect(requestUrl).toEqual("rest/blog/xyz");
            })
        );
    });

});
