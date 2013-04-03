require.def('drontal/appui/events/audioevent',
    [
        'antie/events/event',
    ],
    function(Event) {
    
        return Event.extend({

            init: function(sampleName) {
                this._name = sampleName;
                this._super('audioevent');
            },

            getAudioSampleName: function() { 
                return this._name;
            },

            fire: function() {
                this.fireEvent('audioevent');
            }
        });   
    }
);