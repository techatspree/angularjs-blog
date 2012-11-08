'use strict';

describe('E2E Tests', function() {

    describe('Registration test', function() {


        it('should redirect to "/login" after successful registration', function() {
            browser().navigateTo('/blog/angular-js/index.html#/register');
            input('user.username').enter('jd');
            input('user.password').enter('pwd');
            input('user.firstname').enter('John');
            input('user.surname').enter('Doe');
            input('user.email').enter('john@doe.com');

            element('#registerSubmitBtn', 'register form submit button').click();

            expect(browser().location().url()).toBe('/login');
        });

        afterEach(function() {
            var $http = angular.injector(['ng']).get('$http');



            $http.get('../../../rest/user').success(function(data) {
                var userId;
                console.log(data);
                angular.forEach(data, function(user) {
                    console.log(user);
                    if (user.username === 'jd') {
                        userId = user.id;
                    }

                    if (userId) { console.log(userId); }
                });
            });

        });

    });

});
