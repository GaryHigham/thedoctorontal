require.def('drontal/appui/components/highscoretable',
    [
        'antie/widgets/component',
        'antie/widgets/button',
        'antie/storageprovider',
        'drontal/appui/components/highscorecomponent',
        'antie/widgets/label'
    ],
    function(Component, Button, StorageProvider, HighScore, Label) {
    
        return Component.extend({
            init: function() {
                this._super('highscoretable');
                
                var title = new Label('High Score Table');
                title.addClass('highscoretabletitle');
                this.appendChildWidget(title);


                this.dummyAddScores();
                var highScores = this.getHighScores();

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
            
            getHighScores: function(name) {
                var storage = this.getCurrentApplication().getDevice().getStorage(StorageProvider.STORAGE_TYPE_PERSISTENT, 'drontal');
                return storage.getItem('highScores');
            },

            dummyAddScores: function() {
                var scores = new Array();
                scores.push({name: 'Gary', score: '1000', level: '15'});
                scores.push({name: 'Will', score: '2000', level: '15'});
                scores.push({name: 'The Dr', score: '3000', level: '15'});
                scores.push({name: 'The Dr', score: '4000', level: '16'});
                scores.push({name: 'The Dr', score: '3500', level: '13'});
                scores.push({name: 'The Dr', score: '2500', level: '12'});

                var storage = this.getCurrentApplication().getDevice().getStorage(StorageProvider.STORAGE_TYPE_PERSISTENT, 'drontal');
                storage.setItem('highScores', scores);
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