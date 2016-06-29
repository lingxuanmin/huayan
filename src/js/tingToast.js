(function($, undefined) {
    var _top, _topDialog, _proxyDialog, _count = 0, 
    _$window = $(window), 
    _$document = $(document), 
    _$html = $('html'), 
    _elem = document.documentElement, 
    _isIE6 = window.VBArray && !window.XMLHttpRequest, 
    _expando = function() {
        return 'weiqingting_' + new Date;
    }
    var tingToast = function(config, ok, cancel) {
        //合并参数
        config = config || {};
        if (typeof config === 'string') {
            config = {content: config};
        }
        ;
        var opts = $.extend({}, tingToast.defaults, config);
        opts.id = opts.id || _expando() + _count;
        var api = tingToast.list[opts.id];
        // 如果存在同名的对话框对象，则直接返回
        if (api)
            return api.zIndex().focus();
        // 按钮组
        if (!$.isArray(opts.button)) {
            opts.button = [];
        }
        if (cancel !== undefined) {
            opts.cancel = cancel;
        }
        if (opts.cancel) {
            opts.button.push({
                id: 'cancel',
                value: opts.cancelValue,
                callback: opts.cancel
            });
        }
        if (ok !== undefined) {
            opts.ok = ok;
        }
        if (opts.ok) {
            opts.button.push({
                id: 'ok',
                value: opts.okValue,
                callback: opts.ok,
                autofocus: true
            });
        }
        _count++;
        return tingToast.list[opts.id] = new tingToast.fn._init(opts);
    };
    tingToast.fn = tingToast.prototype = {
        closed: true,
        _init: function(options) {
            var g = this;
            g.options = options;
            var p = g.options;
            g.options = p;
            g.closed = false;
            //生成Html对象
            g.Dom = g.Dom || g._getDom();
            g.button(p.button).title(p.title).content(p.content, true)
            .size(p.width, p.height)
            .time(p.time);
            g.zIndex().focus();
            g.Dom.close[g.options.show === false ? 'hide' : 'show']()
            .attr('title', p.cancelValue)
            .on('click', function(event) {
                g._trigger('cancel');
                event.preventDefault();
            });
            g.Dom.small[g.options.small === false ? 'hide' : 'show']()
            .on('click', function(event) {
                //g._trigger('small');
                g.small();
                event.preventDefault();
            });
            //....
            g.show();
            // 按钮组点击
            g.Dom.wrap.on('click', '[data-id]', function(event) {
                var $this = $(this);
                if (!$this.attr('disabled')) { // IE BUG
                    g._trigger($this.data('id'));
                }
                event.preventDefault();
            });
            p.init && p.init(g);
            return this;
        },
        lock: function() {
            var g = this;
            var p = this.options;
            var backdropCss = {
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                userSelect: 'none',
                opacity: 0,
                background: "#FFF"
            };
            g.Dom.wrap.addClass(p.className + '-modal');
            // 避免遮罩不能盖住上一次的对话框
            // 如果当前对话框是上一个对话框创建，点击的那一瞬间它会增长 zIndex 值
            p.zIndex = p.zIndex + 2;
            g.zIndex();
            
            var _isIE6 = !('minWidth' in $('html')[0].style);
            var _isFixed = !_isIE6;
            if (!_isFixed) {
                $.extend(backdropCss, {
                    position: 'absolute',
                    width: $(window).width() + 'px',
                    height: $(document).height() + 'px'
                });
            }
            g.Dom.backdrop
            .css(backdropCss)
            //.animate({ opacity: 0.5 }, 50)
            .insertAfter(g.Dom.wrap)
            // 锁住模态对话框的 tab 简单办法
            // 甚至可以避免焦点落入对话框外的 iframe 中
            .attr({tabindex: '0'})
            .on('focus', function() {
                g.focus();
            });
        },
        focus: function() {
            var g = this;
            var p = this.options;
            var current = tingToast.focus;
            if (current && current !== this) {
            //current.blur(false);
            }
            // 检查焦点是否在浮层里面
            if (!$.contains(g.Dom, g.__getActive())) {
                var autofocus = g.Dom.wrap.find('[autofocus]')[0];
                
                if (!g._autofocus && autofocus) {
                    g._autofocus = true;
                } else {
                    autofocus = g.Dom.wrap;
                }
                g.__focus(autofocus);
            }
            
            tingToast.focus = this;
            g.Dom.wrap.addClass(p.className + '-focus');
            g.zIndex();
            return g;
        },
        zIndex: function() {
            var g = this;
            var p = this.options;
            var index = p.zIndex++;
            g.Dom.wrap.css('zIndex', index);
            g.Dom.backdrop.css('zIndex', index - 1);
            p.zIndex = index;
            return g;
        },
        content: function(html) {
            var g = this;
            var p = this.options;
            g.Dom.content.empty('')[typeof html === 'object' ? 'append' : 'html'](html);
            g.reset();
            return this;
        },
        size: function(width, height) {
            var g = this;
            var p = this.options;
            g.Dom.content.css('width', width);
            g.Dom.content.css('height', height);
            g.reset();
            return this;
        },
        time: function(second) {
            var g = this;
            var p = this.options;
            var cancel = p.cancelValue, 
            timer = g._timer;
            timer && clearTimeout(timer);
            if (second) {
                g._timer = setTimeout(function() {
                    g._click(cancel);
                }, 1000 * second);
            }
            ;
            return g;
        },
        title: function(text) {
            var g = this;
            var p = this.options;
            g.Dom.title.html(text);
            g.Dom.header[text ? 'show' : 'hide']();
            return this;
        },
        reset: function() {
            var g = this;
            var p = this.options;
            g._center();
        },
        hide: function() {
            var g = this;
            var p = this.options;
            g.Dom.wrap.hide().removeClass(p.className + '-show');
            //!arguments[0] && g._lockMaskWrap && g._lockMaskWrap.hide();
            return this;
        },
        show: function() {
            var g = this;
            p = this.options;
            if (g.destroyed) {
                return this;
            }
            g.Dom.wrap
            .attr('role', 'dialog')
            .css('position', 'absolute')
            .show();
            g.Dom.wrap
            .addClass(p.className + '-show');
            g.Dom.backdrop.hide();
            g.lock();
            g.Dom.backdrop.show();
            g.open = true;
            return this;
        },
        close: function(result) {
            var g = this;
            p = this.options;
            if (!g.destroyed && g.open) {
                if (result !== undefined) {
                    g.returnValue = result;
                }
                function IsIE() {
                    if (window.addEventListener) {
                        return false;
                    } else if (window.attachEvent) {
                        return true;
                    } else {
                        return false;
                    }
                }
                if (IsIE()) {
                    g.Dom.wrap.hide().removeClass(p.className + '-show');
                    g.Dom.backdrop.hide();
                    g.remove();
                    g.open = false;
                    return g;
                    alert("");
                }
                var _from = {
                    '-webkit-transform': 'rotate(-1800deg)',
                    'opacity': 1,
                    width: g.Dom.wrap.width() / 2,
                    height: g.Dom.wrap.height() / 2
                };
                var _to = {
                    '-webkit-transform': 'rotate(-1800deg)',
                    'opacity': 0
                };
                var obj = g.Dom.wrap;
                obj.deg = 1800;
                obj.scale = 1;
                obj.opacity = 1;
                obj.key = 1;
                
                function Rotate() {
                    var oTarget = {
                        x: $(window).width(),
                        y: 0
                    }
                    clearInterval(obj.timer);
                    obj.timer = setInterval(function() 
                    {
                        doMove(obj, oTarget)
                    }, 40)
                }
                function doMove(obj, oTarget) {
                    
                    obj.key = obj.key / 25;
                    var iD = obj.deg + 360 * (1 - obj.key);
                    var iS = obj.scale / 2 <= 0 ? 0 : obj.scale / 2;
                    var iO = obj.opacity / 1.3 <= 0 ? 0 : obj.opacity / 1.3;
                    var iX = (oTarget.x - (obj.offset().left + obj.width() / 2)) / 5;
                    var iY = (oTarget.y - (obj.offset().top + obj.height() / 2)) / 5;
                    
                    iX = iX > 0 ? Math.ceil(iX) : Math.floor(iX);
                    iY = iY > 0 ? Math.ceil(iY) : Math.floor(iY);
                    iD = iD > 0 ? Math.ceil(iD) : Math.floor(iD);
                    if ((oTarget.x <= obj.offset().left && oTarget.y <= obj.offset().top) || obj.offset().top < 0) 
                    {
                        clearInterval(obj.timer);
                        g.Dom.wrap.hide().removeClass(p.className + '-show');
                        g.Dom.backdrop.hide();
                        g.remove();
                    } 
                    else 
                    {
                        obj.css({
                            top: obj.offset().top + iY,
                            left: obj.offset().left + iX,
                            opacity: iO,
                            '-webkit-transform': 'rotate(' + iD + 'deg) scale(' + iS + ')',
                            '-moz-transform': 'rotate(' + iD + 'deg) scale(' + iS + ')',
                            '-o-transform': 'rotate(' + iD + 'deg) scale(' + iS + ')',
                            '-ms-transform': 'rotate(' + iD + 'deg) scale(' + iS + ')',
                            'transform': 'rotate(' + iD + 'deg) scale(' + iS + ')'
                        });
                        obj.deg = iD;
                        obj.scale = iS;
                        obj.opacity = iO;
                    }
                }
                Rotate();
                
                g.open = false;
            //this.blur();
            //this.__dispatchEvent('close');
            }
            
            return g;
        },
        small: function() {
            var g = this;
            p = this.options;
            g.close();
            var _b = false;
            $("span", "#footer").each(function() {
                if ($(this).attr("toastid") == p.id) {
                    _b = true;
                }
            });
            if (!_b) {
                var _wrap = $("<span>");
                _wrap.attr("toastid", p.id).addClass("dock").html(p.title);
                $("#footer").append(_wrap);
                $("span", "#footer").click(function() {
                    var toastid = $(this).attr("toastid");
                    var a = $.tingToast.list[toastid];
                    a.show();
                });
            }
        },
        remove: function() {
            var g = this;
            p = this.options;
            if (g.destroyed) {
                return g;
            }
            if (g.current === this)
                g.current = null;
            g.Dom.wrap.remove();
            g.Dom.backdrop.remove();
            for (var i in this) {
                delete this[i];
            }
            return this;
        },
        button: function() {
            var g = this;
            p = this.options;
            var html = '';
            g.callbacks = {};
            g.Dom.footer[p.button.length ? 'show' : 'hide']();
            var args = p.button;
            if (typeof args === 'string') {
                html = args;
            } else {
                $.each(args, function(i, val) {
                    val.id = val.id || val.value;
                    g.callbacks[val.id] = val.callback;
                    html += 
                    '<button' 
                    + ' type="button"' 
                    + ' data-id="' + val.id + '"' 
                    + (val.disabled ? ' disabled' : '') 
                    + (val.autofocus ? ' autofocus class="ui-dialog-autofocus"' : '') 
                    + '>' 
                    + val.value 
                    + '</button>';
                });
            }
            if ($.trim(html) == "")
                g.Dom.button.hide();
            else
                g.Dom.button.html(html).show();
            return this;
        },
        _getDom: function() {
            var g = this;
            p = this.options;
            var wrap = $('<div />')
            .attr({
                tabindex: '-1'
            })
            .css({
                display: 'none',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 'auto',
                right: 'auto',
                margin: 0,
                padding: 0,
                outline: 0,
                border: '0 none',
                background: 'transparent'
            })
            .html(tingToast.defaults.innerHTML)
            .appendTo('body');
            var backdrop = $('<div />');
            var name, i = 0, 
            DOM = {wrap: $(wrap),backdrop: backdrop}, 
            els = wrap[0].getElementsByTagName('*'), 
            elsLen = els.length;
            for (; i < elsLen; i++) {
                if (els[i].className.indexOf('ui-dialog-') > -1) {
                    name = els[i].className.split('ui-dialog-')[1];
                    if (name)
                        DOM[name] = $(els[i]);
                }
            }
            ;
            g.destroyed = false;
            return DOM;
        },
        _click: function(name) {
            var that = this, 
            fn = that._listeners[name] && that._listeners[name].callback;
            return typeof fn !== 'function' || fn.call(that, window) !== false ? 
            that.close() : that;
        },
        _center: function() {
            var g = this;
            var p = this.options;
            var $window = $(window);
            var $document = $(document);
            var fixed = this.fixed;
            var dl = fixed ? 0 : $document.scrollLeft();
            var dt = fixed ? 0 : $document.scrollTop();
            var ww = $window.width();
            var wh = $window.height();
            var ow = g.Dom.wrap.width();
            var oh = g.Dom.wrap.height();
            var left = (ww - ow) / 2 + dl;
            var top = (wh - oh) * 382 / 1000 + dt; // 黄金比例
            var style = g.Dom.wrap[0].style;
            style.left = Math.max(parseInt(left), dl) + 'px';
            style.top = Math.max(parseInt(top), dt) + 'px';
        //  g.Dom.wrap.removeClass(this.__followSkin);
        },
        __getActive: function() {
            try { // try: ie8~9, iframe #26
                var activeElement = document.activeElement;
                var contentDocument = activeElement.contentDocument;
                var elem = contentDocument && contentDocument.activeElement || activeElement;
                return elem;
            } catch (e) {
            }
        },
        __focus: function(elem) {
            // 防止 iframe 跨域无权限报错
            // 防止 IE 不可见元素报错
            try {
                elem.focus();
            } catch (e) {
            }
        },
        _addEvent: function() {
            var g = this;
            var p = this.options;
            var resizeTimer;
            g._winResize = function() {
                resizeTimer && clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                // g._reset(isIE);
                }, 40);
            };
            _$window.bind('resize', g._winResize);
            g.Dom.wrap
            .bind('click', function(event) {
                var target = event.target, callbackID;
                if (target.disabled)
                    return false; // IE BUG
                if (target === g.Dom.close[0]) {
                    g._click(p.cancelValue);
                    return false;
                } else {
                    callbackID = target[_expando() + 'callback'];
                    callbackID && g._click(callbackID);
                }
                ;
            //that._ie6SelectFix();
            })
            .bind('mousedown', function() {
                g.zIndex();
            });
        },
        _trigger: function(id) {
            var fn = this.callbacks[id];
            return typeof fn !== 'function' || fn.call(this) !== false ? 
            this.close() : this;
        //this.close().remove() : this;
        },
        current: null,destroyed: true
    }, 
    tingToast.open = function(url, options) {
        var g = this;
        var p = this.options;
        options = options || {};
        options.id = options.id || ("iframe" + _count)
        var $iframe = $('<iframe />')
        .attr({
            src: url,
            name: options.id,
            width: '100%',
            height: '100%',
            allowtransparency: 'yes',
            frameborder: 'no',
            scrolling: 'no'
        }).on('load', function() {
        
        });
        var config = {
            init: function(api) {
                api.Dom.content.append($iframe);
                var loading = api.Dom.content.find(".ui-dialog-loading");
                loading && loading.hide();
            },
            close: function() {
                alert("关闭");
            }
        }
        $.extend(config, options);
        return g.through(config);
    }, 
    tingToast.top = function() {
        var top = window, 
        test = function(name) {
            try {
                var doc = window[name].document; // 跨域|无权限
                doc.getElementsByTagName; // chrome 本地安全限制
            } catch (e) {
                return false;
            }
            ;
            return window[name].tingToast 
            // 框架集无法显示第三方元素
            && doc.getElementsByTagName('frameset').length === 0;
        };
        
        if (test('top')) {
            top = window.top;
        } else if (test('parent')) {
            top = window.parent;
        }
        ;
        
        return top;
    }, 
    
    
    tingToast.through = function() {
        var g = this;
        var p = this.options;
        g.frameinit();
        var api = _topDialog.apply(this, arguments);
        api.show();
        if (_top !== window)
            tingToast.list[api.options.id] = api;
        return api;
    }, 
    tingToast.frameinit = function() {
        var g = this;
        var p = this.options;
        _top = g.top();
        _topDialog = _top.tingToast;
    }, 
    tingToast.alert = function(content, callback) {
        var g = this;
        var p = this.options;
        return g.through({
            id: 'Alert' + _expando(),
            icon: 'warning',
            lock: true,
            content: content,
            ok: true,
            close: callback
        });
    }, 
    tingToast.confirm = function(content, yes, no) {
        var g = this;
        var p = this.options;
        return g.through({
            id: 'Confirm' + _expando(),
            icon: 'question',
            lock: true,
            opacity: .1,
            content: content,
            ok: function(here) {
                return yes.call(this, here);
            },
            cancel: function(here) {
                return no && no.call(this, here);
            }
        });
    };
    
    tingToast.focus = null;
    tingToast.list = {};
    tingToast.fn._init.prototype = tingToast.fn;
    $.fn.tingToast = function() {
        var config = arguments;
        this[this.live ? 'live' : 'bind']('click', function() {
            tingToast.apply(this, config);
            return false;
        });
        return this;
    }
    tingToast.defaults = {
        init: null,
        lock: true,
        show: true,
        small: false,
        time: null,
        className: 'ui-popup',
        zIndex: 1024,
        content: '<span class="ui-dialog-loading">Loading..</span>',
        title: '标题',
        statusbar: '',
        button: null,
        ok: null,
        cancel: null,
        okValue: '确定',
        cancelValue: '取消',
        width: 'auto',
        height: 'auto',
        innerHTML: 
        '<div i="dialog" class="ui-dialog-dialog">' 
        + '<div class="ui-dialog-arrow-a"></div>' 
        + '<div class="ui-dialog-arrow-b"></div>' 
        + '<table class="ui-dialog-grid">' 
        + '<tr>' 
        + '<td i="header" class="ui-dialog-header">' 
        + '<button i="close" class="ui-dialog-close"></button>' 
        + '<button i="small" class="ui-dialog-small">-</button>' 
        + '<div i="title" class="ui-dialog-title"></div>' 
        + '</td>' 
        + '</tr>' 
        + '<tr>' 
        + '<td i="body" class="ui-dialog-body">' 
        + '<div i="content" class="ui-dialog-content"></div>' 
        + '</td>' 
        + '</tr>' 
        + '<tr>' 
        + '<td i="footer" class="ui-dialog-footer">' 
        + '<div i="statusbar" class="ui-dialog-statusbar"></div>' 
        + '<div i="button" class="ui-dialog-button"></div>' 
        + '</td>' 
        + '</tr>' 
        + '</table>' 
        + '</div>'
    }
    window.tingToast = $.tingToast = tingToast;
}(this.jQuery));
