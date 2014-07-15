define(['jquery', 'JDGEngine'], function ($) {
    (function (scope) {
        var trainGame = scope.trainGame || {};
        trainGame.TrainEngine = function (gridManager) {
            this.initialize(gridManager);
        }

        var animationSheet = {
            framerate: 4,
            images: ["/Content/TrainStrip.png"],
            frames: { width: 60, height: 60, regX: 30, regY: 30 },
            animations: {
                still: [0, 0],
                running: [0, 3, "running"],
                crash: [4, 7, "smolder"],
                smolder: [6, 7, "smolder", 0.5],
                start: 8,
                end: 12,
                startLaunch: [8, 11, "running"],
                endArrive: [12, 15]
            }
        };

        var p = trainGame.TrainEngine.prototype = new createjs.Container();
        trainGame.TrainEngine.prototype.inherited_init = p.initialize;

        p.initialize = function (gridManager) {
            if (this.inherited_init) this.inherited_init();

            var $this = this;

            this.grid = gridManager.currentGrid();
           
            var spriteSheet = new createjs.SpriteSheet(animationSheet);
            this.Animation = new createjs.Sprite(spriteSheet, "start");

             //adds transition functionality.
            jdge.MakeTransitionable.call(this);

            this.Property = jdge.Property;

            this.addChild(this.Animation);
            this.setTransform(30, 30);

            this.hasStarted = false;
            this.readyForNext = false;
            this.currentTile = null;

            var currentDirection = null;

            this.setPosition = function (x, y) {
                $this.x = x;
                $this.y = y;

                return $this;
            }

            this.establishCurrentTile = function () {
                var x = y = 0;
                var track = null;

                while (y < $this.grid.height && $this.currentTile == null) {

                    while (x < $this.grid.width && $this.currentTile == null) {
                        var tile = $this.grid.getTileAt(x, y);
                        track = tile.value;

                        if (!jdge.IsUndefined(track) && track.trackType == "Start") {
                            $this.currentTile = tile;
                            currentDirection = track.sideA;
                        }

                        ++x;
                    }
                    x = 0;
                    ++y;
                }

                $this.setPosition(track.parent.x + track.x, track.parent.y + track.y);
                $this.rotation = trainGame.Direction.rotation(currentDirection);

            }();

            this.nextTile = function() {
                
                var track = this.currentTrack();

                if(track.trackType == "Start") {
                    currentDirection = track.sideA;
                    return this.grid[currentDirection](this.currentTile);
                }
                else if (track.trackType == "End") {
                    currentDirection = trainGame.Direction.opposite(track.sideA);
                    return null;
                } 
                else {
                    var nextTrack = this.grid[currentDirection](this.currentTile).value;
                    if(currentDirection == trainGame.Direction.opposite(nextTrack.sideA) 
                        || currentDirection == trainGame.Direction.opposite(nextTrack.sideB)) {
                        return this.grid[currentDirection](this.currentTile);
                    }
                    else {
                        return null;
                    }
                }
            }

            this.start = function () {
                this.Animation.gotoAndPlay("start");
            }

            var test = { x: 0, y: 0 };
            this.launch = function () {
                this.Animation.gotoAndPlay("startLaunch");

                this._Tween().wait(1000).call(function (e) {
                    $this.run();
                    var track = $this.currentTrack();
                    var pos = trainGame.Direction.sides(track.sideA);
                    $this.setPosition(track.parent.x + pos.x, track.parent.y + pos.y);

                    test = { x: this.x, y: this.y };
                    $this.readyForNext = true;
                });
            }

            this.end = function () {
                this.Animation.gotoAndPlay("end");
            }

            this.arrive = function () {
                this.Animation.gotoAndPlay("endArrive");
            }

            this.stop = function () {
                this.Animation.gotoAndPlay("still");
            }
            
            this.stroke = new createjs.Shape();

            this.addChild(this.stroke);

            this.run = function () {
                this.Animation.gotoAndPlay("running");

                var track = $this.currentTrack();
                var otherSide = (trainGame.Direction.opposite(currentDirection) == track.sideA ? track.sideB : track.sideA);
                test
                var startPos = {
                    x: track.parent.x + 30,
                    y: track.parent.y + 30
                };

                var nextRelative = trainGame.Direction.sides(otherSide);
                nextRelative = {x: nextRelative.x - 30, y: nextRelative.y - 30 };

                this.stroke.graphics.s("#000000").mt(test.x, test.y)
                    .bt(test.x, test.y, nextRelative.x + startPos.x, nextRelative.y + startPos.y, track.parent.x - 30, track.parent.y + 30).es();
                test = { x: nextRelative.x + test.x, y: nextRelative.y + test.y };

                debugger;
                //this._Tween().to({
                //    guide: {
                //        path: [0, 0, 0, 30, 30, 30, 30, 0, 0, 0]
                //    }
                //}, 1000).call(function (e) {
                //    $this.readyForNext = true;
                //});

            }

            this.crash = function () {
                this.Animation.gotoAndPlay("crash");
            }

            //

            
            this.currentTrack = function () {
                return this.currentTile.value;
            };

            this.on('click', function (e) {
                if (!$this.hasStarted) {
                    $this.hasStarted = true;
                    $this.launch();
                }
            });

            this.on('tick', function (e) {
                if ($this.readyForNext) {
                    $this.readyForNext = false;

                    var next = $this.nextTile();

                    if (next == null && $this.currentTrack().trackType != "End") {
                        $this.crash();
                    }
                    else if (next == null && $this.currentTrack().trackType == "End") {
                        $this.arrive();
                    }
                    else if(next != null) {
                        $this.currentTile = next;
                        $this.run();
                    }
                }
            });
        }

        scope.trainGame = trainGame;
    }(window));
});