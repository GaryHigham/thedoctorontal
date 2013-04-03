require.def("drontal/appui/components/mainmenu",
    [
        "antie/widgets/component",
        "antie/widgets/button",
        "antie/widgets/label",
        "antie/widgets/verticallist",
        'drontal/appui/events/audioevent'
    ],
    function (Component, Button, Label, VerticalList, AudioEvent) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var self, helloWorldLabel, welcomeLabel, verticalListMenu;

                self = this;
                // It is important to call the constructor of the superclass
                this._super("mainmenucomponent");

                // Add the labels to the component
                helloWorldLabel = new Label("gameTitleLabel", "The Dr On TAL");
                this.appendChildWidget(helloWorldLabel);

                welcomeLabel = new Label("welcomeLabel", "You are the Doctor.</br>The Daleks have located you.</br>They want to {{EXTERMINATE}} you!");
                this.appendChildWidget(welcomeLabel);

                var playGameButton = new Button();
                playGameButton.addEventListener("select", function(evt){
                    // This broadcasts event that is only caught by listeners registered to the main menu
                    //self.broadcastEvent(new AudioEvent("dalekgun"));

                    // This broadcasts events 'globally'
                    self.getCurrentApplication().bubbleEvent(new AudioEvent("exterminate"));

                    self.getCurrentApplication().pushComponent("maincontainer", "drontal/appui/components/gamecanvas");
                });
                playGameButton.appendChildWidget(new Label("Play game"));

                var highScoresButton = new Button();
                highScoresButton.addEventListener("select", function(evt){
                    self.getCurrentApplication().pushComponent("maincontainer", "drontal/appui/components/highscoretable");
                });
                highScoresButton.appendChildWidget(new Label("View high scores"));

                // Create a vertical list and append the buttons to navigate within the list
                verticalListMenu = new VerticalList("mainMenuList");
                verticalListMenu.appendChildWidget(playGameButton);
                verticalListMenu.appendChildWidget(highScoresButton);
                this.appendChildWidget(verticalListMenu);

                // Add a 'beforerender' event listener to the component to do anything specific that might need to be done
                // before rendering the component
                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });

                // calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady(evt) {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);
                });
            },

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function () {


            }
        });
    }
);