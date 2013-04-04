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

                this.cols = gameBoard._cols;
                this.rows = gameBoard._rows;

                this.dalekArray = [];

                this.gameBoard = gameBoard;
                this.level = 1;
                this.dalekMultiplier = 4;

                // It is important to call the constructor of the superclass
                this._super("dalekmanager");

                this.generateDaleks();
            },

            setLevel: function (level) {
                this.level = level;
            },

            generateDaleks: function () {
                this.dalekArray = this.generateDalekArray();
                var dalekCount = this.dalekMultiplier * this.level;
                for (var i = 0; i < dalekCount ; i++){
                    var uniquePosition = this.getUniqueCellPosition();
                    this.dalekArray[uniquePosition.col][uniquePosition.row] = this.DALEK;
                    this.gameBoard.getWidgetAt(uniquePosition.col, uniquePosition.row).addClass("dalek");
                }
            },

            generateDalekArray: function () {
                var arr = new Array(this.cols);
                for (var i = 0 ; i < this.cols ; i++) {
                    arr[i] = new Array(this.rows);
                }
                for (var j=0 ; j < this.cols ; j++) {
                    for (var k = 0 ; k < this.rows ; k++) {
                        arr[j][k] = this.EMPTY;
                    }
                }
                return arr;
            },

            getUniqueCellPosition: function() {
                var uniqueCol = Math.floor(Math.random()*this.cols);
                var uniqueRow = Math.floor(Math.random()*this.rows);

                while (this.dalekArray[uniqueCol][uniqueRow]!=this.EMPTY) {
                    uniqueCol = Math.floor(Math.random()*this.cols);
                    uniqueRow = Math.floor(Math.random()*this.rows);
                }
                return {col: uniqueCol, row: uniqueRow};
            },

            updateDaleks: function(drCol, drRow) {
                var tempDalekArray = this.generateDalekArray();
                for (var j=0 ; j < this.cols ; j++) {
                    for (var k = 0 ; k < this.rows ; k++) {
                        if(this.dalekArray[j][k]===this.DALEK){
                            tempDalekArray[j][k]=this.EMPTY;
                            this.gameBoard.getWidgetAt(j, k).removeClass("dalek");
                            var newCol = j;
                            var newRow = k;
                            if (j<drCol){
                                newCol = j+1;
                            }else if (j>drCol){
                                newCol = j-1;
                            }
                            if (k<drRow){
                                newRow = k+1;
                            }else if (k>drRow){
                                newRow = k-1;
                            }

                            // If another Dalek or junk
                            if(tempDalekArray[newCol][newRow]===this.DALEK || this.gameBoard.getWidgetAt(newCol, newRow).hasClass("junk")){
                                tempDalekArray[newCol][newRow]=this.JUNK;
                                this.gameBoard.getWidgetAt(j, k).removeClass("dalek");
                                this.gameBoard.getWidgetAt(newCol, newRow).addClass("junk");
                            }else{
                                tempDalekArray[newCol][newRow]=this.DALEK;
                                this.gameBoard.getWidgetAt(newCol, newRow).addClass("dalek");
                            }
                        }
                    }
                }
                this.dalekArray = tempDalekArray;
            }
        });
    }
);