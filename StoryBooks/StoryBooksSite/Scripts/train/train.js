define(['jquery', 'JDGEngine'], function ($) {
    
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

        this.addChild(this.Animation);

        this.run = function () {
            $this.Animation.
        }

    };



});