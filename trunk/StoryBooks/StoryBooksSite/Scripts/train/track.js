define(['jquery', 'JDGEngine'], function ($) {
    (function (scope) {
        var tg = scope.trainGame || {};
        tg.Direction = {
            north: "north",
            south: "south",
            east: "east",
            west: "west",
            northeast: "northeast",
            northwest: "northwest",
            southeast: "southeast",
            southwest: "southwest",
            none: "none",

            opposite: function(dir){
                switch(dir) {
                    case tg.Direction.north: return tg.Direction.south;
                    case tg.Direction.south: return tg.Direction.north;
                    case tg.Direction.east: return tg.Direction.west;
                    case tg.Direction.west: return tg.Direction.east;
                    case tg.Direction.northeast: return tg.Direction.southwest;
                    case tg.Direction.southwest: return tg.Direction.northeast;
                    case tg.Direction.southeast: return tg.Direction.northwest;
                    case tg.Direction.northwest: return tg.Direction.southeast;
                }
            },

            //returns the direction on its left
            onLeft: function (dir) {
                switch (dir) {
                    case tg.Direction.none: debugger; return tg.Direction.none;
                    case tg.Direction.north: return tg.Direction.west;
                    case tg.Direction.east: return tg.Direction.north;
                    case tg.Direction.south: return tg.Direction.east;
                    case tg.Direction.west: return tg.Direction.south;
                }
            }
        };

        var animationSheet = {
            framerate: 0,
            images: ["/Content/tracks.png"],
            frames: { width: 60, height: 60, regX: 30, regY: 30 },
            animations: {
                Empty: [0],
                Straight: [1],
                Corner: [2],
                Start: [3],
                End: [4]
            }
        };

        tg.Track = function (trackId, trackmover) {
            this.initialize(trackId, trackmover);
        };

        var p = tg.Track.prototype = new createjs.Container();
        tg.Track.prototype.inherited_init = p.initialize;

        p.trackId = 0;
        p.sideA = null;
        p.sideB = null;
        p.trackType = "";
        p.isMoveable = false;
        p.isLockable = false;
        p.Animation = null;

        p.Center = function () {
            return { x: this.parent.x + 30, y: this.parent.y + 30 };
        }

        p.lock = function () {
            if (this.isLockable) {
                this.isMoveable = false;
            }

            //this.drawDebug();
        }

        p.drawDebug = function () {

            if (this.isMoveable) {
                this.shape.graphics.s("#00FF00");
            }
            else {
                this.shape.graphics.s("#FF0000");
            }

            this.shape.graphics.dc(0, 0, 15).es();
        }

        p.unlock = function () {
            if (this.isLockable) {
                this.isMoveable = true;
            }

            //this.drawDebug();
        }

        p.otherSide = function (side) {
            return side == this.sideA ? this.sideB : this.sideA;
        }

        p.turnRot = function (direction) {
            var turningSide = this.otherSide(tg.Direction.opposite(direction));
            if (turningSide == tg.Direction.onLeft(direction)) {
                return -90;
            }
            else if (direction != turningSide) {
                return 90;
            }

            return 0;
        }

        p.sides = function (dir) {
            switch (dir) {
                case tg.Direction.none: return { x: -1, y: -1 };
                case tg.Direction.north: return { x: 0, y: -30 };
                case tg.Direction.south: return { x: 0, y: 30 };
                case tg.Direction.east: return { x: 30, y: 0 };
                case tg.Direction.west: return { x: -30, y: 0 };
            }
        }

        p.dirRot = function (dir) {
            switch (dir) {
                case tg.Direction.none: return 0;
                case tg.Direction.north: return -90;
                case tg.Direction.south: return 90;
                case tg.Direction.east: return 0;
                case tg.Direction.west: return 180;
            }
        }

        p._establishTrack = function (animName, sideA, sideB, isMoveable) {
            var spriteSheet = new createjs.SpriteSheet(animationSheet);
            this.Animation = new createjs.Sprite(spriteSheet, animName);
            this.trackType = animName;

            this.isLockable = animName != "End" && animName != "Start";

            this.Animation.rotation = this.dirRot(sideA);
            this.sideA = sideA;
            this.sideB = sideB;
            this.isMoveable = isMoveable;

            this.addChild(this.Animation);
        };

        p.initialize = function (trackId, trackmover) {
            if (this.inherited_init) this.inherited_init();

            this.setTransform(30, 30);
             
            this.mover = trackmover;

            this.trackId = trackId;

            switch (this.trackId) {
                default:
                case 0: // Default blank track
                    this._establishTrack("Empty", tg.Direction.none, tg.Direction.none, false);
                    break;

                case 1: // Starting going East
                    this._establishTrack("Start", tg.Direction.east, tg.Direction.none, false);
                    break;

                case 2: // Starting going South
                    this._establishTrack("Start", tg.Direction.south, tg.Direction.none, false);
                    break;

                case 3: // Starting going West 
                    this._establishTrack("Start", tg.Direction.west, tg.Direction.none, false);
                    break;

                case 4: // Starting going North 
                    this._establishTrack("Start", tg.Direction.north, tg.Direction.none, false);
                    break;

                case 5: // Ending from East
                    this._establishTrack("End", tg.Direction.east, tg.Direction.none, false);
                    break;

                case 6: // Ending from South
                    this._establishTrack("End", tg.Direction.south, tg.Direction.none, false);
                    break;

                case 7: // Ending from West 
                    this._establishTrack("End", tg.Direction.west, tg.Direction.none, false);
                    break;

                case 8: // Ending from North 
                    this._establishTrack("End", tg.Direction.north, tg.Direction.none, false);
                    break;

                case 9: // Corner north east
                    this._establishTrack("Corner", tg.Direction.east, tg.Direction.north, true);
                    break;

                case 10: // Corner south east
                    this._establishTrack("Corner", tg.Direction.south, tg.Direction.east, true);
                    break;

                case 11: // Corner south west
                    this._establishTrack( "Corner", tg.Direction.west, tg.Direction.south, true);
                    break;

                case 12: // Corner north west
                    this._establishTrack("Corner", tg.Direction.north, tg.Direction.west, true);
                    break;

                case 13: // straight from east to west
                    this._establishTrack( "Straight", tg.Direction.east, tg.Direction.west, true);
                    break;

                case 14: // straight from north to south
                    this._establishTrack("Straight", tg.Direction.north, tg.Direction.south, true);
                    break;
            }

            this.on('mouseover', function (e) {
                
            });

            this.on('click', function (e) {
                if (e.target instanceof tg.Track) {
                    var track = e.target;

                    if (trackmover.hasTrack() && track.isMoveable) {

                    }

                }
                debugger;
            });


            this.shape = new createjs.Shape();
            if (jdge._JD_DEBUG_ || true) {
                if (this.isMoveable) {
                    this.shape.graphics.s("#00FF00");
                }
                else {
                    this.shape.graphics.s("#FF0000");
                }

                this.shape.graphics.dc(0, 0, 15).es();
                this.addChild(this.shape);
            }
        };

        scope.trainGame = tg;
    }(window));
});