(function (scope) {
    var jdge = scope.jdge || {};

    jdge.SimpleGrid = function (grid, mapper) {
        this.initialize(grid, mapper);
    }

    var p = jdge.SimpleGrid.prototype;

    // initializes the simple grid object.
    //  grid is an array of objects, containing references to objects. 
    // if a mapper function is provided, the values provided in the grid will be mapped using the mapper function.
    // Mapper function must accept at least one input (Value to be stored), and return desired object.

    // maps data to a 2d grid, allowing for random access, and traversing via navigation based functions:
    //  Unless otherwise noted, the following functions accept only a tile object.
    //    north, south, east, west, northeast, southeast, northwest, southwest:
    //          returns the object stored at tile in this direction of the provided coords or tile object.
    //    northTile, southTile, eastTile, westTile, northeastTile, southeastTile, 
    //         returns tile in the direction of the provided coords or tile object.
    p.initialize = function (grid, mapper) {
        var $this = this;
        if(!$.isArray(grid))
        {
            $.error('JDGE: SimpleGrid: Initialization error 0000 - Grid is not formatted properly or does not exist.');
        }

        if (!$.isArray(grid[0])) {
            $.error('JDGE: SimpleGrid: Initialization error 0001 - First Row not formatted properly or does not exist.');
        }

        this.width = grid[0].length;
        this.height = grid.length;

        this.Tiles = [];

        // writing mapper function to appropriate TileGeneration function

        if (!mapper) {
            mapper = function (tileValue, x, y) { return new jdge.SimpleGridTile(tileValue, x, y); };
        }
        else
        {
            var t_mapper = mapper;
            mapper = function (tileValue, x, y) { return new jdge.SimpleGridTile(t_mapper(tileValue), x, y); };
        }

        var w = h = 0;
        while (h < this.height) {
            if (!$.isArray(grid[h])) {
                $.error('JDGE: SimpleGrid: Initialization error 0002 - Grid Row ' + h + ' is not formatted properly');
                break;
            }

            this.Tiles.push([]);
            w = 0;

            while (w < this.width) {
                this.Tiles[h].push(mapper(grid[h][w], w, h));
                ++w;
            }

            ++h;
        }

        this.printHtml = function () {
            var divTable = '<div class="JDGEGrid-table">';
            var columnHeaders = '<div class="JDGEGrid-row JDGEGrid-column-header-row"><div class="JDGEGrid-row-header JDGEGrid-cell"></div>';
            var row = '';
            var w = h = 0;
            while (h < this.height) {
                w = 0;
                row += '<div class="JDGEGrid-row"> <div class="JDGEGrid-row-header JDGEGrid-cell">' + h + '</div>';
                while (w < this.width) {
                    row += '<div class="JDGEGrid-column JDGEGrid-cell">' + $this.Tiles[h][w].toString() + '</div>';

                    if (h == 0) {
                        columnHeaders += '<div class="JDGEGrid-column JDGEGrid-cell">' + w + '</div>';
                    }
                    ++w;
                }

                if (h == 0) {
                    columnHeaders += '</div> <div style="clear:both;"></div>';
                }   

                row += '</div> <div style="clear:both;"></div>';
                ++h;
            }
            divTable += columnHeaders + row + '</div>';

            $('body').append(divTable);
        }
        this.isTile = function (object) { return object instanceof jdge.SimpleGridTile;  }
        this.north = function (tile) {
            if (!$this.isTile(tile) || tile.coords.) {
                return null;
            }

            $this.Tiles
        }



    }

    /*******************************************************************************************************************************/
    // a single tile in the Simple grid.  
    // contains a value and its coords in the grid, for reference. 
    jdge.SimpleGridTile = function (value, x, y) {
        var $this = this;

        this.value = value;

        if (typeof x !== 'undefined' & typeof y !== 'undefined') {
            this.coords = { x: x, y: y };
        }

        this.toString = function () {
            if (typeof $this.value !== 'undefined' && $this.value != null) {
                return $this.value.toString();
            }
            return 'NDF';
        };

    }

    scope.jdge = jdge;
}(window));