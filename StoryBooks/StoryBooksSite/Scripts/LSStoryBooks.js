(function (scope) {

    var LS = scope.LS || {};
/****************************************************************************/
/********            The Game Loop Object                       *************/
/****************************************************************************/
    LS.StoryBooks = function() {
    this.initialize();
}

    var p = LS.StoryBooks.prototype;

p.initialize = function () {
    jdge._JD_DEBUG_ = true;
    var $this = this;
    this.engine = new jdge.Engine(480, 800);
    var stateButtonSwitch = function (e) {
        $this.engine.gotoState(e.Button.value);
    }

    var gameResources = {};

    //$.post('http://www.lostseraph.com/LS/Test.php?u=Johnny&c=FirstChapter', function (data) {
    //    gameResources = $.parseJSON(data);
    //});

    this.H_Center_Position = function (elemWidth) {
        return $this.engine.bounds.width / 2 - elemWidth / 2;
    }

    var state1 = new jdge.State(function () {
        this.button = new LS.Button("START", "State2", stateButtonSwitch);
        this.HUD = new LS.HUD("LS Story Books", "Press Start To begin.")
            .positionText({ x: 10, y: 0 }, { x: 0, y: 13 });

        this.HUD.position($this.H_Center_Position(this.HUD.bounds.width), 150);
        this.button.position($this.H_Center_Position(this.button.bounds.width), 300);

        this.addChild(this.HUD);
        this.addChild(this.button);
    });

    var state2 = new jdge.State(function () {
        this.HUD = new LS.HUD("State 2", "This is chapter two");
        this.button = new LS.Button("To State 3", "State3", stateButtonSwitch)
        .position(200, 300);



        this.newText = new LS.Text_Typewritter("This is TEST TEXT!!!!!!")
            .position(100, 150);
        this.addChild(this.HUD);
        this.addChild(this.button);
        this.addChild(this.newText);
    });

    var state3 = new jdge.State(function () {
        this.HUD = new LS.HUD("State 3");
        this.button = new LS.Button("To State 1", "State1", stateButtonSwitch)
        .position(200, 300);

        this.addChild(this.HUD);
        this.addChild(this.button);
    });

    this.engine.loadState("State1", state1);
    this.engine.loadState("State2", state2);
    this.engine.loadState("State3", state3);
    this.engine.play();
}

scope.LS = LS;
}(window));

window.onload = function () {
    new LS.StoryBooks();
}