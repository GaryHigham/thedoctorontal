require.def("drontal/appui/components/gamecanvas",
    [
        "antie/widgets/component",
        "drontal/appui/components/statusbar",
        "drontal/appui/components/gameboard"

    ],
    function (Component, StatusBar, GameBoard) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var statusBar = new StatusBar();
                var gameBoard = new GameBoard();

                // It is important to call the constructor of the superclass
                this._super("gamecanvas");

                this.appendChildWidget(statusBar);
                this.appendChildWidget(gameBoard);
            }
        });
    }
);