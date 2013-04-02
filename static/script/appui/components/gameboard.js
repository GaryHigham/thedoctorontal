require.def("drontal/appui/components/gameboard",
    [
        "antie/widgets/component",
        "antie/widgets/horizontallist",
        "antie/widgets/verticallist",
        "drontal/appui/components/cell"
    ],
    function (Component, HorizontalList, VerticalList, Cell) {

        // All components extend Component
        return Component.extend({
            init: function () {
                var self = this;

                // It is important to call the constructor of the superclass
                self._super("gameboard");

                self._horizontalList = new HorizontalList("horizontal");

                for(var i = 0; i < 30; i++){
                    self._horizontalList.appendChildWidget(this._createVerticalList("vertical" + i.toString()));
                }

                self.appendChildWidget(self._horizontalList);
            },

            _createVerticalList: function(identifier){
                var list = new VerticalList(identifier);
                for(var i = 0; i < 30; i++){
                    list.appendChildWidget(new Cell(i.toString()));
                }
                return list;
            }
        });
    }
);