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
                this.dalekMultiplier = 5;

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
                    this.dalekArray[uniquePosition.row][uniquePosition.col] = this.DALEK;
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


                var uniqueRow = Math.round(Math.random()*this.rows);
                var uniqueCol = Math.round(Math.random()*this.cols);

                while (this.dalekArray[uniqueRow][uniqueCol]!=this.EMPTY) {
                    uniqueRow = Math.round(Math.random()*this.rows);
                    uniqueCol = Math.round(Math.random()*this.cols);
                }
                return {row: uniqueRow, col: uniqueCol};
            },

            updateDaleks: function(drCol, drRow) {
                for (var j=0 ; j < this.cols ; j++) {
                    for (var k = 0 ; k < this.rows ; k++) {
                        if(this.dalekArray[j][k]===this.DALEK){
                            this.dalekArray[j][k]=this.EMPTY;
                            this.gameBoard.getWidgetAt(j, k).removeClass("dalek");
                            var newCol = k;
                            var newRow = j;
                            if (k<drRow)
                                newCol = k+1;
                            if (k>drRow)
                                newCol = k-1;
                            if (j<drCol)
                                newRow = j+1;
                            if (j>drCol)
                                newRow = j-1;

                            // If another Dalek or junk
                            if(this.dalekArray[newCol][newRow]===this.DALEK || this.dalekArray[newCol][newRow]===this.JUNK){
                                this.dalekArray[newCol][newRow]=this.JUNK;
                                this.gameBoard.getWidgetAt(j, k).removeClass("dalek");
                                this.gameBoard.getWidgetAt(newRow, newCol).addClass("junk");
                            }else{
                                this.dalekArray[newRow][newCol]=this.DALEK;
                                this.gameBoard.getWidgetAt(newRow, newCol).addClass("dalek");
                            }
                        }
                    }
                }
            },

            setDoctor: function(row, col) {

            }


        });
    }
);