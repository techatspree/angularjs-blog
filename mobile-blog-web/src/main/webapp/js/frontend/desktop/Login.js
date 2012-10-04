/**
 * User: Till Hermsen
 * Date: 01.10.12
 */
App.Login = function() {

    var validateLoginForm;

    var showError = function(error) {
        var data = {
            id : "errorLogin",
            errorMessage : "Login failed!"
        };
        validateLoginForm = _.template($("#desktopformvalidationerror-tmpl").html(), data);
        $(validateLoginForm).insertAfter("#loginForm");
    };

    var clearValidationErrors = function() {
        if (validateLoginForm) { $("#errorLogin").remove(); }
    };

    return {

        loadLoginForm : function() {
            return $("#desktoploginform-tmpl").html();
        },

        onLoginClicked : function() {
            clearValidationErrors();

            var credentials = $("#loginForm").serializeArray();

            var user = {};
            user.username = credentials[0].value;
            user.password = credentials[1].value

            App.UserService.login(user,
                function(user) {
                    location.reload();
                },
                function(error) {
                    showError(error);
                }
            );
        }
    }

}();
