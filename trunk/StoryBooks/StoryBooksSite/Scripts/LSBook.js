(function (scope) {

    var LS = scope.LS || {};

    /****************************************************************************/
    /********               Book Creation/Rendering                 *************/
    /****************************************************************************/
    /*
    The book is the whole visual and audio core of the game.  it manages the pages, 
    the layering of the page background image, starting/stopping audio, scrolling
    page text, connecting buttons to th e
    */

    LS.Book = function() {
        this.initialize();
    }

    var p = LS.Book.prototype = new createjs.Container();
    p.inherited_init = LS.Book.initialize;

    p.initialize = function () {
        if (this.inherited_init) this.inherited_init();

        var $this = this;

        this.pages = [];
        this.loadPagesIntoEngine = function (book, engine) {
            $this.Engine = engine;
            book.pages.forEach(function (a) {
                $this.constructPage(a, book.choices);
            });
        }

        this.buttonSwitch = function (e) {
            $this.Engine.gotoState(e.Button.value);
        }

        this.constructPage = function (page, choices) {
            var pageId = page.PageId;
            var display = page.DisplayText;
            var pageTypeId = page.PageTypeId;
            var pageName = "page" + pageId;
            $this.pages.push(pageName);

            $this.pages[$this.pages[$this.pages.length - 1]] = new jdge.State(function () {
                var $pageState = this;

                this.Text = new LS.HUD(pageId, display)
                    .position(100, 150);

                $pageState.addChild(this.Text);

                var index = 0;

                choices.forEach(function (a, b) {
                    if (a.SourcePageId == pageId) {
                        var targetpage = a.TargetPageId;

                        this.button = new LS.Button(a.ChoiceText, "page" + targetpage, $this.buttonSwitch)
                        .position(120 * index, 300);
                        ++index;
                        $pageState.addChild(this.button);
                    }
                });

                if (index == 0) {
                    this.button = new LS.Button("To End Screen", "EndState", $this.buttonSwitch)
                        .position(120 * index, 300);
                    $pageState.addChild(this.button);
                }
            });

            $this.Engine.loadState(pageName, $this.pages[$this.pages[$this.pages.length - 1]]);
        }

    }

    /****************************************************************************/
    /********              Sample Object Creation                   *************/
    /****************************************************************************/
    /*
        function LSObject(){
            this.initialize();
        }
        
        var p = LSObject.prototype = new createjs.Container();
        p.inherited_init = LSObject.initialize;
        
        p.initialize = function(){
            if(this.inherited_init) this.inherited_init();
        }
    
    */

    
    scope.LS = LS;
}(window));


/*$.post('/echo/html/', {html: 'test'}, function(data){
            text.text = data;
        });*/


