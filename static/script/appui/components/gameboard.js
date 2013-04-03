require.def("drontal/appui/components/gameboard",
    [
        "antie/widgets/component",
        "antie/widgets/grid",
        "drontal/appui/components/cell",
        'antie/events/keyevent'
    ],
    function (Component, Grid, Cell, KeyEvent) {

        // All components extend Component
        return Grid.extend({
            init: function () {
                var self = this;

                self._super("gameboard", 20, 20);

                for(var i = 0; i < this._cols; i++){
                    for(var j = 0; j < this._rows; j++){
                        this.setWidgetAt(i, j, new Cell(""));
                    }
                }

                // Add a 'beforerender' event listener to the component to do anything specific that might need to be done
                // before rendering the component
                this.addEventListener("beforerender", function (evt) {
                    self._onBeforeRender(evt);
                });

                // calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady(evt) {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);
                });

            }
        });
    }
);