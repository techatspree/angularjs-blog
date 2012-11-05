describe('UserServices', function() {

    beforeEach(module('UserServices'));

    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    afterEach(function() {
        jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
    });


    describe('Register', function() {
        var userData = function() {
            return {
                "username": "user", "password": "pwd",
                "firstname": "John", "surname": "Doe",
                "email": "john@doe.com"
            };
        };

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectPOST('../rest/user').
                respond(userData());
        }));

        it("should return registered user", inject(function(UserService) {
            var user;
            var onSuccess = function (data) {
                user = data;
            };
            UserService.register(userData, onSuccess);
            $httpBackend.flush();
            expect(user).toEqualData(userData());
        }));
    });

});