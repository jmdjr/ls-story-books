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
                [10, 13, 13, 13, 11],
                [14, 10, 13, 13, 12],
                [14, 14, 10, 11,  6],
                [ 4,  9, 12,  9, 12]
            ], function (id) { return new trainGame.Track(id); });

            gridManager.selectGrid("Second Grid");

            this.addChild(gridManager);

            this.testingTrain = new trainGame.TrainEngine(gridManager);

            gridManager.addChild(this.testingTrain);

            this.enter = function () {
                this.testingTrain.start();
                gridManager.Draw();
            }

            var shape = new createjs.Shape();
            shape.graphics.moveTo(240,30).s("#000000").curveTo(270, 30,270,60).es();
            
            this.addChild(shape);
            this.update = function () {
                gridManager.setChildIndex(this.testingTrain, gridManager.children.length - 1);
            }

            this.scaleX = 2;
            this.scaleY = 2;
        });
    });
});