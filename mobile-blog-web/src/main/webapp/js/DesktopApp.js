App = {

    templates : [
        'BlogListEntry',
        'BlogEntry',
        'Comment',
        'DesktopLoginForm',
        'DesktopRegisterForm',
        'DesktopAddPostForm',
        'DesktopLoginLogoutBtn',
        'DesktopFormValidationError',
        'DesktopAddPostBtn',
        'DesktopCommentForm',
        'DesktopBlogEntry'
    ],

    load: function() {
        // Component registrations
        hub
            .registerComponent(templateManager, {
                name: 'templateManager'
            });
        // register more components here as required.

        // before starting the hub, let the template manager
        // do its async tasks.
        hub.getComponent('templateManager').fetchTemplates(
                this.templates, function() { App.start(); });
    },

	start: function() {
        hub.start();

	    var searchString = window.location.search.substring(1),
                    params = searchString.split("&"),
                    keyValueHash = {};

	    for (var i = 0; i < params.length; i++) {
	        var val = params[i].split("=");
	        keyValueHash[unescape(val[0])] = unescape(val[1]);
	    }

        var postID = keyValueHash['showPost'];
        var pageID = keyValueHash['page'];

        if (postID != null) {
            $("#content").append(App.BlogPostNode.get());
            App.BlogPostNode.refresh(postID);
	    }
        else if (pageID != null && pageID == "addPost") {
            if (App.UserService.isLoggedIn()) {
                $("#content").html(_.template($("#desktopaddpostform-tmpl").html(), {}));
                $("#addPostForm").submit(function(e) {
                    App.BlogAddPost.onSubmitClicked();
                    return false;
                });
            } else {
                $("#content").html("please login");
            }
        }
        else {
            for(var i=0; i < $('article').length; i++) {
                $("#postButton" + i).on('click', function() {
                    App.openBlogPost(i);
                    return false;
                });
            }

            App.BlogEntryFrontend.updateWithBlogList($('#content'));


            // add post button
            if (App.UserService.isLoggedIn()) {
                $($("#desktopaddpostbtn-tmpl").html()).insertBefore('#content');
                $("#addPostBtn").on("click", function(e) {
                    document.location.href = "?page=addPost";
                });
            }

        }


        // add login / logout button
        if (App.UserService.isLoggedIn()) {
            var data = {
                id    : 'logoutBtn',
                title : 'Logout'
            };
            $("#user").html(_.template($("#desktoploginlogoutbtn-tmpl").html(), data));

        } else {
            var data = {
                id    : 'loginBtn',
                title : 'Login'
            };
            $("#user").html(_.template($("#desktoploginlogoutbtn-tmpl").html(), data));
        }

        // load login form
        $("#loginBtn").on("click", function(e) {
            $("#user").html(_.template(App.Login.loadLoginForm(), {}));

            // login
            $("#loginSubmit").on("click", function(e) {
                App.Login.onLoginClicked();
                return false;
            });

            // load register form
            $("#registerBtn").on("click", function(e) {
                $("#user").html(_.template(App.Register.loadRegisterForm(), {}));

                $("#registerSubmit").on("click", function(e) {
                    App.Register.onRegisterClicked();
                    return false;
                });
                return false;
            });

            return false;
        });

        // logout
        $("#logoutBtn").on("click", function(e) {
            App.UserService.logout();
            location.reload()

            return false;
        });

	},

	openBlogPost: function(id) {
        document.location.href = "?showPost=" + id;
    }
};
