require.def("drontal/appui/components/dalekmanager",
    [
        "antie/widgets/component",
        "antie/widgets/label"
    ],
    function (Component, Label) {

        // All components extend Component
        return Component.extend({
            init: function (gameBoard) {
                this.EMPTY = 0;
                this.DALEK = 1;
                this.JUNK = 2;

                this.rows = gameBoard._rows;
                this.cols = gameBoard._cols;

                this.dalekArray = new Array();

                this.gameBoard = gameBoard;
                this.level = 1;
                this.dalekMultiplier = 10;

                // It is important to call the constructor of the superclass
                this._super("dalekmanager");

                this.generateDaleks();
            },

            setLevel: function (level) {
                this.level = level;
            },

            generateDaleks: function () {
                this.generateDalekArray();
                var dalekCount = this.dalekMultiplier * this.level;
                for(var i = 0; i < dalekCount ; i++){
                    var uniquePosition = this.getUniqueCellPosition();
                    this.dalekArray[uniquePosition.row, uniquePosition.col] = this.DALEK;
                    this.gameBoard.getWidgetAt(uniquePosition.row, uniquePosition.col).addClass("dalek");
                }

            },

            generateDalekArray: function() {
                this.dalekArray = new Array(this.rows);
                for (var i = 0 ; i < this.cols ; i++) {
                    this.dalekArray[i] = new Array(this.cols);
                }
                for (var j=0 ; j < this.cols ; j++) {
                    for (var k = 0 ; k < this.rows ; k++) {
                        this.dalekArray[j][k] = this.EMPTY;
                    }
                }
            },

            getUniqueCellPosition: function() {
                var row = Math.floor(Math.random()*this.rows);
                var col = Math.floor(Math.random()*this.cols);

                while (this.dalekArray[row][col]!=this.EMPTY) {
                    row = Math.floor(Math.random()*this.rows);
                    col = Math.floor(Math.random()*this.cols);
                }
                return {row: row, col: col};
            },

            updateDaleks: function(drCol, drRow) {
//                alert(this.dalekArray.toString());
                for (var j=0 ; j < this.cols ; j++) {
                    for (var k = 0 ; k < this.rows ; k++) {
                        if(this.dalekArray[j][k]===this.DALEK){
                            this.dalekArray[j][k]=this.EMPTY;
                            this.gameBoard.getWidgetAt(j, k).removeClass("dalek");
                            this.gameBoard.getWidgetAt(j, k).addClass("void");
                          /*  var newCol, newRow;
                            if (j<drCol)
                                newCol = j+1;
                            if (j>drCol)
                                newCol = j-1;
                            if (k<drRow)
                                newRow = k+1;
                            if (k>drRow)
                                newRow = k-1;

                            this.dalekArray[newRow][newCol]=this.DALEK;
                            this.gameBoard.getWidgetAt(j, k).removeClass("dalek");
                            this.gameBoard.getWidgetAt(newCol, newRow).addClass("dalek");    */
                        }
                    }
                }
            },

            setDoctor: function(row, col) {

            }


        });
    }
);