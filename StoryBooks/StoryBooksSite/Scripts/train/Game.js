var Game = null;

define(['jquery', 'JDGEngine', 'JDGEGridManager', 'LSButton', 'train/train', 'train/track'], function ($) {
    $(function () {

        Game = new jdge.Engine(600, 800);
        var MenusFC = Game.addNewCollection('Menus', true);

        //MenusFC.add('TitleScreen', function () {
        //    var testButton = new LS.Button("Play", "GameScreen", function () {
        //        MenusFC.goto("GameScreen", false);
        //    }).position(300, 400);

        //    this.addChild(new createjs.Bitmap('/Content/simple title screen.png'));
        //    this.addChild(testButton);
        //});

        MenusFC.add('GameScreen', function () {
            var gridManager = new jdge.GridManager(this.Engine);
            var testingTrain = new trainGame.TrainEngine(gridManager);
            var tiler = function (id) { return new trainGame.Track(id); };

            gridManager.addGrid("First Grid", [
                [10, 13, 13, 13, 11],
                [14, 10, 13, 13, 12],
                [14, 14, 10, 11, 6],
                [4, 9, 12, 9, 12]

            ], tiler);

            gridManager.addGrid("Second Grid", [
                [10, 13, 11, 0, 0, 0],
                [14, 0, 14, 0, 0, 0],
                [14, 1, 12, 10, 7, 0],
                [14, 10, 11, 14, 10, 11],
                [9, 12, 14, 9, 12, 14],
                [0, 0, 14, 0, 0, 14],
                [0, 0, 9, 13, 13, 12]

            ], tiler); 

            this.addChild(gridManager);
            gridManager.addChild(testingTrain);

            this.shiftGridManager = function (newGrid) {
                gridManager.selectGrid(newGrid);
                testingTrain.recalcTrain();
            }

            this.enter = function () {
                this.shiftGridManager("First Grid");
            }
            this.update = function () {
                gridManager.Draw();
            }

            this.scaleX = 1;
            this.scaleY = 1;
        });
    });
});