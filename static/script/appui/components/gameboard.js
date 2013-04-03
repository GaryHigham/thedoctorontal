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
                this._oldCol = 0;
                this._oldRow = 0;

                self._super("gameboard", 30, 30);

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

                this.addEventListener('keydown', function(e) { self._onKeyDown(e); });

                this.addEventListener('select', function(e) { self._onSelectCell(e); });
            },

            // Fired when 'Enter' or 'Select' is pushed
            _onSelectCell: function(evt){
                this._oldCol = this._selectedCol;
                this._oldRow = this._selectedRow;
                alert("New Doctor position!");
            },

            // Overridden function to limit the directional choices a player can make
            _onKeyDown: function(evt) {
                if(evt.keyCode != KeyEvent.VK_UP && evt.keyCode != KeyEvent.VK_DOWN
                    && evt.keyCode != KeyEvent.VK_LEFT && evt.keyCode != KeyEvent.VK_RIGHT) {
                    return;
                }

                var _newSelectedCol = this._selectedCol;
                var _newSelectedRow = this._selectedRow;
                var _newSelectedWidget = null;
                do {
                    if(evt.keyCode == KeyEvent.VK_UP) {
                        _newSelectedRow--;
                    } else if(evt.keyCode == KeyEvent.VK_DOWN) {
                        _newSelectedRow++;
                    } else if(evt.keyCode == KeyEvent.VK_LEFT) {
                        _newSelectedCol--;
                    } else if(evt.keyCode == KeyEvent.VK_RIGHT) {
                        _newSelectedCol++;
                    }
                    if(_newSelectedCol < 0 || _newSelectedCol < this._oldCol - 1 || _newSelectedCol > this._oldCol + 1 || _newSelectedCol >= this._cols) {
                        break;
                    }
                    if(_newSelectedRow < 0 || _newSelectedRow < this._oldRow - 1 || _newSelectedRow > this._oldRow + 1 || _newSelectedRow >= this._rows) {
                        break;
                    }

                    var _newSelectedIndex = (_newSelectedRow * this._cols) + _newSelectedCol;
                    var _widget = this._childWidgetOrder[_newSelectedIndex];
                    if(_widget && _widget.isFocusable()) {
                        _newSelectedWidget = _widget;
                        break;
                    }
                } while(true);

                if(_newSelectedWidget) {
                    this.setActiveChildWidget(_newSelectedWidget);
                    evt.stopPropagation();

                }
            }
        });
    }
);