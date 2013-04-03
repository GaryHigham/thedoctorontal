require.def("drontal/appui/components/statusbar",
    [
        "antie/widgets/component",
        "antie/widgets/label"
    ],
    function (Component, Label) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var gameTitle, level, lives, score, teleports ;

                // It is important to call the constructor of the superclass
                this._super("statusbar");

                // Add the labels to the component
                gameTitle = new Label("gameTitle", "The Doctor on TAL");
                level = new Label("level", "");
                lives = new Label("lives", "");
                score = new Label("score", "");
                teleports = new Label("teleports", "");

                this.appendChildWidget(gameTitle);
                this.appendChildWidget(level);
                this.appendChildWidget(lives);
                this.appendChildWidget(score);
                this.appendChildWidget(teleports);

                gameTitle.addClass("statusbar-item")
                level.addClass("statusbar-item")
                lives.addClass("statusbar-item")
                score.addClass("statusbar-item")
                teleports.addClass("statusbar-item")

                this.updateLevel(1);
                this.updateLives(3);
                this.updateScore(0);
                this.updateTeleports(0);
            },

            updateScore: function(score) {
                this.getChildWidget("score").setText("Score: " + this._leftPad(score, 6));
            },

            updateLevel: function (level) {
                this.getChildWidget("level").setText("Level: " + this._leftPad(level, 2));
            },

            updateLives: function (lives) {
                this.getChildWidget("lives").setText("Lives: " + this._leftPad(lives, 2));
            },

            updateTeleports: function (teleports) {
                this.getChildWidget("teleports").setText("Teleports: " + this._leftPad(teleports, 2));
            },

            _leftPad: function(value, padding) {
                var zeroes = "0";

                for (var i = 0; i < padding; i++) { zeroes += "0"; }

                return (zeroes + value).slice(padding * -1);
            }

        });
    }
);