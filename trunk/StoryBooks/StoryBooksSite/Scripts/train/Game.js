define(['jquery', 'JDGEngine', 'JDGEGrid'], function ($) {
    $(function () {
        var grid = new jdge.SimpleGrid([
            [0, 0, 0, null, 0],
            [1, 2, 3]
        ]);
        grid.printHtml();
    });
});