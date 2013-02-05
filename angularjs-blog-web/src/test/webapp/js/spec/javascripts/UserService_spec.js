describe('UserService test suite', function() {

    beforeEach(module('Services'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });

    describe('Registration test', function() {
        var data, responseData,
            requestMethod, requestUrl;

        it('should send post request to "rest/user"', inject(
            function($httpBackend, UserService) {
                data = getJSONFixture('user.json');
                $httpBackend.expectPOST('rest/user').respond(data);

                UserService.register(data).
                    success(function(data, status, headers, config) {
                        responseData = data;
                        requestMethod = config.method;
                        requestUrl = config.url;
                    });

                $httpBackend.flush();

                expect(responseData).not.toBe(undefined);
                expect(requestMethod).toEqual("POST");
                expect(requestUrl).toEqual("rest/user");
            })
        );
    });

});
