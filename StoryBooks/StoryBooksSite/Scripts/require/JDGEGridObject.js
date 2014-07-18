//
// This script defines a generic grid parsing object, which accepts an array of arrays, forming a 2D matrix, and allows for simple
//  random and relative access using special GridTileObjects.  
//
if (define) {
    define(['jquery'], function($){
        (function (scope) {
            var jdge = scope.jdge || {};

            jdge.SimpleGridObject = function (grid, mapper) {
                this.initialize(grid, mapper);
            }

            var p = jdge.SimpleGridObject.prototype;

            // initializes the simple grid object.
            //  grid is an array of objects, containing references to objects. 
            // if a mapper function is provided, the values provided in the grid will be mapped using the mapper function.
            // Mapper function must accept at least one input (Value to be stored), and return desired object.

            // maps data to a 2d grid, allowing for random access, and traversing via navigation based functions:
            // The following functions accept only a tile object.
            //    north(n), south(s), east(e), west(w), northeast(ne), southeast(se), northwest(nw) and southwest(sw):
            //         returns tile in the direction of the provided tile object.

            p.initialize = function (grid, mapper) {
                var $this = this;
                if(!$.isArray(grid))
                {
                    $.error('JDGE: SimpleGridObject: Initialization error 0000 - Grid is not formatted properly or does not exist.');
                }

                if (!$.isArray(grid[0])) {
                    $.error('JDGE: SimpleGridObject: Initialization error 0001 - First Row not formatted properly or does not exist.');
                }

                this.width = grid[0].length;
                this.height = grid.length;

                this.Tiles = [];

                // writing mapper function to appropriate TileGeneration function

                if (!mapper) {
                    mapper = function (tileValue, x, y) { return new jdge.SimpleGridTileObject(tileValue, x, y); };
                }
                else
                {
                    var t_mapper = mapper;
                    mapper = function (tileValue, x, y) { return new jdge.SimpleGridTileObject(t_mapper(tileValue), x, y); };
                }

                var w = h = 0;
                while (h < this.height) {
                    if (!$.isArray(grid[h])) {
                        $.error('JDGE: SimpleGridObject: Initialization error 0002 - Grid Row ' + h + ' is not formatted properly');
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
                        row += '<div class="JDGEGrid-row"> <div class="JDGEGrid-row-header JDGEGrid-cell">' + (h + 1) + '</div>';
                        while (w < this.width) {
                            row += '<div class="JDGEGrid-column JDGEGrid-cell">' + $this.Tiles[h][w].toString() + '</div>';

                            if (h == 0) {
                                columnHeaders += '<div class="JDGEGrid-column JDGEGrid-cell">' + (w + 1) + '</div>';
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

                this.isTile = function (object) { return object instanceof jdge.SimpleGridTileObject; }

                this.getTileAt = function (w, h) {
                    var tracer = $this.Tiles[h];
                    if (tracer) {
                        tracer = tracer[w];

                        if (tracer) {
                            return tracer;
                        }
                        else {
                            return jdge._NULL_TILE_;
                        }
                    } else {
                        return jdge._NULL_TILE_;
                    }
                }

                this.getTileAtOffset = function (tile, xoffset, yoffset) {
                    if (!$this.isTile(tile) || typeof tile.coords === 'undefined') {
                        return null;
                    }

                    var tracer = $this.Tiles[tile.coords.y + yoffset];
                    if (tracer) {
                        tracer = tracer[tile.coords.x + xoffset];

                        if (tracer) {
                            return tracer;
                        }
                        else {
                            return jdge._NULL_TILE_;
                        }
                    } else {
                        return jdge._NULL_TILE_;
                    }
                }

                this.n = this.north = function (tile) {
                    return this.getTileAtOffset(tile, 0, -1);
                }

                this.nw = this.northeast = function (tile) {
                    return this.getTileAtOffset(tile, 1, -1);
                }

                this.e = this.east = function (tile) {
                    return this.getTileAtOffset(tile, 1, 0);
                }

                this.se = this.southeast = function (tile) {
                    return this.getTileAtOffset(tile, 1, 1);
                }

                this.s = this.south = function (tile) {
                    return this.getTileAtOffset(tile, 0, 1);
                }

                this.sw = this.southwest = function (tile) {
                    return this.getTileAtOffset(tile, -1, 1);
                }

                this.w = this.west = function (tile) {
                    return this.getTileAtOffset(tile, -1, 0);
                }

                this.nw = this.northwest = function (tile) {
                    return this.getTileAtOffset(tile, -1, -1);
                }
            }

            /*******************************************************************************************************************************/
            // a single tile in the Simple grid.  
            // contains a value and its coords in the grid, for reference. 
            jdge.SimpleGridTileObject = function (value, x, y) {
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

                this.removeValue = function() {
                    var o = this.value;
                    this.value = null;
                    return o;
                }

                this.addValue = function (value) {
                    this.value = value;
                }
            }

            jdge._NULL_TILE_ = new jdge.SimpleGridTileObject(null, -1, -1);

            scope.jdge = jdge;
        }(window));
    });
}