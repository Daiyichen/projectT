/**
 * Created by Admin on 2016-7-22.
 */

require.config({
    paths: {
        "jquery": "lib/jquery"
    },
    shim: {
    }
});
require([ "jquery"], function ($) {
    /* Your app code here. */

    calcDot("inner-bottom");


    /*展开--事件委托*/
    $(".item-box").on('click','.caret', function (e) {
        e.stopPropagation();
        var orignal = $(this).parent().find(".inner-bottom .data-copy").text();
        $(this).parent().find(".inner-bottom p").text(orignal);
        $(this).parent().find(".inner-bottom").height("auto");
        $(this).removeClass("caret").addClass("caretUp");
    });

    /*收起--事件委托*/
    $(".item-box").on('click','.caretUp', function (e) {
        e.stopPropagation();
        $(this).removeClass("caretUp").addClass("caret");
        $(this).parent().find(".inner-bottom").height(60);
        calcItem($(this).parent().find(".inner-bottom"));
    });

});
  function calcDot(className) {
    $("." + className + "").each(function (i) {
        var bshowCaret = false;
        var divH = $(this).height();//外容器的高度
        var $p = $("p", $(this)).eq(0);
        $p.data("orignal",$p.text());
        while ($p.outerHeight() > divH) {

            $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
            if(!bshowCaret) {
                bshowCaret = true;
                $(this).parent().append('<div class="caret"></div>');
            }
        }
    });
}


function  calcItem(that) {
    var bshowCaret = false;
    var divH = that.height();//外容器的高度
    var $p = $("p", that).eq(0);
    $p.data("orignal",$p.text());
    while ($p.outerHeight() > divH) {
        $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
        if(!bshowCaret) {
            bshowCaret = true;
            $(this).parent().append('<div class="caret"></div>');
        }
    }
}
