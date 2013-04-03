require.def('drontal/appui/components/highscoretable',
    [
        'antie/widgets/component',
        'antie/widgets/button',
        'drontal/appui/datasources/localstorage',
        'drontal/appui/components/highscorecomponent',
        'antie/widgets/label'
    ],
    function(Component, Button, LocalStorage, HighScore, Label) {
    
        return Component.extend({
            init: function() {
                this._super('highscoretable');
                
                var title = new Label('High Score Table');
                title.addClass('highscoretabletitle');
                this.appendChildWidget(title);

                var localstorage = new LocalStorage();
                localstorage.clearHighScores();
                localstorage.addHighScore({name: 'Gary', score: '1000', level: '15'});
                localstorage.addHighScore({name: 'Will', score: '2500', level: '15'});
                localstorage.addHighScore({name: 'The Dr', score: '2000', level: '13'});
                localstorage.addHighScore({name: 'The Dr Who?', score: '3500', level: '12'});
                localstorage.addHighScore({name: 'The Dr', score: '3000', level: '11'});
                localstorage.addHighScore({name: 'The Dr', score: '4000', level: '14'});

                var highScores = localstorage.getHighScores();

                highScores.sort(this.highScoreCompare);

                var addedScores = 0;
                for(var i =  0; i < highScores.length; ++i) {
                    var highScore = new HighScore(i);
                    highScore.setName(highScores[i].name);
                    highScore.setScore(highScores[i].score);
                    highScore.setLevel(highScores[i].level);

                    this.appendChildWidget(highScore);

                    if (++addedScores >= 5) {
                        break;
                    }
                };

                var self = this;

                var homeButton = new Button();
                homeButton.addEventListener("select", function(evt){
                    self.getCurrentApplication().pushComponent("maincontainer", "drontal/appui/components/mainmenu");
                });

                homeButton.appendChildWidget(new Label('Main Menu'));

                this.appendChildWidget(homeButton);
            },

            highScoreCompare: function (a,b) {
                if (a.score < b.score) {
                    return 1;
                }
                if (a.score > b.score) {
                    return -1;
                }
                return 0;
            }

        });
    }
);