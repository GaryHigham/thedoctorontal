require.def('drontal/appui/components/cell',
    [
        'antie/widgets/component'
    ],
    function(Component) {

        return Component.extend({
            init: function(identifier) {
                var self;
                self = this;

                self._super(identifier);

                self.addClass("cell");
            }
        });
    }
);