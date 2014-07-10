﻿define(['jquery', 'JDGEngine'], function ($) {
    
    TrainEngine = function(){
        this.initialize();
    }

    var p = TrainEngine.prototype = new createjs.Container();
    TrainEngine.prototype.inherited_init = TrainEngine.initialize;
    // TrainEngine will trigger "Crashed" event when it crashes...  need to work on how that happens...

    p.onCrash = $.noop();
    
    p.initialize = function (height, width, target) {
        if (this.inherited_init) this.inherited_init();

        var $this = this;

        var animationSheet = {
            framerate: 10,
            images: ["/Content/TrainStrip.png"],
            frames: { width: 60, height: 60 },
            animations: {
                still: [0, 0],
                running: [0, 3, "running"],
                crash: [4, 7, "smolder"],
                smolder: [6, 7, "smolder", 0.5]
            }
        };

        var spriteSheet = new createjs.SpriteSheet(animationSheet);
        this.Animation = new createjs.Sprite(spriteSheet, "still");
        var Tween = createjs.Tween.get($this);
        
        this.Property = jdge.Property;

        this.addChild(this.Animation);
        this.setTransform(30, 30, 1, 1, 0, 0, 0, 30, 30);

        this.stop = function() {
            $this.Animation.gotoAndPlay("still");
        }

        this.run = function () {
            $this.Animation.gotoAndPlay("running");
        }

        this.crash = function () {
            $this.Animation.gotoAndPlay("crash");
        }
        
        this.turnLeft = function () {
            var rot = $this.rotation;
            Tween.to({ rotation: (rot + 90) }, 500);
        }

        this.setPosition = function (x, y) {
            $this.x = x;
            $this.y = y;
        }
    };
});