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
                endArrive: [12, 15, false]
            }
        };

        var p = trainGame.TrainEngine.prototype = new createjs.Container();
        trainGame.TrainEngine.prototype.inherited_init = p.initialize;

        p.initialize = function (gridManager) {
            var tgDir = trainGame.Direction;
            if (this.inherited_init) this.inherited_init();

            var $this = this;

            this.grid = null;
           
            var spriteSheet = new createjs.SpriteSheet(animationSheet);
            this.Animation = new createjs.Sprite(spriteSheet, "start");

             //adds transition functionality.
            jdge.MakeTransitionable.call(this);

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

            this.nextTile = function () {

                var track = this.currentTrack();

                if (track.trackType == "Start") {
                    currentDirection = track.sideA;
                    return this.grid[currentDirection](this.currentTile);
                }
                else if (track.trackType == "End") {
                    currentDirection = tgDir.opposite(track.sideA);
                    return null;
                }
                else {
                    var next = this.grid[currentDirection](this.currentTile);

                    if (next.value
                        && (currentDirection == tgDir.opposite(next.value.sideA)
                        || currentDirection == tgDir.opposite(next.value.sideB))) {
                        return next;
                    }
                    else {
                        return null;
                    }
                }
            }

            this.establishCurrentTile = function () {
                this.grid = gridManager.currentGrid();
                var x = y = 0;
                var track = null;
                $this.currentTile = null;
                this.hasStarted = false;
                this.readyForNext = false;
                createjs.Tween.removeTweens(this);
                this.start();

                while (y < $this.grid.height && $this.currentTile == null) {

                    while (x < $this.grid.width && $this.currentTile == null) {
                        var tile = $this.grid.getTileAt(x, y);
                        track = tile.value;

                        if (!jdge.IsUndefined(track) && track.trackType == "Start") {
                            this.currentTile = tile;
                            currentDirection = track.sideA;
                        }

                        ++x;
                    }
                    x = 0;
                    ++y;
                }

                $this.setPosition(track.parent.x + track.x, track.parent.y + track.y);
                $this.rotation = track.dirRot(currentDirection);
            };

            this.start = function () {
                this.Animation.gotoAndPlay("start");
            }

            this.launch = function () {
                this.Animation.gotoAndPlay("startLaunch");

                this._Tween().wait(1000).call(function (e) {
                    $this.run();
                });
            }

            this.end = function () {
                this.Animation.gotoAndPlay("end");
            }

            this.arrive = function () {
                this.Animation.gotoAndPlay("endArrive");
                var track = $this.currentTrack();
                var pos = track.sides(track.sideA);
                $this.setPosition(track.parent.x + 30, track.parent.y + 30);
            }

            this.stop = function () {
                this.Animation.gotoAndPlay("still");
            }

            this.run = function () {
                this.Animation.gotoAndPlay("running");

                var track = $this.currentTrack();

                track.lock();
                var trackSide = tgDir.opposite(currentDirection);
                var otherSide = track.otherSide(trackSide);
                var startPos = track.Center();
                var nextRelative = track.sides(otherSide);
                
                if (track.trackType != "End") {

                    this._Tween().to({
                        rotation: this.rotation + track.turnRot(currentDirection),
                        guide: {
                            path: [this.x, this.y, startPos.x, startPos.y, startPos.x + nextRelative.x, startPos.y + nextRelative.y]
                        }
                    }, 1000).call(function (e) {

                        currentDirection = otherSide;
                        $this.readyForNext = true;
                        track.unlock();
                    });
                }
                else {
                    $this.readyForNext = true;
                    track.unlock();
                }
            }

            this.crash = function () {
                this.Animation.gotoAndPlay("crash");
            }

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
                    else if (next != null) {
                        $this.currentTile = next;
                        $this.run();
                    }
                }
            });

            this.recalcTrain = function () {
                this.establishCurrentTile();
            }
        }

        scope.trainGame = trainGame;
    }(window));
});