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
            },

            sides: function (dir) {
                switch (dir) {
                    case tg.Direction.none: return { x: -1, y: -1 };
                    case tg.Direction.north: return { x: 30, y: 0 };
                    case tg.Direction.south: return { x: 30, y: 60 };
                    case tg.Direction.east: return { x: 60, y: 30 };
                    case tg.Direction.west: return { x: 0, y: 30 };
                }
            },

            rotation: function (dir) {
                switch (dir) {
                    case tg.Direction.none: return 0;
                    case tg.Direction.north: return -90;
                    case tg.Direction.south: return 90;
                    case tg.Direction.east: return 0;
                    case tg.Direction.west: return 180;
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

        tg.Track = function (trackId) {
            this.initialize(trackId);
        };

        var p = tg.Track.prototype = new createjs.Container();
        tg.Track.prototype.inherited_init = p.initialize;

        p.initialize = function (trackId) {
            if (this.inherited_init) this.inherited_init();

            var $this = this;

            this.setTransform(30, 30);

            var spriteSheet = new createjs.SpriteSheet(animationSheet);
            this.Animation = null;

            this.trackId = trackId || 0;

            // directions for reference...
            this.sideA = null;
            this.sideB = null;

            this.trackType = "";

            this.isMoveable = false;

            var establishTrack = function (animName, sideA, sideB, isMoveable) {
                this.Animation = new createjs.Sprite(spriteSheet, animName);
                this.trackType = animName;
                this.Animation.rotation = tg.Direction.rotation(sideA);
                this.sideA = sideA;
                this.sideB = sideB;
                this.isMoveable = isMoveable;

                this.addChild(this.Animation);
            };

            switch (this.trackId) {
                default:
                case 0: // Default blank track
                    establishTrack.call($this, "Empty", tg.Direction.none, tg.Direction.none, false);
                    break;

                case 1: // Starting going East
                    establishTrack.call($this, "Start", tg.Direction.east, tg.Direction.none, false);
                    break;

                case 2: // Starting going South
                    establishTrack.call($this, "Start", tg.Direction.south, tg.Direction.none, false);
                    break;

                case 3: // Starting going West 
                    establishTrack.call($this, "Start", tg.Direction.west, tg.Direction.none, false);
                    break;

                case 4: // Starting going North 
                    establishTrack.call($this, "Start", tg.Direction.north, tg.Direction.none, false);
                    break;

                case 5: // Ending from East
                    establishTrack.call($this, "End", tg.Direction.east, tg.Direction.none, false);
                    break;

                case 6: // Ending from South
                    establishTrack.call($this, "End", tg.Direction.south, tg.Direction.none, false);
                    break;

                case 7: // Ending from West 
                    establishTrack.call($this, "End", tg.Direction.west, tg.Direction.none, false);
                    break;

                case 8: // Ending from North 
                    establishTrack.call($this, "End", tg.Direction.north, tg.Direction.none, false);
                    break;

                case 9: // Corner north east
                    establishTrack.call($this, "Corner", tg.Direction.east, tg.Direction.north, true);
                    break;

                case 10: // Corner south east
                    establishTrack.call($this, "Corner", tg.Direction.south, tg.Direction.east, true);
                    break;

                case 11: // Corner south west
                    establishTrack.call($this, "Corner", tg.Direction.west, tg.Direction.south, true);
                    break;

                case 12: // Corner north west
                    establishTrack.call($this, "Corner", tg.Direction.north, tg.Direction.west, true);
                    break;

                case 13: // straight from east to west
                    establishTrack.call($this, "Straight", tg.Direction.east, tg.Direction.west, true);
                    break;

                case 14: // straight from north to south
                    establishTrack.call($this, "Straight", tg.Direction.north, tg.Direction.south, true);
                    break;
            }

            if (jdge._JD_DEBUG_) {
                var shape = new createjs.Shape();
                shape.graphics.s("#00FF00").dc(0, 0, 15).es();
                this.addChild(shape);
            }
        };

        scope.trainGame = tg;
    }(window));
});