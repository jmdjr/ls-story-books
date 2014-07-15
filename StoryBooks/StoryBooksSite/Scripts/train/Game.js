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

            gridManager.addGrid("Second Grid", [
                [10, 13, 11,  0,  0,  0],
                [14,  0, 14,  0,  0,  0],
                [14,  1, 12, 10,  7,  0],
                [14, 10, 11, 14, 10, 11],
                [ 9, 12, 14,  9, 12, 14],
                [ 0,  0, 14,  0,  0, 14],
                [0, 0, 9, 13, 13, 12]

            ], function (id) { return new trainGame.Track(id); });

            gridManager.selectGrid("Second Grid");

            this.addChild(gridManager);

            this.testingTrain = new trainGame.TrainEngine(gridManager);

            gridManager.addChild(this.testingTrain);

            this.enter = function () {
                this.testingTrain.start();
                gridManager.Draw();
            }
            this.update = function () {
            }

            this.scaleX = 1;
            this.scaleY = 1;
        });
    });
});