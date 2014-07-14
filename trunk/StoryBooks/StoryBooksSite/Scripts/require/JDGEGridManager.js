//
// This script defines a manager object which manages a collection of grids, providing access to individual grids, 
//    defining the interactions with and handling events involving GridObjects
//

if (define) {
    define(['jquery', 'JDGEngine', 'JDGEGridObject'], function ($) {
        (function (scope) {
            var jdge = scope.jdge || {};

            jdge.GridManager = function (Engine, tileRenderer) {
                this.initialize(Engine, tileRenderer);
            }

            var p = jdge.GridManager.prototype = new createjs.Container();
            jdge.GridManager.prototype.inherited_init = p.initialize;

            p.initialize = function (Engine, tileRenderer) {
                if (this.inherited_init) this.inherited_init();
                var $this = this;
                this.Grids = [];
                this.RenderedTiles = [];
                this.Engine = Engine;
                this.selected_grid_name = "";

                if (!jdge.IsUndefined(this.Engine)) {
                    this.Engine.addChild($this);
                }

                // A render pattern must accept a SimpleGridTileObject and return a DisplayObject which displays it's content.
                this.RenderingPatterns = {
                    Square: function (tile) {
                        // height and width of each tile
                        var height = 60, width = 60;

                        var tileContainer = new createjs.Container();
                        tileContainer.height = height;
                        tileContainer.width = width;

                        if (!jdge.IsUndefined(tile)) {

                            if (!jdge.IsUndefined(tile.value) && tile.value instanceof createjs.DisplayObject) {
                                tileContainer.addChild(tile.value);
                            }
                            else {
                                tileContainer.addChild(new createjs.Text(tile.toString()));
                            }

                            tileContainer.x = width * tile.coords.x;
                            tileContainer.y = height * tile.coords.y;
                        }

                        return tileContainer;
                    }
                }

                this.RenderPattern = this.RenderingPatterns.Square;

                if (tileRenderer && typeof tileRenderer === 'function') {
                    this.RenderPattern = tileRenderer;
                }   

                this.addGrid = function (name, grid, mapper) {
                    $this.Grids.push(name);
                    $this.Grids[name] = new jdge.SimpleGridObject(grid, mapper);
                }

                this.selectGrid = function (name) {
                    if (!jdge.IsUndefined($this.Grids[name])) {
                        $this.selected_grid_name = name;
                        $this.clearGridTiles();
                        $this.Draw();
                    }

                    return $this.selected_grid_name;
                }

                this.clearGridTiles = function () {
                    var tile = this.RenderedTiles.pop();
                    while (tile != undefined) {
                        this.removeChild(tile);
                        tile = this.RenderedTiles.pop();
                    }
                }

                this.currentGrid = function () {
                    if (!jdge.IsUndefined($this.Grids[$this.selected_grid_name])) {
                        return $this.Grids[$this.selected_grid_name];
                    }
                };

                this.Draw = function (gridName, renderPattern) {
                    if ($this.RenderedTiles.length == 0) {
                        // If the grid name is not provided in the draw function, and there has not been a selected grid name,
                        //  select the first grid in the grid array.
                        if (jdge.IsUndefined(gridName) && $this.selected_grid_name == "") {
                            $this.selected_grid_name = $this.Grids[0];
                        }
                        else if (!jdge.IsUndefined(gridName)) {
                            $this.selected_grid_name = gridName;
                        }

                        var grid = $this.Grids[$this.selected_grid_name];
                        if (jdge.IsUndefined(grid)) {
                            $.error('JDGE: GridManager: Error 0000 - Drawing failed due to non-existant grid being referenced.');
                        }

                        var rendering = $this.RenderPattern;

                        if (!jdge.IsUndefined(renderPattern) && typeof renderPattern === "function") {
                            rendering = renderPattern;
                        }

                        var h = w = 0;
                        while (h <= grid.height) {
                            while (w <= grid.width) {
                                var tile = rendering(grid.getTileAt(w, h));
                                this.RenderedTiles.push(tile);
                                this.addChild(tile);
                                ++w;
                            }
                            w = 0;
                            ++h;
                        }
                    }
                }

                this.position = function (x, y) {
                    $this.x = x;
                    $this.y = y;

                    return $this;
                }
            }

            scope.jdge = jdge;
        }(window));
    });
}

