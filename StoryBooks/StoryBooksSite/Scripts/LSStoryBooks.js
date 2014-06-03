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
    this.Engine = new jdge.Engine(480, 800);

    var stateButtonSwitch = function (e) {
        $this.Engine.gotoState(e.Button.value);
    }

    var gameResources = {};
    this.Book = {};

    //$.post('http://www.lostseraph.com/LS/Test.php?u=Johnny&c=FirstChapter', function (data) {
    //    gameResources = $.parseJSON(data);
    //});
    var jsonData = '{ "pages": [{"PageId":"1","DisplayText":"this is the first page... nothing much happening","PageTypeId":"Dialogue","BackgroundImageUrl":null,"CharacterImageUrl":null,"IsImportant":"0"},{"PageId":"2","DisplayText":"Something New is Happening","PageTypeId":"Dialogue","BackgroundImageUrl":null,"CharacterImageUrl":null,"IsImportant":"0"},{"PageId":"3","DisplayText":"This is the last page. RESTART !!!","PageTypeId":"Dialogue","BackgroundImageUrl":null,"CharacterImageUrl":null,"IsImportant":"0"}], "choices": [{"ChoiceId":"1","SourcePageId":"1","TargetPageId":"2","ChoiceText":"Continue","ChapterId":"1"},{"ChoiceId":"2","SourcePageId":"2","TargetPageId":"3","ChoiceText":"Continue","ChapterId":"1"}] }';
    this.H_Center_Position = function (elemWidth) {
        return $this.Engine.bounds.width / 2 - elemWidth / 2;
    }
    //'http://www.lostseraph.com/LS/Test.php?u=Johnny&c=FirstChapter'
    var state1 = new jdge.State(function () {
        this.button = new LS.Button("START", "State2", function (e) {
            //$.post('/Pages/Test.php?u=Johnny&c=FirstChapter', function (data) {
            //    gameResources = $.parseJSON(data);
            //    stateButtonSwitch(e);
            //});

            gameResources = $.parseJSON(jsonData);
            $this.Book = new LS.Book();
            $this.Book.loadPagesIntoEngine(gameResources, $this.Engine);
            debugger;
            $this.Engine.gotoState($this.Book.pages[0]);
        });
        this.HUD = new LS.HUD("LS Story Books", "Press Start To begin.")
            .positionText({ x: 10, y: 0 }, { x: 0, y: 13 });

        this.HUD.position($this.H_Center_Position(this.HUD.bounds.width), 150);
        this.button.position($this.H_Center_Position(this.button.bounds.width), 300);

        this.addChild(this.HUD);
        this.addChild(this.button);
    });

    var state3 = new jdge.State(function () {
        this.HUD = new LS.HUD("End State");
        this.button = new LS.Button("Back to Start", "MainMenu", stateButtonSwitch)
        .position(200, 300);

        this.addChild(this.HUD);
        this.addChild(this.button);
    });

    this.Engine.loadState("MainMenu", state1);
    this.Engine.loadState("EndState", state3);
    this.Engine.play();
}

scope.LS = LS;
}(window));

window.onload = function () {
    new LS.StoryBooks();
}