require.def("drontal/appui/components/gamecanvas",
    [
        "antie/widgets/component",
        "drontal/appui/components/statusbar",
        "drontal/appui/components/gameboard",
        "drontal/appui/components/debugbar",
        "drontal/appui/components/dalekmanager",
        "drontal/appui/components/highscoretable",
    ],
    function (Component, StatusBar, GameBoard, DebugBar, DalekManager, HighScoreTable) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var statusBar = new StatusBar();
                var gameBoard = new GameBoard();
                var debugBar = new DebugBar();
                var dalekManager = new DalekManager(gameBoard);
                gameBoard._registerDalekManager(dalekManager);

                // It is important to call the constructor of the superclass
                this._super("gamecanvas");

                this.appendChildWidget(statusBar);
                this.appendChildWidget(debugBar);
                this.appendChildWidget(gameBoard);
            }
        });
    }
);