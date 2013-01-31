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
                var requestType, requestUrl;
                $httpBackend.expectPOST('rest/user').respond(data);

                UserService.register(data).
                    success(function(data, status, headers, config) {
                        responseData = data;
                        requestType = config.method;
                        requestUrl = config.url;
                    });

                $httpBackend.flush();
                expect(requestType).toEqual("POST");
                expect(requestUrl).toEqual("rest/user");
            })
        );

        it("expect response data equals data", function() {
            expect(responseData).toEqual(data);
        });
    });

});