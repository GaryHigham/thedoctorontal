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
                localstorage.addHighScore({name: 'Gary', score: '1000', level: '15'});
                localstorage.addHighScore({name: 'Will', score: '1000', level: '15'});
                localstorage.addHighScore({name: 'The Dr', score: '1000', level: '15'})

                var highScores = localstorage.getHighScores(); 
                for(var i =  0; i < highScores.length; ++i) {
                    var highScore = new HighScore(i);
                    highScore.setName(highScores[i].name);
                    highScore.setScore(highScores[i].score);
                    highScore.setLevel(highScores[i].level);

                    this.appendChildWidget(highScore);
                };

                var self = this;

                var homeButton = new Button();
                homeButton.addEventListener("select", function(evt){
                    self.getCurrentApplication().pushComponent("maincontainer", "drontal/appui/components/mainmenu");
                });

                homeButton.appendChildWidget(new Label('Main Menu'));

                this.appendChildWidget(homeButton);
            }
            
        });     
    }
);