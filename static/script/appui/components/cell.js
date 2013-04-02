require.def('drontal/appui/components/cell',
    [
        'antie/widgets/button'
    ],
    function(Button) {

        return Button.extend({
            init: function(identifier) {
                var self;
                self = this;

                self._super(identifier);

                self.addClass("cell");
            }
        });
    }
);