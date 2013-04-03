require.def('drontal/appui/datasources/localstorage',
    [
        'antie/widgets/component',
        'antie/storageprovider',
    ],
    function(Component, StorageProvider) {
    
        return Component.extend({

            getHighScores: function() {
                return this._getStorageProvider().getItem('highScores');
            },

            addHighScore: function(score) {
                var highScores = this.getHighScores();
                if(highScores === null || highScores === undefined) {
                    highScores = new Array();
                }
                highScores.push(score); 
                this._getStorageProvider().setItem('highScores', highScores);
            },

            clearHighScores: function() {
                this._getStorageProvider().setItem('highScores', null);
            },

            _getStorageProvider: function() {
                return this.getCurrentApplication().getDevice().getStorage(StorageProvider.STORAGE_TYPE_PERSISTENT, 'drontal');
            }
        });   
    }
);