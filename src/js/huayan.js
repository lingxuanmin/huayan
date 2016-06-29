var huayan = huayan || {};
//首页
huayan.firstScreen = function(){
	//小图列表
	var smallList = $(".small-pic-list li"),
		largeWrap = $(".big-pic"),
		hasnoText = largeWrap.find(".has-not"),
		largeImg = largeWrap.find("img"),
		tab = $(".small-pic-tab li"),
		tabContent = $(".small-list-wrap .tab");

	//tab切换
	tab.live("click",function(){
		var _this = $(this),
			index = _this.index();
		_this.addClass("current").siblings().removeClass("current");
		tabContent.eq(index).fadeIn().siblings().fadeOut();
	});
	tab.hover(function(){
		var _this = $(this);
		_this.addClass("hover").siblings().removeClass("current");
	},function(){
		var _this = $(this);
		_this.removeClass("hover");
	});

	//大图旋转
	$(".r").click(function(){
		var bigPic = $(".big-img");
		bigPic.rotateLeft();
	});

	//小图列表操作
	smallList.hover(function(){
		var _this = $(this);
		_this.addClass("hover").siblings().removeClass("hover");
	},function(){
		var _this = $(this);
		_this.removeClass("hover");
	});

	smallList.live("click",function(){
		//获取小图的大图路径
		var self = $(this),
			largeSrc = self.find("img").attr("large-src");
		self.addClass("on").siblings().removeClass("on");
		if(largeSrc){
			//显示大图
			largeImg.attr("src",largeSrc).show();
			hasnoText.hide();
		}else{
			hasnoText.show();
			largeImg.hide();
		}
	});

	//小图标自定义右键菜单
	 var data =[
    [{
        text: "换架",
        data: [[{
            text: "5像素深蓝",
            func: function() {
               
            }
        }, {
            text: "5像素浅蓝",
            func: function() {
              
            }
        }, {
            text: "5像素淡蓝",
            func: function() {
               
            }
        }]]
    }, {
        text: "刷新",
        func: function() {
          
            alert("刷新");
        }
    }, {
        text: "全部刷新",
        func: function() {
            alert("刷新");
        }
    }],
    [{
        text: "删除项",
        func: function() {
           alert("刷新");  
        }
    }],
     [{
        text: "作废项",
        func: function() {
           alert("刷新");
        }
    }],
     [{
        text: "保存并删除当前项",
        func: function() {
           alert("刷新"); 
        }
    }]
];
    // smallList.smartMenu(data, { name: "image" });

};

// 系统参数设置
huayan.systemSet = function(){
	var navList = $(".nav-list ul li"),
		detailList = $(".nav-content-wrap .set-detail");

	navList.live("click",function(){
		var _this = $(this),
			index = _this.index();
		_this.addClass("on").siblings().removeClass("on");
		detailList.eq(index).show().siblings().hide();
	});
};


 
//iframe弹出框
huayan.dialog = function(){
	var sysSetBtn = $(".sys-sets"),
		recordBtn = $(".help"),
		modifyBtn = $(".quit");//$(".modify-data");
	//系统设置
	sysSetBtn.live("click",function(){
		$.tingToast.open('/dataCollect/1.0/src/systemSet.html', {
                title: '系统设置',
                width: '900px',
                height: '700px'
            });
            return;
	});

	//修改数据
	modifyBtn.live("click",function(){
		$.tingToast.open('/dataCollect/1.0/src/modifyData.html', {
                title: '修改数据',
                width: '800px',
                height: '700px'
            });
            return;
	});

	//出料明细
	recordBtn.live("click",function(){
		$.tingToast.open('/dataCollect/1.0/src/recordList.html', {
                title: '当前生产领出的荒料的明细',
                width: '800px',
                height: '700px'
            });
            return;
	});
};

//图片浏览
huayan.picSkim = function(){
	var resultItems = $(".result-file li"),
		picShowList = $(".skim-result .skim-item");
	//展示第一项
	resultItems.eq(0).addClass("on").siblings().removeClass("on");
	picShowList.eq(0).show().siblings().hide();

	resultItems.hover(function(){
		var _this = $(this);
		_this.addClass("hover").siblings().removeClass("hover");

	},function(){
		var _this = $(this);
		_this.removeClass("hover");
	});

	resultItems.live("click",function(){
		var _this = $(this),
			index = _this.index();

		//展示详细的图片
		picShowList.eq(index).show().siblings().hide();
		_this.addClass("on").siblings().removeClass("on");

	});
};

//加载完成执行
$(function(){
	huayan.dialog();
	huayan.firstScreen();
	huayan.systemSet();
	huayan.picSkim();

});
