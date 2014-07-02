define(['jquery', 'JDGEngine', 'JDGEGridManager', 'LSButton'], function ($) {
    $(function () {

        var Game = new jdge.Engine(600, 800);

        Game.loadState('TitleScreen', new jdge.State(function () {
            this.addChild(new createjs.Bitmap('/Content/simple title screen.png'));
            this.addChild(new LS.Button("Play", "GameScreen", function () {
                Game.gotoState("GameScreen");
            }).position(300, 400));
        }));

        Game.loadState('GameScreen', new jdge.State(function () {
            this.addChild(new LS.Button("return", "TitleScreen", function () {
                Game.gotoState("TitleScreen");
            }));
        }));

        Game.play();


        //var grid = new jdge.SimpleGrid([
        //    ['a', 'b', 'c', 'd', 'e'],
        //    ['f', 'g', 'h', null, 'j'],
        //    ['l', 'm', 'n', 'o', 'p', 'q']
        //]);
    });
});