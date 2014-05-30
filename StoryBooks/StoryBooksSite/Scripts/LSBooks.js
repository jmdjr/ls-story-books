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

    LS.Book = function(pageJSON, engine) {
        this.initialize(pageJSON, engine);
    }

    var p = LS.Book.prototype = new createjs.Container();
    p.inherited_init = LS.Book.initialize;

    p.initialize = function (pageJSON, engine) {
        debugger;
        if (this.inherited_init) this.inherited_init();
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


