describe('CommentService', function() {

    beforeEach(module('Services'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('CommentList', function() {
        var data = getJSONFixture('comment-list.json'),
            responseData;

        it('should send get request to "rest/blog/xyz/comment"', inject(function($injector) {
            var $httpBackend = $injector.get('$httpBackend'),
                CommentService = $injector.get('CommentService');

            $httpBackend.expectGET('rest/blog/xyz/comment').respond(data);

            CommentService.fetchComments('xyz').
                success(function(data) {
                    responseData = data;
                });
            $httpBackend.flush();
        }));

        it('expect two comments', function() {
            expect(responseData.length).toEqual(2);
        });
    });

});
