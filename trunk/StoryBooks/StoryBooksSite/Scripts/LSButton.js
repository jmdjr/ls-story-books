/// <reference path="LSButton.js" />
(function (scope) {

    var LS = scope.LS || {};

    /****************************************************************************/
    /********               Buttons used on dialogue display        *************/
    /****************************************************************************/


    LS.Button = function(buttonText, buttonValue, buttonClickEvent) {
        this.initialize(buttonText, buttonValue, buttonClickEvent);
    }

    var p = LS.Button.prototype = new createjs.Container();
    LS.Button.prototype.inherited_init = p.initialize;

    p.initialize = function (buttonText, buttonValue, buttonClickEvent) {
        if (this.inherited_init) this.inherited_init();
        var $this = this;

        this.fontStyle = "12px Arial";

        this.setBounds(0, 0, 125, 30);
        this.bounds = $this.getBounds();

        $this.buttonGraphic = new createjs.Shape();
        $this.addChild($this.buttonGraphic);

        $this.buttonText = new createjs.Text();
        $this.addChild($this.buttonText);

        this.Text = function (text) {
            debugger;
            if (text) {
                $this.buttonText.text = text;
            }

            return $this.buttonText.text;
        }

        this.reuseButton = function (text, value, fontcolor, fillcolor, strokecolor) {
            var b = $this.bounds = $this.bounds || $this.getBounds();
            fillcolor = fillcolor || "silver";
            strokecolor = strokecolor || "black";
            fontcolor = fontcolor || "black";
            value = value || 0;
            text = text || "";

            $this.value = value;

            if ($this.buttonGraphic) {
                $this.buttonGraphic.graphics
					.s(strokecolor)
					.f(fillcolor)
					.rr(b.x, b.y, b.width, b.height, 15);
            }

            if ($this.buttonText) {
                $this.buttonText.text = text;
                var tb = $this.buttonText.getBounds();
                $this.buttonText.y = b.height / 2 - tb.height * 2 / 3;
                $this.buttonText.x = b.width / 2;
                $this.buttonText.textAlign = "center";
                $this.buttonText.lineWidth = b.width - 10;
                $this.buttonText.color = fontcolor;
            }
        }

        this.reuseButton(buttonText, buttonValue);

        this.on('mousedown', function (e) {
            if (buttonClickEvent) {
                e.Button = $this;
                buttonClickEvent(e);
            }
        });

        this.position = function (x, y) {
            $this.x = x;
            $this.y = y;

            return $this;
        }
    }

    scope.LS = LS;
}(window));
