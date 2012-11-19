describe('CommentService', function() {

    beforeEach(module('CommentServices'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('CommentList', function() {
        var data = getJSONFixture('comment-list.json'),
            responseData;

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('rest/blog/xyz/comment').respond(data);
        }));

        it('should send get request to "rest/blog/xyz/comment"', inject(function(CommentService) {
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
