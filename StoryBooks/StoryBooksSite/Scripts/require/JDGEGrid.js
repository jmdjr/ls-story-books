(function (scope) {
    var jdge = scope.jdge || {};

    jdge.SimpleGrid = function (grid, mapper) {
        this.initialize(grid, mapper);
    }

    var p = jdge.SimpleGrid.prototype;

    // initializes the simple grid object.
    //  grid is an array of objects, containing references to objects. 
    // if a mapper function is provided, the values provided in the grid will be mapped using the mapper function.
    // Mapper function must accept at least one input, and return desired object.
    // maps data to a 2d grid, allowing for random access, and traversing via navigation based functions:
    //  Unless otherwise noted, the following functions accept either an x/y coordinate or a tile object.
    //    north, south, east, west, northeast, southeast, northwest, southwest:
    //          returns the object stored at tile in this direction of the provided coords or tile object.
    //    northTile, southTile, eastTile, westTile, northeastTile, southeastTile, 
    //         returns tile in the direction of the provided coords or tile object.
    p.initialize = function (grid, mapper) {
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
        if (!mapper) {
            mapper = function (tileValue) { return new jdge.SimpleGridTile( };
        }

        var i = 1;

        while (i < this.height) {
            if (!$.isArray(grid[i])) {
                $.error('JDGE: SimpleGrid: Initialization error 0002 - Grid Row ' + i + ' is not formatted properly');
                break;
            }
            ++i;
        }
    }

    /*******************************************************************************************************************************/
    // a single tile in the Simple grid.  
    // contains a value and its coords in the grid, for reference. 
    jdge.SimpleGridTile = function (value, x, y) {
        this.value = value;

        if(x && y) {
            this.coords = { x: x, y: y };
        }


    }

    scope.jdge = jdge;
}(window));