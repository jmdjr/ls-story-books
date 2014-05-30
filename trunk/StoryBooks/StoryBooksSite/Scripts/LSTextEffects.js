(function (scope) {

    var LS = scope.LS || {};

    /****************************************************************************/
    /********              Typewritter text                         *************/
    /****************************************************************************/

    LS.Text_Typewritter = function (textToDisplay) {
        this.initialize(textToDisplay);
    }

    var p = LS.Text_Typewritter.prototype = new createjs.Container();
    p.inherited_init = LS.Text_Typewritter.initialize;

    p.initialize = function (textToDisplay) {
        if (this.inherited_init) this.inherited_init();
        var $this = this;
        this.textToDisplay = textToDisplay;
        this.typingSpeed = 10; // characters per second i guess.

        this.TextObject = new createjs.Text("");
        this.addChild(this.TextObject);

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
