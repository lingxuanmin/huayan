var localPlus = localPlus || {};

/*banner*/
localPlus.banner = function(){
	var bglis = $(".lp-banner .banner-bg li"),
		bgul = $(".lp-banner .banner-bg"),
		bgTimer;
	//默认显示第一个
	bglis.eq(0).addClass("on");
	//背景自动切换
	bgTimer = setInterval(function(){
		var index = bgul.find(".on").index(),
			length = bglis.size(),
			next = (index == (length - 1)) ? 0 : index+1;

	bglis.removeClass("on");
	bglis.eq(next).addClass("on");

	},9000);
};


/* 弹出框*/
localPlus.dialog = function(){
	var logonBtn = $(".head-link .login"),
		registerBtn = $(".head-link .register"),
		quitBtn = $(".head-link .l-quit"),
        helpBtn = $(".head-link .help"),
        forgetPsw = $(".logon-dialog .forget-psw"),
        getPosition = $(".map-area .get-position"),
        userName = $(".head-link .user-name");

	/* 登录弹出框*/
	logonBtn.live("click",function(){
	   var _this = $(this),
        _sClass = _this.attr("link-class");
        mdialog(_sClass,'450px',"");   
    });

    //登录弹窗中注册链接
    $(".logon-dialog .register").live("click",function(){
        var _this = $(this),
      
        _sClass = _this.attr("link-class");
        clearDialog(_sClass);
        mdialog(_sClass,'450px',"");
    });

    //发布房源获取定位
    getPosition.click(function(){
        var _this = $(this),
            _sClass = _this.attr("link-class");

        //调用弹出框
        clearDialog(_sClass);
        mdialog(_sClass,'800px',"获取位置");
    });

    //注册页面弹出框
	registerBtn.live("click",function(){
		var _this = $(this),
		 	_sClass = _this.attr("link-class");

		//调用弹出框
        clearDialog(_sClass);
		mdialog(_sClass,'450px',"");
	});

	//退出弹出框
	quitBtn.on("click",function(){
		var _this = $(this),
		 	_sClass = _this.attr("link-class");

		//调用弹出框
		mdialog(_sClass,'450px',"");
	});

    //帮助弹出框
    helpBtn.on("click",function(){
        var _this = $(this),
            _sClass = _this.attr("link-class");

        //调用弹出框
        mdialog(_sClass,'510px',"");
    });

    userName.on("click",function(){
        var _this = $(this),
            _sClass = _this.attr("link-class");

        //调用弹出框
        mdialog(_sClass,'450px',"");
    });

    //忘记密码
    forgetPsw.live("click",function(){
        var _this = $(this),
            _sClass = _this.attr("link-class");
        //调用弹出框
        clearDialog(_sClass);
        mdialog(_sClass,'450px',"");
    });

    //发布结果
    var publicBtn = $(".complete-btn"),
        saveBtn = $(".sava-info-btn");
    publicBtn.on("click", function(){
        var _this = $(this),
            _sClass = ".public-success";//成功
        var failClass = ".public-fail"; //失败
        //调用弹出框
        mdialog(failClass,'450px',"");
    });

    //保存结果
    saveBtn.on("click",function(){
        var _this = $(this),
            _sClass = ".save-success";//成功
        var failClass = ".save-fail"; //失败
        //调用弹出框
        mdialog(_sClass,'450px',"");
    });
 
};


//注册激活页面
localPlus.activate = function(){
    var getCode = $(".activate .get-code"),
        countDown = $(".activate .count-down"),
        getAgain = $(".activate .get-code-again"),
        timeCount = 180;
    // //点击获取验证码
    // getCode.click(function(){
    //     //校验码3分钟倒计时
    //     var _this = $(this);
    //     _this.css("display",'none');
    //     countDown.css("display","inline-block");
    //     //倒计时
    //     setInterval(function(){
    //         if(timeCount >= 0){
    //              countDown.find(".second").html(timeCount--)
    //         }
    //         //倒计时到0 可以重新获取
    //         if(timeCount == 0){
    //             countDown.css("display","none");
    //             getAgain.css("display","inline-block");
    //         }
    //     },1000);
        
    // });
     
     //上传头像
    var uploadFile = $(".upload-head-img .upload"),
        uploadText = $(".upload-head-img .tip-text");

    uploadFile.on("change",function(){
        var fileUrl = uploadFile.val();

        if(fileUrl==""){
           uploadText.html("请选择上传的头像");
        }else{
            uploadText.html(fileUrl);
        }


    });
    

};
//弹出层
function mdialog(_select, _width,title) {
    $.ajax({
        url: "../src/dialog.html",
        type: "GET",
        dataType: "html",
        context: "document",
        success: function (data) {
            $(data).find(_select).appendTo("body");
            $.sDialog({
                css: {
                    width: _width,
                    border: "none",
                    padding: 0,
                    borderRadius: 0
                },
                message: _select,
                title: title,
                layerClick: true,
                show: "faller"
            });
            //placeHolder兼容
            JPlaceHolder.init();
        }
    });
};

//清除弹出层
function clearDialog(_sClass){
    $("body").find(_sClass).remove();
    $("body").find(".n-dialog").remove();
};

//step
localPlus.optStep = function(){
    var picList = $(".picture-list"),
        pre = $("ctrl .pre"),
        next = $(".ctrl .next"),
        selItem = $(".attr .sel-item"),
        pictureItem = $(".picture-list li .img-opt"),
        nextStep = $(".content .next-step"),
        stepcontent = $(".content"),
        navLi = $(".left-nav .public-step li"),
        availTime = $(".time-input .avail-time");
    //step5图片轮播
    rentHouse.listloop({wrap: ".step5 .upload",loopBox: ".picture-list",triggerLeft: ".ctrl .pre",triggerRight: ".ctrl .next",step: {wide: 3,narrow: 3},scrollWidth: {wide: 639,narrow: 639},hasCount: true,hasLable: true,isLazyLoad: true,delay: 0});
    //step6图片轮播
    rentHouse.listloop({wrap: ".step6 .upload",loopBox: ".picture-list",triggerLeft: ".ctrl .pre",triggerRight: ".ctrl .next",step: {wide: 3,narrow: 3},scrollWidth: {wide: 639,narrow: 639},hasCount: true,hasLable: true,isLazyLoad: true,delay: 0});

    //选项获取焦点和选中状态
    selItem.hover(function(){
        var _this = $(this);
        _this.addClass("item-hover");
    },function(){
        var _this = $(this);
        _this.removeClass("item-hover");
    });

    selItem.click(function(){
        var _this = $(this);
        _this.addClass("item-selected").siblings().removeClass("item-selected");
    });

    //左边nav状态 (li-step1   li-step2....)
    var setComplete = function(liClass){
        var _this = $(".left-nav .public-step").find("."+liClass);
            complete = _this.find(".icon-complete"),
            uncomplete = _this.find(".icon-add");

        complete.css("display",'inline-block');
        uncomplete.css('display','none');

    };

     var setAddStatus = function(liClass){
        var _this = $(".left-nav .public-step").find("."+liClass);
            complete = _this.find(".icon-complete"),
            uncomplete = _this.find(".icon-add");

        complete.css("display",'none');
        uncomplete.css('display','inline-block');

    };

    //图片列表hover
    pictureItem.live("mouseenter",function(){
        var _this = $(this);
        _this.find(".scale-wrapper").stop().animate({"bottom":0},100);
    }).live("mouseleave",function(){
        var _this = $(this);
        _this.find(".scale-wrapper").stop().animate({"bottom":"-30px"},100);
    });

    //点击下一步跳到下一步页面
    stepcontent.eq(0).show();
    nextStep.click(function(){
        var _this = $(this),
            nextPage = $(_this.attr("nextStep")),
            index = _this.parents(".content").index();

        nextPage.show();
        nextPage.siblings().hide();
        navLi.eq(index+1).addClass("current").siblings().removeClass("current");

    });

    navLi.click(function(){
         var _this = $(this),
            index = _this.index();

        _this.addClass("current").siblings().removeClass("current");
        stepcontent.hide();
        stepcontent.eq(index).show();

    });


    //图片描述
    var imgDescript = $(".picture-list .pic-desc"),
        tipsText = $(".picture-list .tips-text");
    imgDescript.live("focus",function(){
        var _this =$(this);
        _this.addClass("on");
        tipsText = _this.parent().find(".tips-text");
        tipsText.hide();
    });
    imgDescript.live("blur",function(){
        
        var _this =$(this);
        tipsText = _this.parent().find(".tips-text");
        if(_this.val() == ""){
            tipsText.show();
            _this.removeClass("on");
        }
    });
    tipsText.live("click",function(){
        var _this = $(this),
            textArea = _this.parent().find(".pic-desc");
        _this.hide();
        
        textArea.focus();
    });

    //数量加减
    var minus = $(".step3 .attr .minus"),
        add = $(".step3 .attr .add"),
        attrNum = $(".step3 .attr .attr-num input")

    minus.click(function(){
        var _this = $(this),
            num = _this.parent().find(".attr-num input"),
            count = parseInt(num.val());

        if(count > 0){
            num.val(count-1);
        }else{
            _this.addClass("disabled");
        }

    });
    add.click(function(){
        var _this = $(this),
            num = _this.parent().find(".attr-num input"),
            count = parseInt(num.val());
            num.attr("value",count+1);
            num.val(count+1);

            if(count+1 > 0){
               _this.parent().find(".minus").removeClass("disabled");
            }
       

    });

   //输入框字数控制
   var extraFree = $(".content .extra-free"),
       wordNum = $(".content .word-num");

    var textNum = function(inputBox){
        var the =$(inputBox),
            length = the.val().length,
            inputNum = the.parent().find(".input-num");
            totalNum = parseInt(the.parent().find(".totle-num").text());

            borderBox = the.hasClass("text-area")? the : the.parent();
            //达到数字限额 边框变红
            if(length >= totalNum){
                borderBox.css("border-color",'red');
            }else{
                borderBox[0].removeAttribute('style');
            } 
            inputNum.html(length);
        };

    //字数监控
    $(document).on("keyup",".house-title input",function(){
        textNum(".house-title input");
    });
    $(document).on("keydown",".house-title input",function(){
        textNum(".house-title input");
    });

     $(document).on("keyup",".addredss input",function(){
        textNum(".content .addredss input");
    });
    $(document).on("keydown",".content .addredss input",function(){
        textNum(".content .addredss input");
    });

    $(document).on("keyup",".content .extra-free",function(){
        textNum(".content .extra-free");
    });
    $(document).on("keydown",".content .extra-free",function(){
        textNum(".content .extra-free");
    });

    $(document).on("keyup",".content .addredss input",function(){
        textNum(".content .addredss input");
    });
    $(document).on("keydown",".content .addredss input",function(){
        textNum(".content .addredss input");
    });
     $(document).on("keyup",".content .house-detail-desc",function(){
        textNum(".content .house-detail-desc");
    });
    $(document).on("keydown",".content .house-detail-desc",function(){
        textNum(".content .house-detail-desc");
    });


    //设为封面
    var setCover = $(".step5 .scale-opt .scan-larger"),
        setCover2 = $(".step6 .scale-opt .scan-larger");
//     //周边环境设置封面
//     setCover.live("click",function(){
//         //显示选中状态
//         var _this = $(this),
//             cover = _this.parents(".img-opt").find(".cover"),
//             coverList = $(".step5 .img-opt .cover"),
//             setOPts = $(".step5 .img-opt .scale-wrapper"),
//             setOpt = _this.parents(".img-opt").find(".scale-wrapper");

//         coverList.stop().animate({top:'-110px'},200);
//         cover.stop().animate({top:0},200);

//         //设置按钮不显示
//         setOPts.removeClass("not-show");
//         setOpt.addClass("not-show");

//         setOpt.stop().animate({bottom:'-30px'},100);

//     });


//   $(".aa").click(function(){
//         var h = '<li><div class="img-opt"><img class="img-scan" src="temp/house1_img.jpg" alt="图片预览"><div class="scale-wrapper" style=""><div class="mask"></div><div class="scale-opt"><a href="javascript:void(0);" title="设为封面" class="scan-larger"> 设为封面 </a><i class="split">|</i><a href="javascript:void(0);" title="" class="del-photo">删除</a></div></div><div class="cover"><div class="mask"></div><i class="icon-cover"></i></div></div><textarea class="pic-desc" maxlength="200"></textarea><span class="tips-text">添加描述</span></li>';
//         var pa = $(".step6 .picture-list");
//         pa.append(h);
//         rentHouse.listloop({wrap: ".step6 .upload",loopBox: ".picture-list",triggerLeft: ".ctrl .pre",triggerRight: ".ctrl .next",step: {wide: 3,narrow: 3},scrollWidth: {wide: 639,narrow: 639},hasCount: true,hasLable: true,isLazyLoad: true,delay: 0});
// });
    //房源照片 tab设为封面
     setCover2.live("click",function(){
        //显示选中状态
        var _this = $(this),
            cover = _this.parents(".img-opt").find(".cover"),
            coverList2 = $(".step6 .img-opt .cover"),
            setOPts2 = $(".step6 .img-opt .scale-wrapper"),
            setOpt = _this.parents(".img-opt").find(".scale-wrapper");

        coverList2.stop().animate({top:'-110px'},200);
        cover.stop().animate({top:0},200);

        //设置按钮不显示
        setOPts2.removeClass("not-show");
        setOpt.addClass("not-show");

        setOpt.stop().animate({bottom:'-30px'},100);

    });


    // //判断输入框非空 数字  
    // var inputValidate = function(continer){
    //     var _this = continer,
    //         txt = _this.val(),
    //         length = txt.length,
    //         re2 =/^\d+(\.\d+)?$/,
    //         re = /(^[1-9]([0-9]*)$|^[0-9]$)/;  

    //     //输入框为空
    //     if(length <=0 ){
    //         return 1;//输入框为空
    //     }else if(re2.test(txt)){
    //         return 3;//数字格式(包含小数)
    //     }else if(re.test(txt)){
    //         return 2;//为数字格式(正整数)
    //     }else{
    //         return 0;
    //     }

    // };

    // var numInput = $(".num-format");
    // numInput.blur(function(){
    //     var _this = $(this);

    //     var result = inputValidate(_this),
    //         flag = _this.hasClass("not-decimals");

    //     if(result == 1 || result==0){
    //          _this.parent().css("border-color",'red');
    //     }else if(flag && result != 2){
    //          //样式变红
    //         _this.parent().css("border-color",'red');
    //     }else if(!flag && !(result == 3 || result ==2)){
    //         //样式变红
    //         _this.parent().css("border-color",'red');
    //     }else{
    //         _this.parent()[0].removeAttribute('style');
    //     }

    // });

};


//列表管理
localPlus.listManager = function(){
    var 
        trs = $(".house-list tr"),
        checkAll = $(".check-all"),
        subCheckboxs = $(".house-list").find("input[type='checkBox']");//subCheckboxs[0]为全选


    //表格隔行变色
    // for(var i = 0 ; i < trs.length; i++){
    //     if(i % 2 == 1){
    //         trs[i].style.background = "#f7f7f7";
    //     }
    // }

    //全选事件
    checkAll.live("click",function(){
        var checkAll = $(this); 
        if(this.checked){
            for(var i = 1; i < subCheckboxs.length; i++){
                subCheckboxs.attr("checked",true);
            }
        }else{
            for(var i = 1; i < subCheckboxs.length; i++){
                subCheckboxs.attr("checked",false);
            }
        }
    });

    //子复选框事件
    subCheckboxs.live("click",function(){
        var isCheckAll = true;
        for(var i = 1; i < subCheckboxs.length; i++){
            if(!subCheckboxs[i].checked){
                isCheckAll = false;
            }
        }
        checkAll.attr("checked",isCheckAll);
    });
        
};
// 房源预览
localPlus.preview = function(){
    var wrapper = $(".h-pictures"),
        picList = $(".h-pictures .s-pic-wrap ul"),
        aroundWrap = $(".h-around"),
        aroundList = $(".h-around .s-pic-wrap ul"),
        smallItem = $(".s-pic-wrap ul li");

    rentHouse.listloop({wrap: wrapper,loopBox: picList,triggerLeft: ".ctrl .pre",triggerRight: ".ctrl .next",step: {wide: 1,narrow: 1},scrollWidth: {wide: 212,narrow: 212},hasCount: false,isLoop:false,delay: 0});
    rentHouse.listloop({wrap: aroundWrap,loopBox: aroundList,triggerLeft: ".ctrl .pre",triggerRight: ".ctrl .next",step: {wide: 1,narrow: 1},scrollWidth: {wide: 212,narrow: 212},hasCount: false,isLoop:false,delay: 0});      
    
    

    //默认展示第一个
    showImg(picList.find("li").eq(0),100);
    showImg(aroundList.find("li").eq(0),100);

    
    //小图获取焦点
    smallItem.hover(function(){
        showImg(this,600);
    });
    //点击小图放大
    smallItem.unbind().click(function(){
        //展示大图
        showImg(this,100);      
    });
    function showImg(box,delay){
        var _this = $(box),
            largeWrap = _this.parents(".pic-show").find(".large-pic"),
            largeImg = largeWrap.find("img"),
            lagerSrc = _this.find("img").attr("largePic"),
            isCover = _this.find("img").attr("isCover"),
            liList = _this.parent().find("li");
            //设置小图封面icon
            liList.each(function(){
                var self = $(this),
                    is = self.find("img").attr("isCover");
                if(typeof(is)!="undefined" && is == "true"){
                    self.append("<div class='icon_cover'></div>");
                    return;
                }
            });
            setTimeout(function(){
                largeImg.attr("src",lagerSrc);
                _this.addClass("on").siblings().removeClass("on");

                //封面
                if(typeof(isCover)!="undefined" && isCover == "true"){  
                    largeWrap.addClass("is-cover");
                }else{
                    largeWrap.removeClass("is-cover");
                }
            },delay);
    };
  
    
};

//placeholder兼容
var JPlaceHolder = {
    //检查是否支持placeholder
    _check: function () {
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init: function () {
        if (!this._check()) {
            this.fix();
        }
    },
    //替换原生placeholder
    fix: function () {
        jQuery(':input[placeholder]').each(function (index, element) {
            var self = $(this),
                txt = self.attr('placeholder');
            self.next("[rel='placeholder']").remove();
            self.wrap($('<label></label>').css({ 'float': 'left', position: 'relative', zoom: '1', border: 'none', background: 'none', padding: 'none', margin: 'none' }));
            var pos = self.position(), 
                h = self.outerHeight(true), 
                paddingleft = self.css('padding-left');
            //获取当前元素的高度
            var lh =  parseInt(self.css('line-height')),
                iHeight = parseInt(self.css('height'));


            var holder = $('<i rel="placeholder" ></i>').text(txt).css({ position: 'absolute', whiteSpace: 'nowrap', left: pos.left>=12? pos.left:'12px', top: pos.top >= 2 ? pos.top : "2px", height: iHeight >= 0? iHeight+'px' : '20px', lineHeight: lh >=20? lh+'px' : '20px', paddingLeft: paddingleft, color: '#aaa',fontSize:"14px" }).appendTo(self.parent());
            if (self.val() != '') {
                holder.hide();
        }
        });
        $(document).on('focusin', ':input[placeholder]', function () {
            var self = $(this);
            self.next('i').hide();
        });
        $(document).on('focusout', ':input[placeholder]', function () {
            var self = $(this);
            if (!self.val()) {
                self.next('i').show();
        }
        });
        $(document).on('click', 'i[rel="placeholder"]', function () {
            var holder = $(this);
            holder.hide();
            holder.prev(':input[placeholder]').focus();
        });
    }
};

//页面加载
$(function(){

    //placeholder兼容
    JPlaceHolder.init();
    //banner
	localPlus.banner();
    //弹窗
	localPlus.dialog();
    //注册激活页面
    localPlus.activate();
    //发布
    localPlus.optStep();
    //列表管理
    localPlus.listManager();
    //房源信息预览
    localPlus.preview();

    
});