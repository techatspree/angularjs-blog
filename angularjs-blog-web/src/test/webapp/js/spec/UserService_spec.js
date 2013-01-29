describe('UserService test suite', function() {

    beforeEach(module('Services'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('Registration test', function() {
        var data = getJSONFixture('user.json'),
            responseData;

        it('should send post request to "rest/user"', inject(
            function($httpBackend, UserService) {
                $httpBackend.expectPOST('rest/user').respond(data);

                UserService.register(data).
                    success(function(data) {
                        responseData = data;
                    });

                $httpBackend.flush();
            })
        );

        it("expect response data equals data", function() {
            expect(responseData).toEqual(data);
        });
    });

});