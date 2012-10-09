/**
 *
 * @author Till Hermsen
 */
blogListViewContract = {

    /**
     *
     */
    init: function() {},

    /**
     *
     */
    refresh: function() {}

}

blogListView = {

    hub: null,

    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'blogListView';
    },

    /**
     * Configure method. This method is called when the
     * component is registered on the hub.
     * @param theHub the hub
     * @param the object used to configure this component
     */
    configure: function(theHub, configuration) {
        this.hub = theHub;

        // We provide the UserContractService:
        this.hub.provideService({
            component: this,
            contract: templateManagerContract
        });
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {
        console.log("blogListView compo")
    },

    /**
     * The Stop method is called when the hub stops or
     * just after the component removal if the hub is
     * not stopped. No events can be send in this method.
     */
    stop: function() {},

    /**
     * Contract methods.
     */

    init: function() {
        // add post button
        if (App.UserService.isLoggedIn()) {
            $($("#desktopaddpostbtn-tmpl").html()).insertBefore('#content');
            $("#addPostBtn").on("click", function(e) {
                document.location.href = "?page=addPost";
            });
        }
    },

    refresh: function() {
        hub.getComponent("blogPostFrontend").updateWithBlogList();

        for(var i=0; i < $('article').length; i++) {
            $("#postButton" + i).on('click', function() {
                App.openBlogPost(i);
                return false;
            });
        }
    },


    /**
     * Private methods.
     */
    openBlogPost: function(id) {
        document.location.href = "?showPost=" + id;
    }
}
