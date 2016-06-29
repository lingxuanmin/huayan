//翻页插件
var rentHouse = rentHouse || {};
 rentHouse.listloop = function(opt) {
    var _opt = {wrap: "#brandPromo",loopBox: "#brandPromo-list",triggerLeft: ".dir-prev",triggerRight: ".dir-next",curCount: ".cur-count",totalCount: ".total-count",step: {wide: 7,narrow: 6},scrollWidth: {wide: 840,narrow: 660},hasCount: true,isLoop: true,isLazyLoad: true,delay: 0};
    $.extend(_opt, opt);
    var box = $(_opt.wrap), leftCtrl = box.find(_opt.triggerLeft), rightCtrl = box.find(_opt.triggerRight), moveBox = box.find(_opt.loopBox), moveBoxLi = moveBox.find("li"), step = _opt.step.wide, scrollWidth = _opt.scrollWidth.wide, len = Math.ceil(moveBoxLi.length / step), liLen = moveBoxLi.length, curCount = box.find(_opt.curCount), totalCount = box.find(_opt.totalCount), i = 0;
    //设置参数
    step = _opt.step.narrow;
    scrollWidth = _opt.scrollWidth.narrow;
    var _step = moveBoxLi.length % step;
    len = Math.ceil(moveBoxLi.length / step);
    liLen = moveBoxLi.length - _step;
 
    _opt.hasCount && totalCount.html(len);
    leftCtrl.unbind('click').click(function() {
        prev();
    });
    rightCtrl.unbind('click').click(function() {
        next();
    });
    var cStr = "<i></i>";
    if (len > 1) {
        for (var s = 0; s < len; s++) {
            $(".cir-num").append(cStr).find("i:first").addClass("thispage");
        }
    }
    function showPage_cir(index) {
        $(".cir-num").find("i").removeClass("thispage");
        $(".cir-num").find("i").eq(index).addClass("thispage");
    }
    function next() {
        console.log("len="+len+"moveBoxLi.length="+moveBoxLi.length)
        if (len == 1 || moveBox.is(":animated")) {
            return false;
        }
        if (!_opt.isLoop) {
            i++;
            if (i >= len) {
                i = len - 1
            }
            move(false, i);
            return;
        }
        if (i == len - 1) {
            for (var j = 0; j < step; j++) {
                moveBoxLi.eq(j).css({position: "relative",left: len * scrollWidth + "px"});
            }
        }
        i++;
        move(function() {
            if (i == len) {
                i = 0;
                moveBoxLi.removeAttr("style");
                moveBox.css("marginLeft", i * scrollWidth);
            }
            showPage_cir(i)
        }, i)
    }
    function prev() {
        if (len == 1 || moveBox.is(":animated")) {
            return false;
        }
        if (!_opt.isLoop) {
            i--;
            if (i <= 0) {
                i = 0;
            }
            move(false, i);
            return;
        }
        if (i == 0) {
            for (var j = 1; j <= step; j++) {
                moveBoxLi.eq(liLen - j).css({position: "relative",left: -len * scrollWidth + "px"});
            }
        }
        i--;
        move(function() {
            if (i == -1) {
                i = len - 1;
                moveBoxLi.removeAttr("style");
                moveBox.css("marginLeft", -i * scrollWidth);
            }
            showPage_cir(i)
        }, i)
    }
    function move(callback, _index) {
        lazyImg();
        if (_opt.hasCount) {
            if (_index > len - 1) {
                _index = 0;
            }
            if (_index < 0) {
                _index = len - 1;
            }
            curCount.html(_index + 1);
        }
        if (!callback) {
            callback = function() {
            }
        }
        moveBox.stop().animate({marginLeft: -i * scrollWidth}, 500, callback);
    }
    function lazyImg() {
        if (!_opt.isLazyLoad) {
            return
        }
        for (var j = 0; j < step; j++) {
            var _thisImg = moveBoxLi.eq(i * step + j).find("img");
            if (_thisImg.attr("src3")) {
                _thisImg.attr("src", _thisImg.attr("src3")).removeAttr("src3").addClass("err-product");
            }
        }
    }
    if (_opt.delay) {
        var auto = setInterval(function() {
            next();
        }, _opt.delay);
        box.hover(function() {
            clearInterval(auto);
        }, function() {
            auto = setInterval(function() {
                next();
            }, _opt.delay)
        })
    }
};