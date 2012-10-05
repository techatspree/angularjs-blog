/**
 * User: Till Hermsen
 * Date: 02.10.12
 */
App.Register = function() {

    var validateUsername, validatePassword, validateFirstname,
        validateSurname, validateEmail, validatePhone;

    var showError = function(error) {
        if (error.username) {
            var data = {
                id           : "errorUser",
                errorMessage : error.username
            }

            validateUsername = _.template($("#desktopformvalidationerror-tmpl").html(), data);
            $(validateUsername).insertAfter("#inputUser");
        }

        if (error.password) {
            var data = {
                id           : "errorPass",
                errorMessage : error.password
            }

            validatePassword = _.template($("#desktopformvalidationerror-tmpl").html(), data);
            $(validatePassword).insertAfter("#inputPass");
        }

        if (error.firstname) {
            var data = {
                id           : "errorFirstname",
                errorMessage : error.firstname
            }

            validateFirstname = _.template($("#desktopformvalidationerror-tmpl").html(), data);
            $(validateFirstname).insertAfter("#inputFirstName");
        }

        if (error.surname) {
            var data = {
                id           : "errorSurname",
                errorMessage : error.surname
            }

            validateSurname = _.template($("#desktopformvalidationerror-tmpl").html(), data);
            $(validateSurname).insertAfter("#inputSurname");
        }

        if (error.email) {
            var data = {
                id           : "errorEmail",
                errorMessage : error.email
            }

            validateEmail = _.template($("#desktopformvalidationerror-tmpl").html(), data);
            $(validateEmail).insertAfter("#inputEmail");
        }

        if (error.phone) {
            var data = {
                id           : "errorPhone",
                errorMessage : error.phone
            }

            validatePhone = _.template($("#desktopformvalidationerror-tmpl").html(), data);
            $(validatePhone).insertAfter("#inputPass");
        }
    };

    var clearValidationErrors = function() {
        if (validateUsername)  { $("#errorUser").remove() }
        if (validatePassword)  { $("#errorPass").remove(); }
        if (validateFirstname) { $("#errorFirstname").remove(); }
        if (validateSurname)   { $("#errorSurname").remove(); }
        if (validateEmail)     { $("#errorEmail").remove(); }
        if (validatePhone)     { $("#errorPhone").remove(); }
    };


    return {

        loadRegisterForm : function() {
                return $("#desktopregisterform-tmpl").html();
        },

        onRegisterClicked : function() {
            clearValidationErrors();

            var formData = $("#registerForm").serializeArray();

            var userData = {};
            userData.username  = formData[0].value;
            userData.password  = formData[1].value;
            userData.firstname = formData[2].value;
            userData.surname   = formData[3].value;
            userData.email     = formData[4].value;
            userData.phone     = formData[5].value;

            App.UserService.register(userData,
                function(data) {
                    location.reload();
                },
                function(error) {
                    showError(JSON.parse(error.response));
                });
        }
    }
}();
