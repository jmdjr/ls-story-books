(function (scope) {

    var LS = scope.LS || {};

    /****************************************************************************/
    /********                      HUD Elements                     *************/
    /****************************************************************************/
    // Container object with preset text elements which get updated dynamically.

    LS.HUD = function(newTitle, newChapter) {
        this.initialize(newTitle, newChapter);
    }

    var p = LS.HUD.prototype = new createjs.Container();
    LS.HUD.prototype.inherited_init = p.initialize;

    p.initialize = function (newTitle, newChapter) {
        if (this.inherited_init) this.inherited_init();
        var $this = this;
        this.title = new createjs.Text();
        this.chapter = new createjs.Text();

        this.setBounds(0, 0, 125, 30);
        this.bounds = $this.getBounds();

        this.addChild(this.title);
        this.addChild(this.chapter);

        this.updateText = function (newTitle, newChapter) {
            if (newTitle) {
                $this.title.text = newTitle;
            }

            if (newChapter) {
                $this.chapter.text = newChapter;
            }

            return $this;
        }

        this.positionText = function (titleCoords, chapterCoords) {
            if (titleCoords) {
                $this.title.x = titleCoords.x;
                $this.title.y = titleCoords.y;
            }

            if (chapterCoords) {
                $this.chapter.x = chapterCoords.x;
                $this.chapter.y = chapterCoords.y;
            }

            return $this;
        }

        this.position = function (x, y) {
            $this.x = x;
            $this.y = y;

            return $this;
        }

        this.updateText(newTitle, newChapter);

        this.chapter.x = this.title.x + this.title.getMeasuredWidth() + 5;

    }

    scope.LS = LS;
}(window));
