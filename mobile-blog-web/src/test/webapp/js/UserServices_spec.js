describe('UserServices', function() {

    beforeEach(module('UserServices'));

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('Register', function() {
        var data = getJSONFixture('user.json');

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('../rest/user').respond(data);
        }));

        it('should send post request to "../rest/user"', inject(function(UserService) {
            UserService.register({}, function(){});
            $httpBackend.flush();
        }));

        it("should return registered user", inject(function(UserService) {
            var user;
            var onSuccess = function (data) {
                user = data;
            };
            UserService.register(data, onSuccess);
            $httpBackend.flush();
            expect(user).toEqualData(data);
        }));

        it("should return incomplete user data", inject(function(UserService) {
            var user;
            var onSuccess = function(data, status, headers, config) {
                user = data;
                console.log(config);
            };
            UserService.register(data, onSuccess);
            $httpBackend.flush();
            expect(user).toEqualData(data);
        }));
    });

});