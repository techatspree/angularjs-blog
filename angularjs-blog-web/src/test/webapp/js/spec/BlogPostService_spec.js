describe('BlogPostService test suite', function() {

    beforeEach(module('Services'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('BlogPostList tests', function() {
        var data = getJSONFixture('blog-post-list.json'),
            responseData;

        it('should send get request to "rest/blog"', inject(
            function($httpBackend, BlogPostService) {
                var requestType, requestUrl;
                $httpBackend.expectGET('rest/blog').respond(data);

                BlogPostService.fetchBlogPosts().
                    success(function(data, status, headers, config) {
                        responseData = data;
                        requestType = config.method;
                        requestUrl = config.url;
                    });

                $httpBackend.flush();

                expect(requestType).toEqual("GET");
                expect(requestUrl).toEqual("rest/blog");
            })
        );

        it("expect two blog posts", function() {
            expect(responseData.length).toEqual(2);
        });
    });


    describe('BlogPost test', function() {
        var data = getJSONFixture('blog-post.json'),
            responseData;

        it('should send get request to "rest/blog/xyz"', inject(
            function($httpBackend, BlogPostService) {
                var requestType, requestUrl;
                $httpBackend.expectGET('rest/blog/xyz').respond(data);

                BlogPostService.fetchBlogPost('xyz').
                    success(function(data, status, headers, config) {
                        responseData = data;
                        requestType = config.method;
                        requestUrl = config.url;
                    });

                $httpBackend.flush();
                expect(requestType).toEqual("GET");
                expect(requestUrl).toEqual("rest/blog/xyz");
            })
        );

        it("expect response data to equal data", function() {
            expect(responseData).toEqual(data);
        });
    });

});
