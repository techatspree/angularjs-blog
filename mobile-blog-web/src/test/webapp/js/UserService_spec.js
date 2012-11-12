describe('UserServices', function() {

    beforeEach(module('UserServices'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('Register', function() {
        var data = getJSONFixture('user.json'),
            responseData;

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('../rest/user').respond(data);
        }));

        it('should send post request to "../rest/user"', inject(function(UserService) {
            UserService.register(data).
                success(function(data) {
                    responseData = data;
                });
            $httpBackend.flush();
        }));

        it("expect response data equals data", function() {
            expect(responseData).toEqual(data);
        });
    });

});