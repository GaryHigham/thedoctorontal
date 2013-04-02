require.def("drontal/appui/components/statusbar",
    [
        "antie/widgets/component",
        "antie/widgets/label"
    ],
    function (Component, Label) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var gameTitle;

                // It is important to call the constructor of the superclass
                this._super("statusbar");

                // Add the labels to the component
                gameTitle = new Label("gameTitle", "The Doctor on TAL");
                this.appendChildWidget(gameTitle);

            }
        });
    }
);