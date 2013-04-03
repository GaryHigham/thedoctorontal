require.def('drontal/appui/components/highscorecomponent',
    [
        'antie/widgets/component',
        'antie/widgets/label'
    ],
    function(Component, Label) {
    
        return Component.extend({
            init: function(id) {
                this._super('highscorecomponent' + id);
                this._name = new Label('highscoreName' + id, '');
                this._score = new Label('highscoreScore' + id, '');
                this._level = new Label('highscoreLevel' + id, '');

                this.appendChildWidget(this._name);
                this.appendChildWidget(this._score);
                this.appendChildWidget(this._level);

                this.addClass('highscorecomponent');
                
            },
            
            setName: function(name) {
                this._name.setText('Name: ' + name);
            },

            setScore: function(score) {
                this._score.setText('Score: ' + score);
            }, 

            setLevel: function(level) {
                this._level.setText('Level: ' + level);
            }
        });     
    }
);