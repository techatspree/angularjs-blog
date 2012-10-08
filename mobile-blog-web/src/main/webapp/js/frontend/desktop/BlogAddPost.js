/**
 * User: Till Hermsen
 * Date: 01.10.12
 */
App.BlogAddPost = function() {

    return {
        loadAddPostForm : function() {
            return $("#desktopaddpostform-tmpl").html();
        },

        onSubmitClicked : function() {
            var postData = $("#addPostForm").serializeArray();

            var blogPost = {};
            blogPost.title   = postData[0].value;
            blogPost.content = postData[1].value;

            hub.getComponent("blogPostBackend").addBlogPost(blogPost, function() {
                document.location.href = "/blog/desktop";
            });
        }
    }

}();