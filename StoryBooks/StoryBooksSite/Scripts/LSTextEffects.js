(function (scope) {

    var LS = scope.LS || {};
    var AddToHash = function (hash, name, object) {
        hash.push(name);
        hash[hash[hash.length - 1]] = object;
        return hash;
    }

    /****************************************************************************/
    /********              Typewritter text                         *************/
    /****************************************************************************/

    LS.TextEffects = function () {
        this.initialize();
    }

    var p = LS.TextEffects.prototype = new createjs.Container();
    p.inherited_init = LS.TextEffects.initialize;

    p.initialize = function () {
        if (this.inherited_init) this.inherited_init();
        var $this = this;

        this.effects = [];
        this.typingSpeed = 10; // characters per second i guess.

        this.TextObject = new createjs.Text("");
        this.addChild(this.TextObject);

        AddToHash(this.effects, "Typewritter", function () {
            $this._inter = setInterval(function () {
                var rem = str.substr(i);
                var space = rem.indexOf(' ');
                space = (space === -1) ? str.length : space;
                var wordwidth = ctx.measureText(rem.substring(0, space)).width;
                var w = ctx.measureText(str.charAt(i)).width;
                if (cursorX + wordwidth >= canvas.width - padding) {
                    cursorX = startX;
                    cursorY += lineHeight;
                }
                ctx.fillText(str.charAt(i), cursorX, cursorY);
                i++;
                cursorX += w;
                if (i === str.length) {
                    clearInterval($_inter);
                }
            });
        });
        
        this.on('mousedown', function (e) {
            if (buttonClickEvent) {
                e.Button = $this;
                buttonClickEvent(e);
            }
        });

        this.on('tick', function (e) {

        });

        this.position = function (x, y) {
            $this.x = x;
            $this.y = y;

            return $this;
        }
    }

    scope.LS = LS;
}(window));
/* typeOut method
* str - string to type on the canvas
* startX - position X of the point to start from
* startY - position Y of the point to start from
* lineHeight - height of each line (the position Y will be incremented by this value)
* padding - padding in the canvas. No text will be typed within padding
*/

var canvas, ctx;

function typeOut(str, startX, startY, lineHeight, padding) {
    "use strict";
    var cursorX = startX || 0;
    var cursorY = startY || 0;
    var lineHeight = lineHeight || 32;
    padding = padding || 10;
    var i = 0;
    $_inter = setInterval(function () {
        var rem = str.substr(i);
        var space = rem.indexOf(' ');
        space = (space === -1) ? str.length : space;
        var wordwidth = ctx.measureText(rem.substring(0, space)).width;
        var w = ctx.measureText(str.charAt(i)).width;
        if (cursorX + wordwidth >= canvas.width - padding) {
            cursorX = startX;
            cursorY += lineHeight;
        }
        ctx.fillText(str.charAt(i), cursorX, cursorY);
        i++;
        cursorX += w;
        if (i === str.length) {
            clearInterval($_inter);
        }
    }, 75);
}