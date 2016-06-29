var sDialogPlugin;

sDialogPlugin = sDialogPlugin || (function ($, window, document) {
	'use strict';
	$.sDialog = function (opt) {
		//默认参数
		var oDefaults = {
			//弹框的宽度和高度
			css: {
				width: 450,
				border: "1px solid #ccc",
				padding: 5,
				background: "#fff",
				borderRadius: 5
			},
			//弹框的内容
			message: "",
			//是否需要标题
			titleNeed: true,
			//弹框的标题
			title: "温情提示",
			titleCss: {
				background: "#fff",
				isRem: false
			},
			//遮罩层样式
			overLayerCss: {
				background: "#000",
				opacity: 0.3
			},
			//遮罩层是否存在
			overLayer: true,
			//点击遮罩层是否关闭弹框
			layerClick: false,
			//弹框关闭之后的回调
			closeFn: "",
			//弹框出现之后的回调
			openFn: "",
			//延迟关闭时间
			setTime: "",
			//是否可拖拽
			draggable: false,
			//展示效果["fade", "faller"],默认为"fade"
			show: "fade"
		};
		//弹框样式是否存在的标示
		var flag = false;
		//参数继承
		var oOption = $.extend(true, {}, oDefaults, opt);
		//弹框dom
		var html = '<div class="n-dialog">' +
        				'<h1 class="n-dialog-title">' +
            				'<a class="n-close" href="javascript:void(0);"></a>' +
            				'<span></span>' +
        				'</h1>' +
        				'<div class="n-dialog-content"></div>' +
    			   '</div>' + 
    			   '<!--[if IE 6]><iframe class="n-iframe"></iframe><![endif]-->'
    			   ;
    	//样式
    	var style = '<style rel="stylesheet">' +
    					'body{_background: url(about:blank) fixed;}' +
					    '.n-dialog {position: fixed;display:none;left: 50%;top: 50%;z-index:8001;overflow:hidden;}' +
					    '.n-overlayer{ position:absolute;left:0;top:0;display:none;z-index:8000}';
    	if (oOption.titleCss.isRem) {
    		style = style +
    				'.n-dialog-title{position:relative;width:100%;height:1.1875rem;}' +
    				'.n-dialog-title .n-close{position:absolute;top:50%;right:0.3125rem;width:0.5625rem;height:0.5625rem;margin-top:-0.28125rem;background:url(css/images/n_close.png) no-repeat;background-size:0.5625rem 0.5625rem;}' + 
    				'.n-dialog-title span {font-family:"Microsoft Yahei";font-weight:bold;font-size:0.4375rem;line-height:1.1875rem;}' +
    				'</style>';
    	} else {
    		style = style +
    				'.n-dialog-title{position:relative;width:100%;height:38px;}' +
    				'.n-dialog-title .n-close{position:absolute;top:50%;right:10px;width:18px;height:18px;margin-top:-9px;background:url(css/images/n_close.png) no-repeat;transition: all ease .5s;}' +
    				'.n-dialog-title .n-close:hover{transform:rotate(180deg);}' +
    				'.n-dialog-title span{margin-left:10px;font:bold 14px/38px "Microsoft Yahei";}' +
    				'</style>';
    	}
    	//遮罩层dom
    	var layer = '<div class="n-overlayer"></div';
    	//取弹框内容
    	var sContent = $(oOption.message);
    	//变量申明
    	var sDialog,sLayer;
    	//初始化私有方法
    	var _init = function () {
    		//dom初始化
    		_fnDomInit();
    		//css初始化
    		_fnCssInit();
    		//弹框出现
    		_fnDiaShow();
    		//事件绑定
    		_fnEventBind();
    	};
    	//dom初始化方法
    	var _fnDomInit = function () {
    		//样式不存在则添加样式
    		if (!flag) {
	    		$(style).appendTo($("head"));
	    		flag = true;
	    	}
	    	//插入弹框
	    	$(html).appendTo($("body"));
	    	//判断遮罩是否存在
	    	if (oOption.overLayer) {
	    		$(layer).appendTo($("body"));
	    	}
	    	//插入弹框内容
	    	$(sContent).appendTo($(".n-dialog-content"));
	    	sDialog = $(".n-dialog");
	    	if ($(".n-overlayer").length > 0) {
	    		sLayer = $(".n-overlayer");
	    	}
	    	if (oOption.titleNeed) {
	    		//替换标题
	    		sDialog.find(".n-dialog-title span").text(oOption.title);
	    	} else {
	    		sDialog.find(".n-dialog-title").remove();
	    	}
    	};
    	//css初始化方法
    	var _fnCssInit = function () {
    		//弹框样式
    		sDialog.css({
	    		width: oOption.css.width,
	    		padding: oOption.css.padding,
	    		border: oOption.css.border,
	    		background: oOption.css.background,
	    		borderRadius: oOption.css.borderRadius
	    	});
	    	if (oOption.titleNeed) {
	    		sDialog.find(".n-dialog-title").css({
	    			background: oOption.titleCss.background
	    		});
	    	}
	    	if (oOption.css.border == "none") {
	    		sDialog.css({
		    		marginLeft: -(sDialog.width() + parseInt(sDialog.css("paddingLeft"))*2)/2,
		    		marginTop: -(sDialog.height() + parseInt(sDialog.css("paddingLeft"))*2)/2
	    		});
	    	} else {
		    	sDialog.css({
		    		marginLeft: -(sDialog.width() + parseInt(sDialog.css("paddingLeft"))*2 + parseInt(sDialog.css("borderLeftWidth"))*2)/2,
		    		marginTop: -(sDialog.height() + parseInt(sDialog.css("paddingLeft"))*2 + parseInt(sDialog.css("borderLeftWidth"))*2)/2
		    	});
	    	}
	    	//遮罩存在则改变遮罩样式
	    	if (oOption.overLayer) {
	    		sLayer.css({
	    			background: oOption.overLayerCss.background
	    		})
	    	}
	    	//如果为ie6
	    	if (/MSIE 6.0/.test(navigator.userAgent)) {
	    		sDialog.css({
	    			position: "absolute"
	    		});
	    		$(".n-iframe").css({
	    			position: "absolute",
	    			left: 0,
	    			top: 0,
	    			background: '#fff',
	    			zIndex: 7999,
	    			opacity: 0,
	    			filter: "alpha(opacity=0)"
	    		});
	    	}
	    	//遮罩大小调整
    		_fnResize();
    	};
    	//弹框出现方法
    	var _fnDiaShow = function () {
    		var _oShowFactory = {
    			fade: function () {
		    		//遮罩存在
		    		if (oOption.overLayer) {
			    		sLayer.css({
				    		opacity: 0
				    	}).show().stop().animate({
				    		opacity: oOption.overLayerCss.opacity
				    	}, 300, function () {
				    		sDialog.css({
					    		opacity: 0
					    	}).show().stop().animate({
					    		opacity: 1
					    	}, 300, function () {
					    		oOption.openFn && oOption.openFn();
					    	});
				    	});
				    //遮罩不存在
			    	} else {
			    		sDialog.css({
				    		opacity: 0
				    	}).show().stop().animate({
				    		opacity: 1
				    	}, 300, function () {
				    		oOption.openFn && oOption.openFn();
				    	});
			    	}
				},
				faller: function () {
					var _nStartMt = parseInt(sDialog.css("marginTop"));
					if (oOption.overLayer) {
						sLayer.css({
				    		opacity: 0
				    	}).show().stop().animate({
				    		opacity: oOption.overLayerCss.opacity
				    	}, 300, function () {
				    		sDialog.css({
					    		opacity: 0,
					    		marginTop: _nStartMt - sDialog.height()
					    	}).show().stop().animate({
					    		opacity: 1,
					    		marginTop: _nStartMt
					    	}, 300, function () {
					    		oOption.openFn && oOption.openFn();
					    	});
				    	});
					} else {
						sDialog.css({
				    		opacity: 0,
				    		marginTop: _nStartMt - sDialog.height()
				    	}).show().stop().animate({
				    		opacity: 1,
				    		marginTop: _nStartMt
				    	}, 300, function () {
				    		oOption.openFn && oOption.openFn();
				    	});
					}
				}
    		};
    		_oShowFactory[oOption.show]();
    		
    	};
    	//事件绑定方法
    	var _fnEventBind = function () {
    		//遮罩是否存在
    		if (oOption.overLayer) {
    			//点击遮罩是否关闭弹框
	    		if (oOption.layerClick) {
	    			$(document).on("click", ".n-overlayer", function () {
	    				_fnCloseDialog();
	    			});
	    		}
    		}
    		//需要关闭弹框，加n-close
    		$(document).on("click", ".n-close", function () {
    			_fnCloseDialog();
    		});
    		//浏览器大小变化调整遮罩大小
    		$(window).resize(function () {
    			_fnResize();
    			if (oOption.css.border == "none") {
		    		sDialog.css({
			    		marginLeft: -(sDialog.width() + parseInt(sDialog.css("paddingLeft"))*2)/2,
			    		marginTop: -(sDialog.height() + parseInt(sDialog.css("paddingLeft"))*2)/2
		    		});
		    	} else {
			    	sDialog.css({
			    		marginLeft: -(sDialog.width() + parseInt(sDialog.css("paddingLeft"))*2 + parseInt(sDialog.css("borderLeftWidth"))*2)/2,
			    		marginTop: -(sDialog.height() + parseInt(sDialog.css("paddingLeft"))*2 + parseInt(sDialog.css("borderLeftWidth"))*2)/2
			    	});
		    	}
    		});
    		//浏览器滚动调整弹框大小
    		$(window).scroll(function () {
    			//ie6实现fied效果
    			if (/MSIE 6.0/.test(navigator.userAgent)) {
    				if (oOption.css.border == "none") {
    					sDialog.css({
							marginTop:$(window).scrollTop()-(sDialog.height()+ parseInt(sDialog.css("paddingLeft"))*2)/2
						});
    				} else {
    					sDialog.css({
							marginTop:$(window).scrollTop()-(sDialog.height()+ parseInt(sDialog.css("paddingLeft"))*2 + parseInt(sDialog.css("borderLeftWidth"))*2)/2
						});
    				}
    			}
    		});
    		//如果可拖拽
    		if (oOption.draggable) {
    			//标记是否在拖拽
    			var move = false;
    			//初始x轴，y轴
				var _x, _y;
				//鼠标点击
    			sDialog.mousedown(function (e) {
    				var _this = $(this);
    				//改变弹框样式
    				_this.css({
						left: _this.offset().left,
						top: _this.offset().top,
						marginLeft: 0,
						marginTop: 0
					});
					//标记为正在拖动
					move = true;
					//获取起始点坐标
    				_x = e.pageX - parseInt(_this.offset().left); 
					_y = e.pageY - parseInt(_this.offset().top);
					$(document).mousemove(function (e) {
	    				if (move) { 
	    					//获取目标点坐标
							var x = e.pageX - _x;
							var y = e.pageY - _y;
						} 
						//样式替换
						_this.css({
		    				left: x,
		    				top: y
		    			});
	    			});
	    		//结束拖拽
    			}).mouseup(function () { 
					move = false; 
				}); 
    		}
    		//如果需要设置延迟关闭时间，则设置延迟关闭
    		if (oOption.setTime !== "" ) {
				setTimeout(function () {
					_fnCloseDialog();
				}, oOption.setTime);
			}
    	}
    	//遮罩层大小调整方法
    	var _fnResize = function () {
    		//文档高度
    		var bodyHeight = document.body.offsetHeight ;
    		//浏览器高度
    		var screenHeight = window.screen.availHeight;
    		var sLayerHeight;
    		//取最大值
    		bodyHeight > screenHeight ? sLayerHeight = bodyHeight : sLayerHeight = screenHeight;
    		if (oOption.overLayer) {
	    		//样式替换
	    		sLayer.css({
					width: document.body.scrollWidth,
					height: sLayerHeight
				});
				bodyHeight = null;
				screenHeight = null;
				sLayerHeight = null;
    		}
    		if (/MSIE 6.0/.test(navigator.userAgent)) {
    			$(".n-iframe").css({
	    			width: document.body.scrollWidth,
	    			height: sLayerHeight
	    		});
	    		bodyHeight = null;
				screenHeight = null;
				sLayerHeight = null;
    		}
    	}
    	//弹框关闭方法
    	var _fnCloseDialog = function () {
    		var _oCloseFactory = {
    			fade: function () {
    				//遮罩层存在
		    		if (oOption.overLayer) {
			    		sDialog.stop().animate({
							opacity: 0
						}, 200, function () {
							sDialog.remove();
							sLayer.animate({
								opacity: 0
							}, 200, function () {
								sLayer.remove();
								if ($(".n-iframe").length > 0) {
									$(".n-iframe").remove();
								}
								oOption.closeFn && oOption.closeFn();
							});
						});
					//遮罩层不存在
		    		} else {
		    			sDialog.stop().animate({
							opacity: 0
						}, 200, function () {
							sDialog.remove();
							if ($(".n-iframe").length > 0) {
								$(".n-iframe").remove();
							}
							oOption.closeFn && oOption.closeFn();
						});
		    		}
    			},
    			faller: function () {
    				var _nStartMt = parseInt(sDialog.css("marginTop"));
    				if (oOption.overLayer) {
			    		sDialog.stop().animate({
			    			marginTop: _nStartMt - sDialog.height(),
							opacity: 0
						}, 200, function () {
							sDialog.remove();
							sLayer.animate({
								opacity: 0
							}, 200, function () {
								sLayer.remove();
								if ($(".n-iframe").length > 0) {
									$(".n-iframe").remove();
								}
								oOption.closeFn && oOption.closeFn();
							});
						});
					//遮罩层不存在
		    		} else {
		    			sDialog.stop().animate({
		    				marginTop: _nStartMt - sDialog.height(),
							opacity: 0
						}, 200, function () {
							sDialog.remove();
							if ($(".n-iframe").length > 0) {
								$(".n-iframe").remove();
							}
							oOption.closeFn && oOption.closeFn();
						});
		    		}
    			}
    		};
    		_oCloseFactory[oOption.show]();
    	}; 	
    	//初始化
    	_init();
	};
}) ($, window, document);
