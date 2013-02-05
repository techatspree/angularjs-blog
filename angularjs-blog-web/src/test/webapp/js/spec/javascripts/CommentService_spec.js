describe('CommentService test suite', function() {

    beforeEach(module('Services'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });

    describe('CommentList test', function() {
        var data, responseData,
            requestMethod, requestUrl;

        it('should send get request to "rest/blog/xyz/comment"', inject(
            function($httpBackend, CommentService) {
                data = getJSONFixture('comment-list.json');
                $httpBackend.expectGET('rest/blog/xyz/comment').respond(data);

                CommentService.fetchComments('xyz').
                    success(function(data, status, headers, config) {
                        responseData = data;
                        requestMethod = config.method;
                        requestUrl = config.url;
                    });

                $httpBackend.flush();

                expect(responseData).not.toBe(undefined);
                expect(requestMethod).toEqual("GET");
                expect(requestUrl).toEqual("rest/blog/xyz/comment");
            })
        );
    });

});
