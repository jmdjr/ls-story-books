var Game = null;

define(['jquery', 'JDGEngine', 'JDGEGridManager', 'LSButton'], function ($) {
    $(function () {

        Game = new jdge.Engine(600, 800);
        Game.loadState('TitleScreen', new jdge.State(function () {
            this.addChild(new createjs.Bitmap('/Content/simple title screen.png'));
            this.addChild(new LS.Button("Play", "GameScreen", function () {
                Game.gotoState("GameScreen");
            }).position(300, 400));
        }));

        Game.loadState('GameScreen', new jdge.State(function () {
            var gridManager = new jdge.GridManager(this.Engine);

            gridManager.addGrid("First Grid", [
                ['a', 'b', 'c', 'd', 'e'],
                ['f', 'g', 'h', null, 'j'],
                ['l', 'm', 'n', 'o', 'p', 'q']
            ]);

            gridManager.addGrid("Second Grid", [
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20]
            ]);
            gridManager.addGrid("Third Grid", [
                ['test', 32, null, 'A', 'd'],
                ['h', '6', true, { toString: function () { return 'my Value';}}, 'null'],
                ['object', false, 'ignore me', new LS.Button("return", "TitleScreen", function () {
                    Game.gotoState("TitleScreen");
                }).position(0, 0), 'p', 'q']
            ]);

            var selectGrids = function (e) { gridManager.selectGrid(e.Button.value); };
            this.addChild(new LS.Button("select First Grid", "First Grid", selectGrids).position(400, 50));
            this.addChild(new LS.Button("select Second Grid", "Second Grid", selectGrids).position(400, 105));
            this.addChild(new LS.Button("select Third Grid", "Third Grid", selectGrids).position(400, 160));
            this.addChild(gridManager);
            
            var data = {
                framerate: 10,
                images: ["/Content/TrainStrip.png"],
                frames: { width: 60, height: 60 },
                animations: { run: [0, 3]}
            };
            var spriteSheet = new createjs.SpriteSheet(data);
            var animation = new createjs.Sprite(spriteSheet, "run");
            this.addChild(animation);

            this.onTick = function () {
                gridManager.Draw();
            }
        }));

        Game.play();


        //var grid = new jdge.SimpleGrid([
        //    ['a', 'b', 'c', 'd', 'e'],
        //    ['f', 'g', 'h', null, 'j'],
        //    ['l', 'm', 'n', 'o', 'p', 'q']
        //]);
    });
});