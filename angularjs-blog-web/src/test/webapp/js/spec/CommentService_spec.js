describe('CommentService test suite', function() {

    beforeEach(module('Services'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('CommentList tests', function() {
        var data = getJSONFixture('comment-list.json'),
            responseData;

        it('should send get request to "rest/blog/xyz/comment"', inject(
            function($httpBackend, CommentService) {
                var requestType, requestUrl;
                $httpBackend.expectGET('rest/blog/xyz/comment').respond(data);

                CommentService.fetchComments('xyz').
                    success(function(data, status, headers, config) {
                        responseData = data;
                        requestType = config.method;
                        requestUrl = config.url;
                    });

                $httpBackend.flush();
                expect(requestType).toEqual("GET");
                expect(requestUrl).toEqual("rest/blog/xyz/comment");
            })
        );

        it('expect two comments', function() {
            expect(responseData.length).toEqual(2);
        });
    });

});
