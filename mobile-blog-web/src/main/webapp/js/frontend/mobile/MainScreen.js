/**
 * Mobile app main screen
 *
 * @author Till Hermsen
 * @date 09.10.12
 */
mainScreenContract = {

    /**
     * Initializes the main screen (lists all blog posts).
     */
    initMainScreen: function() {},

    /**
     * Returns the jo-framework main container.
     */
    getMainContainer: function() {}

}


mainScreen = {

    hub: null,
    mainContainer: null,

    /**
     * Method returning the component <b>unique</b>
     * name. Using a fully qualified name is encouraged.
     * @return the component unique name
     */
    getComponentName: function() {
        return 'mainScreen';
    },

    /**
     * Configure method. This method is called when the
     * component is registered on the hub.
     * @param theHub the hub
     * @param the object used to configure this component
     */
    configure: function(theHub, configuration) {
        this.hub = theHub;

        // Required service

        // We provide the UserContractService:
        this.hub.provideService({
            component: this,
            contract: mainScreenContract
        });
    },

    /**
     * The Start function
     * This method is called when the hub starts or just
     * after configure if the hub is already started.
     */
    start: function() {},

    /**
     * The Stop method is called when the hub stops or
     * just after the component removal if the hub is
     * not stopped. No events can be send in this method.
     */
    stop: function() {},


    /**
     * Contract methods.
     */

    initMainScreen: function() {
        // Load jo framework for our mobile UI.
        // In jo, the UI is defined entirely via JavaScript.
        jo.load();

        // The following reduces delay when tapping on views.
        document.body.addEventListener('touchmove', function(e) {
            e.preventDefault();
            joEvent.stop(e);
        }, false);


        this.mainContainer = new joStack();

        // Defines our general UI with a navigation bar and a so-called stack.
        // With this stack, we can put screens on top of each other,
        // allowing us to navigate back to screens we have already visited
        // by popping the current screen off the stack.
        this.mainContainer.scn = new joScreen(
            new joContainer([
                new joFlexcol([
                    this.mainContainer.nav = new joCustomNavbar(),
                    this.mainContainer.stack = new joStackScroller()
                ])
            ]).setStyle({position: "absolute", top: "0", left: "0", bottom: "0", right: "0"})
        );

        this.mainContainer.nav.setStack(this.mainContainer.stack);
        this.mainContainer.nav.setTitle('<img src="../images/aerogear_logo_150px.png" class="logo" /> ');
        this.mainContainer.nav.row.push('<img id="akquinetLogo" src="../images/akquinet_logo.png" class="logo" style="float:right" /> ');

        joGesture.backEvent.subscribe(this.mainContainer.stack.pop, this.mainContainer.stack);

        $('#akquinetLogo').onpress(function(){
            document.location.href = "http://blog.akquinet.de/";
            window.location.href = "http://blog.akquinet.de/";
        });

        // Push our first screen on the stack: The blog post list.
        this.mainContainer.stack.push(App.BlogListScreen.get());
        // Load the blog posts.
        App.BlogListScreen.refresh();
    },

    getMainContainer: function() {
        return this.mainContainer;
    }


    /**
     * Private methods.
     */

}
