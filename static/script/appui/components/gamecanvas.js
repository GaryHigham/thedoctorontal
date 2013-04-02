require.def("drontal/appui/components/gamecanvas",
    [
        "antie/widgets/component",
        "drontal/appui/components/statusbar"

    ],
    function (Component, StatusBar) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var statusBar = new StatusBar();

                // It is important to call the constructor of the superclass
                this._super("gamecanvas");

                this.appendChildWidget(statusBar);
            }
        });
    }
);