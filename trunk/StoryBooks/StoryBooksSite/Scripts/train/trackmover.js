define(['jquery', 'JDGEngine'], function ($) {
    (function (scope) {
        var tg = scope.trainGame || {};

        var TrackMover = function () {
            this.initialize();
        };

        var p = TrackMover.prototype = new createjs.Container();
        TrackMover.prototype.inherited_init = p.initialize;

        p.floatingTrack = new tg.Track(0, null);

        p.SwapTracks = function (track) {
            if (track.isMoveable) {

            }
        }

        p.hasTrack = function () {
            return this.floatingTrack != null && !(this.floatingTrack.TrackId != 0);
        }

        p.initialize = function () {
            if (this.inherited_init) this.inherited_init();


        }

        tg.TrackMover = TrackMover;

    }(window));
});