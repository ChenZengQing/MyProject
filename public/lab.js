(function (o) {
    var K = o.$LAB, y = "UseLocalXHR", z = "AlwaysPreserveOrder", u = "AllowDuplicates", A = "CacheBust",
        B = "BasePath", C = /^[^?#]*\//.exec(location.href)[0], D = /^\w+\:\/\/\/?[^\/]+/.exec(C)[0],
        i = document.head || document.getElementsByTagName("head"),
        L = (o.opera && Object.prototype.toString.call(o.opera) == "[object Opera]") || ("MozAppearance" in document.documentElement.style),
        q = document.createElement("script"), E = typeof q.preload == "boolean",
        r = E || (q.readyState && q.readyState == "uninitialized"), F = !r && q.async === true, M = !r && !F && !L;

    function G(a) {
        return Object.prototype.toString.call(a) == "[object Function]"
    }

    function H(a) {
        return Object.prototype.toString.call(a) == "[object Array]"
    }

    function N(a, c) {
        var b = /^\w+\:\/\//;
        if (/^\/\/\/?/.test(a)) {
            a = location.protocol + a
        } else if (!b.test(a) && a.charAt(0) != "/") {
            a = (c || "") + a
        }
        return b.test(a) ? a : ((a.charAt(0) == "/" ? D : C) + a)
    }

    function s(a, c) {
        for (var b in a) {
            if (a.hasOwnProperty(b)) {
                c[b] = a[b]
            }
        }
        return c
    }

    function O(a) {
        var c = false;
        for (var b = 0; b < a.scripts.length; b++) {
            if (a.scripts[b].ready && a.scripts[b].exec_trigger) {
                c = true;
                a.scripts[b].exec_trigger();
                a.scripts[b].exec_trigger = null
            }
        }
        return c
    }

    function t(a, c, b, d) {
        a.onload = a.onreadystatechange = function () {
            if ((a.readyState && a.readyState != "complete" && a.readyState != "loaded") || c[b])return;
            a.onload = a.onreadystatechange = null;
            d()
        }
    }

    function I(a) {
        a.ready = a.finished = true;
        for (var c = 0; c < a.finished_listeners.length; c++) {
            a.finished_listeners[c]()
        }
        a.ready_listeners = [];
        a.finished_listeners = []
    }

    function P(d, f, e, g, h) {
        setTimeout(function () {
            var a, c = f.real_src, b;
            if ("item" in i) {
                if (!i[0]) {
                    setTimeout(arguments.callee, 25);
                    return
                }
                i = i[0]
            }
            a = document.createElement("script");
            if (f.type) a.type = f.type;
            if (f.charset) a.charset = f.charset;
            if (h) {
                if (r) {
                    e.elem = a;
                    if (E) {
                        a.preload = true;
                        a.onpreload = g
                    } else {
                        a.onreadystatechange = function () {
                            if (a.readyState == "loaded") g()
                        }
                    }
                    a.src = c
                } else if (h && c.indexOf(D) == 0 && d[y]) {
                    b = new XMLHttpRequest();
                    b.onreadystatechange = function () {
                        if (b.readyState == 4) {
                            b.onreadystatechange = function () {
                            };
                            e.text = b.responseText + "\n//@ sourceURL=" + c;
                            g()
                        }
                    };
                    b.open("GET", c);
                    b.send()
                } else {
                    a.type = "text/cache-script";
                    t(a, e, "ready", function () {
                        i.removeChild(a);
                        g()
                    });
                    a.src = c;
                    i.insertBefore(a, i.firstChild)
                }
            } else if (F) {
                a.async = false;
                t(a, e, "finished", g);
                a.src = c;
                i.insertBefore(a, i.firstChild)
            } else {
                t(a, e, "finished", g);
                a.src = c;
                i.insertBefore(a, i.firstChild)
            }
        }, 0)
    }

    function J() {
        var l = {}, Q = r || M, n = [], p = {}, m;
        l[y] = true;
        l[z] = false;
        l[u] = false;
        l[A] = false;
        l[B] = "";
        function R(a, c, b) {
            var d;

            function f() {
                if (d != null) {
                    d = null;
                    I(b)
                }
            }

            if (p[c.src].finished)return;
            if (!a[u]) p[c.src].finished = true;
            d = b.elem || document.createElement("script");
            if (c.type) d.type = c.type;
            if (c.charset) d.charset = c.charset;
            t(d, b, "finished", f);
            if (b.elem) {
                b.elem = null
            } else if (b.text) {
                d.onload = d.onreadystatechange = null;
                d.text = b.text
            } else {
                d.src = c.real_src
            }
            i.insertBefore(d, i.firstChild);
            if (b.text) {
                f()
            }
        }

        function S(c, b, d, f) {
            var e, g, h = function () {
                b.ready_cb(b, function () {
                    R(c, b, e)
                })
            }, j = function () {
                b.finished_cb(b, d)
            };
            b.src = N(b.src, c[B]);
            b.real_src = b.src + (c[A] ? ((/\?.*$/.test(b.src) ? "&_" : "?_") + ~~(Math.random() * 1E9) + "=") : "");
            if (!p[b.src]) p[b.src] = {items: [], finished: false};
            g = p[b.src].items;
            if (c[u] || g.length == 0) {
                e = g[g.length] = {ready: false, finished: false, ready_listeners: [h], finished_listeners: [j]};
                P(c, b, e, ((f) ? function () {
                    e.ready = true;
                    for (var a = 0; a < e.ready_listeners.length; a++) {
                        e.ready_listeners[a]()
                    }
                    e.ready_listeners = []
                } : function () {
                    I(e)
                }), f)
            } else {
                e = g[0];
                if (e.finished) {
                    j()
                } else {
                    e.finished_listeners.push(j)
                }
            }
        }

        function v() {
            var e, g = s(l, {}), h = [], j = 0, w = false, k;

            function T(a, c) {
                a.ready = true;
                a.exec_trigger = c;
                x()
            }

            function U(a, c) {
                a.ready = a.finished = true;
                a.exec_trigger = null;
                for (var b = 0; b < c.scripts.length; b++) {
                    if (!c.scripts[b].finished)return
                }
                c.finished = true;
                x()
            }

            function x() {
                while (j < h.length) {
                    if (G(h[j])) {
                        try {
                            h[j++]()
                        } catch (err) {
                        }
                        continue
                    } else if (!h[j].finished) {
                        if (O(h[j]))continue;
                        break
                    }
                    j++
                }
                if (j == h.length) {
                    w = false;
                    k = false
                }
            }

            function V() {
                if (!k || !k.scripts) {
                    h.push(k = {scripts: [], finished: true})
                }
            }

            e = {
                script: function () {
                    for (var f = 0; f < arguments.length; f++) {
                        (function (a, c) {
                            var b;
                            if (!H(a)) {
                                c = [a]
                            }
                            for (var d = 0; d < c.length; d++) {
                                V();
                                a = c[d];
                                if (G(a)) a = a();
                                if (!a)continue;
                                if (H(a)) {
                                    b = [].slice.call(a);
                                    b.unshift(d, 1);
                                    [].splice.apply(c, b);
                                    d--;
                                    continue
                                }
                                if (typeof a == "string") a = {src: a};
                                a = s(a, {ready: false, ready_cb: T, finished: false, finished_cb: U});
                                k.finished = false;
                                k.scripts.push(a);
                                S(g, a, k, (Q && w));
                                w = true;
                                if (g[z]) e.wait()
                            }
                        })(arguments[f], arguments[f])
                    }
                    return e
                }, wait: function () {
                    if (arguments.length > 0) {
                        for (var a = 0; a < arguments.length; a++) {
                            h.push(arguments[a])
                        }
                        k = h[h.length - 1]
                    } else k = false;
                    x();
                    return e
                }
            };
            return {
                script: e.script, wait: e.wait, setOptions: function (a) {
                    s(a, g);
                    return e
                }
            }
        }

        m = {
            setGlobalDefaults: function (a) {
                s(a, l);
                return m
            }, setOptions: function () {
                return v().setOptions.apply(null, arguments)
            }, script: function () {
                return v().script.apply(null, arguments)
            }, wait: function () {
                return v().wait.apply(null, arguments)
            }, queueScript: function () {
                n[n.length] = {type: "script", args: [].slice.call(arguments)};
                return m
            }, queueWait: function () {
                n[n.length] = {type: "wait", args: [].slice.call(arguments)};
                return m
            }, runQueue: function () {
                var a = m, c = n.length, b = c, d;
                for (; --b >= 0;) {
                    d = n.shift();
                    a = a[d.type].apply(null, d.args)
                }
                return a
            }, noConflict: function () {
                o.$LAB = K;
                return m
            }, sandbox: function () {
                return J()
            }
        };
        return m
    }

    o.$LAB = J();
    (function (a, c, b) {
        if (document.readyState == null && document[a]) {
            document.readyState = "loading";
            document[a](c, b = function () {
                document.removeEventListener(c, b, false);
                document.readyState = "complete"
            }, false)
        }
    })("addEventListener", "DOMContentLoaded")
})(this);
/*
 * 站内统计
 * - 自动打点用户行为分析
 * - 页面区域点击
 */
(function () {

    var $this = this;

    //构造最终可传输参数
    var O = {}, Browser = {}, OS = {};

    // JSON RegExp
    var rvalidchars = /^[\],:{}\s]*$/;
    var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

    var trimLeft = /^\s+/;
    var trimRight = /\s+$/;

    function trim(text) {
        return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "");
    }

    function parseJSON(data) {
        if (typeof data !== "string" || !data) {
            return null;
        }

        // Make sure leading/trailing whitespace is removed (IE can't handle it)
        data = trim(data);

        // Make sure the incoming data is actual JSON
        // Logic borrowed from http://json.org/json2.js
        if (rvalidchars.test(data.replace(rvalidescape, "@")
                .replace(rvalidtokens, "]")
                .replace(rvalidbraces, ""))) {

            // Try to use the native JSON parser first
            return window.JSON && window.JSON.parse ?
                window.JSON.parse(data) :
                (new Function("return " + data))();

        } else {
            throw "Invalid JSON: " + data;
        }
    }

    //设置COOKIE expire [+- 1/天]
    function setCookie(name, value, expire, domain, issecure) {
        if (domain == undefined || domain == null || domain == "") domain = getCookieDomain();
        var secure = (issecure == undefined || issecure == null || issecure == "") ? true : false;
        if (expire != undefined && expire != null && expire != "") {
            var date = new Date();
            if (expire <= 0) date.setTime(date.getTime() - (1 * 1000 * 3600 * 24));
            else date.setTime(date.getTime() + (expire * 1000 * 3600 * 24));
            expire = ";expires=" + date.toGMTString();
        }
        else expire = "";
        document.cookie = name + "=" + escape(value) + expire + ";path=/;domain=" + domain + ";" + secure;
    }

    //获取cookie
    function getCookie(name, mode) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            switch (mode) {
                case 1:
                    return unescape(decodeURIComponent(arr[2]));
                    break;
                default:
                    return unescape(arr[2]);
                    break;
            }
        }
        return "";
    }

    function getScript(url, callback) {
        script = document.createElement("script");
        script.async = "async";
        if (O.bcharset) {
            script.charset = O.bcharset;
        }
        script.src = url;
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function (_, isAbort) {

            if (!script.readyState || /loaded|complete/.test(script.readyState)) {

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;

                // Remove the script
                if (head && script.parentNode) {
                    head.removeChild(script);
                }

                // Dereference the script
                script = undefined;

                // Callback if not abort
                if (!isAbort) {
                    if (typeof callback == 'function') {
                        callback(200, "success");
                    }
                }
            }
        };
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        // This arises when a base node is used (#2709 and #4378).
        head.insertBefore(script, head.firstChild);
    }

    if (initAnalyticsData != null && initAnalyticsData != undefined && initAnalyticsData != '') {
        if (typeof initAnalyticsData == 'string') {
            initAnalyticsData = parseJSON(initAnalyticsData);
        }
    } else {
        return;//不打点监控
    }

    var YR_ic = getCookie('YR_ic');

    //浏览器信息
    var _uagent = navigator.userAgent.toLowerCase();
    //操作系统信息
    var _uplatform = navigator.platform.toLowerCase();

    if (_uplatform == 'win32' || _uplatform == 'windows') {
        O.osname = 'windows';
        if (_uagent.indexOf('windows nt 6.0') > -1 || _uagent.indexOf('windows vista') > -1) {
            O.ostype = 'vista';
        } else if (_uagent.indexOf('windows nt 6.1') > -1 || _uagent.indexOf('windows 7') > -1) {
            O.ostype = 'win7';
        } else {
            try {
                var _winName = Array('2000', 'xp', '2003');
                var _ntNum = _uagent.match(/Windows NT 5.\d/i).toString();
                O.ostype = _winName[_ntNum.replace(/Windows NT 5.(\d)/i, "$1")];
            } catch (e) {
                O.ostype = 'unknown';
            }
        }
    } else if (_uplatform == "mac68k" || _uplatform == "macppc" || _uplatform == "macintosh") {
        O.osname = 'mac';
        O.ostype = 'unknown';
    } else if (_uplatform == "x11") {
        O.osname = 'unix';
        O.ostype = 'unknown';
    } else if (String(_uplatform).indexOf("linux") > -1) {
        O.osname = 'linux';
        O.ostype = 'unknown';
    } else {
        O.osname = 'unknown';
        O.ostype = 'unknown';
    }

    O.screen_size = window.screen.width + 'x' + window.screen.height;
    O.screen_color = window.screen.colorDepth + '-bit';

    O.rurl = encodeURIComponent(window.location.href);

    var host = window.location.host;
    var hostAry = host.split('.');
    if (hostAry.length <= 2) {
        O.dr = hostAry[0] + '.' + hostAry[1];
        O.dz = 'unknown';
    } else {
        O.dr = hostAry[1] + '.' + hostAry[2];
        O.dz = host;
    }

    var debug = '';
    for (var b in O) {
        debug += b + ' : ' + O[b] + "\n\r";
    }
    //alert(debug);

    //自动提交
    var tTtime = new Date().getTime();
    var subFlag = 1;
    if (YR_ic == undefined || YR_ic == null || YR_ic == '') {
        setCookie('YR_ic', tTtime, 0.1, document.domain);
    } else {
        if ((tTtime - YR_ic) <= 1000) {
            subFlag = 0;
        } else {
            setCookie('YR_ic', tTtime, 0.1, document.domain);
        }
    }
    if (subFlag > 0) {//提交
        O.gd = initAnalyticsData.yagd;
        O.icp = initAnalyticsData.yaicp;
        O.isp = initAnalyticsData.yaisp;
        O.mt = initAnalyticsData.yamt;
        O.ref = initAnalyticsData.yaref;
        O.tm = initAnalyticsData.yatm;
        O.uid = initAnalyticsData.yauid;
        O.sid = initAnalyticsData.yasid

        //拼装url params
        var params = [];
        for (var b in O) {
            params.push(b + '=' + O[b]);
        }

        params = params.join('&');

        var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        var url = 'http://a.utanbaby.com/trace/userbehaviour/?' + params;
        getScript(url);
    }

//========== click 打点 ==========

    /*
     * 目前仅A标签
     * 定义参数 PMCT = 页面按钮点击统计
     * data-pmct_pf = 页面区域标识
     * data-pmct_jump = 点击后的跳转方式 blank self 默认self
     */
    function clickTrace($parent) {
        //获取dom中所有带有 PMCT class 的元素
        try {
            $('.PMCT').live('click', function () {
                var $thisO = $(this);
                if (this.tagName.toLowerCase() != 'a') {
                    return;
                }
                var pf = $thisO.data('pmct_pf');//页面区域标识
                var jump = $thisO.data('pmct_jump');//指定就不自动检查
                var checkJump = false;
                if (trim(jump).length <= 0) {
                    checkJump = true;
                }
                if (pf == undefined || pf == null || trim(pf).length == 0) {
                    return true;
                }
                if (this.tagName.toLowerCase() == 'a') {
                    var href = $thisO.attr('href');
                    if (/^#+$/.test(href) || /^javascript:.+$/.test(href)) {
                        return;
                    }
                    if (checkJump) {//自动检查
                        if (this.target == '') {
                            jump = '_self';
                        } else {
                            jump = this.target;
                        }
                    }
                    if (jump == 'null') {
                        var href = $thisO.data('pmct_url');
                    }
                } else {
                    jump = 'null';
                }
                var params = [];
                var TmpO = {};
                for (var tk in O) {
                    TmpO[tk] = O[tk];
                }
                TmpO['mt'] = 'GET';
                var tmpHrefAry = href.split('?');
                if (tmpHrefAry.length > 1) {
                    var tmpHrefAry1 = href.split('&');
                    if (tmpHrefAry1.length > 1) {//有问号有内容有&
                        TmpO['rurl'] = href + '&PMCT=' + pf;
                    } else {
                        if (trim(tmpHrefAry[1]).length > 0) {//有问号有内容，没有&
                            TmpO['rurl'] = href + '&PMCT=' + pf;
                        } else {//有问号，没内容
                            TmpO['rurl'] = href + 'PMCT=' + pf;
                        }
                    }
                } else {
                    TmpO['rurl'] = href + '?PMCT=' + pf;
                }
                TmpO['ref'] = O['rurl'];
                for (var tb in TmpO) {
                    if (tb == 'ref' || tb == 'rurl') {
                        params.push(tb + '=' + encodeURIComponent(TmpO[tb]));
                    } else {
                        params.push(tb + '=' + TmpO[tb]);
                    }
                }
                params = params.join('&');
                var url = 'http://a.utanbaby.com/trace/pageclick/?' + params;
                switch (jump) {
                    case '_self':
                        TmpO = null;
                        getScript(url, function (data) {
                            window.location.href = href;
                        });
                        return false;
                        break;
                    default:// _blank 或 null
                        getScript(url);
                        TmpO = null;
                        return true;
                        break;
                }
            });
        } catch (e) {
            //empty
        }
    }

    /*
     * 点击事件打点
     * 
     * //普通点击打点
     * traceParams = {
     *  
     * }
     * 
     * //下载点击打点
     * traceParams = {
     *     'url' : url,
     *     'jump': '_self',
     *     'args': {
     *         'act' : '1',
     *         'button_type': '16',
     *         'button_name': 'APP名字', 根据Confluence
     *         'article_url': '点击后跳转的URL'
     *     }
     * }
     * 
     * //广告点击打点
     * traceParams = {
     *     'url' : url,
     *     'jump': '_self',
     *     'args': {
     *         'act' : '1',
     *         'button_type': '13', 根据Confluence
     *         'button_name': '广告button名字',
     *         'article_id' : '广告ID',
     *         'article_title' : '广告标题',
     *         'article_url': '广告URL'
     *     }
     * }
     */
    function clickEventTrace(traceParams) {
        try {
            var params = [];
            var TmpO = {};
            for (var tk in O) {
                TmpO[tk] = O[tk];
            }
            TmpO['mt'] = 'GET';
            TmpO['rurl'] = traceParams['url'];
            TmpO['ref'] = O['rurl'];
            if (traceParams['args'] === undefined || traceParams['args'] === null || traceParams['args'] === '') {
                traceParams['args'] = {};
            } else {
                for (var a in traceParams['args']) {
                    TmpO[a] = traceParams['args'][a];
                }
            }
            for (var tb in TmpO) {
                if (tb == 'ref' || tb == 'rurl') {
                    params.push(tb + '=' + encodeURIComponent(TmpO[tb]));
                } else {
                    params.push(tb + '=' + TmpO[tb]);
                }
            }
            params = params.join('&');
            var url = 'http://a.utanbaby.com/trace/pageclicktrace/?' + params;
            switch (traceParams['jump']) {
                case '_self':
                    TmpO = null;
                    getScript(url, function (data) {
                        window.location.href = traceParams['url'];
                    });
                    return false;
                    break;
                default:// _blank 或 null
                    getScript(url);
                    TmpO = null;
                    return true;
                    break;
            }
        } catch (e) {
            //empty
        }
    }

    $this.isReady = false;
    $this.readyWait = 1;
    $this.ready = function () {
        if ($this.readyWait < 1) {
            return;
        }
        $this.readyWait--;
        $this.isReady = true;
        //document 加载完毕
        clickTrace();
    }

    // Cleanup functions for the document ready method
    if (document.addEventListener) {
        DOMContentLoaded = function () {
            document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
            $this.ready();
        };
    } else if (document.attachEvent) {
        DOMContentLoaded = function () {
            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if (document.readyState === "complete") {
                document.detachEvent("onreadystatechange", DOMContentLoaded);
                $this.ready();
            }
        };
    }

    // The DOM ready check for Internet Explorer
    function doScrollCheck() {
        if ($this.isReady) {
            return;
        }
        try {
            // If IE is used, use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            document.documentElement.doScroll("left");
        } catch (e) {
            setTimeout(doScrollCheck, 1);
            return;
        }

        // and execute any waiting functions
        $this.ready();
    }

    if (document.readyState === "complete") {
        setTimeout($this.ready, 1);
    }

    // Mozilla, Opera and webkit nightlies currently support this event
    if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
        // A fallback to window.onload, that will always work
        window.addEventListener("load", $this.ready, false);

        // If IE event model is used
    } else if (document.attachEvent) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", DOMContentLoaded);

        // A fallback to window.onload, that will always work
        window.attachEvent("onload", $this.ready);

        // If IE and not a frame
        // continually check to see if the document is ready
        var toplevel = false;
        try {
            toplevel = window.frameElement == null;
        } catch (e) {
        }

        if (document.documentElement.doScroll && toplevel) {
            doScrollCheck();
        }
    }


    window.Analytics = {
        clickTrace: function ($parent) {
            clickTrace($parent);
        },
        clickEventTrace: function (traceParams) {
            clickEventTrace(traceParams);
        }
    }
})(window);