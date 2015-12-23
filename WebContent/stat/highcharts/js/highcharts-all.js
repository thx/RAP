/*
 Highcharts JS v4.0.4 (2014-09-02)

 Standalone Highcharts Framework

 License: MIT License
 */
var HighchartsAdapter = function () {
    function p(c) {
        function b(b, a, d) {
            b.removeEventListener(a, d, !1)
        }

        function d(b, a, d) {
            d = b.HCProxiedMethods[d.toString()];
            b.detachEvent("on" + a, d)
        }

        function a(a, c) {
            var f = a.HCEvents, i, g, k, j;
            if (a.removeEventListener)i = b; else if (a.attachEvent)i = d; else return;
            c ? (g = {}, g[c] = !0) : g = f;
            for (j in g)if (f[j])for (k = f[j].length; k--;)i(a, j, f[j][k])
        }

        c.HCExtended || Highcharts.extend(c, {
            HCExtended: !0, HCEvents: {}, bind: function (b, a) {
                var d = this, c = this.HCEvents, g;
                if (d.addEventListener)d.addEventListener(b,
                    a, !1); else if (d.attachEvent) {
                    g = function (b) {
                        b.target = b.srcElement || window;
                        a.call(d, b)
                    };
                    if (!d.HCProxiedMethods)d.HCProxiedMethods = {};
                    d.HCProxiedMethods[a.toString()] = g;
                    d.attachEvent("on" + b, g)
                }
                c[b] === s && (c[b] = []);
                c[b].push(a)
            }, unbind: function (c, h) {
                var f, i;
                c ? (f = this.HCEvents[c] || [], h ? (i = HighchartsAdapter.inArray(h, f), i > -1 && (f.splice(i, 1), this.HCEvents[c] = f), this.removeEventListener ? b(this, c, h) : this.attachEvent && d(this, c, h)) : (a(this, c), this.HCEvents[c] = [])) : (a(this), this.HCEvents = {})
            }, trigger: function (b,
                                  a) {
                var d = this.HCEvents[b] || [], c = d.length, g, k, j;
                k = function () {
                    a.defaultPrevented = !0
                };
                for (g = 0; g < c; g++) {
                    j = d[g];
                    if (a.stopped)break;
                    a.preventDefault = k;
                    a.target = this;
                    if (!a.type)a.type = b;
                    j.call(this, a) === !1 && a.preventDefault()
                }
            }
        });
        return c
    }

    var s, l = document, q = [], m = [], r, n = {}, o;
    Math.easeInOutSine = function (c, b, d, a) {
        return -d / 2 * (Math.cos(Math.PI * c / a) - 1) + b
    };
    return {
        init: function (c) {
            if (!l.defaultView)this._getStyle = function (b, d) {
                var a;
                return b.style[d] ? b.style[d] : (d === "opacity" && (d = "filter"), a = b.currentStyle[d.replace(/\-(\w)/g,
                    function (b, a) {
                        return a.toUpperCase()
                    })], d === "filter" && (a = a.replace(/alpha\(opacity=([0-9]+)\)/, function (b, a) {
                    return a / 100
                })), a === "" ? 1 : a)
            }, this.adapterRun = function (b, d) {
                var a = {width: "clientWidth", height: "clientHeight"}[d];
                if (a)return b.style.zoom = 1, b[a] - 2 * parseInt(HighchartsAdapter._getStyle(b, "padding"), 10)
            };
            if (!Array.prototype.forEach)this.each = function (b, d) {
                for (var a = 0, c = b.length; a < c; a++)if (d.call(b[a], b[a], a, b) === !1)return a
            };
            if (!Array.prototype.indexOf)this.inArray = function (b, d) {
                var a, c = 0;
                if (d)for (a =
                               d.length; c < a; c++)if (d[c] === b)return c;
                return -1
            };
            if (!Array.prototype.filter)this.grep = function (b, d) {
                for (var a = [], c = 0, h = b.length; c < h; c++)d(b[c], c) && a.push(b[c]);
                return a
            };
            o = function (b, c, a) {
                this.options = c;
                this.elem = b;
                this.prop = a
            };
            o.prototype = {
                update: function () {
                    var b;
                    b = this.paths;
                    var d = this.elem, a = d.element;
                    if (n[this.prop])n[this.prop](this); else b && a ? d.attr("d", c.step(b[0], b[1], this.now, this.toD)) : d.attr ? a && d.attr(this.prop, this.now) : (b = {}, b[this.prop] = this.now + this.unit, Highcharts.css(d, b));
                    this.options.step &&
                    this.options.step.call(this.elem, this.now, this)
                }, custom: function (b, c, a) {
                    var e = this, h = function (a) {
                        return e.step(a)
                    }, f;
                    this.startTime = +new Date;
                    this.start = b;
                    this.end = c;
                    this.unit = a;
                    this.now = this.start;
                    this.pos = this.state = 0;
                    h.elem = this.elem;
                    h() && m.push(h) === 1 && (r = setInterval(function () {
                        for (f = 0; f < m.length; f++)m[f]() || m.splice(f--, 1);
                        m.length || clearInterval(r)
                    }, 13))
                }, step: function (b) {
                    var c = +new Date, a;
                    a = this.options;
                    var e = this.elem, h;
                    if (e.stopAnimation || e.attr && !e.element)a = !1; else if (b || c >= a.duration +
                        this.startTime) {
                        this.now = this.end;
                        this.pos = this.state = 1;
                        this.update();
                        b = this.options.curAnim[this.prop] = !0;
                        for (h in a.curAnim)a.curAnim[h] !== !0 && (b = !1);
                        b && a.complete && a.complete.call(e);
                        a = !1
                    } else e = c - this.startTime, this.state = e / a.duration, this.pos = a.easing(e, 0, 1, a.duration), this.now = this.start + (this.end - this.start) * this.pos, this.update(), a = !0;
                    return a
                }
            };
            this.animate = function (b, d, a) {
                var e, h = "", f, i, g;
                b.stopAnimation = !1;
                if (typeof a !== "object" || a === null)e = arguments, a = {
                    duration: e[2],
                    easing: e[3],
                    complete: e[4]
                };
                if (typeof a.duration !== "number")a.duration = 400;
                a.easing = Math[a.easing] || Math.easeInOutSine;
                a.curAnim = Highcharts.extend({}, d);
                for (g in d)i = new o(b, a, g), f = null, g === "d" ? (i.paths = c.init(b, b.d, d.d), i.toD = d.d, e = 0, f = 1) : b.attr ? e = b.attr(g) : (e = parseFloat(HighchartsAdapter._getStyle(b, g)) || 0, g !== "opacity" && (h = "px")), f || (f = d[g]), i.custom(e, f, h)
            }
        }, _getStyle: function (c, b) {
            return window.getComputedStyle(c, void 0).getPropertyValue(b)
        }, addAnimSetter: function (c, b) {
            n[c] = b
        }, getScript: function (c, b) {
            var d = l.getElementsByTagName("head")[0],
                a = l.createElement("script");
            a.type = "text/javascript";
            a.src = c;
            a.onload = b;
            d.appendChild(a)
        }, inArray: function (c, b) {
            return b.indexOf ? b.indexOf(c) : q.indexOf.call(b, c)
        }, adapterRun: function (c, b) {
            return parseInt(HighchartsAdapter._getStyle(c, b), 10)
        }, grep: function (c, b) {
            return q.filter.call(c, b)
        }, map: function (c, b) {
            for (var d = [], a = 0, e = c.length; a < e; a++)d[a] = b.call(c[a], c[a], a, c);
            return d
        }, offset: function (c) {
            var b = document.documentElement, c = c.getBoundingClientRect();
            return {
                top: c.top + (window.pageYOffset || b.scrollTop) -
                (b.clientTop || 0), left: c.left + (window.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }
        }, addEvent: function (c, b, d) {
            p(c).bind(b, d)
        }, removeEvent: function (c, b, d) {
            p(c).unbind(b, d)
        }, fireEvent: function (c, b, d, a) {
            var e;
            l.createEvent && (c.dispatchEvent || c.fireEvent) ? (e = l.createEvent("Events"), e.initEvent(b, !0, !0), e.target = c, Highcharts.extend(e, d), c.dispatchEvent ? c.dispatchEvent(e) : c.fireEvent(b, e)) : c.HCExtended === !0 && (d = d || {}, c.trigger(b, d));
            d && d.defaultPrevented && (a = null);
            a && a(d)
        }, washMouseEvent: function (c) {
            return c
        },
        stop: function (c) {
            c.stopAnimation = !0
        }, each: function (c, b) {
            return Array.prototype.forEach.call(c, b)
        }
    }
}();
/*
 Highcharts JS v4.0.4 (2014-09-02)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
 */
(function () {
    function r(a, b) {
        var c;
        a || (a = {});
        for (c in b)a[c] = b[c];
        return a
    }

    function w() {
        var a, b = arguments, c, d = {}, e = function (a, b) {
            var c, d;
            typeof a !== "object" && (a = {});
            for (d in b)b.hasOwnProperty(d) && (c = b[d], a[d] = c && typeof c === "object" && Object.prototype.toString.call(c) !== "[object Array]" && d !== "renderTo" && typeof c.nodeType !== "number" ? e(a[d] || {}, c) : b[d]);
            return a
        };
        b[0] === !0 && (d = b[1], b = Array.prototype.slice.call(b, 2));
        c = b.length;
        for (a = 0; a < c; a++)d = e(d, b[a]);
        return d
    }

    function y(a, b) {
        return parseInt(a, b ||
            10)
    }

    function Ga(a) {
        return typeof a === "string"
    }

    function da(a) {
        return a && typeof a === "object"
    }

    function Ha(a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }

    function ja(a) {
        return typeof a === "number"
    }

    function za(a) {
        return V.log(a) / V.LN10
    }

    function ka(a) {
        return V.pow(10, a)
    }

    function la(a, b) {
        for (var c = a.length; c--;)if (a[c] === b) {
            a.splice(c, 1);
            break
        }
    }

    function s(a) {
        return a !== u && a !== null
    }

    function F(a, b, c) {
        var d, e;
        if (Ga(b))s(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b)); else if (s(b) &&
            da(b))for (d in b)a.setAttribute(d, b[d]);
        return e
    }

    function ra(a) {
        return Ha(a) ? a : [a]
    }

    function p() {
        var a = arguments, b, c, d = a.length;
        for (b = 0; b < d; b++)if (c = a[b], c !== u && c !== null)return c
    }

    function B(a, b) {
        if (Aa && !ba && b && b.opacity !== u)b.filter = "alpha(opacity=" + b.opacity * 100 + ")";
        r(a.style, b)
    }

    function $(a, b, c, d, e) {
        a = x.createElement(a);
        b && r(a, b);
        e && B(a, {padding: 0, border: P, margin: 0});
        c && B(a, c);
        d && d.appendChild(a);
        return a
    }

    function ma(a, b) {
        var c = function () {
            return u
        };
        c.prototype = new a;
        r(c.prototype, b);
        return c
    }

    function Ba(a,
                b, c, d) {
        var e = K.numberFormat, f = E.lang, g = +a || 0, h = b === -1 ? (g.toString().split(".")[1] || "").length : isNaN(b = Q(b)) ? 2 : b, i = c === void 0 ? f.decimalPoint : c, f = d === void 0 ? f.thousandsSep : d, j = g < 0 ? "-" : "", k = String(y(g = Q(g).toFixed(h))), l = k.length > 3 ? k.length % 3 : 0;
        return e !== Ba ? e(a, b, c, d) : j + (l ? k.substr(0, l) + f : "") + k.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + f) + (h ? i + Q(g - k).toFixed(h).slice(2) : "")
    }

    function Ia(a, b) {
        return Array((b || 2) + 1 - String(a).length).join(0) + a
    }

    function Na(a, b, c) {
        var d = a[b];
        a[b] = function () {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(d);
            return c.apply(this, a)
        }
    }

    function Ja(a, b) {
        for (var c = "{", d = !1, e, f, g, h, i, j = []; (c = a.indexOf(c)) !== -1;) {
            e = a.slice(0, c);
            if (d) {
                f = e.split(":");
                g = f.shift().split(".");
                i = g.length;
                e = b;
                for (h = 0; h < i; h++)e = e[g[h]];
                if (f.length)f = f.join(":"), g = /\.([0-9])/, h = E.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] : -1, e !== null && (e = Ba(e, i, h.decimalPoint, f.indexOf(",") > -1 ? h.thousandsSep : ""))) : e = cb(f, e)
            }
            j.push(e);
            a = a.slice(c + 1);
            c = (d = !d) ? "}" : "{"
        }
        j.push(a);
        return j.join("")
    }

    function mb(a) {
        return V.pow(10, U(V.log(a) /
            V.LN10))
    }

    function nb(a, b, c, d) {
        var e, c = p(c, 1);
        e = a / c;
        b || (b = [1, 2, 2.5, 5, 10], d === !1 && (c === 1 ? b = [1, 2, 5, 10] : c <= 0.1 && (b = [1 / c])));
        for (d = 0; d < b.length; d++)if (a = b[d], e <= (b[d] + (b[d + 1] || b[d])) / 2)break;
        a *= c;
        return a
    }

    function ob(a, b) {
        var c = a.length, d, e;
        for (e = 0; e < c; e++)a[e].ss_i = e;
        a.sort(function (a, c) {
            d = b(a, c);
            return d === 0 ? a.ss_i - c.ss_i : d
        });
        for (e = 0; e < c; e++)delete a[e].ss_i
    }

    function Oa(a) {
        for (var b = a.length, c = a[0]; b--;)a[b] < c && (c = a[b]);
        return c
    }

    function Ca(a) {
        for (var b = a.length, c = a[0]; b--;)a[b] > c && (c = a[b]);
        return c
    }

    function Pa(a, b) {
        for (var c in a)a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c]
    }

    function Qa(a) {
        db || (db = $(Ka));
        a && db.appendChild(a);
        db.innerHTML = ""
    }

    function ea(a) {
        return parseFloat(a.toPrecision(14))
    }

    function Ra(a, b) {
        va = p(a, b.animation)
    }

    function Bb() {
        var a = E.global.useUTC, b = a ? "getUTC" : "get", c = a ? "setUTC" : "set";
        Da = E.global.Date || window.Date;
        Sa = (a && E.global.timezoneOffset || 0) * 6E4;
        eb = a ? Da.UTC : function (a, b, c, g, h, i) {
            return (new Da(a, b, p(c, 1), p(g, 0), p(h, 0), p(i, 0))).getTime()
        };
        pb = b + "Minutes";
        qb = b +
            "Hours";
        rb = b + "Day";
        Xa = b + "Date";
        fb = b + "Month";
        gb = b + "FullYear";
        Cb = c + "Minutes";
        Db = c + "Hours";
        sb = c + "Date";
        Eb = c + "Month";
        Fb = c + "FullYear"
    }

    function S() {
    }

    function Ta(a, b, c, d) {
        this.axis = a;
        this.pos = b;
        this.type = c || "";
        this.isNew = !0;
        !c && !d && this.addLabel()
    }

    function na() {
        this.init.apply(this, arguments)
    }

    function Ya() {
        this.init.apply(this, arguments)
    }

    function Gb(a, b, c, d, e) {
        var f = a.chart.inverted;
        this.axis = a;
        this.isNegative = c;
        this.options = b;
        this.x = d;
        this.total = null;
        this.points = {};
        this.stack = e;
        this.alignOptions = {
            align: b.align ||
            (f ? c ? "left" : "right" : "center"),
            verticalAlign: b.verticalAlign || (f ? "middle" : c ? "bottom" : "top"),
            y: p(b.y, f ? 4 : c ? 14 : -6),
            x: p(b.x, f ? c ? -6 : 6 : 0)
        };
        this.textAlign = b.textAlign || (f ? c ? "right" : "left" : "center")
    }

    var u, x = document, G = window, V = Math, v = V.round, U = V.floor, La = V.ceil, t = V.max, L = V.min, Q = V.abs, aa = V.cos, fa = V.sin, oa = V.PI, Ea = oa * 2 / 360, wa = navigator.userAgent, Hb = G.opera, Aa = /msie/i.test(wa) && !Hb, hb = x.documentMode === 8, tb = /AppleWebKit/.test(wa), Ua = /Firefox/.test(wa), Ib = /(Mobile|Android|Windows Phone)/.test(wa), xa = "http://www.w3.org/2000/svg",
        ba = !!x.createElementNS && !!x.createElementNS(xa, "svg").createSVGRect, Ob = Ua && parseInt(wa.split("Firefox/")[1], 10) < 4, ga = !ba && !Aa && !!x.createElement("canvas").getContext, Za, $a, Jb = {}, ub = 0, db, E, cb, va, vb, A, ha, sa = function () {
            return u
        }, W = [], ab = 0, Ka = "div", P = "none", Pb = /^[0-9]+$/, Qb = "stroke-width", Da, eb, Sa, pb, qb, rb, Xa, fb, gb, Cb, Db, sb, Eb, Fb, H = {}, K;
    G.Highcharts ? ha(16, !0) : K = G.Highcharts = {};
    cb = function (a, b, c) {
        if (!s(b) || isNaN(b))return "Invalid date";
        var a = p(a, "%Y-%m-%d %H:%M:%S"), d = new Da(b - Sa), e, f = d[qb](), g = d[rb](),
            h = d[Xa](), i = d[fb](), j = d[gb](), k = E.lang, l = k.weekdays, d = r({
                a: l[g].substr(0, 3),
                A: l[g],
                d: Ia(h),
                e: h,
                b: k.shortMonths[i],
                B: k.months[i],
                m: Ia(i + 1),
                y: j.toString().substr(2, 2),
                Y: j,
                H: Ia(f),
                I: Ia(f % 12 || 12),
                l: f % 12 || 12,
                M: Ia(d[pb]()),
                p: f < 12 ? "AM" : "PM",
                P: f < 12 ? "am" : "pm",
                S: Ia(d.getSeconds()),
                L: Ia(v(b % 1E3), 3)
            }, K.dateFormats);
        for (e in d)for (; a.indexOf("%" + e) !== -1;)a = a.replace("%" + e, typeof d[e] === "function" ? d[e](b) : d[e]);
        return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
    };
    ha = function (a, b) {
        var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" +
            a;
        if (b)throw c;
        G.console && console.log(c)
    };
    A = {
        millisecond: 1,
        second: 1E3,
        minute: 6E4,
        hour: 36E5,
        day: 864E5,
        week: 6048E5,
        month: 26784E5,
        year: 31556952E3
    };
    vb = {
        init: function (a, b, c) {
            var b = b || "", d = a.shift, e = b.indexOf("C") > -1, f = e ? 7 : 3, g, b = b.split(" "), c = [].concat(c), h, i, j = function (a) {
                for (g = a.length; g--;)a[g] === "M" && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2])
            };
            e && (j(b), j(c));
            a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6));
            if (d <= c.length / f && b.length === c.length)for (; d--;)c = [].concat(c).splice(0, f).concat(c);
            a.shift = 0;
            if (b.length)for (a = c.length; b.length < a;)d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
            h && (b = b.concat(h), c = c.concat(i));
            return [b, c]
        }, step: function (a, b, c, d) {
            var e = [], f = a.length;
            if (c === 1)e = d; else if (f === b.length && c < 1)for (; f--;)d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d; else e = b;
            return e
        }
    };
    (function (a) {
        G.HighchartsAdapter = G.HighchartsAdapter || a && {
                init: function (b) {
                    var c = a.fx;
                    a.extend(a.easing, {
                        easeOutQuad: function (a, b, c, g, h) {
                            return -g * (b /=
                                    h) * (b - 2) + c
                        }
                    });
                    a.each(["cur", "_default", "width", "height", "opacity"], function (b, e) {
                        var f = c.step, g;
                        e === "cur" ? f = c.prototype : e === "_default" && a.Tween && (f = a.Tween.propHooks[e], e = "set");
                        (g = f[e]) && (f[e] = function (a) {
                            var c, a = b ? a : this;
                            if (a.prop !== "align")return c = a.elem, c.attr ? c.attr(a.prop, e === "cur" ? u : a.now) : g.apply(this, arguments)
                        })
                    });
                    Na(a.cssHooks.opacity, "get", function (a, b, c) {
                        return b.attr ? b.opacity || 0 : a.call(this, b, c)
                    });
                    this.addAnimSetter("d", function (a) {
                        var c = a.elem, f;
                        if (!a.started)f = b.init(c, c.d, c.toD),
                            a.start = f[0], a.end = f[1], a.started = !0;
                        c.attr("d", b.step(a.start, a.end, a.pos, c.toD))
                    });
                    this.each = Array.prototype.forEach ? function (a, b) {
                        return Array.prototype.forEach.call(a, b)
                    } : function (a, b) {
                        var c, g = a.length;
                        for (c = 0; c < g; c++)if (b.call(a[c], a[c], c, a) === !1)return c
                    };
                    a.fn.highcharts = function () {
                        var a = "Chart", b = arguments, c, g;
                        if (this[0]) {
                            Ga(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1));
                            c = b[0];
                            if (c !== u)c.chart = c.chart || {}, c.chart.renderTo = this[0], new K[a](c, b[1]), g = this;
                            c === u && (g = W[F(this[0], "data-highcharts-chart")])
                        }
                        return g
                    }
                },
                addAnimSetter: function (b, c) {
                    a.Tween ? a.Tween.propHooks[b] = {set: c} : a.fx.step[b] = c
                }, getScript: a.getScript, inArray: a.inArray, adapterRun: function (b, c) {
                    return a(b)[c]()
                }, grep: a.grep, map: function (a, c) {
                    for (var d = [], e = 0, f = a.length; e < f; e++)d[e] = c.call(a[e], a[e], e, a);
                    return d
                }, offset: function (b) {
                    return a(b).offset()
                }, addEvent: function (b, c, d) {
                    a(b).bind(c, d)
                }, removeEvent: function (b, c, d) {
                    var e = x.removeEventListener ? "removeEventListener" : "detachEvent";
                    x[e] && b && !b[e] && (b[e] = function () {
                    });
                    a(b).unbind(c, d)
                }, fireEvent: function (b,
                                        c, d, e) {
                    var f = a.Event(c), g = "detached" + c, h;
                    !Aa && d && (delete d.layerX, delete d.layerY, delete d.returnValue);
                    r(f, d);
                    b[c] && (b[g] = b[c], b[c] = null);
                    a.each(["preventDefault", "stopPropagation"], function (a, b) {
                        var c = f[b];
                        f[b] = function () {
                            try {
                                c.call(f)
                            } catch (a) {
                                b === "preventDefault" && (h = !0)
                            }
                        }
                    });
                    a(b).trigger(f);
                    b[g] && (b[c] = b[g], b[g] = null);
                    e && !f.isDefaultPrevented() && !h && e(f)
                }, washMouseEvent: function (a) {
                    var c = a.originalEvent || a;
                    if (c.pageX === u)c.pageX = a.pageX, c.pageY = a.pageY;
                    return c
                }, animate: function (b, c, d) {
                    var e =
                        a(b);
                    if (!b.style)b.style = {};
                    if (c.d)b.toD = c.d, c.d = 1;
                    e.stop();
                    c.opacity !== u && b.attr && (c.opacity += "px");
                    b.hasAnim = 1;
                    e.animate(c, d)
                }, stop: function (b) {
                    b.hasAnim && a(b).stop()
                }
            }
    })(G.jQuery);
    var T = G.HighchartsAdapter, M = T || {};
    T && T.init.call(T, vb);
    var ib = M.adapterRun, Rb = M.getScript, Ma = M.inArray, q = M.each, wb = M.grep, Sb = M.offset, Va = M.map, N = M.addEvent, X = M.removeEvent, I = M.fireEvent, Tb = M.washMouseEvent, jb = M.animate, bb = M.stop, M = {
        enabled: !0,
        x: 0,
        y: 15,
        style: {color: "#606060", cursor: "default", fontSize: "11px"}
    };
    E = {
        colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            decimalPoint: ".",
            numericSymbols: "k,M,G,T,P,E".split(","),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: ","
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com/4.0.4/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com/4.0.4/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {theme: {zIndex: 20}, position: {align: "right", x: -10, y: 10}}
        },
        title: {text: "Chart title", align: "center", margin: 15, style: {color: "#333333", fontSize: "18px"}},
        subtitle: {
            text: "",
            align: "center", style: {color: "#555555"}
        },
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {duration: 1E3},
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {enabled: !0, lineWidthPlus: 1, radiusPlus: 2},
                        select: {fillColor: "#FFFFFF", lineColor: "#000000", lineWidth: 2}
                    }
                },
                point: {events: {}},
                dataLabels: w(M, {
                    align: "center", enabled: !1, formatter: function () {
                        return this.y === null ? "" : Ba(this.y, -1)
                    }, verticalAlign: "bottom", y: 0
                }),
                cropThreshold: 300,
                pointRange: 0,
                states: {
                    hover: {
                        lineWidthPlus: 1,
                        marker: {}, halo: {size: 10, opacity: 0.25}
                    }, select: {marker: {}}
                },
                stickyTracking: !0,
                turboThreshold: 1E3
            }
        },
        labels: {style: {position: "absolute", color: "#3E576F"}},
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function () {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {activeColor: "#274b6d", inactiveColor: "#CCC"},
            shadow: !1,
            itemStyle: {color: "#333333", fontSize: "12px", fontWeight: "bold"},
            itemHoverStyle: {color: "#000"},
            itemHiddenStyle: {color: "#CCC"},
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px", height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {style: {fontWeight: "bold"}}
        },
        loading: {
            labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
            style: {position: "absolute", backgroundColor: "white", opacity: 0.5, textAlign: "center"}
        },
        tooltip: {
            enabled: !0,
            animation: ba,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: Ib ? 25 : 10,
            style: {color: "#333333", cursor: "default", fontSize: "12px", padding: "8px", whiteSpace: "nowrap"}
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
            style: {
                cursor: "pointer",
                color: "#909090", fontSize: "9px"
            }
        }
    };
    var ca = E.plotOptions, T = ca.line;
    Bb();
    var Ub = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, Vb = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, Wb = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, ya = function (a) {
        var b = [], c, d;
        (function (a) {
            a && a.stops ? d = Va(a.stops, function (a) {
                return ya(a[1])
            }) : (c = Ub.exec(a)) ? b = [y(c[1]), y(c[2]), y(c[3]), parseFloat(c[4], 10)] : (c = Vb.exec(a)) ? b = [y(c[1], 16), y(c[2], 16), y(c[3],
                16), 1] : (c = Wb.exec(a)) && (b = [y(c[1]), y(c[2]), y(c[3]), 1])
        })(a);
        return {
            get: function (c) {
                var f;
                d ? (f = w(a), f.stops = [].concat(f.stops), q(d, function (a, b) {
                    f.stops[b] = [f.stops[b][0], a.get(c)]
                })) : f = b && !isNaN(b[0]) ? c === "rgb" ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : c === "a" ? b[3] : "rgba(" + b.join(",") + ")" : a;
                return f
            }, brighten: function (a) {
                if (d)q(d, function (b) {
                    b.brighten(a)
                }); else if (ja(a) && a !== 0) {
                    var c;
                    for (c = 0; c < 3; c++)b[c] += y(a * 255), b[c] < 0 && (b[c] = 0), b[c] > 255 && (b[c] = 255)
                }
                return this
            }, rgba: b, setOpacity: function (a) {
                b[3] = a;
                return this
            }
        }
    };
    S.prototype = {
        opacity: 1,
        textProps: "fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow,HcTextStroke".split(","),
        init: function (a, b) {
            this.element = b === "span" ? $(b) : x.createElementNS(xa, b);
            this.renderer = a
        },
        animate: function (a, b, c) {
            b = p(b, va, !0);
            bb(this);
            if (b) {
                b = w(b, {});
                if (c)b.complete = c;
                jb(this, a, b)
            } else this.attr(a), c && c();
            return this
        },
        colorGradient: function (a, b, c) {
            var d = this.renderer, e, f, g, h, i, j, k, l, n, m, o = [];
            a.linearGradient ? f = "linearGradient" : a.radialGradient && (f = "radialGradient");
            if (f) {
                g = a[f];
                h = d.gradients;
                j = a.stops;
                n = c.radialReference;
                Ha(g) && (a[f] = g = {x1: g[0], y1: g[1], x2: g[2], y2: g[3], gradientUnits: "userSpaceOnUse"});
                f === "radialGradient" && n && !s(g.gradientUnits) && (g = w(g, {
                    cx: n[0] - n[2] / 2 + g.cx * n[2],
                    cy: n[1] - n[2] / 2 + g.cy * n[2],
                    r: g.r * n[2],
                    gradientUnits: "userSpaceOnUse"
                }));
                for (m in g)m !== "id" && o.push(m, g[m]);
                for (m in j)o.push(j[m]);
                o = o.join(",");
                h[o] ? a = h[o].attr("id") : (g.id = a = "highcharts-" + ub++, h[o] = i = d.createElement(f).attr(g).add(d.defs), i.stops = [], q(j, function (a) {
                    a[1].indexOf("rgba") ===
                    0 ? (e = ya(a[1]), k = e.get("rgb"), l = e.get("a")) : (k = a[1], l = 1);
                    a = d.createElement("stop").attr({offset: a[0], "stop-color": k, "stop-opacity": l}).add(i);
                    i.stops.push(a)
                }));
                c.setAttribute(b, "url(" + d.url + "#" + a + ")")
            }
        },
        attr: function (a, b) {
            var c, d, e = this.element, f, g = this, h;
            typeof a === "string" && b !== u && (c = a, a = {}, a[c] = b);
            if (typeof a === "string")g = (this[a + "Getter"] || this._defaultGetter).call(this, a, e); else {
                for (c in a) {
                    d = a[c];
                    h = !1;
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (f || (this.symbolAttr(a),
                        f = !0), h = !0);
                    if (this.rotation && (c === "x" || c === "y"))this.doTransform = !0;
                    h || (this[c + "Setter"] || this._defaultSetter).call(this, d, c, e);
                    this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, d)
                }
                if (this.doTransform)this.updateTransform(), this.doTransform = !1
            }
            return g
        },
        updateShadows: function (a, b) {
            for (var c = this.shadows, d = c.length; d--;)c[d].setAttribute(a, a === "height" ? t(b - (c[d].cutHeight || 0), 0) : a === "d" ? this.d : b)
        },
        addClass: function (a) {
            var b = this.element, c = F(b, "class") ||
                "";
            c.indexOf(a) === -1 && F(b, "class", c + " " + a);
            return this
        },
        symbolAttr: function (a) {
            var b = this;
            q("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function (c) {
                b[c] = p(a[c], b[c])
            });
            b.attr({d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)})
        },
        clip: function (a) {
            return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : P)
        },
        crisp: function (a) {
            var b, c = {}, d, e = a.strokeWidth || this.strokeWidth || 0;
            d = v(e) % 2 / 2;
            a.x = U(a.x || this.x || 0) + d;
            a.y = U(a.y || this.y || 0) + d;
            a.width = U((a.width || this.width ||
                0) - 2 * d);
            a.height = U((a.height || this.height || 0) - 2 * d);
            a.strokeWidth = e;
            for (b in a)this[b] !== a[b] && (this[b] = c[b] = a[b]);
            return c
        },
        css: function (a) {
            var b = this.styles, c = {}, d = this.element, e, f, g = "";
            e = !b;
            if (a && a.color)a.fill = a.color;
            if (b)for (f in a)a[f] !== b[f] && (c[f] = a[f], e = !0);
            if (e) {
                e = this.textWidth = a && a.width && d.nodeName.toLowerCase() === "text" && y(a.width);
                b && (a = r(b, c));
                this.styles = a;
                e && (ga || !ba && this.renderer.forExport) && delete a.width;
                if (Aa && !ba)B(this.element, a); else {
                    b = function (a, b) {
                        return "-" + b.toLowerCase()
                    };
                    for (f in a)g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
                    F(d, "style", g)
                }
                e && this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function (a, b) {
            var c = this, d = c.element;
            $a && a === "click" ? (d.ontouchstart = function (a) {
                c.touchEventFired = Da.now();
                a.preventDefault();
                b.call(d, a)
            }, d.onclick = function (a) {
                (wa.indexOf("Android") === -1 || Da.now() - (c.touchEventFired || 0) > 1100) && b.call(d, a)
            }) : d["on" + a] = b;
            return this
        },
        setRadialReference: function (a) {
            this.element.radialReference = a;
            return this
        },
        translate: function (a, b) {
            return this.attr({
                translateX: a,
                translateY: b
            })
        },
        invert: function () {
            this.inverted = !0;
            this.updateTransform();
            return this
        },
        updateTransform: function () {
            var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, d = this.scaleY, e = this.inverted, f = this.rotation, g = this.element;
            e && (a += this.attr("width"), b += this.attr("height"));
            a = ["translate(" + a + "," + b + ")"];
            e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")");
            (s(c) || s(d)) && a.push("scale(" + p(c, 1) + " " + p(d, 1) + ")");
            a.length && g.setAttribute("transform",
                a.join(" "))
        },
        toFront: function () {
            var a = this.element;
            a.parentNode.appendChild(a);
            return this
        },
        align: function (a, b, c) {
            var d, e, f, g, h = {};
            e = this.renderer;
            f = e.alignedObjects;
            if (a) {
                if (this.alignOptions = a, this.alignByTranslate = b, !c || Ga(c))this.alignTo = d = c || "renderer", la(f, this), f.push(this), c = null
            } else a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
            c = p(c, e[d], e);
            d = a.align;
            e = a.verticalAlign;
            f = (c.x || 0) + (a.x || 0);
            g = (c.y || 0) + (a.y || 0);
            if (d === "right" || d === "center")f += (c.width - (a.width || 0)) / {right: 1, center: 2}[d];
            h[b ? "translateX" : "x"] = v(f);
            if (e === "bottom" || e === "middle")g += (c.height - (a.height || 0)) / ({bottom: 1, middle: 2}[e] || 1);
            h[b ? "translateY" : "y"] = v(g);
            this[this.placed ? "animate" : "attr"](h);
            this.placed = !0;
            this.alignAttr = h;
            return this
        },
        getBBox: function () {
            var a = this.bBox, b = this.renderer, c, d, e = this.rotation;
            c = this.element;
            var f = this.styles, g = e * Ea;
            d = this.textStr;
            var h;
            if (d === "" || Pb.test(d))h = "num." + d.toString().length + (f ? "|" + f.fontSize + "|" + f.fontFamily : "");
            h && (a = b.cache[h]);
            if (!a) {
                if (c.namespaceURI === xa || b.forExport) {
                    try {
                        a =
                            c.getBBox ? r({}, c.getBBox()) : {width: c.offsetWidth, height: c.offsetHeight}
                    } catch (i) {
                    }
                    if (!a || a.width < 0)a = {width: 0, height: 0}
                } else a = this.htmlGetBBox();
                if (b.isSVG) {
                    c = a.width;
                    d = a.height;
                    if (Aa && f && f.fontSize === "11px" && d.toPrecision(3) === "16.9")a.height = d = 14;
                    if (e)a.width = Q(d * fa(g)) + Q(c * aa(g)), a.height = Q(d * aa(g)) + Q(c * fa(g))
                }
                this.bBox = a;
                h && (b.cache[h] = a)
            }
            return a
        },
        show: function (a) {
            a && this.element.namespaceURI === xa ? this.element.removeAttribute("visibility") : this.attr({visibility: a ? "inherit" : "visible"});
            return this
        },
        hide: function () {
            return this.attr({visibility: "hidden"})
        },
        fadeOut: function (a) {
            var b = this;
            b.animate({opacity: 0}, {
                duration: a || 150, complete: function () {
                    b.attr({y: -9999})
                }
            })
        },
        add: function (a) {
            var b = this.renderer, c = a || b, d = c.element || b.box, e = this.element, f = this.zIndex, g, h;
            if (a)this.parentGroup = a;
            this.parentInverted = a && a.inverted;
            this.textStr !== void 0 && b.buildText(this);
            if (f)c.handleZ = !0, f = y(f);
            if (c.handleZ) {
                a = d.childNodes;
                for (g = 0; g < a.length; g++)if (b = a[g], c = F(b, "zIndex"), b !== e && (y(c) > f || !s(f) && s(c))) {
                    d.insertBefore(e,
                        b);
                    h = !0;
                    break
                }
            }
            h || d.appendChild(e);
            this.added = !0;
            if (this.onAdd)this.onAdd();
            return this
        },
        safeRemoveChild: function (a) {
            var b = a.parentNode;
            b && b.removeChild(a)
        },
        destroy: function () {
            var a = this, b = a.element || {}, c = a.shadows, d = a.renderer.isSVG && b.nodeName === "SPAN" && a.parentGroup, e, f;
            b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
            bb(a);
            if (a.clipPath)a.clipPath = a.clipPath.destroy();
            if (a.stops) {
                for (f = 0; f < a.stops.length; f++)a.stops[f] = a.stops[f].destroy();
                a.stops = null
            }
            a.safeRemoveChild(b);
            for (c &&
                 q(c, function (b) {
                     a.safeRemoveChild(b)
                 }); d && d.div && d.div.childNodes.length === 0;)b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = b;
            a.alignTo && la(a.renderer.alignedObjects, a);
            for (e in a)delete a[e];
            return null
        },
        shadow: function (a, b, c) {
            var d = [], e, f, g = this.element, h, i, j, k;
            if (a) {
                i = p(a.width, 3);
                j = (a.opacity || 0.15) / i;
                k = this.parentInverted ? "(-1,-1)" : "(" + p(a.offsetX, 1) + ", " + p(a.offsetY, 1) + ")";
                for (e = 1; e <= i; e++) {
                    f = g.cloneNode(0);
                    h = i * 2 + 1 - 2 * e;
                    F(f, {
                        isShadow: "true", stroke: a.color || "black", "stroke-opacity": j *
                        e, "stroke-width": h, transform: "translate" + k, fill: P
                    });
                    if (c)F(f, "height", t(F(f, "height") - h, 0)), f.cutHeight = h;
                    b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g);
                    d.push(f)
                }
                this.shadows = d
            }
            return this
        },
        xGetter: function (a) {
            this.element.nodeName === "circle" && (a = {x: "cx", y: "cy"}[a] || a);
            return this._defaultGetter(a)
        },
        _defaultGetter: function (a) {
            a = p(this[a], this.element ? this.element.getAttribute(a) : null, 0);
            /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
            return a
        },
        dSetter: function (a, b, c) {
            a && a.join && (a = a.join(" "));
            /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
            c.setAttribute(b, a);
            this[b] = a
        },
        dashstyleSetter: function (a) {
            var b;
            if (a = a && a.toLowerCase()) {
                a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                for (b = a.length; b--;)a[b] = y(a[b]) * this["stroke-width"];
                a = a.join(",").replace("NaN", "none");
                this.element.setAttribute("stroke-dasharray", a)
            }
        },
        alignSetter: function (a) {
            this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
        },
        opacitySetter: function (a, b, c) {
            this[b] = a;
            c.setAttribute(b, a)
        },
        titleSetter: function (a) {
            var b = this.element.getElementsByTagName("title")[0];
            b || (b = x.createElementNS(xa, "title"), this.element.appendChild(b));
            b.textContent = p(a, "").replace(/<[^>]*>/g, "")
        },
        textSetter: function (a) {
            if (a !== this.textStr)delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this)
        },
        fillSetter: function (a, b,
                              c) {
            typeof a === "string" ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c)
        },
        zIndexSetter: function (a, b, c) {
            c.setAttribute(b, a);
            this[b] = a
        },
        _defaultSetter: function (a, b, c) {
            c.setAttribute(b, a)
        }
    };
    S.prototype.yGetter = S.prototype.xGetter;
    S.prototype.translateXSetter = S.prototype.translateYSetter = S.prototype.rotationSetter = S.prototype.verticalAlignSetter = S.prototype.scaleXSetter = S.prototype.scaleYSetter = function (a, b) {
        this[b] = a;
        this.doTransform = !0
    };
    S.prototype["stroke-widthSetter"] = S.prototype.strokeSetter = function (a,
                                                                             b, c) {
        this[b] = a;
        if (this.stroke && this["stroke-width"])this.strokeWidth = this["stroke-width"], S.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0; else if (b === "stroke-width" && a === 0 && this.hasStroke)c.removeAttribute("stroke"), this.hasStroke = !1
    };
    var ta = function () {
        this.init.apply(this, arguments)
    };
    ta.prototype = {
        Element: S, init: function (a, b, c, d, e) {
            var f = location, g, d = this.createElement("svg").attr({version: "1.1"}).css(this.getStyle(d));
            g = d.element;
            a.appendChild(g);
            a.innerHTML.indexOf("xmlns") === -1 && F(g, "xmlns", xa);
            this.isSVG = !0;
            this.box = g;
            this.boxWrapper = d;
            this.alignedObjects = [];
            this.url = (Ua || tb) && x.getElementsByTagName("base").length ? f.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
            this.createElement("desc").add().element.appendChild(x.createTextNode("Created with Highcharts 4.0.4"));
            this.defs = this.createElement("defs").add();
            this.forExport = e;
            this.gradients = {};
            this.cache = {};
            this.setSize(b, c, !1);
            var h;
            if (Ua && a.getBoundingClientRect)this.subPixelFix = b = function () {
                B(a, {left: 0, top: 0});
                h = a.getBoundingClientRect();
                B(a, {left: La(h.left) - h.left + "px", top: La(h.top) - h.top + "px"})
            }, b(), N(G, "resize", b)
        }, getStyle: function (a) {
            return this.style = r({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, a)
        }, isHidden: function () {
            return !this.boxWrapper.getBBox().width
        }, destroy: function () {
            var a = this.defs;
            this.box = null;
            this.boxWrapper = this.boxWrapper.destroy();
            Pa(this.gradients ||
                {});
            this.gradients = null;
            if (a)this.defs = a.destroy();
            this.subPixelFix && X(G, "resize", this.subPixelFix);
            return this.alignedObjects = null
        }, createElement: function (a) {
            var b = new this.Element;
            b.init(this, a);
            return b
        }, draw: function () {
        }, buildText: function (a) {
            for (var b = a.element, c = this, d = c.forExport, e = p(a.textStr, "").toString(), f = e.indexOf("<") !== -1, g = b.childNodes, h, i, j = F(b, "x"), k = a.styles, l = a.textWidth, n = k && k.lineHeight, m = k && k.HcTextStroke, o = g.length, Y = function (a) {
                return n ? y(n) : c.fontMetrics(/(px|em)$/.test(a &&
                    a.style.fontSize) ? a.style.fontSize : k && k.fontSize || c.style.fontSize || 12, a).h
            }; o--;)b.removeChild(g[o]);
            !f && !m && e.indexOf(" ") === -1 ? b.appendChild(x.createTextNode(e)) : (h = /<.*style="([^"]+)".*>/, i = /<.*href="(http[^"]+)".*>/, l && !a.added && this.box.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [e], e[e.length - 1] === "" && e.pop(), q(e, function (e,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            f) {
                var g, n = 0, e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                g = e.split("|||");
                q(g, function (e) {
                    if (e !== "" || g.length === 1) {
                        var m = {}, o = x.createElementNS(xa, "tspan"), p;
                        h.test(e) && (p = e.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), F(o, "style", p));
                        i.test(e) && !d && (F(o, "onclick", 'location.href="' + e.match(i)[1] + '"'), B(o, {cursor: "pointer"}));
                        e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                        if (e !== " ") {
                            o.appendChild(x.createTextNode(e));
                            if (n)m.dx = 0; else if (f &&
                                j !== null)m.x = j;
                            F(o, m);
                            b.appendChild(o);
                            !n && f && (!ba && d && B(o, {display: "block"}), F(o, "dy", Y(o)));
                            if (l)for (var e = e.replace(/([^\^])-/g, "$1- ").split(" "), m = g.length > 1 || e.length > 1 && k.whiteSpace !== "nowrap", q, D, s = k.HcHeight, t = [], u = Y(o), Lb = 1; m && (e.length || t.length);)delete a.bBox, q = a.getBBox(), D = q.width, !ba && c.forExport && (D = c.measureSpanWidth(o.firstChild.data, a.styles)), q = D > l, !q || e.length === 1 ? (e = t, t = [], e.length && (Lb++, s && Lb * u > s ? (e = ["..."], a.attr("title", a.textStr)) : (o = x.createElementNS(xa, "tspan"), F(o, {
                                dy: u,
                                x: j
                            }), p && F(o, "style", p), b.appendChild(o))), D > l && (l = D)) : (o.removeChild(o.firstChild), t.unshift(e.pop())), e.length && o.appendChild(x.createTextNode(e.join(" ").replace(/- /g, "-")));
                            n++
                        }
                    }
                })
            }))
        }, button: function (a, b, c, d, e, f, g, h, i) {
            var j = this.label(a, b, c, i, null, null, null, null, "button"), k = 0, l, n, m, o, p, q, a = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            }, e = w({
                "stroke-width": 1,
                stroke: "#CCCCCC",
                fill: {linearGradient: a, stops: [[0, "#FEFEFE"], [1, "#F6F6F6"]]},
                r: 2,
                padding: 5,
                style: {color: "black"}
            }, e);
            m = e.style;
            delete e.style;
            f = w(e, {
                stroke: "#68A",
                fill: {linearGradient: a, stops: [[0, "#FFF"], [1, "#ACF"]]}
            }, f);
            o = f.style;
            delete f.style;
            g = w(e, {stroke: "#68A", fill: {linearGradient: a, stops: [[0, "#9BD"], [1, "#CDF"]]}}, g);
            p = g.style;
            delete g.style;
            h = w(e, {style: {color: "#CCC"}}, h);
            q = h.style;
            delete h.style;
            N(j.element, Aa ? "mouseover" : "mouseenter", function () {
                k !== 3 && j.attr(f).css(o)
            });
            N(j.element, Aa ? "mouseout" : "mouseleave", function () {
                k !== 3 && (l = [e, f, g][k], n = [m, o, p][k], j.attr(l).css(n))
            });
            j.setState = function (a) {
                (j.state = k = a) ? a === 2 ? j.attr(g).css(p) : a === 3 && j.attr(h).css(q) :
                    j.attr(e).css(m)
            };
            return j.on("click", function () {
                k !== 3 && d.call(j)
            }).attr(e).css(r({cursor: "default"}, m))
        }, crispLine: function (a, b) {
            a[1] === a[4] && (a[1] = a[4] = v(a[1]) - b % 2 / 2);
            a[2] === a[5] && (a[2] = a[5] = v(a[2]) + b % 2 / 2);
            return a
        }, path: function (a) {
            var b = {fill: P};
            Ha(a) ? b.d = a : da(a) && r(b, a);
            return this.createElement("path").attr(b)
        }, circle: function (a, b, c) {
            a = da(a) ? a : {x: a, y: b, r: c};
            b = this.createElement("circle");
            b.xSetter = function (a) {
                this.element.setAttribute("cx", a)
            };
            b.ySetter = function (a) {
                this.element.setAttribute("cy",
                    a)
            };
            return b.attr(a)
        }, arc: function (a, b, c, d, e, f) {
            if (da(a))b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x;
            a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {innerR: d || 0, start: e || 0, end: f || 0});
            a.r = c;
            return a
        }, rect: function (a, b, c, d, e, f) {
            var e = da(a) ? a.r : e, g = this.createElement("rect"), a = da(a) ? a : a === u ? {} : {
                x: a,
                y: b,
                width: t(c, 0),
                height: t(d, 0)
            };
            if (f !== u)a.strokeWidth = f, a = g.crisp(a);
            if (e)a.r = e;
            g.rSetter = function (a) {
                F(this.element, {rx: a, ry: a})
            };
            return g.attr(a)
        }, setSize: function (a, b, c) {
            var d = this.alignedObjects, e = d.length;
            this.width = a;
            this.height = b;
            for (this.boxWrapper[p(c, !0) ? "animate" : "attr"]({width: a, height: b}); e--;)d[e].align()
        }, g: function (a) {
            var b = this.createElement("g");
            return s(a) ? b.attr({"class": "highcharts-" + a}) : b
        }, image: function (a, b, c, d, e) {
            var f = {preserveAspectRatio: P};
            arguments.length > 1 && r(f, {x: b, y: c, width: d, height: e});
            f = this.createElement("image").attr(f);
            f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a);
            return f
        }, symbol: function (a,
                             b, c, d, e, f) {
            var g, h = this.symbols[a], h = h && h(v(b), v(c), d, e, f), i = /^url\((.*?)\)$/, j, k;
            if (h)g = this.path(h), r(g, {
                symbolName: a,
                x: b,
                y: c,
                width: d,
                height: e
            }), f && r(g, f); else if (i.test(a))k = function (a, b) {
                a.element && (a.attr({
                    width: b[0],
                    height: b[1]
                }), a.alignByTranslate || a.translate(v((d - b[0]) / 2), v((e - b[1]) / 2)))
            }, j = a.match(i)[1], a = Jb[j] || f && f.width && f.height && [f.width, f.height], g = this.image(j).attr({
                x: b,
                y: c
            }), g.isImg = !0, a ? k(g, a) : (g.attr({width: 0, height: 0}), $("img", {
                onload: function () {
                    k(g, Jb[j] = [this.width, this.height])
                },
                src: j
            }));
            return g
        }, symbols: {
            circle: function (a, b, c, d) {
                var e = 0.166 * c;
                return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"]
            }, square: function (a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
            }, triangle: function (a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
            }, "triangle-down": function (a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c / 2, b + d, "Z"]
            }, diamond: function (a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
            }, arc: function (a, b, c, d, e) {
                var f = e.start, c = e.r || c || d, g = e.end -
                    0.001, d = e.innerR, h = e.open, i = aa(f), j = fa(f), k = aa(g), g = fa(g), e = e.end - f < oa ? 0 : 1;
                return ["M", a + c * i, b + c * j, "A", c, c, 0, e, 1, a + c * k, b + c * g, h ? "M" : "L", a + d * k, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * j, h ? "" : "Z"]
            }, callout: function (a, b, c, d, e) {
                var f = L(e && e.r || 0, c, d), g = f + 6, h = e && e.anchorX, i = e && e.anchorY, e = v(e.strokeWidth || 0) % 2 / 2;
                a += e;
                b += e;
                e = ["M", a + f, b, "L", a + c - f, b, "C", a + c, b, a + c, b, a + c, b + f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b];
                h && h > c && i > b + g && i < b + d - g ? e.splice(13, 3,
                    "L", a + c, i - 6, a + c + 6, i, a + c, i + 6, a + c, b + d - f) : h && h < 0 && i > b + g && i < b + d - g ? e.splice(33, 3, "L", a, i + 6, a - 6, i, a, i - 6, a, b + f) : i && i > d && h > a + g && h < a + c - g ? e.splice(23, 3, "L", h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) : i && i < 0 && h > a + g && h < a + c - g && e.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, c - f, b);
                return e
            }
        }, clipRect: function (a, b, c, d) {
            var e = "highcharts-" + ub++, f = this.createElement("clipPath").attr({id: e}).add(this.defs), a = this.rect(a, b, c, d, 0).add(f);
            a.id = e;
            a.clipPath = f;
            return a
        }, text: function (a, b, c, d) {
            var e = ga || !ba && this.forExport, f = {};
            if (d && !this.forExport)return this.html(a,
                b, c);
            f.x = Math.round(b || 0);
            if (c)f.y = Math.round(c);
            if (a || a === 0)f.text = a;
            a = this.createElement("text").attr(f);
            e && a.css({position: "absolute"});
            if (!d)a.xSetter = function (a, b, c) {
                var d = c.getElementsByTagName("tspan"), e, f = c.getAttribute(b), n;
                for (n = 0; n < d.length; n++)e = d[n], e.getAttribute(b) === f && e.setAttribute(b, a);
                c.setAttribute(b, a)
            };
            return a
        }, fontMetrics: function (a, b) {
            a = a || this.style.fontSize;
            if (b && G.getComputedStyle)b = b.element || b, a = G.getComputedStyle(b, "").fontSize;
            var a = /px/.test(a) ? y(a) : /em/.test(a) ?
            parseFloat(a) * 12 : 12, c = a < 24 ? a + 4 : v(a * 1.2), d = v(c * 0.8);
            return {h: c, b: d, f: a}
        }, label: function (a, b, c, d, e, f, g, h, i) {
            function j() {
                var a, b;
                a = o.element.style;
                D = (t === void 0 || xb === void 0 || m.styles.textAlign) && o.textStr && o.getBBox();
                m.width = (t || D.width || 0) + 2 * C + kb;
                m.height = (xb || D.height || 0) + 2 * C;
                R = C + n.fontMetrics(a && a.fontSize, o).b;
                if (y) {
                    if (!p)a = v(-J * C), b = h ? -R : 0, m.box = p = d ? n.symbol(d, a, b, m.width, m.height, z) : n.rect(a, b, m.width, m.height, 0, z[Qb]), p.attr("fill", P).add(m);
                    p.isImg || p.attr(r({width: v(m.width), height: v(m.height)},
                        z));
                    z = null
                }
            }

            function k() {
                var a = m.styles, a = a && a.textAlign, b = kb + C * (1 - J), c;
                c = h ? 0 : R;
                if (s(t) && D && (a === "center" || a === "right"))b += {center: 0.5, right: 1}[a] * (t - D.width);
                if (b !== o.x || c !== o.y)o.attr("x", b), c !== u && o.attr("y", c);
                o.x = b;
                o.y = c
            }

            function l(a, b) {
                p ? p.attr(a, b) : z[a] = b
            }

            var n = this, m = n.g(i), o = n.text("", 0, 0, g).attr({zIndex: 1}), p, D, J = 0, C = 3, kb = 0, t, xb, yb, x, Kb = 0, z = {}, R, y;
            m.onAdd = function () {
                o.add(m);
                m.attr({text: a || a === 0 ? a : "", x: b, y: c});
                p && s(e) && m.attr({anchorX: e, anchorY: f})
            };
            m.widthSetter = function (a) {
                t = a
            };
            m.heightSetter =
                function (a) {
                    xb = a
                };
            m.paddingSetter = function (a) {
                s(a) && a !== C && (C = a, k())
            };
            m.paddingLeftSetter = function (a) {
                s(a) && a !== kb && (kb = a, k())
            };
            m.alignSetter = function (a) {
                J = {left: 0, center: 0.5, right: 1}[a]
            };
            m.textSetter = function (a) {
                a !== u && o.textSetter(a);
                j();
                k()
            };
            m["stroke-widthSetter"] = function (a, b) {
                a && (y = !0);
                Kb = a % 2 / 2;
                l(b, a)
            };
            m.strokeSetter = m.fillSetter = m.rSetter = function (a, b) {
                b === "fill" && a && (y = !0);
                l(b, a)
            };
            m.anchorXSetter = function (a, b) {
                e = a;
                l(b, a + Kb - yb)
            };
            m.anchorYSetter = function (a, b) {
                f = a;
                l(b, a - x)
            };
            m.xSetter = function (a) {
                m.x =
                    a;
                J && (a -= J * ((t || D.width) + C));
                yb = v(a);
                m.attr("translateX", yb)
            };
            m.ySetter = function (a) {
                x = m.y = v(a);
                m.attr("translateY", x)
            };
            var A = m.css;
            return r(m, {
                css: function (a) {
                    if (a) {
                        var b = {}, a = w(a);
                        q(m.textProps, function (c) {
                            a[c] !== u && (b[c] = a[c], delete a[c])
                        });
                        o.css(b)
                    }
                    return A.call(m, a)
                }, getBBox: function () {
                    return {width: D.width + 2 * C, height: D.height + 2 * C, x: D.x - C, y: D.y - C}
                }, shadow: function (a) {
                    p && p.shadow(a);
                    return m
                }, destroy: function () {
                    X(m.element, "mouseenter");
                    X(m.element, "mouseleave");
                    o && (o = o.destroy());
                    p && (p = p.destroy());
                    S.prototype.destroy.call(m);
                    m = n = j = k = l = null
                }
            })
        }
    };
    Za = ta;
    r(S.prototype, {
        htmlCss: function (a) {
            var b = this.element;
            if (b = a && b.tagName === "SPAN" && a.width)delete a.width, this.textWidth = b, this.updateTransform();
            this.styles = r(this.styles, a);
            B(this.element, a);
            return this
        }, htmlGetBBox: function () {
            var a = this.element, b = this.bBox;
            if (!b) {
                if (a.nodeName === "text")a.style.position = "absolute";
                b = this.bBox = {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
            }
            return b
        }, htmlUpdateTransform: function () {
            if (this.added) {
                var a =
                    this.renderer, b = this.element, c = this.translateX || 0, d = this.translateY || 0, e = this.x || 0, f = this.y || 0, g = this.textAlign || "left", h = {
                    left: 0,
                    center: 0.5,
                    right: 1
                }[g], i = this.shadows;
                B(b, {marginLeft: c, marginTop: d});
                i && q(i, function (a) {
                    B(a, {marginLeft: c + 1, marginTop: d + 1})
                });
                this.inverted && q(b.childNodes, function (c) {
                    a.invertChild(c, b)
                });
                if (b.tagName === "SPAN") {
                    var j = this.rotation, k, l = y(this.textWidth), n = [j, g, b.innerHTML, this.textWidth].join(",");
                    if (n !== this.cTT) {
                        k = a.fontMetrics(b.style.fontSize).b;
                        s(j) && this.setSpanRotation(j,
                            h, k);
                        i = p(this.elemWidth, b.offsetWidth);
                        if (i > l && /[ \-]/.test(b.textContent || b.innerText))B(b, {
                            width: l + "px",
                            display: "block",
                            whiteSpace: "normal"
                        }), i = l;
                        this.getSpanCorrection(i, k, h, j, g)
                    }
                    B(b, {left: e + (this.xCorr || 0) + "px", top: f + (this.yCorr || 0) + "px"});
                    if (tb)k = b.offsetHeight;
                    this.cTT = n
                }
            } else this.alignOnAdd = !0
        }, setSpanRotation: function (a, b, c) {
            var d = {}, e = Aa ? "-ms-transform" : tb ? "-webkit-transform" : Ua ? "MozTransform" : Hb ? "-o-transform" : "";
            d[e] = d.transform = "rotate(" + a + "deg)";
            d[e + (Ua ? "Origin" : "-origin")] = d.transformOrigin =
                b * 100 + "% " + c + "px";
            B(this.element, d)
        }, getSpanCorrection: function (a, b, c) {
            this.xCorr = -a * c;
            this.yCorr = -b
        }
    });
    r(ta.prototype, {
        html: function (a, b, c) {
            var d = this.createElement("span"), e = d.element, f = d.renderer;
            d.textSetter = function (a) {
                a !== e.innerHTML && delete this.bBox;
                e.innerHTML = this.textStr = a
            };
            d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function (a, b) {
                b === "align" && (b = "textAlign");
                d[b] = a;
                d.htmlUpdateTransform()
            };
            d.attr({text: a, x: v(b), y: v(c)}).css({
                position: "absolute", whiteSpace: "nowrap", fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize
            });
            d.css = d.htmlCss;
            if (f.isSVG)d.add = function (a) {
                var b, c = f.box.parentNode, j = [];
                if (this.parentGroup = a) {
                    if (b = a.div, !b) {
                        for (; a;)j.push(a), a = a.parentGroup;
                        q(j.reverse(), function (a) {
                            var d;
                            b = a.div = a.div || $(Ka, {className: F(a.element, "class")}, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px"
                                }, b || c);
                            d = b.style;
                            r(a, {
                                translateXSetter: function (b, c) {
                                    d.left = b + "px";
                                    a[c] = b;
                                    a.doTransform = !0
                                }, translateYSetter: function (b, c) {
                                    d.top = b + "px";
                                    a[c] = b;
                                    a.doTransform = !0
                                }, visibilitySetter: function (a,
                                                               b) {
                                    d[b] = a
                                }
                            })
                        })
                    }
                } else b = c;
                b.appendChild(e);
                d.added = !0;
                d.alignOnAdd && d.htmlUpdateTransform();
                return d
            };
            return d
        }
    });
    var Z;
    if (!ba && !ga) {
        Z = {
            init: function (a, b) {
                var c = ["<", b, ' filled="f" stroked="f"'], d = ["position: ", "absolute", ";"], e = b === Ka;
                (b === "shape" || e) && d.push("left:0;top:0;width:1px;height:1px;");
                d.push("visibility: ", e ? "hidden" : "visible");
                c.push(' style="', d.join(""), '"/>');
                if (b)c = e || b === "span" || b === "img" ? c.join("") : a.prepVML(c), this.element = $(c);
                this.renderer = a
            }, add: function (a) {
                var b = this.renderer,
                    c = this.element, d = b.box, d = a ? a.element || a : d;
                a && a.inverted && b.invertChild(c, d);
                d.appendChild(c);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd)this.onAdd();
                return this
            }, updateTransform: S.prototype.htmlUpdateTransform, setSpanRotation: function () {
                var a = this.rotation, b = aa(a * Ea), c = fa(a * Ea);
                B(this.element, {filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : P})
            }, getSpanCorrection: function (a,
                                            b, c, d, e) {
                var f = d ? aa(d * Ea) : 1, g = d ? fa(d * Ea) : 0, h = p(this.elemHeight, this.element.offsetHeight), i;
                this.xCorr = f < 0 && -a;
                this.yCorr = g < 0 && -h;
                i = f * g < 0;
                this.xCorr += g * b * (i ? 1 - c : c);
                this.yCorr -= f * b * (d ? i ? c : 1 - c : 1);
                e && e !== "left" && (this.xCorr -= a * c * (f < 0 ? -1 : 1), d && (this.yCorr -= h * c * (g < 0 ? -1 : 1)), B(this.element, {textAlign: e}))
            }, pathToVML: function (a) {
                for (var b = a.length, c = []; b--;)if (ja(a[b]))c[b] = v(a[b] * 10) - 5; else if (a[b] === "Z")c[b] = "x"; else if (c[b] = a[b], a.isArc && (a[b] === "wa" || a[b] === "at"))c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b +
                5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1);
                return c.join(" ") || "x"
            }, clip: function (a) {
                var b = this, c;
                a ? (c = a.members, la(c, b), c.push(b), b.destroyClip = function () {
                    la(c, b)
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {clip: hb ? "inherit" : "rect(auto)"});
                return b.css(a)
            }, css: S.prototype.htmlCss, safeRemoveChild: function (a) {
                a.parentNode && Qa(a)
            }, destroy: function () {
                this.destroyClip && this.destroyClip();
                return S.prototype.destroy.apply(this)
            }, on: function (a, b) {
                this.element["on" + a] = function () {
                    var a =
                        G.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            }, cutOffPath: function (a, b) {
                var c, a = a.split(/[ ,]/);
                c = a.length;
                if (c === 9 || c === 11)a[c - 4] = a[c - 2] = y(a[c - 2]) - 10 * b;
                return a.join(" ")
            }, shadow: function (a, b, c) {
                var d = [], e, f = this.element, g = this.renderer, h, i = f.style, j, k = f.path, l, n, m, o;
                k && typeof k.value !== "string" && (k = "x");
                n = k;
                if (a) {
                    m = p(a.width, 3);
                    o = (a.opacity || 0.15) / m;
                    for (e = 1; e <= 3; e++) {
                        l = m * 2 + 1 - 2 * e;
                        c && (n = this.cutOffPath(k.value, l + 0.5));
                        j = ['<shape isShadow="true" strokeweight="', l, '" filled="false" path="', n, '" coordsize="10 10" style="',
                            f.style.cssText, '" />'];
                        h = $(g.prepVML(j), null, {left: y(i.left) + p(a.offsetX, 1), top: y(i.top) + p(a.offsetY, 1)});
                        if (c)h.cutOff = l + 1;
                        j = ['<stroke color="', a.color || "black", '" opacity="', o * e, '"/>'];
                        $(g.prepVML(j), null, null, h);
                        b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f);
                        d.push(h)
                    }
                    this.shadows = d
                }
                return this
            }, updateShadows: sa, setAttr: function (a, b) {
                hb ? this.element[a] = b : this.element.setAttribute(a, b)
            }, classSetter: function (a) {
                this.element.className = a
            }, dashstyleSetter: function (a, b, c) {
                (c.getElementsByTagName("stroke")[0] ||
                $(this.renderer.prepVML(["<stroke/>"]), null, null, c))[b] = a || "solid";
                this[b] = a
            }, dSetter: function (a, b, c) {
                var d = this.shadows, a = a || [];
                this.d = a.join && a.join(" ");
                c.path = a = this.pathToVML(a);
                if (d)for (c = d.length; c--;)d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
                this.setAttr(b, a)
            }, fillSetter: function (a, b, c) {
                var d = c.nodeName;
                if (d === "SPAN")c.style.color = a; else if (d !== "IMG")c.filled = a !== P, this.setAttr("fillcolor", this.renderer.color(a, c, b, this))
            }, opacitySetter: sa, rotationSetter: function (a, b, c) {
                c = c.style;
                this[b] = c[b] = a;
                c.left = -v(fa(a * Ea) + 1) + "px";
                c.top = v(aa(a * Ea)) + "px"
            }, strokeSetter: function (a, b, c) {
                this.setAttr("strokecolor", this.renderer.color(a, c, b))
            }, "stroke-widthSetter": function (a, b, c) {
                c.stroked = !!a;
                this[b] = a;
                ja(a) && (a += "px");
                this.setAttr("strokeweight", a)
            }, titleSetter: function (a, b) {
                this.setAttr(b, a)
            }, visibilitySetter: function (a, b, c) {
                a === "inherit" && (a = "visible");
                this.shadows && q(this.shadows, function (c) {
                    c.style[b] = a
                });
                c.nodeName === "DIV" && (a = a === "hidden" ? "-999em" : 0, hb || (c.style[b] = a ? "visible" : "hidden"),
                    b = "top");
                c.style[b] = a
            }, xSetter: function (a, b, c) {
                this[b] = a;
                b === "x" ? b = "left" : b === "y" && (b = "top");
                this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
            }, zIndexSetter: function (a, b, c) {
                c.style[b] = a
            }
        };
        K.VMLElement = Z = ma(S, Z);
        Z.prototype.ySetter = Z.prototype.widthSetter = Z.prototype.heightSetter = Z.prototype.xSetter;
        var ia = {
            Element: Z, isIE8: wa.indexOf("MSIE 8.0") > -1, init: function (a, b, c, d) {
                var e;
                this.alignedObjects = [];
                d = this.createElement(Ka).css(r(this.getStyle(d), {position: "relative"}));
                e = d.element;
                a.appendChild(d.element);
                this.isVML = !0;
                this.box = e;
                this.boxWrapper = d;
                this.cache = {};
                this.setSize(b, c, !1);
                if (!x.namespaces.hcv) {
                    x.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        x.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (f) {
                        x.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            }, isHidden: function () {
                return !this.box.offsetWidth
            },
            clipRect: function (a, b, c, d) {
                var e = this.createElement(), f = da(a);
                return r(e, {
                    members: [],
                    left: (f ? a.x : a) + 1,
                    top: (f ? a.y : b) + 1,
                    width: (f ? a.width : c) - 1,
                    height: (f ? a.height : d) - 1,
                    getCSS: function (a) {
                        var b = a.element, c = b.nodeName, a = a.inverted, d = this.top - (c === "shape" ? b.offsetTop : 0), e = this.left, b = e + this.width, f = d + this.height, d = {clip: "rect(" + v(a ? e : d) + "px," + v(a ? f : b) + "px," + v(a ? b : f) + "px," + v(a ? d : e) + "px)"};
                        !a && hb && c === "DIV" && r(d, {width: b + "px", height: f + "px"});
                        return d
                    },
                    updateClipping: function () {
                        q(e.members, function (a) {
                            a.element &&
                            a.css(e.getCSS(a))
                        })
                    }
                })
            }, color: function (a, b, c, d) {
                var e = this, f, g = /^rgba/, h, i, j = P;
                a && a.linearGradient ? i = "gradient" : a && a.radialGradient && (i = "pattern");
                if (i) {
                    var k, l, n = a.linearGradient || a.radialGradient, m, o, p, D, J, C = "", a = a.stops, t, s = [], u = function () {
                        h = ['<fill colors="' + s.join(",") + '" opacity="', p, '" o:opacity2="', o, '" type="', i, '" ', C, 'focus="100%" method="any" />'];
                        $(e.prepVML(h), null, null, b)
                    };
                    m = a[0];
                    t = a[a.length - 1];
                    m[0] > 0 && a.unshift([0, m[1]]);
                    t[0] < 1 && a.push([1, t[1]]);
                    q(a, function (a, b) {
                        g.test(a[1]) ? (f =
                            ya(a[1]), k = f.get("rgb"), l = f.get("a")) : (k = a[1], l = 1);
                        s.push(a[0] * 100 + "% " + k);
                        b ? (p = l, D = k) : (o = l, J = k)
                    });
                    if (c === "fill")if (i === "gradient")c = n.x1 || n[0] || 0, a = n.y1 || n[1] || 0, m = n.x2 || n[2] || 0, n = n.y2 || n[3] || 0, C = 'angle="' + (90 - V.atan((n - a) / (m - c)) * 180 / oa) + '"', u(); else {
                        var j = n.r, r = j * 2, v = j * 2, x = n.cx, z = n.cy, R = b.radialReference, w, j = function () {
                            R && (w = d.getBBox(), x += (R[0] - w.x) / w.width - 0.5, z += (R[1] - w.y) / w.height - 0.5, r *= R[2] / w.width, v *= R[2] / w.height);
                            C = 'src="' + E.global.VMLRadialGradientURL + '" size="' + r + "," + v + '" origin="0.5,0.5" position="' +
                                x + "," + z + '" color2="' + J + '" ';
                            u()
                        };
                        d.added ? j() : d.onAdd = j;
                        j = D
                    } else j = k
                } else if (g.test(a) && b.tagName !== "IMG")f = ya(a), h = ["<", c, ' opacity="', f.get("a"), '"/>'], $(this.prepVML(h), null, null, b), j = f.get("rgb"); else {
                    j = b.getElementsByTagName(c);
                    if (j.length)j[0].opacity = 1, j[0].type = "solid";
                    j = a
                }
                return j
            }, prepVML: function (a) {
                var b = this.isIE8, a = a.join("");
                b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = a.indexOf('style="') === -1 ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') :
                    a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:");
                return a
            }, text: ta.prototype.html, path: function (a) {
                var b = {coordsize: "10 10"};
                Ha(a) ? b.d = a : da(a) && r(b, a);
                return this.createElement("shape").attr(b)
            }, circle: function (a, b, c) {
                var d = this.symbol("circle");
                if (da(a))c = a.r, b = a.y, a = a.x;
                d.isCircle = !0;
                d.r = c;
                return d.attr({x: a, y: b})
            }, g: function (a) {
                var b;
                a && (b = {className: "highcharts-" + a, "class": "highcharts-" + a});
                return this.createElement(Ka).attr(b)
            }, image: function (a,
                                b, c, d, e) {
                var f = this.createElement("img").attr({src: a});
                arguments.length > 1 && f.attr({x: b, y: c, width: d, height: e});
                return f
            }, createElement: function (a) {
                return a === "rect" ? this.symbol(a) : ta.prototype.createElement.call(this, a)
            }, invertChild: function (a, b) {
                var c = this, d = b.style, e = a.tagName === "IMG" && a.style;
                B(a, {
                    flip: "x",
                    left: y(d.width) - (e ? y(e.top) : 1),
                    top: y(d.height) - (e ? y(e.left) : 1),
                    rotation: -90
                });
                q(a.childNodes, function (b) {
                    c.invertChild(b, a)
                })
            }, symbols: {
                arc: function (a, b, c, d, e) {
                    var f = e.start, g = e.end, h = e.r || c ||
                        d, c = e.innerR, d = aa(f), i = fa(f), j = aa(g), k = fa(g);
                    if (g - f === 0)return ["x"];
                    f = ["wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k];
                    e.open && !c && f.push("e", "M", a, b);
                    f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e");
                    f.isArc = !0;
                    return f
                }, circle: function (a, b, c, d, e) {
                    e && (c = d = 2 * e.r);
                    e && e.isCircle && (a -= c / 2, b -= d / 2);
                    return ["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"]
                }, rect: function (a, b, c, d, e) {
                    return ta.prototype.symbols[!s(e) || !e.r ? "square" : "callout"].call(0, a, b, c, d, e)
                }
            }
        };
        K.VMLRenderer = Z = function () {
            this.init.apply(this,
                arguments)
        };
        Z.prototype = w(ta.prototype, ia);
        Za = Z
    }
    ta.prototype.measureSpanWidth = function (a, b) {
        var c = x.createElement("span"), d;
        d = x.createTextNode(a);
        c.appendChild(d);
        B(c, b);
        this.box.appendChild(c);
        d = c.offsetWidth;
        Qa(c);
        return d
    };
    var Mb;
    if (ga)K.CanVGRenderer = Z = function () {
        xa = "http://www.w3.org/1999/xhtml"
    }, Z.prototype.symbols = {}, Mb = function () {
        function a() {
            var a = b.length, d;
            for (d = 0; d < a; d++)b[d]();
            b = []
        }

        var b = [];
        return {
            push: function (c, d) {
                b.length === 0 && Rb(d, a);
                b.push(c)
            }
        }
    }(), Za = Z;
    Ta.prototype = {
        addLabel: function () {
            var a =
                this.axis, b = a.options, c = a.chart, d = a.horiz, e = a.categories, f = a.names, g = this.pos, h = b.labels, i = h.rotation, j = a.tickPositions, d = d && e && !h.step && !h.staggerLines && !h.rotation && c.plotWidth / j.length || !d && (c.margin[3] || c.chartWidth * 0.33), k = g === j[0], l = g === j[j.length - 1], n, f = e ? p(e[g], f[g], g) : g, e = this.label, m = j.info;
            a.isDatetimeAxis && m && (n = b.dateTimeLabelFormats[m.higherRanks[g] || m.unitName]);
            this.isFirst = k;
            this.isLast = l;
            b = a.labelFormatter.call({
                axis: a, chart: c, isFirst: k, isLast: l, dateTimeLabelFormat: n, value: a.isLog ?
                    ea(ka(f)) : f
            });
            g = d && {width: t(1, v(d - 2 * (h.padding || 10))) + "px"};
            if (s(e))e && e.attr({text: b}).css(g); else {
                n = {align: a.labelAlign};
                if (ja(i))n.rotation = i;
                if (d && h.ellipsis)g.HcHeight = a.len / j.length;
                this.label = e = s(b) && h.enabled ? c.renderer.text(b, 0, 0, h.useHTML).attr(n).css(r(g, h.style)).add(a.labelGroup) : null;
                a.tickBaseline = c.renderer.fontMetrics(h.style.fontSize, e).b;
                i && a.side === 2 && (a.tickBaseline *= aa(i * Ea))
            }
            this.yOffset = e ? p(h.y, a.tickBaseline + (a.side === 2 ? 8 : -(e.getBBox().height / 2))) : 0
        }, getLabelSize: function () {
            var a =
                this.label, b = this.axis;
            return a ? a.getBBox()[b.horiz ? "height" : "width"] : 0
        }, getLabelSides: function () {
            var a = this.label.getBBox(), b = this.axis, c = b.horiz, d = b.options.labels, a = c ? a.width : a.height, b = c ? d.x - a * {
                left: 0,
                center: 0.5,
                right: 1
            }[b.labelAlign] : 0;
            return [b, c ? a + b : a]
        }, handleOverflow: function (a, b) {
            var c = !0, d = this.axis, e = this.isFirst, f = this.isLast, g = d.horiz ? b.x : b.y, h = d.reversed, i = d.tickPositions, j = this.getLabelSides(), k = j[0], j = j[1], l, n, m, o = this.label.line;
            l = o || 0;
            n = d.labelEdge;
            m = d.justifyLabels && (e || f);
            n[l] ===
            u || g + k > n[l] ? n[l] = g + j : m || (c = !1);
            if (m) {
                l = (n = d.justifyToPlot) ? d.pos : 0;
                n = n ? l + d.len : d.chart.chartWidth;
                do a += e ? 1 : -1, m = d.ticks[i[a]]; while (i[a] && (!m || !m.label || m.label.line !== o));
                d = m && m.label.xy && m.label.xy.x + m.getLabelSides()[e ? 0 : 1];
                e && !h || f && h ? g + k < l && (g = l - k, m && g + j > d && (c = !1)) : g + j > n && (g = n - j, m && g + k < d && (c = !1));
                b.x = g
            }
            return c
        }, getPosition: function (a, b, c, d) {
            var e = this.axis, f = e.chart, g = d && f.oldChartHeight || f.chartHeight;
            return {
                x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth ||
                f.chartWidth) - e.right - e.left : 0),
                y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
            }
        }, getLabelPosition: function (a, b, c, d, e, f, g, h) {
            var i = this.axis, j = i.transA, k = i.reversed, l = i.staggerLines, a = a + e.x - (f && d ? f * j * (k ? -1 : 1) : 0), b = b + this.yOffset - (f && !d ? f * j * (k ? 1 : -1) : 0);
            if (l)c.line = g / (h || 1) % l, b += c.line * (i.labelOffset / l);
            return {x: a, y: b}
        }, getMarkPath: function (a, b, c, d, e, f) {
            return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
        }, render: function (a, b, c) {
            var d = this.axis, e = d.options,
                f = d.chart.renderer, g = d.horiz, h = this.type, i = this.label, j = this.pos, k = e.labels, l = this.gridLine, n = h ? h + "Grid" : "grid", m = h ? h + "Tick" : "tick", o = e[n + "LineWidth"], q = e[n + "LineColor"], D = e[n + "LineDashStyle"], J = e[m + "Length"], n = e[m + "Width"] || 0, C = e[m + "Color"], t = e[m + "Position"], m = this.mark, s = k.step, r = !0, v = d.tickmarkOffset, w = this.getPosition(g, j, v, b), x = w.x, w = w.y, z = g && x === d.pos + d.len || !g && w === d.pos ? -1 : 1, c = p(c, 1);
            this.isActive = !0;
            if (o) {
                j = d.getPlotLinePath(j + v, o * z, b, !0);
                if (l === u) {
                    l = {stroke: q, "stroke-width": o};
                    if (D)l.dashstyle =
                        D;
                    if (!h)l.zIndex = 1;
                    if (b)l.opacity = 0;
                    this.gridLine = l = o ? f.path(j).attr(l).add(d.gridGroup) : null
                }
                if (!b && l && j)l[this.isNew ? "attr" : "animate"]({d: j, opacity: c})
            }
            if (n && J)t === "inside" && (J = -J), d.opposite && (J = -J), h = this.getMarkPath(x, w, J, n * z, g, f), m ? m.animate({
                d: h,
                opacity: c
            }) : this.mark = f.path(h).attr({stroke: C, "stroke-width": n, opacity: c}).add(d.axisGroup);
            if (i && !isNaN(x))i.xy = w = this.getLabelPosition(x, w, i, g, k, v, a, s), this.isFirst && !this.isLast && !p(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !p(e.showLastLabel,
                1) ? r = !1 : !d.isRadial && !k.step && !k.rotation && !b && c !== 0 && (r = this.handleOverflow(a, w)), s && a % s && (r = !1), r && !isNaN(w.y) ? (w.opacity = c, i[this.isNew ? "attr" : "animate"](w), this.isNew = !1) : i.attr("y", -9999)
        }, destroy: function () {
            Pa(this, this.axis)
        }
    };
    K.PlotLineOrBand = function (a, b) {
        this.axis = a;
        if (b)this.options = b, this.id = b.id
    };
    K.PlotLineOrBand.prototype = {
        render: function () {
            var a = this, b = a.axis, c = b.horiz, d = (b.pointRange || 0) / 2, e = a.options, f = e.label, g = a.label, h = e.width, i = e.to, j = e.from, k = s(j) && s(i), l = e.value, n = e.dashStyle,
                m = a.svgElem, o = [], p, q = e.color, J = e.zIndex, C = e.events, r = {}, u = b.chart.renderer;
            b.isLog && (j = za(j), i = za(i), l = za(l));
            if (h) {
                if (o = b.getPlotLinePath(l, h), r = {stroke: q, "stroke-width": h}, n)r.dashstyle = n
            } else if (k) {
                j = t(j, b.min - d);
                i = L(i, b.max + d);
                o = b.getPlotBandPath(j, i, e);
                if (q)r.fill = q;
                if (e.borderWidth)r.stroke = e.borderColor, r["stroke-width"] = e.borderWidth
            } else return;
            if (s(J))r.zIndex = J;
            if (m)if (o)m.animate({d: o}, null, m.onGetPath); else {
                if (m.hide(), m.onGetPath = function () {
                        m.show()
                    }, g)a.label = g = g.destroy()
            } else if (o &&
                o.length && (a.svgElem = m = u.path(o).attr(r).add(), C))for (p in d = function (b) {
                m.on(b, function (c) {
                    C[b].apply(a, [c])
                })
            }, C)d(p);
            if (f && s(f.text) && o && o.length && b.width > 0 && b.height > 0) {
                f = w({
                    align: c && k && "center",
                    x: c ? !k && 4 : 10,
                    verticalAlign: !c && k && "middle",
                    y: c ? k ? 16 : 10 : k ? 6 : -4,
                    rotation: c && !k && 90
                }, f);
                if (!g) {
                    r = {align: f.textAlign || f.align, rotation: f.rotation};
                    if (s(J))r.zIndex = J;
                    a.label = g = u.text(f.text, 0, 0, f.useHTML).attr(r).css(f.style).add()
                }
                b = [o[1], o[4], k ? o[6] : o[1]];
                k = [o[2], o[5], k ? o[7] : o[2]];
                o = Oa(b);
                c = Oa(k);
                g.align(f,
                    !1, {x: o, y: c, width: Ca(b) - o, height: Ca(k) - c});
                g.show()
            } else g && g.hide();
            return a
        }, destroy: function () {
            la(this.axis.plotLinesAndBands, this);
            delete this.axis;
            Pa(this)
        }
    };
    na.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#C0C0C0",
            labels: M,
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: 0.01,
            maxPadding: 0.01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            tickWidth: 1,
            title: {align: "middle", style: {color: "#707070"}},
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {x: -8, y: 3},
            lineWidth: 0,
            maxPadding: 0.05,
            minPadding: 0.05,
            startOnTick: !0,
            tickWidth: 0,
            title: {rotation: 270, text: "Values"},
            stackLabels: {
                enabled: !1, formatter: function () {
                    return Ba(this.total,
                        -1)
                }, style: M.style
            }
        },
        defaultLeftAxisOptions: {labels: {x: -15, y: null}, title: {rotation: 270}},
        defaultRightAxisOptions: {labels: {x: 15, y: null}, title: {rotation: 90}},
        defaultBottomAxisOptions: {labels: {x: 0, y: null}, title: {rotation: 0}},
        defaultTopAxisOptions: {labels: {x: 0, y: -15}, title: {rotation: 0}},
        init: function (a, b) {
            var c = b.isX;
            this.horiz = a.inverted ? !c : c;
            this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis";
            this.opposite = b.opposite;
            this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
            this.setOptions(b);
            var d =
                this.options, e = d.type;
            this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
            this.userOptions = b;
            this.minPixelPadding = 0;
            this.chart = a;
            this.reversed = d.reversed;
            this.zoomEnabled = d.zoomEnabled !== !1;
            this.categories = d.categories || e === "category";
            this.names = [];
            this.isLog = e === "logarithmic";
            this.isDatetimeAxis = e === "datetime";
            this.isLinked = s(d.linkedTo);
            this.tickmarkOffset = this.categories && d.tickmarkPlacement === "between" && p(d.tickInterval, 1) === 1 ? 0.5 : 0;
            this.ticks = {};
            this.labelEdge = [];
            this.minorTicks =
            {};
            this.plotLinesAndBands = [];
            this.alternateBands = {};
            this.len = 0;
            this.minRange = this.userMinRange = d.minRange || d.maxZoom;
            this.range = d.range;
            this.offset = d.offset || 0;
            this.stacks = {};
            this.oldStacks = {};
            this.min = this.max = null;
            this.crosshair = p(d.crosshair, ra(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
            var f, d = this.options.events;
            Ma(this, a.axes) === -1 && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
            this.series = this.series || [];
            if (a.inverted && c && this.reversed ===
                u)this.reversed = !0;
            this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (f in d)N(this, f, d[f]);
            if (this.isLog)this.val2lin = za, this.lin2val = ka
        },
        setOptions: function (a) {
            this.options = w(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], w(E[this.coll], a))
        },
        defaultLabelFormatter: function () {
            var a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat,
                e = E.lang.numericSymbols, f = e && e.length, g, h = a.options.labels.format, a = a.isLog ? b : a.tickInterval;
            if (h)g = Ja(h, this); else if (c)g = b; else if (d)g = cb(d, b); else if (f && a >= 1E3)for (; f-- && g === u;)c = Math.pow(1E3, f + 1), a >= c && e[f] !== null && (g = Ba(b / c, -1) + e[f]);
            g === u && (g = Q(b) >= 1E4 ? Ba(b, 0) : Ba(b, -1, u, ""));
            return g
        },
        getSeriesExtremes: function () {
            var a = this, b = a.chart;
            a.hasVisibleSeries = !1;
            a.dataMin = a.dataMax = a.ignoreMinPadding = a.ignoreMaxPadding = null;
            a.buildStacks && a.buildStacks();
            q(a.series, function (c) {
                if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                    var d;
                    d = c.options.threshold;
                    var e;
                    a.hasVisibleSeries = !0;
                    a.isLog && d <= 0 && (d = null);
                    if (a.isXAxis) {
                        if (d = c.xData, d.length)a.dataMin = L(p(a.dataMin, d[0]), Oa(d)), a.dataMax = t(p(a.dataMax, d[0]), Ca(d))
                    } else {
                        c.getExtremes();
                        e = c.dataMax;
                        c = c.dataMin;
                        if (s(c) && s(e))a.dataMin = L(p(a.dataMin, c), c), a.dataMax = t(p(a.dataMax, e), e);
                        if (s(d))if (a.dataMin >= d)a.dataMin = d, a.ignoreMinPadding = !0; else if (a.dataMax < d)a.dataMax = d, a.ignoreMaxPadding = !0
                    }
                }
            })
        },
        translate: function (a, b, c, d, e, f) {
            var g = 1, h = 0, i = d ? this.oldTransA : this.transA, d = d ? this.oldMin :
                this.min, j = this.minPixelPadding, e = (this.options.ordinal || this.isLog && e) && this.lin2val;
            if (!i)i = this.transA;
            if (c)g *= -1, h = this.len;
            this.reversed && (g *= -1, h -= g * (this.sector || this.len));
            b ? (a = a * g + h, a -= j, a = a / i + d, e && (a = this.lin2val(a))) : (e && (a = this.val2lin(a)), f === "between" && (f = 0.5), a = g * (a - d) * i + h + g * j + (ja(f) ? i * f * this.pointRange : 0));
            return a
        },
        toPixels: function (a, b) {
            return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
        },
        toValue: function (a, b) {
            return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null,
                !0)
        },
        getPlotLinePath: function (a, b, c, d, e) {
            var f = this.chart, g = this.left, h = this.top, i, j, k = c && f.oldChartHeight || f.chartHeight, l = c && f.oldChartWidth || f.chartWidth, n;
            i = this.transB;
            e = p(e, this.translate(a, null, null, c));
            a = c = v(e + i);
            i = j = v(k - e - i);
            if (isNaN(e))n = !0; else if (this.horiz) {
                if (i = h, j = k - this.bottom, a < g || a > g + this.width)n = !0
            } else if (a = g, c = l - this.right, i < h || i > h + this.height)n = !0;
            return n && !d ? null : f.renderer.crispLine(["M", a, i, "L", c, j], b || 1)
        },
        getLinearTickPositions: function (a, b, c) {
            var d, e = ea(U(b / a) * a), f = ea(La(c /
                    a) * a), g = [];
            if (b === c && ja(b))return [b];
            for (b = e; b <= f;) {
                g.push(b);
                b = ea(b + a);
                if (b === d)break;
                d = b
            }
            return g
        },
        getMinorTickPositions: function () {
            var a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [], e;
            if (this.isLog) {
                e = b.length;
                for (a = 1; a < e; a++)d = d.concat(this.getLogTickPositions(c, b[a - 1], b[a], !0))
            } else if (this.isDatetimeAxis && a.minorTickInterval === "auto")d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), this.min, this.max, a.startOfWeek)), d[0] < this.min && d.shift(); else for (b = this.min +
                (b[0] - this.min) % c; b <= this.max; b += c)d.push(b);
            return d
        },
        adjustForMinRange: function () {
            var a = this.options, b = this.min, c = this.max, d, e = this.dataMax - this.dataMin >= this.minRange, f, g, h, i, j;
            if (this.isXAxis && this.minRange === u && !this.isLog)s(a.min) || s(a.max) ? this.minRange = null : (q(this.series, function (a) {
                i = a.xData;
                for (g = j = a.xIncrement ? 1 : i.length - 1; g > 0; g--)if (h = i[g] - i[g - 1], f === u || h < f)f = h
            }), this.minRange = L(f * 5, this.dataMax - this.dataMin));
            if (c - b < this.minRange) {
                var k = this.minRange;
                d = (k - c + b) / 2;
                d = [b - d, p(a.min, b - d)];
                if (e)d[2] = this.dataMin;
                b = Ca(d);
                c = [b + k, p(a.max, b + k)];
                if (e)c[2] = this.dataMax;
                c = Oa(c);
                c - b < k && (d[0] = c - k, d[1] = p(a.min, c - k), b = Ca(d))
            }
            this.min = b;
            this.max = c
        },
        setAxisTranslation: function (a) {
            var b = this, c = b.max - b.min, d = b.axisPointRange || 0, e, f = 0, g = 0, h = b.linkedParent, i = !!b.categories, j = b.transA;
            if (b.isXAxis || i || d)h ? (f = h.minPointOffset, g = h.pointRangePadding) : q(b.series, function (a) {
                var h = i ? 1 : b.isXAxis ? a.pointRange : b.axisPointRange || 0, j = a.options.pointPlacement, m = a.closestPointRange;
                h > c && (h = 0);
                d = t(d, h);
                f = t(f, Ga(j) ?
                    0 : h / 2);
                g = t(g, j === "on" ? 0 : h);
                !a.noSharedTooltip && s(m) && (e = s(e) ? L(e, m) : m)
            }), h = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, b.pointRangePadding = g *= h, b.pointRange = L(d, c), b.closestPointRange = e;
            if (a)b.oldTransA = j;
            b.translationSlope = b.transA = j = b.len / (c + g || 1);
            b.transB = b.horiz ? b.left : b.bottom;
            b.minPixelPadding = j * f
        },
        setTickPositions: function (a) {
            var b = this, c = b.chart, d = b.options, e = d.startOnTick, f = d.endOnTick, g = b.isLog, h = b.isDatetimeAxis, i = b.isXAxis, j = b.isLinked, k = b.options.tickPositioner, l = d.maxPadding,
                n = d.minPadding, m = d.tickInterval, o = d.minTickInterval, Y = d.tickPixelInterval, D, J = b.categories;
            j ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = p(c.min, c.dataMin), b.max = p(c.max, c.dataMax), d.type !== b.linkedParent.options.type && ha(11, 1)) : (b.min = p(b.userMin, d.min, b.dataMin), b.max = p(b.userMax, d.max, b.dataMax));
            if (g)!a && L(b.min, p(b.dataMin, b.min)) <= 0 && ha(10, 1), b.min = ea(za(b.min)), b.max = ea(za(b.max));
            if (b.range && s(b.max))b.userMin = b.min = t(b.min, b.max - b.range), b.userMax = b.max, b.range =
                null;
            b.beforePadding && b.beforePadding();
            b.adjustForMinRange();
            if (!J && !b.axisPointRange && !b.usePercentage && !j && s(b.min) && s(b.max) && (c = b.max - b.min)) {
                if (!s(d.min) && !s(b.userMin) && n && (b.dataMin < 0 || !b.ignoreMinPadding))b.min -= c * n;
                if (!s(d.max) && !s(b.userMax) && l && (b.dataMax > 0 || !b.ignoreMaxPadding))b.max += c * l
            }
            if (ja(d.floor))b.min = t(b.min, d.floor);
            if (ja(d.ceiling))b.max = L(b.max, d.ceiling);
            b.min === b.max || b.min === void 0 || b.max === void 0 ? b.tickInterval = 1 : j && !m && Y === b.linkedParent.options.tickPixelInterval ? b.tickInterval =
                b.linkedParent.tickInterval : (b.tickInterval = p(m, J ? 1 : (b.max - b.min) * Y / t(b.len, Y)), !s(m) && b.len < Y && !this.isRadial && !this.isLog && !J && e && f && (D = !0, b.tickInterval /= 4));
            i && !a && q(b.series, function (a) {
                a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
            });
            b.setAxisTranslation(!0);
            b.beforeSetTickPositions && b.beforeSetTickPositions();
            if (b.postProcessTickInterval)b.tickInterval = b.postProcessTickInterval(b.tickInterval);
            if (b.pointRange)b.tickInterval = t(b.pointRange, b.tickInterval);
            if (!m && b.tickInterval < o)b.tickInterval =
                o;
            if (!h && !g && !m)b.tickInterval = nb(b.tickInterval, null, mb(b.tickInterval), p(d.allowDecimals, !(b.tickInterval > 1 && b.tickInterval < 5 && b.max > 1E3 && b.max < 9999)));
            b.minorTickInterval = d.minorTickInterval === "auto" && b.tickInterval ? b.tickInterval / 5 : d.minorTickInterval;
            b.tickPositions = a = d.tickPositions ? [].concat(d.tickPositions) : k && k.apply(b, [b.min, b.max]);
            if (!a)!b.ordinalPositions && (b.max - b.min) / b.tickInterval > t(2 * b.len, 200) && ha(19, !0), a = h ? b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval, d.units), b.min,
                b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) : g ? b.getLogTickPositions(b.tickInterval, b.min, b.max) : b.getLinearTickPositions(b.tickInterval, b.min, b.max), D && a.splice(1, a.length - 2), b.tickPositions = a;
            if (!j)d = a[0], g = a[a.length - 1], h = b.minPointOffset || 0, e ? b.min = d : b.min - h > d && a.shift(), f ? b.max = g : b.max + h < g && a.pop(), a.length === 0 && s(d) && a.push((g + d) / 2), a.length === 1 && (e = Q(b.max) > 1E13 ? 1 : 0.001, b.min -= e, b.max += e)
        },
        setMaxTicks: function () {
            var a = this.chart, b = a.maxTicks || {}, c = this.tickPositions, d = this._maxTicksKey =
                [this.coll, this.pos, this.len].join("-");
            if (!this.isLinked && !this.isDatetimeAxis && c && c.length > (b[d] || 0) && this.options.alignTicks !== !1)b[d] = c.length;
            a.maxTicks = b
        },
        adjustTickAmount: function () {
            var a = this._maxTicksKey, b = this.tickPositions, c = this.chart.maxTicks;
            if (c && c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1 && this.min !== u) {
                var d = this.tickAmount, e = b.length;
                this.tickAmount = a = c[a];
                if (e < a) {
                    for (; b.length < a;)b.push(ea(b[b.length - 1] + this.tickInterval));
                    this.transA *=
                        (e - 1) / (a - 1);
                    this.max = b[b.length - 1]
                }
                if (s(d) && a !== d)this.isDirty = !0
            }
        },
        setScale: function () {
            var a = this.stacks, b, c, d, e;
            this.oldMin = this.min;
            this.oldMax = this.max;
            this.oldAxisLength = this.len;
            this.setAxisSize();
            e = this.len !== this.oldAxisLength;
            q(this.series, function (a) {
                if (a.isDirtyData || a.isDirty || a.xAxis.isDirty)d = !0
            });
            if (e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
                if (!this.isXAxis)for (b in a)for (c in a[b])a[b][c].total = null, a[b][c].cum = 0;
                this.forceRedraw = !1;
                this.getSeriesExtremes();
                this.setTickPositions();
                this.oldUserMin = this.userMin;
                this.oldUserMax = this.userMax;
                if (!this.isDirty)this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax
            } else if (!this.isXAxis) {
                if (this.oldStacks)a = this.stacks = this.oldStacks;
                for (b in a)for (c in a[b])a[b][c].cum = a[b][c].total
            }
            this.setMaxTicks()
        },
        setExtremes: function (a, b, c, d, e) {
            var f = this, g = f.chart, c = p(c, !0), e = r(e, {min: a, max: b});
            I(f, "setExtremes", e, function () {
                f.userMin = a;
                f.userMax = b;
                f.eventArgs = e;
                f.isDirtyExtremes = !0;
                c && g.redraw(d)
            })
        },
        zoom: function (a, b) {
            var c = this.dataMin, d = this.dataMax, e = this.options;
            this.allowZoomOutside || (s(c) && a <= L(c, p(e.min, c)) && (a = u), s(d) && b >= t(d, p(e.max, d)) && (b = u));
            this.displayBtn = a !== u || b !== u;
            this.setExtremes(a, b, !1, u, {trigger: "zoom"});
            return !0
        },
        setAxisSize: function () {
            var a = this.chart, b = this.options, c = b.offsetLeft || 0, d = this.horiz, e = p(b.width, a.plotWidth - c + (b.offsetRight || 0)), f = p(b.height, a.plotHeight), g = p(b.top, a.plotTop), b = p(b.left, a.plotLeft + c), c = /%$/;
            c.test(f) && (f = parseInt(f, 10) /
                100 * a.plotHeight);
            c.test(g) && (g = parseInt(g, 10) / 100 * a.plotHeight + a.plotTop);
            this.left = b;
            this.top = g;
            this.width = e;
            this.height = f;
            this.bottom = a.chartHeight - f - g;
            this.right = a.chartWidth - e - b;
            this.len = t(d ? e : f, 0);
            this.pos = d ? b : g
        },
        getExtremes: function () {
            var a = this.isLog;
            return {
                min: a ? ea(ka(this.min)) : this.min,
                max: a ? ea(ka(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function (a) {
            var b = this.isLog, c = b ? ka(this.min) : this.min, b = b ? ka(this.max) :
                this.max;
            c > a || a === null ? a = c : b < a && (a = b);
            return this.translate(a, 0, 1, 0, 1)
        },
        autoLabelAlign: function (a) {
            a = (p(a, 0) - this.side * 90 + 720) % 360;
            return a > 15 && a < 165 ? "right" : a > 195 && a < 345 ? "left" : "center"
        },
        getOffset: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, h = a.side, i = b.inverted ? [1, 0, 3, 2][h] : h, j, k, l = 0, n, m = 0, o = d.title, Y = d.labels, D = 0, J = b.axisOffset, b = b.clipOffset, C = [-1, 1, 1, -1][h], r, v = 1, w = p(Y.maxStaggerLines, 5), x, y, A, z, R;
            a.hasData = j = a.hasVisibleSeries || s(a.min) && s(a.max) && !!e;
            a.showAxis = k = j || p(d.showEmpty, !0);
            a.staggerLines = a.horiz && Y.staggerLines;
            if (!a.axisGroup)a.gridGroup = c.g("grid").attr({zIndex: d.gridZIndex || 1}).add(), a.axisGroup = c.g("axis").attr({zIndex: d.zIndex || 2}).add(), a.labelGroup = c.g("axis-labels").attr({zIndex: Y.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels").add();
            if (j || a.isLinked) {
                a.labelAlign = p(Y.align || a.autoLabelAlign(Y.rotation));
                q(e, function (b) {
                    f[b] ? f[b].addLabel() : f[b] = new Ta(a, b)
                });
                if (a.horiz && !a.staggerLines && w && !Y.rotation) {
                    for (j =
                             a.reversed ? [].concat(e).reverse() : e; v < w;) {
                        x = [];
                        y = !1;
                        for (r = 0; r < j.length; r++)A = j[r], z = (z = f[A].label && f[A].label.getBBox()) ? z.width : 0, R = r % v, z && (A = a.translate(A), x[R] !== u && A < x[R] && (y = !0), x[R] = A + z);
                        if (y)v++; else break
                    }
                    if (v > 1)a.staggerLines = v
                }
                q(e, function (b) {
                    if (h === 0 || h === 2 || {1: "left", 3: "right"}[h] === a.labelAlign)D = t(f[b].getLabelSize(), D)
                });
                if (a.staggerLines)D *= a.staggerLines, a.labelOffset = D
            } else for (r in f)f[r].destroy(), delete f[r];
            if (o && o.text && o.enabled !== !1) {
                if (!a.axisTitle)a.axisTitle = c.text(o.text,
                    0, 0, o.useHTML).attr({
                        zIndex: 7,
                        rotation: o.rotation || 0,
                        align: o.textAlign || {low: "left", middle: "center", high: "right"}[o.align]
                    }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(o.style).add(a.axisGroup), a.axisTitle.isNew = !0;
                if (k)l = a.axisTitle.getBBox()[g ? "height" : "width"], n = o.offset, m = s(n) ? 0 : p(o.margin, g ? 5 : 10);
                a.axisTitle[k ? "show" : "hide"]()
            }
            a.offset = C * p(d.offset, J[h]);
            c = h === 2 ? a.tickBaseline : 0;
            g = D + m + (D && C * (g ? p(Y.y, a.tickBaseline + 8) : Y.x) - c);
            a.axisTitleMargin = p(n, g);
            J[h] = t(J[h], a.axisTitleMargin +
                l + C * a.offset, g);
            b[i] = t(b[i], U(d.lineWidth / 2) * 2)
        },
        getLinePath: function (a) {
            var b = this.chart, c = this.opposite, d = this.offset, e = this.horiz, f = this.left + (c ? this.width : 0) + d, d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
            c && (a *= -1);
            return b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight - this.bottom], a)
        },
        getTitlePosition: function () {
            var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b : c, g = this.opposite, h = this.offset, i = y(e.style.fontSize ||
                12), d = {
                low: f + (a ? 0 : d),
                middle: f + d / 2,
                high: f + (a ? d : 0)
            }[e.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (this.side === 2 ? i : 0);
            return {
                x: a ? d : b + (g ? this.width : 0) + h + (e.x || 0),
                y: a ? b - (g ? this.height : 0) + h : d + (e.y || 0)
            }
        },
        render: function () {
            var a = this, b = a.horiz, c = a.reversed, d = a.chart, e = d.renderer, f = a.options, g = a.isLog, h = a.isLinked, i = a.tickPositions, j, k = a.axisTitle, l = a.ticks, n = a.minorTicks, m = a.alternateBands, o = f.stackLabels, p = f.alternateGridColor, D = a.tickmarkOffset, J = f.lineWidth, C = d.hasRendered && s(a.oldMin) && !isNaN(a.oldMin), r = a.hasData, t = a.showAxis, v, w = f.labels.overflow, x = a.justifyLabels = b && w !== !1, A;
            a.labelEdge.length = 0;
            a.justifyToPlot = w === "justify";
            q([l, n, m], function (a) {
                for (var b in a)a[b].isActive = !1
            });
            if (r || h)if (a.minorTickInterval && !a.categories && q(a.getMinorTickPositions(), function (b) {
                    n[b] || (n[b] = new Ta(a, b, "minor"));
                    C && n[b].isNew && n[b].render(null, !0);
                    n[b].render(null, !1, 1)
                }), i.length && (j = i.slice(), (b && c || !b && !c) && j.reverse(), x && (j = j.slice(1).concat([j[0]])), q(j, function (b, c) {
                    x && (c = c === j.length -
                    1 ? 0 : c + 1);
                    if (!h || b >= a.min && b <= a.max)l[b] || (l[b] = new Ta(a, b)), C && l[b].isNew && l[b].render(c, !0, 0.1), l[b].render(c)
                }), D && a.min === 0 && (l[-1] || (l[-1] = new Ta(a, -1, null, !0)), l[-1].render(-1))), p && q(i, function (b, c) {
                    if (c % 2 === 0 && b < a.max)m[b] || (m[b] = new K.PlotLineOrBand(a)), v = b + D, A = i[c + 1] !== u ? i[c + 1] + D : a.max, m[b].options = {
                        from: g ? ka(v) : v,
                        to: g ? ka(A) : A,
                        color: p
                    }, m[b].render(), m[b].isActive = !0
                }), !a._addedPlotLB)q((f.plotLines || []).concat(f.plotBands || []), function (b) {
                a.addPlotBandOrLine(b)
            }), a._addedPlotLB = !0;
            q([l, n,
                m], function (a) {
                var b, c, e = [], f = va ? va.duration || 500 : 0, g = function () {
                    for (c = e.length; c--;)a[e[c]] && !a[e[c]].isActive && (a[e[c]].destroy(), delete a[e[c]])
                };
                for (b in a)if (!a[b].isActive)a[b].render(b, !1, 0), a[b].isActive = !1, e.push(b);
                a === m || !d.hasRendered || !f ? g() : f && setTimeout(g, f)
            });
            if (J)b = a.getLinePath(J), a.axisLine ? a.axisLine.animate({d: b}) : a.axisLine = e.path(b).attr({
                stroke: f.lineColor,
                "stroke-width": J,
                zIndex: 7
            }).add(a.axisGroup), a.axisLine[t ? "show" : "hide"]();
            if (k && t)k[k.isNew ? "attr" : "animate"](a.getTitlePosition()),
                k.isNew = !1;
            o && o.enabled && a.renderStackTotals();
            a.isDirty = !1
        },
        redraw: function () {
            this.render();
            q(this.plotLinesAndBands, function (a) {
                a.render()
            });
            q(this.series, function (a) {
                a.isDirty = !0
            })
        },
        destroy: function (a) {
            var b = this, c = b.stacks, d, e = b.plotLinesAndBands;
            a || X(b);
            for (d in c)Pa(c[d]), c[d] = null;
            q([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                Pa(a)
            });
            for (a = e.length; a--;)e[a].destroy();
            q("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function (a) {
                b[a] && (b[a] = b[a].destroy())
            });
            this.cross && this.cross.destroy()
        },
        drawCrosshair: function (a, b) {
            if (this.crosshair)if ((s(b) || !p(this.crosshair.snap, !0)) === !1)this.hideCrosshair(); else {
                var c, d = this.crosshair, e = d.animation;
                p(d.snap, !0) ? s(b) && (c = this.chart.inverted != this.horiz ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos;
                c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : p(b.stackY, b.y)) : this.getPlotLinePath(null, null, null, null, c);
                if (c === null)this.hideCrosshair(); else if (this.cross)this.cross.attr({visibility: "visible"})[e ?
                    "animate" : "attr"]({d: c}, e); else {
                    e = {"stroke-width": d.width || 1, stroke: d.color || "#C0C0C0", zIndex: d.zIndex || 2};
                    if (d.dashStyle)e.dashstyle = d.dashStyle;
                    this.cross = this.chart.renderer.path(c).attr(e).add()
                }
            }
        },
        hideCrosshair: function () {
            this.cross && this.cross.hide()
        }
    };
    r(na.prototype, {
        getPlotBandPath: function (a, b) {
            var c = this.getPlotLinePath(b), d = this.getPlotLinePath(a);
            d && c ? d.push(c[4], c[5], c[1], c[2]) : d = null;
            return d
        }, addPlotBand: function (a) {
            return this.addPlotBandOrLine(a, "plotBands")
        }, addPlotLine: function (a) {
            return this.addPlotBandOrLine(a,
                "plotLines")
        }, addPlotBandOrLine: function (a, b) {
            var c = (new K.PlotLineOrBand(this, a)).render(), d = this.userOptions;
            c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c));
            return c
        }, removePlotBandOrLine: function (a) {
            for (var b = this.plotLinesAndBands, c = this.options, d = this.userOptions, e = b.length; e--;)b[e].id === a && b[e].destroy();
            q([c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || []], function (b) {
                for (e = b.length; e--;)b[e].id === a && la(b, b[e])
            })
        }
    });
    na.prototype.getTimeTicks = function (a, b,
                                          c, d) {
        var e = [], f = {}, g = E.global.useUTC, h, i = new Da(b - Sa), j = a.unitRange, k = a.count;
        if (s(b)) {
            j >= A.second && (i.setMilliseconds(0), i.setSeconds(j >= A.minute ? 0 : k * U(i.getSeconds() / k)));
            if (j >= A.minute)i[Cb](j >= A.hour ? 0 : k * U(i[pb]() / k));
            if (j >= A.hour)i[Db](j >= A.day ? 0 : k * U(i[qb]() / k));
            if (j >= A.day)i[sb](j >= A.month ? 1 : k * U(i[Xa]() / k));
            j >= A.month && (i[Eb](j >= A.year ? 0 : k * U(i[fb]() / k)), h = i[gb]());
            j >= A.year && (h -= h % k, i[Fb](h));
            if (j === A.week)i[sb](i[Xa]() - i[rb]() + p(d, 1));
            b = 1;
            Sa && (i = new Da(i.getTime() + Sa));
            h = i[gb]();
            for (var d =
                i.getTime(), l = i[fb](), n = i[Xa](), m = (A.day + (g ? Sa : i.getTimezoneOffset() * 6E4)) % A.day; d < c;)e.push(d), j === A.year ? d = eb(h + b * k, 0) : j === A.month ? d = eb(h, l + b * k) : !g && (j === A.day || j === A.week) ? d = eb(h, l, n + b * k * (j === A.day ? 1 : 7)) : d += j * k, b++;
            e.push(d);
            q(wb(e, function (a) {
                return j <= A.hour && a % A.day === m
            }), function (a) {
                f[a] = "day"
            })
        }
        e.info = r(a, {higherRanks: f, totalRange: j * k});
        return e
    };
    na.prototype.normalizeTimeTickInterval = function (a, b) {
        var c = b || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute",
                [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]], d = c[c.length - 1], e = A[d[0]], f = d[1], g;
        for (g = 0; g < c.length; g++)if (d = c[g], e = A[d[0]], f = d[1], c[g + 1] && a <= (e * f[f.length - 1] + A[c[g + 1][0]]) / 2)break;
        e === A.year && a < 5 * e && (f = [1, 2, 5]);
        c = nb(a / e, f, d[0] === "year" ? t(mb(a / e), 1) : 1);
        return {unitRange: e, count: c, unitName: d[0]}
    };
    na.prototype.getLogTickPositions = function (a, b, c, d) {
        var e = this.options, f = this.len, g = [];
        if (!d)this._minorAutoInterval = null;
        if (a >= 0.5)a = v(a), g = this.getLinearTickPositions(a,
            b, c); else if (a >= 0.08)for (var f = U(b), h, i, j, k, l, e = a > 0.3 ? [1, 2, 4] : a > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < c + 1 && !l; f++) {
            i = e.length;
            for (h = 0; h < i && !l; h++)j = za(ka(f) * e[h]), j > b && (!d || k <= c) && k !== u && g.push(k), k > c && (l = !0), k = j
        } else if (b = ka(b), c = ka(c), a = e[d ? "minorTickInterval" : "tickInterval"], a = p(a === "auto" ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = nb(a, null, mb(a)), g = Va(this.getLinearTickPositions(a, b, c), za), !d)this._minorAutoInterval = a / 5;
        if (!d)this.tickInterval =
            a;
        return g
    };
    var Nb = K.Tooltip = function () {
        this.init.apply(this, arguments)
    };
    Nb.prototype = {
        init: function (a, b) {
            var c = b.borderWidth, d = b.style, e = y(d.padding);
            this.chart = a;
            this.options = b;
            this.crosshairs = [];
            this.now = {x: 0, y: 0};
            this.isHidden = !0;
            this.label = a.renderer.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, "tooltip").attr({
                padding: e,
                fill: b.backgroundColor,
                "stroke-width": c,
                r: b.borderRadius,
                zIndex: 8
            }).css(d).css({padding: 0}).add().attr({y: -9999});
            ga || this.label.shadow(b.shadow);
            this.shared = b.shared
        },
        destroy: function () {
            if (this.label)this.label = this.label.destroy();
            clearTimeout(this.hideTimer);
            clearTimeout(this.tooltipTimeout)
        }, move: function (a, b, c, d) {
            var e = this, f = e.now, g = e.options.animation !== !1 && !e.isHidden && (Q(a - f.x) > 1 || Q(b - f.y) > 1), h = e.followPointer || e.len > 1;
            r(f, {
                x: g ? (2 * f.x + a) / 3 : a,
                y: g ? (f.y + b) / 2 : b,
                anchorX: h ? u : g ? (2 * f.anchorX + c) / 3 : c,
                anchorY: h ? u : g ? (f.anchorY + d) / 2 : d
            });
            e.label.attr(f);
            if (g)clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                e && e.move(a, b, c, d)
            }, 32)
        }, hide: function (a) {
            var b =
                this, c;
            clearTimeout(this.hideTimer);
            if (!this.isHidden)c = this.chart.hoverPoints, this.hideTimer = setTimeout(function () {
                b.label.fadeOut();
                b.isHidden = !0
            }, p(a, this.options.hideDelay, 500)), c && q(c, function (a) {
                a.setState()
            }), this.chart.hoverPoints = null
        }, getAnchor: function (a, b) {
            var c, d = this.chart, e = d.inverted, f = d.plotTop, g = 0, h = 0, i, a = ra(a);
            c = a[0].tooltipPos;
            this.followPointer && b && (b.chartX === u && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]);
            c || (q(a, function (a) {
                i = a.series.yAxis;
                g += a.plotX;
                h +=
                    (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && i ? i.top - f : 0)
            }), g /= a.length, h /= a.length, c = [e ? d.plotWidth - h : g, this.shared && !e && a.length > 1 && b ? b.chartY - f : e ? d.plotHeight - g : h]);
            return Va(c, v)
        }, getPosition: function (a, b, c) {
            var d = this.chart, e = this.distance, f = {}, g, h = ["y", d.chartHeight, b, c.plotY + d.plotTop], i = ["x", d.chartWidth, a, c.plotX + d.plotLeft], j = c.ttBelow || d.inverted && !c.negative || !d.inverted && c.negative, k = function (a, b, c, d) {
                var g = c < d - e, b = d + e + c < b, c = d - e - c;
                d += e;
                if (j && b)f[a] = d; else if (!j && g)f[a] = c; else if (g)f[a] =
                    c; else if (b)f[a] = d; else return !1
            }, l = function (a, b, c, d) {
                if (d < e || d > b - e)return !1; else f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2
            }, n = function (a) {
                var b = h;
                h = i;
                i = b;
                g = a
            }, m = function () {
                k.apply(0, h) !== !1 ? l.apply(0, i) === !1 && !g && (n(!0), m()) : g ? f.x = f.y = 0 : (n(!0), m())
            };
            (d.inverted || this.len > 1) && n();
            m();
            return f
        }, defaultFormatter: function (a) {
            var b = this.points || ra(this), c = b[0].series, d;
            d = [a.tooltipHeaderFormatter(b[0])];
            q(b, function (a) {
                c = a.series;
                d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat))
            });
            d.push(a.options.footerFormat || "");
            return d.join("")
        }, refresh: function (a, b) {
            var c = this.chart, d = this.label, e = this.options, f, g, h = {}, i, j = [];
            i = e.formatter || this.defaultFormatter;
            var h = c.hoverPoints, k, l = this.shared;
            clearTimeout(this.hideTimer);
            this.followPointer = ra(a)[0].series.tooltipOptions.followPointer;
            g = this.getAnchor(a, b);
            f = g[0];
            g = g[1];
            l && (!a.series || !a.series.noSharedTooltip) ? (c.hoverPoints = a, h && q(h, function (a) {
                a.setState()
            }), q(a, function (a) {
                a.setState("hover");
                j.push(a.getLabelConfig())
            }), h = {
                x: a[0].category,
                y: a[0].y
            }, h.points = j, this.len = j.length, a = a[0]) : h = a.getLabelConfig();
            i = i.call(h, this);
            h = a.series;
            this.distance = p(h.tooltipOptions.distance, 16);
            i === !1 ? this.hide() : (this.isHidden && (bb(d), d.attr("opacity", 1).show()), d.attr({text: i}), k = e.borderColor || a.color || h.color || "#606060", d.attr({stroke: k}), this.updatePosition({
                plotX: f,
                plotY: g,
                negative: a.negative,
                ttBelow: a.ttBelow
            }), this.isHidden = !1);
            I(c, "tooltipRefresh", {text: i, x: f + c.plotLeft, y: g + c.plotTop, borderColor: k})
        }, updatePosition: function (a) {
            var b = this.chart,
                c = this.label, c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
            this.move(v(c.x), v(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop)
        }, tooltipHeaderFormatter: function (a) {
            var b = a.series, c = b.tooltipOptions, d = c.dateTimeLabelFormats, e = c.xDateFormat, f = b.xAxis, g = f && f.options.type === "datetime" && ja(a.key), c = c.headerFormat, f = f && f.closestPointRange, h;
            if (g && !e) {
                if (f)for (h in A) {
                    if (A[h] >= f || A[h] <= A.day && a.key % A[h] > 0) {
                        e = d[h];
                        break
                    }
                } else e = d.day;
                e = e || d.year
            }
            g && e && (c = c.replace("{point.key}", "{point.key:" +
                e + "}"));
            return Ja(c, {point: a, series: b})
        }
    };
    var pa;
    $a = x.documentElement.ontouchstart !== u;
    var Wa = K.Pointer = function (a, b) {
        this.init(a, b)
    };
    Wa.prototype = {
        init: function (a, b) {
            var c = b.chart, d = c.events, e = ga ? "" : c.zoomType, c = a.inverted, f;
            this.options = b;
            this.chart = a;
            this.zoomX = f = /x/.test(e);
            this.zoomY = e = /y/.test(e);
            this.zoomHor = f && !c || e && c;
            this.zoomVert = e && !c || f && c;
            this.hasZoom = f || e;
            this.runChartClick = d && !!d.click;
            this.pinchDown = [];
            this.lastValidTouch = {};
            if (K.Tooltip && b.tooltip.enabled)a.tooltip = new Nb(a, b.tooltip),
                this.followTouchMove = b.tooltip.followTouchMove;
            this.setDOMEvents()
        }, normalize: function (a, b) {
            var c, d, a = a || window.event, a = Tb(a);
            if (!a.target)a.target = a.srcElement;
            d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
            if (!b)this.chartPosition = b = Sb(this.chart.container);
            d.pageX === u ? (c = t(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top);
            return r(a, {chartX: v(c), chartY: v(d)})
        }, getCoordinates: function (a) {
            var b = {xAxis: [], yAxis: []};
            q(this.chart.axes, function (c) {
                b[c.isXAxis ? "xAxis" :
                    "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
            });
            return b
        }, getIndex: function (a) {
            var b = this.chart;
            return b.inverted ? b.plotHeight + b.plotTop - a.chartY : a.chartX - b.plotLeft
        }, runPointActions: function (a) {
            var b = this.chart, c = b.series, d = b.tooltip, e, f, g = b.hoverPoint, h = b.hoverSeries, i, j, k = b.chartWidth, l = this.getIndex(a);
            if (d && this.options.tooltip.shared && (!h || !h.noSharedTooltip)) {
                f = [];
                i = c.length;
                for (j = 0; j < i; j++)if (c[j].visible && c[j].options.enableMouseTracking !== !1 && !c[j].noSharedTooltip &&
                    c[j].singularTooltips !== !0 && c[j].tooltipPoints.length && (e = c[j].tooltipPoints[l]) && e.series)e._dist = Q(l - e.clientX), k = L(k, e._dist), f.push(e);
                for (i = f.length; i--;)f[i]._dist > k && f.splice(i, 1);
                if (f.length && f[0].clientX !== this.hoverX)d.refresh(f, a), this.hoverX = f[0].clientX
            }
            c = h && h.tooltipOptions.followPointer;
            if (h && h.tracker && !c) {
                if ((e = h.tooltipPoints[l]) && e !== g)e.onMouseOver(a)
            } else d && c && !d.isHidden && (h = d.getAnchor([{}], a), d.updatePosition({plotX: h[0], plotY: h[1]}));
            if (d && !this._onDocumentMouseMove)this._onDocumentMouseMove =
                function (a) {
                    if (W[pa])W[pa].pointer.onDocumentMouseMove(a)
                }, N(x, "mousemove", this._onDocumentMouseMove);
            q(b.axes, function (b) {
                b.drawCrosshair(a, p(e, g))
            })
        }, reset: function (a, b) {
            var c = this.chart, d = c.hoverSeries, e = c.hoverPoint, f = c.tooltip, g = f && f.shared ? c.hoverPoints : e;
            (a = a && f && g) && ra(g)[0].plotX === u && (a = !1);
            if (a)f.refresh(g), e && e.setState(e.state, !0); else {
                if (e)e.onMouseOut();
                if (d)d.onMouseOut();
                f && f.hide(b);
                if (this._onDocumentMouseMove)X(x, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove =
                    null;
                q(c.axes, function (a) {
                    a.hideCrosshair()
                });
                this.hoverX = null
            }
        }, scaleGroups: function (a, b) {
            var c = this.chart, d;
            q(c.series, function (e) {
                d = a || e.getPlotBox();
                e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
            });
            c.clipRect.attr(b || c.clipBox)
        }, dragStart: function (a) {
            var b = this.chart;
            b.mouseIsDown = a.type;
            b.cancelClick = !1;
            b.mouseDownX = this.mouseDownX = a.chartX;
            b.mouseDownY = this.mouseDownY = a.chartY
        },
        drag: function (a) {
            var b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, f = this.zoomHor, g = this.zoomVert, h = b.plotLeft, i = b.plotTop, j = b.plotWidth, k = b.plotHeight, l, n = this.mouseDownX, m = this.mouseDownY, o = c.panKey && a[c.panKey + "Key"];
            d < h ? d = h : d > h + j && (d = h + j);
            e < i ? e = i : e > i + k && (e = i + k);
            this.hasDragged = Math.sqrt(Math.pow(n - d, 2) + Math.pow(m - e, 2));
            if (this.hasDragged > 10) {
                l = b.isInsidePlot(n - h, m - i);
                if (b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !o && !this.selectionMarker)this.selectionMarker = b.renderer.rect(h, i,
                    f ? 1 : j, g ? 1 : k, 0).attr({
                        fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)",
                        zIndex: 7
                    }).add();
                this.selectionMarker && f && (d -= n, this.selectionMarker.attr({width: Q(d), x: (d > 0 ? 0 : d) + n}));
                this.selectionMarker && g && (d = e - m, this.selectionMarker.attr({
                    height: Q(d),
                    y: (d > 0 ? 0 : d) + m
                }));
                l && !this.selectionMarker && c.panning && b.pan(a, c.panning)
            }
        }, drop: function (a) {
            var b = this.chart, c = this.hasPinched;
            if (this.selectionMarker) {
                var d = {
                    xAxis: [],
                    yAxis: [],
                    originalEvent: a.originalEvent || a
                }, e = this.selectionMarker, f = e.attr ? e.attr("x") :
                    e.x, g = e.attr ? e.attr("y") : e.y, h = e.attr ? e.attr("width") : e.width, i = e.attr ? e.attr("height") : e.height, j;
                if (this.hasDragged || c)q(b.axes, function (b) {
                    if (b.zoomEnabled) {
                        var c = b.horiz, e = a.type === "touchend" ? b.minPixelPadding : 0, m = b.toValue((c ? f : g) + e), c = b.toValue((c ? f + h : g + i) - e);
                        !isNaN(m) && !isNaN(c) && (d[b.coll].push({axis: b, min: L(m, c), max: t(m, c)}), j = !0)
                    }
                }), j && I(b, "selection", d, function (a) {
                    b.zoom(r(a, c ? {animation: !1} : null))
                });
                this.selectionMarker = this.selectionMarker.destroy();
                c && this.scaleGroups()
            }
            if (b)B(b.container,
                {cursor: b._cursor}), b.cancelClick = this.hasDragged > 10, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = []
        }, onContainerMouseDown: function (a) {
            a = this.normalize(a);
            a.preventDefault && a.preventDefault();
            this.dragStart(a)
        }, onDocumentMouseUp: function (a) {
            W[pa] && W[pa].pointer.drop(a)
        }, onDocumentMouseMove: function (a) {
            var b = this.chart, c = this.chartPosition, d = b.hoverSeries, a = this.normalize(a, c);
            c && d && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) &&
            this.reset()
        }, onContainerMouseLeave: function () {
            var a = W[pa];
            if (a)a.pointer.reset(), a.pointer.chartPosition = null
        }, onContainerMouseMove: function (a) {
            var b = this.chart;
            pa = b.index;
            a = this.normalize(a);
            a.returnValue = !1;
            b.mouseIsDown === "mousedown" && this.drag(a);
            (this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a)
        }, inClass: function (a, b) {
            for (var c; a;) {
                if (c = F(a, "class"))if (c.indexOf(b) !== -1)return !0; else if (c.indexOf("highcharts-container") !== -1)return !1;
                a = a.parentNode
            }
        }, onTrackerMouseOut: function (a) {
            var b = this.chart.hoverSeries, c = (a = a.relatedTarget || a.toElement) && a.point && a.point.series;
            if (b && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && c !== b)b.onMouseOut()
        }, onContainerClick: function (a) {
            var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop, a = this.normalize(a);
            a.cancelBubble = !0;
            b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (I(c.series, "click", r(a, {point: c})), b.hoverPoint && c.firePointEvent("click",
                a)) : (r(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && I(b, "click", a)))
        }, setDOMEvents: function () {
            var a = this, b = a.chart.container;
            b.onmousedown = function (b) {
                a.onContainerMouseDown(b)
            };
            b.onmousemove = function (b) {
                a.onContainerMouseMove(b)
            };
            b.onclick = function (b) {
                a.onContainerClick(b)
            };
            N(b, "mouseleave", a.onContainerMouseLeave);
            ab === 1 && N(x, "mouseup", a.onDocumentMouseUp);
            if ($a)b.ontouchstart = function (b) {
                a.onContainerTouchStart(b)
            }, b.ontouchmove = function (b) {
                a.onContainerTouchMove(b)
            }, ab === 1 &&
            N(x, "touchend", a.onDocumentTouchEnd)
        }, destroy: function () {
            var a;
            X(this.chart.container, "mouseleave", this.onContainerMouseLeave);
            ab || (X(x, "mouseup", this.onDocumentMouseUp), X(x, "touchend", this.onDocumentTouchEnd));
            clearInterval(this.tooltipTimeout);
            for (a in this)this[a] = null
        }
    };
    r(K.Pointer.prototype, {
        pinchTranslate: function (a, b, c, d, e, f) {
            (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f);
            (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, b, c, d, e, f)
        }, pinchTranslateDirection: function (a,
                                              b, c, d, e, f, g, h) {
            var i = this.chart, j = a ? "x" : "y", k = a ? "X" : "Y", l = "chart" + k, n = a ? "width" : "height", m = i["plot" + (a ? "Left" : "Top")], o, p, q = h || 1, r = i.inverted, C = i.bounds[a ? "h" : "v"], t = b.length === 1, s = b[0][l], v = c[0][l], u = !t && b[1][l], w = !t && c[1][l], x, c = function () {
                !t && Q(s - u) > 20 && (q = h || Q(v - w) / Q(s - u));
                p = (m - v) / q + s;
                o = i["plot" + (a ? "Width" : "Height")] / q
            };
            c();
            b = p;
            b < C.min ? (b = C.min, x = !0) : b + o > C.max && (b = C.max - o, x = !0);
            x ? (v -= 0.8 * (v - g[j][0]), t || (w -= 0.8 * (w - g[j][1])), c()) : g[j] = [v, w];
            r || (f[j] = p - m, f[n] = o);
            f = r ? 1 / q : q;
            e[n] = o;
            e[j] = b;
            d[r ? a ? "scaleY" :
                "scaleX" : "scale" + k] = q;
            d["translate" + k] = f * m + (v - f * s)
        }, pinch: function (a) {
            var b = this, c = b.chart, d = b.pinchDown, e = b.followTouchMove, f = a.touches, g = f.length, h = b.lastValidTouch, i = b.hasZoom, j = b.selectionMarker, k = {}, l = g === 1 && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || b.runChartClick), n = {};
            (i || e) && !l && a.preventDefault();
            Va(f, function (a) {
                return b.normalize(a)
            });
            if (a.type === "touchstart")q(f, function (a, b) {
                d[b] = {chartX: a.chartX, chartY: a.chartY}
            }), h.x = [d[0].chartX, d[1] && d[1].chartX], h.y = [d[0].chartY,
                d[1] && d[1].chartY], q(c.axes, function (a) {
                if (a.zoomEnabled) {
                    var b = c.bounds[a.horiz ? "h" : "v"], d = a.minPixelPadding, e = a.toPixels(p(a.options.min, a.dataMin)), f = a.toPixels(p(a.options.max, a.dataMax)), g = L(e, f), e = t(e, f);
                    b.min = L(a.pos, g - d);
                    b.max = t(a.pos + a.len, e + d)
                }
            }), b.res = !0; else if (d.length) {
                if (!j)b.selectionMarker = j = r({destroy: sa}, c.plotBox);
                b.pinchTranslate(d, f, k, j, n, h);
                b.hasPinched = i;
                b.scaleGroups(k, n);
                if (!i && e && g === 1)this.runPointActions(b.normalize(a)); else if (b.res)b.res = !1, this.reset(!1, 0)
            }
        }, onContainerTouchStart: function (a) {
            var b =
                this.chart;
            pa = b.index;
            a.touches.length === 1 ? (a = this.normalize(a), b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) ? (this.runPointActions(a), this.pinch(a)) : this.reset()) : a.touches.length === 2 && this.pinch(a)
        }, onContainerTouchMove: function (a) {
            (a.touches.length === 1 || a.touches.length === 2) && this.pinch(a)
        }, onDocumentTouchEnd: function (a) {
            W[pa] && W[pa].pointer.drop(a)
        }
    });
    if (G.PointerEvent || G.MSPointerEvent) {
        var ua = {}, zb = !!G.PointerEvent, Xb = function () {
            var a, b = [];
            b.item = function (a) {
                return this[a]
            };
            for (a in ua)ua.hasOwnProperty(a) &&
            b.push({pageX: ua[a].pageX, pageY: ua[a].pageY, target: ua[a].target});
            return b
        }, Ab = function (a, b, c, d) {
            a = a.originalEvent || a;
            if ((a.pointerType === "touch" || a.pointerType === a.MSPOINTER_TYPE_TOUCH) && W[pa])d(a), d = W[pa].pointer, d[b]({
                type: c,
                target: a.currentTarget,
                preventDefault: sa,
                touches: Xb()
            })
        };
        r(Wa.prototype, {
            onContainerPointerDown: function (a) {
                Ab(a, "onContainerTouchStart", "touchstart", function (a) {
                    ua[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                })
            }, onContainerPointerMove: function (a) {
                Ab(a,
                    "onContainerTouchMove", "touchmove", function (a) {
                        ua[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                        if (!ua[a.pointerId].target)ua[a.pointerId].target = a.currentTarget
                    })
            }, onDocumentPointerUp: function (a) {
                Ab(a, "onContainerTouchEnd", "touchend", function (a) {
                    delete ua[a.pointerId]
                })
            }, batchMSEvents: function (a) {
                a(this.chart.container, zb ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                a(this.chart.container, zb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                a(x, zb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }
        });
        Na(Wa.prototype, "init", function (a, b, c) {
            a.call(this, b, c);
            (this.hasZoom || this.followTouchMove) && B(b.container, {"-ms-touch-action": P, "touch-action": P})
        });
        Na(Wa.prototype, "setDOMEvents", function (a) {
            a.apply(this);
            (this.hasZoom || this.followTouchMove) && this.batchMSEvents(N)
        });
        Na(Wa.prototype, "destroy", function (a) {
            this.batchMSEvents(X);
            a.call(this)
        })
    }
    var lb = K.Legend = function (a, b) {
        this.init(a, b)
    };
    lb.prototype = {
        init: function (a, b) {
            var c = this, d = b.itemStyle, e = p(b.padding, 8), f = b.itemMarginTop || 0;
            this.options = b;
            if (b.enabled)c.itemStyle = d, c.itemHiddenStyle = w(d, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e, c.initialItemX = e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.lastLineHeight = 0, c.symbolWidth = p(b.symbolWidth, 16), c.pages = [], c.render(), N(c.chart, "endResize", function () {
                c.positionCheckboxes()
            })
        }, colorizeItem: function (a, b) {
            var c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : g, h = b ? a.legendColor || a.color || "#CCC" : g, g = a.options &&
                a.options.marker, i = {fill: h}, j;
            d && d.css({fill: c, color: c});
            e && e.attr({stroke: h});
            if (f) {
                if (g && f.isMarker)for (j in i.stroke = h, g = a.convertAttribs(g), g)d = g[j], d !== u && (i[j] = d);
                f.attr(i)
            }
        }, positionItem: function (a) {
            var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], f = a.checkbox;
            a.legendGroup && a.legendGroup.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
            if (f)f.x = e, f.y = d
        }, destroyItem: function (a) {
            var b = a.checkbox;
            q(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                a[b] &&
                (a[b] = a[b].destroy())
            });
            b && Qa(a.checkbox)
        }, destroy: function () {
            var a = this.group, b = this.box;
            if (b)this.box = b.destroy();
            if (a)this.group = a.destroy()
        }, positionCheckboxes: function (a) {
            var b = this.group.alignAttr, c, d = this.clipHeight || this.legendHeight;
            if (b)c = b.translateY, q(this.allItems, function (e) {
                var f = e.checkbox, g;
                f && (g = c + f.y + (a || 0) + 3, B(f, {
                    left: b.translateX + e.checkboxOffset + f.x - 20 + "px",
                    top: g + "px",
                    display: g > c - 6 && g < c + d - 6 ? "" : P
                }))
            })
        }, renderTitle: function () {
            var a = this.padding, b = this.options.title, c = 0;
            if (b.text) {
                if (!this.title)this.title =
                    this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({zIndex: 1}).css(b.style).add(this.group);
                a = this.title.getBBox();
                c = a.height;
                this.offsetWidth = a.width;
                this.contentGroup.attr({translateY: c})
            }
            this.titleHeight = c
        }, renderItem: function (a) {
            var b = this.chart, c = b.renderer, d = this.options, e = d.layout === "horizontal", f = this.symbolWidth, g = d.symbolPadding, h = this.itemStyle, i = this.itemHiddenStyle, j = this.padding, k = e ? p(d.itemDistance, 20) : 0, l = !d.rtl, n = d.width, m = d.itemMarginBottom || 0,
                o = this.itemMarginTop, q = this.initialItemX, r = a.legendItem, s = a.series && a.series.drawLegendSymbol ? a.series : a, C = s.options, C = this.createCheckboxForItem && C && C.showCheckbox, u = d.useHTML;
            if (!r) {
                a.legendGroup = c.g("legend-item").attr({zIndex: 1}).add(this.scrollGroup);
                a.legendItem = r = c.text(d.labelFormat ? Ja(d.labelFormat, a) : d.labelFormatter.call(a), l ? f + g : -g, this.baseline || 0, u).css(w(a.visible ? h : i)).attr({
                    align: l ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup);
                if (!this.baseline)this.baseline = c.fontMetrics(h.fontSize,
                        r).f + 3 + o, r.attr("y", this.baseline);
                s.drawLegendSymbol(this, a);
                this.setItemEvents && this.setItemEvents(a, r, u, h, i);
                this.colorizeItem(a, a.visible);
                C && this.createCheckboxForItem(a)
            }
            c = r.getBBox();
            f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width + k + (C ? 20 : 0);
            this.itemHeight = g = v(a.legendItemHeight || c.height);
            if (e && this.itemX - q + f > (n || b.chartWidth - 2 * j - q - d.x))this.itemX = q, this.itemY += o + this.lastLineHeight + m, this.lastLineHeight = 0;
            this.maxItemWidth = t(this.maxItemWidth, f);
            this.lastItemY = o + this.itemY +
                m;
            this.lastLineHeight = t(g, this.lastLineHeight);
            a._legendItemPos = [this.itemX, this.itemY];
            e ? this.itemX += f : (this.itemY += o + g + m, this.lastLineHeight = g);
            this.offsetWidth = n || t((e ? this.itemX - q - k : f) + j, this.offsetWidth)
        }, getAllItems: function () {
            var a = [];
            q(this.chart.series, function (b) {
                var c = b.options;
                if (p(c.showInLegend, !s(c.linkedTo) ? u : !1, !0))a = a.concat(b.legendItems || (c.legendType === "point" ? b.data : b))
            });
            return a
        }, render: function () {
            var a = this, b = a.chart, c = b.renderer, d = a.group, e, f, g, h, i = a.box, j = a.options, k = a.padding,
                l = j.borderWidth, n = j.backgroundColor;
            a.itemX = a.initialItemX;
            a.itemY = a.initialItemY;
            a.offsetWidth = 0;
            a.lastItemY = 0;
            if (!d)a.group = d = c.g("legend").attr({zIndex: 7}).add(), a.contentGroup = c.g().attr({zIndex: 1}).add(d), a.scrollGroup = c.g().add(a.contentGroup);
            a.renderTitle();
            e = a.getAllItems();
            ob(e, function (a, b) {
                return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
            });
            j.reversed && e.reverse();
            a.allItems = e;
            a.display = f = !!e.length;
            q(e, function (b) {
                a.renderItem(b)
            });
            g = j.width || a.offsetWidth;
            h = a.lastItemY + a.lastLineHeight + a.titleHeight;
            h = a.handleOverflow(h);
            if (l || n) {
                g += k;
                h += k;
                if (i) {
                    if (g > 0 && h > 0)i[i.isNew ? "attr" : "animate"](i.crisp({width: g, height: h})), i.isNew = !1
                } else a.box = i = c.rect(0, 0, g, h, j.borderRadius, l || 0).attr({
                    stroke: j.borderColor,
                    "stroke-width": l || 0,
                    fill: n || P
                }).add(d).shadow(j.shadow), i.isNew = !0;
                i[f ? "show" : "hide"]()
            }
            a.legendWidth = g;
            a.legendHeight = h;
            q(e, function (b) {
                a.positionItem(b)
            });
            f && d.align(r({width: g, height: h}, j), !0, "spacingBox");
            b.isResizing || this.positionCheckboxes()
        }, handleOverflow: function (a) {
            var b =
                this, c = this.chart, d = c.renderer, e = this.options, f = e.y, f = c.spacingBox.height + (e.verticalAlign === "top" ? -f : f) - this.padding, g = e.maxHeight, h, i = this.clipRect, j = e.navigation, k = p(j.animation, !0), l = j.arrowSize || 12, n = this.nav, m = this.pages, o, r = this.allItems;
            e.layout === "horizontal" && (f /= 2);
            g && (f = L(f, g));
            m.length = 0;
            if (a > f && !e.useHTML) {
                this.clipHeight = h = t(f - 20 - this.titleHeight - this.padding, 0);
                this.currentPage = p(this.currentPage, 1);
                this.fullHeight = a;
                q(r, function (a, b) {
                    var c = a._legendItemPos[1], d = v(a.legendItem.getBBox().height),
                        e = m.length;
                    if (!e || c - m[e - 1] > h && (o || c) !== m[e - 1])m.push(o || c), e++;
                    b === r.length - 1 && c + d - m[e - 1] > h && m.push(c);
                    c !== o && (o = c)
                });
                if (!i)i = b.clipRect = d.clipRect(0, this.padding, 9999, 0), b.contentGroup.clip(i);
                i.attr({height: h});
                if (!n)this.nav = n = d.g().attr({zIndex: 1}).add(this.group), this.up = d.symbol("triangle", 0, 0, l, l).on("click", function () {
                    b.scroll(-1, k)
                }).add(n), this.pager = d.text("", 15, 10).css(j.style).add(n), this.down = d.symbol("triangle-down", 0, 0, l, l).on("click", function () {
                    b.scroll(1, k)
                }).add(n);
                b.scroll(0);
                a = f
            } else if (n)i.attr({height: c.chartHeight}), n.hide(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0;
            return a
        }, scroll: function (a, b) {
            var c = this.pages, d = c.length, e = this.currentPage + a, f = this.clipHeight, g = this.options.navigation, h = g.activeColor, g = g.inactiveColor, i = this.pager, j = this.padding;
            e > d && (e = d);
            if (e > 0)b !== u && Ra(b, this.chart), this.nav.attr({
                translateX: j,
                translateY: f + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }), this.up.attr({fill: e === 1 ? g : h}).css({cursor: e === 1 ? "default" : "pointer"}),
                i.attr({text: e + "/" + d}), this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: e === d ? g : h
            }).css({cursor: e === d ? "default" : "pointer"}), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({translateY: c}), this.currentPage = e, this.positionCheckboxes(c)
        }
    };
    M = K.LegendSymbolMixin = {
        drawRectangle: function (a, b) {
            var c = a.options.symbolHeight || 12;
            b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 5 - c / 2, a.symbolWidth, c, a.options.symbolRadius || 0).attr({zIndex: 3}).add(b.legendGroup)
        }, drawLineMarker: function (a) {
            var b =
                this.options, c = b.marker, d;
            d = a.symbolWidth;
            var e = this.chart.renderer, f = this.legendGroup, a = a.baseline - v(e.fontMetrics(a.options.itemStyle.fontSize, this.legendItem).b * 0.3), g;
            if (b.lineWidth) {
                g = {"stroke-width": b.lineWidth};
                if (b.dashStyle)g.dashstyle = b.dashStyle;
                this.legendLine = e.path(["M", 0, a, "L", d, a]).attr(g).add(f)
            }
            if (c && c.enabled !== !1)b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), d.isMarker = !0
        }
    };
    (/Trident\/7\.0/.test(wa) || Ua) && Na(lb.prototype, "positionItem", function (a,
                                                                                   b) {
        var c = this, d = function () {
            b._legendItemPos && a.call(c, b)
        };
        d();
        setTimeout(d)
    });
    Ya.prototype = {
        init: function (a, b) {
            var c, d = a.series;
            a.series = null;
            c = w(E, a);
            c.series = a.series = d;
            this.userOptions = a;
            d = c.chart;
            this.margin = this.splashArray("margin", d);
            this.spacing = this.splashArray("spacing", d);
            var e = d.events;
            this.bounds = {h: {}, v: {}};
            this.callback = b;
            this.isResizing = 0;
            this.options = c;
            this.axes = [];
            this.series = [];
            this.hasCartesianSeries = d.showAxes;
            var f = this, g;
            f.index = W.length;
            W.push(f);
            ab++;
            d.reflow !== !1 && N(f, "load",
                function () {
                    f.initReflow()
                });
            if (e)for (g in e)N(f, g, e[g]);
            f.xAxis = [];
            f.yAxis = [];
            f.animation = ga ? !1 : p(d.animation, !0);
            f.pointCount = f.colorCounter = f.symbolCounter = 0;
            f.firstRender()
        }, initSeries: function (a) {
            var b = this.options.chart;
            (b = H[a.type || b.type || b.defaultSeriesType]) || ha(17, !0);
            b = new b;
            b.init(this, a);
            return b
        }, isInsidePlot: function (a, b, c) {
            var d = c ? b : a, a = c ? a : b;
            return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight
        }, adjustTickAmounts: function () {
            this.options.chart.alignTicks !== !1 && q(this.axes, function (a) {
                a.adjustTickAmount()
            });
            this.maxTicks = null
        }, redraw: function (a) {
            var b = this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, g, h, i = this.hasCartesianSeries, j = this.isDirtyBox, k = c.length, l = k, n = this.renderer, m = n.isHidden(), o = [];
            Ra(a, this);
            m && this.cloneRenderTo();
            for (this.layOutTitles(); l--;)if (a = c[l], a.options.stacking && (g = !0, a.isDirty)) {
                h = !0;
                break
            }
            if (h)for (l = k; l--;)if (a = c[l], a.options.stacking)a.isDirty = !0;
            q(c, function (a) {
                a.isDirty && a.options.legendType === "point" && (f = !0)
            });
            if (f && e.options.enabled)e.render(),
                this.isDirtyLegend = !1;
            g && this.getStacks();
            if (i) {
                if (!this.isResizing)this.maxTicks = null, q(b, function (a) {
                    a.setScale()
                });
                this.adjustTickAmounts()
            }
            this.getMargins();
            i && (q(b, function (a) {
                a.isDirty && (j = !0)
            }), q(b, function (a) {
                if (a.isDirtyExtremes)a.isDirtyExtremes = !1, o.push(function () {
                    I(a, "afterSetExtremes", r(a.eventArgs, a.getExtremes()));
                    delete a.eventArgs
                });
                (j || g) && a.redraw()
            }));
            j && this.drawChartBox();
            q(c, function (a) {
                a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
            });
            d && d.reset(!0);
            n.draw();
            I(this,
                "redraw");
            m && this.cloneRenderTo(!0);
            q(o, function (a) {
                a.call()
            })
        }, get: function (a) {
            var b = this.axes, c = this.series, d, e;
            for (d = 0; d < b.length; d++)if (b[d].options.id === a)return b[d];
            for (d = 0; d < c.length; d++)if (c[d].options.id === a)return c[d];
            for (d = 0; d < c.length; d++) {
                e = c[d].points || [];
                for (b = 0; b < e.length; b++)if (e[b].id === a)return e[b]
            }
            return null
        }, getAxes: function () {
            var a = this, b = this.options, c = b.xAxis = ra(b.xAxis || {}), b = b.yAxis = ra(b.yAxis || {});
            q(c, function (a, b) {
                a.index = b;
                a.isX = !0
            });
            q(b, function (a, b) {
                a.index = b
            });
            c = c.concat(b);
            q(c, function (b) {
                new na(a, b)
            });
            a.adjustTickAmounts()
        }, getSelectedPoints: function () {
            var a = [];
            q(this.series, function (b) {
                a = a.concat(wb(b.points || [], function (a) {
                    return a.selected
                }))
            });
            return a
        }, getSelectedSeries: function () {
            return wb(this.series, function (a) {
                return a.selected
            })
        }, getStacks: function () {
            var a = this;
            q(a.yAxis, function (a) {
                if (a.stacks && a.hasVisibleSeries)a.oldStacks = a.stacks
            });
            q(a.series, function (b) {
                if (b.options.stacking && (b.visible === !0 || a.options.chart.ignoreHiddenSeries === !1))b.stackKey =
                    b.type + p(b.options.stack, "")
            })
        }, setTitle: function (a, b, c) {
            var g;
            var d = this, e = d.options, f;
            f = e.title = w(e.title, a);
            g = e.subtitle = w(e.subtitle, b), e = g;
            q([["title", a, f], ["subtitle", b, e]], function (a) {
                var b = a[0], c = d[b], e = a[1], a = a[2];
                c && e && (d[b] = c = c.destroy());
                a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                    align: a.align,
                    "class": "highcharts-" + b,
                    zIndex: a.zIndex || 4
                }).css(a.style).add())
            });
            d.layOutTitles(c)
        }, layOutTitles: function (a) {
            var b = 0, c = this.title, d = this.subtitle, e = this.options, f = e.title,
                e = e.subtitle, g = this.renderer, h = this.spacingBox.width - 44;
            if (c && (c.css({width: (f.width || h) + "px"}).align(r({y: g.fontMetrics(f.style.fontSize, c).b - 3}, f), !1, "spacingBox"), !f.floating && !f.verticalAlign))b = c.getBBox().height;
            d && (d.css({width: (e.width || h) + "px"}).align(r({y: b + (f.margin - 13) + g.fontMetrics(f.style.fontSize, d).b}, e), !1, "spacingBox"), !e.floating && !e.verticalAlign && (b = La(b + d.getBBox().height)));
            c = this.titleOffset !== b;
            this.titleOffset = b;
            if (!this.isDirtyBox && c)this.isDirtyBox = c, this.hasRendered &&
            p(a, !0) && this.isDirtyBox && this.redraw()
        }, getChartSize: function () {
            var a = this.options.chart, b = a.width, a = a.height, c = this.renderToClone || this.renderTo;
            if (!s(b))this.containerWidth = ib(c, "width");
            if (!s(a))this.containerHeight = ib(c, "height");
            this.chartWidth = t(0, b || this.containerWidth || 600);
            this.chartHeight = t(0, p(a, this.containerHeight > 19 ? this.containerHeight : 400))
        }, cloneRenderTo: function (a) {
            var b = this.renderToClone, c = this.container;
            a ? b && (this.renderTo.appendChild(c), Qa(b), delete this.renderToClone) : (c &&
            c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), B(b, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), b.style.setProperty && b.style.setProperty("display", "block", "important"), x.body.appendChild(b), c && b.appendChild(c))
        }, getContainer: function () {
            var a, b = this.options.chart, c, d, e;
            this.renderTo = a = b.renderTo;
            e = "highcharts-" + ub++;
            if (Ga(a))this.renderTo = a = x.getElementById(a);
            a || ha(13, !0);
            c = y(F(a, "data-highcharts-chart"));
            !isNaN(c) && W[c] && W[c].hasRendered &&
            W[c].destroy();
            F(a, "data-highcharts-chart", this.index);
            a.innerHTML = "";
            !b.skipClone && !a.offsetWidth && this.cloneRenderTo();
            this.getChartSize();
            c = this.chartWidth;
            d = this.chartHeight;
            this.container = a = $(Ka, {
                className: "highcharts-container" + (b.className ? " " + b.className : ""),
                id: e
            }, r({
                position: "relative",
                overflow: "hidden",
                width: c + "px",
                height: d + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, b.style), this.renderToClone || a);
            this._cursor = a.style.cursor;
            this.renderer =
                b.forExport ? new ta(a, c, d, b.style, !0) : new Za(a, c, d, b.style);
            ga && this.renderer.create(this, a, c, d)
        }, getMargins: function () {
            var a = this.spacing, b, c = this.legend, d = this.margin, e = this.options.legend, f = p(e.margin, 20), g = e.x, h = e.y, i = e.align, j = e.verticalAlign, k = this.titleOffset;
            this.resetMargins();
            b = this.axisOffset;
            if (k && !s(d[0]))this.plotTop = t(this.plotTop, k + this.options.title.margin + a[0]);
            if (c.display && !e.floating)if (i === "right") {
                if (!s(d[1]))this.marginRight = t(this.marginRight, c.legendWidth - g + f + a[1])
            } else if (i ===
                "left") {
                if (!s(d[3]))this.plotLeft = t(this.plotLeft, c.legendWidth + g + f + a[3])
            } else if (j === "top") {
                if (!s(d[0]))this.plotTop = t(this.plotTop, c.legendHeight + h + f + a[0])
            } else if (j === "bottom" && !s(d[2]))this.marginBottom = t(this.marginBottom, c.legendHeight - h + f + a[2]);
            this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
            this.extraTopMargin && (this.plotTop += this.extraTopMargin);
            this.hasCartesianSeries && q(this.axes, function (a) {
                a.getOffset()
            });
            s(d[3]) || (this.plotLeft += b[3]);
            s(d[0]) || (this.plotTop += b[0]);
            s(d[2]) || (this.marginBottom += b[2]);
            s(d[1]) || (this.marginRight += b[1]);
            this.setChartSize()
        }, reflow: function (a) {
            var b = this, c = b.options.chart, d = b.renderTo, e = c.width || ib(d, "width"), f = c.height || ib(d, "height"), c = a ? a.target : G, d = function () {
                if (b.container)b.setSize(e, f, !1), b.hasUserSize = null
            };
            if (!b.hasUserSize && e && f && (c === G || c === x)) {
                if (e !== b.containerWidth || f !== b.containerHeight)clearTimeout(b.reflowTimeout), a ? b.reflowTimeout = setTimeout(d, 100) : d();
                b.containerWidth = e;
                b.containerHeight = f
            }
        }, initReflow: function () {
            var a =
                this, b = function (b) {
                a.reflow(b)
            };
            N(G, "resize", b);
            N(a, "destroy", function () {
                X(G, "resize", b)
            })
        }, setSize: function (a, b, c) {
            var d = this, e, f, g;
            d.isResizing += 1;
            g = function () {
                d && I(d, "endResize", null, function () {
                    d.isResizing -= 1
                })
            };
            Ra(c, d);
            d.oldChartHeight = d.chartHeight;
            d.oldChartWidth = d.chartWidth;
            if (s(a))d.chartWidth = e = t(0, v(a)), d.hasUserSize = !!e;
            if (s(b))d.chartHeight = f = t(0, v(b));
            (va ? jb : B)(d.container, {width: e + "px", height: f + "px"}, va);
            d.setChartSize(!0);
            d.renderer.setSize(e, f, c);
            d.maxTicks = null;
            q(d.axes, function (a) {
                a.isDirty = !0;
                a.setScale()
            });
            q(d.series, function (a) {
                a.isDirty = !0
            });
            d.isDirtyLegend = !0;
            d.isDirtyBox = !0;
            d.layOutTitles();
            d.getMargins();
            d.redraw(c);
            d.oldChartHeight = null;
            I(d, "resize");
            va === !1 ? g() : setTimeout(g, va && va.duration || 500)
        }, setChartSize: function (a) {
            var b = this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = this.spacing, h = this.clipOffset, i, j, k, l;
            this.plotLeft = i = v(this.plotLeft);
            this.plotTop = j = v(this.plotTop);
            this.plotWidth = k = t(0, v(d - i - this.marginRight));
            this.plotHeight =
                l = t(0, v(e - j - this.marginBottom));
            this.plotSizeX = b ? l : k;
            this.plotSizeY = b ? k : l;
            this.plotBorderWidth = f.plotBorderWidth || 0;
            this.spacingBox = c.spacingBox = {x: g[3], y: g[0], width: d - g[3] - g[1], height: e - g[0] - g[2]};
            this.plotBox = c.plotBox = {x: i, y: j, width: k, height: l};
            d = 2 * U(this.plotBorderWidth / 2);
            b = La(t(d, h[3]) / 2);
            c = La(t(d, h[0]) / 2);
            this.clipBox = {
                x: b,
                y: c,
                width: U(this.plotSizeX - t(d, h[1]) / 2 - b),
                height: t(0, U(this.plotSizeY - t(d, h[2]) / 2 - c))
            };
            a || q(this.axes, function (a) {
                a.setAxisSize();
                a.setAxisTranslation()
            })
        }, resetMargins: function () {
            var a =
                this.spacing, b = this.margin;
            this.plotTop = p(b[0], a[0]);
            this.marginRight = p(b[1], a[1]);
            this.marginBottom = p(b[2], a[2]);
            this.plotLeft = p(b[3], a[3]);
            this.axisOffset = [0, 0, 0, 0];
            this.clipOffset = [0, 0, 0, 0]
        }, drawChartBox: function () {
            var a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, h = this.plotBGImage, i = a.borderWidth || 0, j = a.backgroundColor, k = a.plotBackgroundColor, l = a.plotBackgroundImage, n = a.plotBorderWidth || 0, m, o = this.plotLeft,
                p = this.plotTop, q = this.plotWidth, r = this.plotHeight, t = this.plotBox, s = this.clipRect, v = this.clipBox;
            m = i + (a.shadow ? 8 : 0);
            if (i || j)if (e)e.animate(e.crisp({width: c - m, height: d - m})); else {
                e = {fill: j || P};
                if (i)e.stroke = a.borderColor, e["stroke-width"] = i;
                this.chartBackground = b.rect(m / 2, m / 2, c - m, d - m, a.borderRadius, i).attr(e).addClass("highcharts-background").add().shadow(a.shadow)
            }
            if (k)f ? f.animate(t) : this.plotBackground = b.rect(o, p, q, r, 0).attr({fill: k}).add().shadow(a.plotShadow);
            if (l)h ? h.animate(t) : this.plotBGImage =
                b.image(l, o, p, q, r).add();
            s ? s.animate({width: v.width, height: v.height}) : this.clipRect = b.clipRect(v);
            if (n)g ? g.animate(g.crisp({
                x: o,
                y: p,
                width: q,
                height: r,
                strokeWidth: -n
            })) : this.plotBorder = b.rect(o, p, q, r, 0, -n).attr({
                stroke: a.plotBorderColor,
                "stroke-width": n,
                fill: P,
                zIndex: 1
            }).add();
            this.isDirtyBox = !1
        }, propFromSeries: function () {
            var a = this, b = a.options.chart, c, d = a.options.series, e, f;
            q(["inverted", "angular", "polar"], function (g) {
                c = H[b.type || b.defaultSeriesType];
                f = a[g] || b[g] || c && c.prototype[g];
                for (e = d && d.length; !f &&
                e--;)(c = H[d[e].type]) && c.prototype[g] && (f = !0);
                a[g] = f
            })
        }, linkSeries: function () {
            var a = this, b = a.series;
            q(b, function (a) {
                a.linkedSeries.length = 0
            });
            q(b, function (b) {
                var d = b.options.linkedTo;
                if (Ga(d) && (d = d === ":previous" ? a.series[b.index - 1] : a.get(d)))d.linkedSeries.push(b), b.linkedParent = d
            })
        }, renderSeries: function () {
            q(this.series, function (a) {
                a.translate();
                a.setTooltipPoints && a.setTooltipPoints();
                a.render()
            })
        }, renderLabels: function () {
            var a = this, b = a.options.labels;
            b.items && q(b.items, function (c) {
                var d = r(b.style,
                    c.style), e = y(d.left) + a.plotLeft, f = y(d.top) + a.plotTop + 12;
                delete d.left;
                delete d.top;
                a.renderer.text(c.html, e, f).attr({zIndex: 2}).css(d).add()
            })
        }, render: function () {
            var a = this.axes, b = this.renderer, c = this.options;
            this.setTitle();
            this.legend = new lb(this, c.legend);
            this.getStacks();
            q(a, function (a) {
                a.setScale()
            });
            this.getMargins();
            this.maxTicks = null;
            q(a, function (a) {
                a.setTickPositions(!0);
                a.setMaxTicks()
            });
            this.adjustTickAmounts();
            this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries && q(a, function (a) {
                a.render()
            });
            if (!this.seriesGroup)this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add();
            this.renderSeries();
            this.renderLabels();
            this.showCredits(c.credits);
            this.hasRendered = !0
        }, showCredits: function (a) {
            if (a.enabled && !this.credits)this.credits = this.renderer.text(a.text, 0, 0).on("click", function () {
                if (a.href)location.href = a.href
            }).attr({align: a.position.align, zIndex: 8}).css(a.style).add().align(a.position)
        }, destroy: function () {
            var a = this, b = a.axes, c = a.series, d = a.container, e, f = d && d.parentNode;
            I(a, "destroy");
            W[a.index] =
                u;
            ab--;
            a.renderTo.removeAttribute("data-highcharts-chart");
            X(a);
            for (e = b.length; e--;)b[e] = b[e].destroy();
            for (e = c.length; e--;)c[e] = c[e].destroy();
            q("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function (b) {
                var c = a[b];
                c && c.destroy && (a[b] = c.destroy())
            });
            if (d)d.innerHTML = "", X(d), f && Qa(d);
            for (e in a)delete a[e]
        }, isReadyToRender: function () {
            var a = this;
            return !ba && G == G.top &&
            x.readyState !== "complete" || ga && !G.canvg ? (ga ? Mb.push(function () {
                a.firstRender()
            }, a.options.global.canvasToolsURL) : x.attachEvent("onreadystatechange", function () {
                x.detachEvent("onreadystatechange", a.firstRender);
                x.readyState === "complete" && a.firstRender()
            }), !1) : !0
        }, firstRender: function () {
            var a = this, b = a.options, c = a.callback;
            if (a.isReadyToRender()) {
                a.getContainer();
                I(a, "init");
                a.resetMargins();
                a.setChartSize();
                a.propFromSeries();
                a.getAxes();
                q(b.series || [], function (b) {
                    a.initSeries(b)
                });
                a.linkSeries();
                I(a,
                    "beforeRender");
                if (K.Pointer)a.pointer = new Wa(a, b);
                a.render();
                a.renderer.draw();
                c && c.apply(a, [a]);
                q(a.callbacks, function (b) {
                    b.apply(a, [a])
                });
                a.cloneRenderTo(!0);
                I(a, "load")
            }
        }, splashArray: function (a, b) {
            var c = b[a], c = da(c) ? c : [c, c, c, c];
            return [p(b[a + "Top"], c[0]), p(b[a + "Right"], c[1]), p(b[a + "Bottom"], c[2]), p(b[a + "Left"], c[3])]
        }
    };
    Ya.prototype.callbacks = [];
    Z = K.CenteredSeriesMixin = {
        getCenter: function () {
            var a = this.options, b = this.chart, c = 2 * (a.slicedOffset || 0), d, e = b.plotWidth - 2 * c, f = b.plotHeight - 2 * c, b = a.center,
                a = [p(b[0], "50%"), p(b[1], "50%"), a.size || "100%", a.innerSize || 0], g = L(e, f), h;
            return Va(a, function (a, b) {
                h = /%$/.test(a);
                d = b < 2 || b === 2 && h;
                return (h ? [e, f, g, g][b] * y(a) / 100 : a) + (d ? c : 0)
            })
        }
    };
    var Fa = function () {
    };
    Fa.prototype = {
        init: function (a, b, c) {
            this.series = a;
            this.applyOptions(b, c);
            this.pointAttr = {};
            if (a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length))a.colorCounter = 0;
            a.chart.pointCount++;
            return this
        }, applyOptions: function (a,
                                   b) {
            var c = this.series, d = c.options.pointValKey || c.pointValKey, a = Fa.prototype.optionsToObject.call(this, a);
            r(this, a);
            this.options = this.options ? r(this.options, a) : a;
            if (d)this.y = this[d];
            if (this.x === u && c)this.x = b === u ? c.autoIncrement() : b;
            return this
        }, optionsToObject: function (a) {
            var b = {}, c = this.series, d = c.pointArrayMap || ["y"], e = d.length, f = 0, g = 0;
            if (typeof a === "number" || a === null)b[d[0]] = a; else if (Ha(a)) {
                if (a.length > e) {
                    c = typeof a[0];
                    if (c === "string")b.name = a[0]; else if (c === "number")b.x = a[0];
                    f++
                }
                for (; g < e;)b[d[g++]] =
                    a[f++]
            } else if (typeof a === "object") {
                b = a;
                if (a.dataLabels)c._hasPointLabels = !0;
                if (a.marker)c._hasPointMarkers = !0
            }
            return b
        }, destroy: function () {
            var a = this.series.chart, b = a.hoverPoints, c;
            a.pointCount--;
            if (b && (this.setState(), la(b, this), !b.length))a.hoverPoints = null;
            if (this === a.hoverPoint)this.onMouseOut();
            if (this.graphic || this.dataLabel)X(this), this.destroyElements();
            this.legendItem && a.legend.destroyItem(this);
            for (c in this)this[c] = null
        }, destroyElements: function () {
            for (var a = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","),
                     b, c = 6; c--;)b = a[c], this[b] && (this[b] = this[b].destroy())
        }, getLabelConfig: function () {
            return {
                x: this.category,
                y: this.y,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        }, tooltipFormatter: function (a) {
            var b = this.series, c = b.tooltipOptions, d = p(c.valueDecimals, ""), e = c.valuePrefix || "", f = c.valueSuffix || "";
            q(b.pointArrayMap || ["y"], function (b) {
                b = "{point." + b;
                if (e || f)a = a.replace(b + "}", e + b + "}" + f);
                a = a.replace(b + "}", b + ":,." + d + "f}")
            });
            return Ja(a,
                {point: this, series: this.series})
        }, firePointEvent: function (a, b, c) {
            var d = this, e = this.series.options;
            (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
            a === "click" && e.allowPointSelect && (c = function (a) {
                d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
            });
            I(this, a, b, c)
        }
    };
    var O = function () {
    };
    O.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: Fa,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor", r: "radius"},
        axisTypes: ["xAxis",
            "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function (a, b) {
            var c = this, d, e, f = a.series, g = function (a, b) {
                return p(a.options.index, a._i) - p(b.options.index, b._i)
            };
            c.chart = a;
            c.options = b = c.setOptions(b);
            c.linkedSeries = [];
            c.bindAxes();
            r(c, {name: b.name, state: "", pointAttr: {}, visible: b.visible !== !1, selected: b.selected === !0});
            if (ga)b.animation = !1;
            e = b.events;
            for (d in e)N(c, d, e[d]);
            if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)a.runTrackerClick = !0;
            c.getColor();
            c.getSymbol();
            q(c.parallelArrays, function (a) {
                c[a + "Data"] = []
            });
            c.setData(b.data, !1);
            if (c.isCartesian)a.hasCartesianSeries = !0;
            f.push(c);
            c._i = f.length - 1;
            ob(f, g);
            this.yAxis && ob(this.yAxis.series, g);
            q(f, function (a, b) {
                a.index = b;
                a.name = a.name || "Series " + (b + 1)
            })
        },
        bindAxes: function () {
            var a = this, b = a.options, c = a.chart, d;
            q(a.axisTypes || [], function (e) {
                q(c[e], function (c) {
                    d = c.options;
                    if (b[e] === d.index || b[e] !== u && b[e] === d.id || b[e] === u && d.index === 0)c.series.push(a), a[e] = c, c.isDirty = !0
                });
                !a[e] && a.optionalAxis !== e && ha(18, !0)
            })
        },
        updateParallelArrays: function (a, b) {
            var c = a.series, d = arguments;
            q(c.parallelArrays, typeof b === "number" ? function (d) {
                var f = d === "y" && c.toYData ? c.toYData(a) : a[d];
                c[d + "Data"][b] = f
            } : function (a) {
                Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
            })
        },
        autoIncrement: function () {
            var a = this.options, b = this.xIncrement, b = p(b, a.pointStart, 0);
            this.pointInterval = p(this.pointInterval, a.pointInterval, 1);
            this.xIncrement = b + this.pointInterval;
            return b
        },
        getSegments: function () {
            var a = -1, b = [], c, d = this.points,
                e = d.length;
            if (e)if (this.options.connectNulls) {
                for (c = e; c--;)d[c].y === null && d.splice(c, 1);
                d.length && (b = [d])
            } else q(d, function (c, g) {
                c.y === null ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1))
            });
            this.segments = b
        },
        setOptions: function (a) {
            var b = this.chart, c = b.options.plotOptions, b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type];
            this.userOptions = a;
            c = w(e, c.series, a);
            this.tooltipOptions = w(E.tooltip, E.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] &&
                d[this.type].tooltip, a.tooltip);
            e.marker === null && delete c.marker;
            return c
        },
        getCyclic: function (a, b, c) {
            var d = this.userOptions, e = "_" + a + "Index", f = a + "Counter";
            b || (s(d[e]) ? b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]);
            this[a] = b
        },
        getColor: function () {
            this.options.colorByPoint || this.getCyclic("color", this.options.color || ca[this.type].color, this.chart.options.colors)
        },
        getSymbol: function () {
            var a = this.options.marker;
            this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
            if (/^url/.test(this.symbol))a.radius =
                0
        },
        drawLegendSymbol: M.drawLineMarker,
        setData: function (a, b, c, d) {
            var e = this, f = e.points, g = f && f.length || 0, h, i = e.options, j = e.chart, k = null, l = e.xAxis, n = l && !!l.categories, m = e.tooltipPoints, o = i.turboThreshold, r = this.xData, t = this.yData, s = (h = e.pointArrayMap) && h.length, a = a || [];
            h = a.length;
            b = p(b, !0);
            if (d !== !1 && h && g === h && !e.cropped && !e.hasGroupedData)q(a, function (a, b) {
                f[b].update(a, !1, null, !1)
            }); else {
                e.xIncrement = null;
                e.pointRange = n ? 1 : i.pointRange;
                e.colorCounter = 0;
                q(this.parallelArrays, function (a) {
                    e[a + "Data"].length =
                        0
                });
                if (o && h > o) {
                    for (c = 0; k === null && c < h;)k = a[c], c++;
                    if (ja(k)) {
                        n = p(i.pointStart, 0);
                        i = p(i.pointInterval, 1);
                        for (c = 0; c < h; c++)r[c] = n, t[c] = a[c], n += i;
                        e.xIncrement = n
                    } else if (Ha(k))if (s)for (c = 0; c < h; c++)i = a[c], r[c] = i[0], t[c] = i.slice(1, s + 1); else for (c = 0; c < h; c++)i = a[c], r[c] = i[0], t[c] = i[1]; else ha(12)
                } else for (c = 0; c < h; c++)if (a[c] !== u && (i = {series: e}, e.pointClass.prototype.applyOptions.apply(i, [a[c]]), e.updateParallelArrays(i, c), n && i.name))l.names[i.x] = i.name;
                Ga(t[0]) && ha(14, !0);
                e.data = [];
                e.options.data = a;
                for (c = g; c--;)f[c] &&
                f[c].destroy && f[c].destroy();
                if (m)m.length = 0;
                if (l)l.minRange = l.userMinRange;
                e.isDirty = e.isDirtyData = j.isDirtyBox = !0;
                c = !1
            }
            b && j.redraw(c)
        },
        processData: function (a) {
            var b = this.xData, c = this.yData, d = b.length, e;
            e = 0;
            var f, g, h = this.xAxis, i, j = this.options;
            i = j.cropThreshold;
            var k = 0, l = this.isCartesian, n, m;
            if (l && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a)return !1;
            if (h)n = h.getExtremes(), m = n.min, n = n.max;
            if (l && this.sorted && (!i || d > i || this.forceCrop))if (b[d - 1] < m || b[0] > n)b = [], c = []; else if (b[0] < m || b[d - 1] > n)e =
                this.cropData(this.xData, this.yData, m, n), b = e.xData, c = e.yData, e = e.start, f = !0, k = b.length;
            for (i = b.length - 1; i >= 0; i--)d = b[i] - b[i - 1], !f && b[i] > m && b[i] < n && k++, d > 0 && (g === u || d < g) ? g = d : d < 0 && this.requireSorting && ha(15);
            this.cropped = f;
            this.cropStart = e;
            this.processedXData = b;
            this.processedYData = c;
            this.activePointCount = k;
            if (j.pointRange === null)this.pointRange = g || 1;
            this.closestPointRange = g
        },
        cropData: function (a, b, c, d) {
            var e = a.length, f = 0, g = e, h = p(this.cropShoulder, 1), i;
            for (i = 0; i < e; i++)if (a[i] >= c) {
                f = t(0, i - h);
                break
            }
            for (; i <
                   e; i++)if (a[i] > d) {
                g = i + h;
                break
            }
            return {xData: a.slice(f, g), yData: b.slice(f, g), start: f, end: g}
        },
        generatePoints: function () {
            var a = this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, i, j = this.hasGroupedData, k, l = [], n;
            if (!b && !j)b = [], b.length = a.length, b = this.data = b;
            for (n = 0; n < g; n++)i = h + n, j ? l[n] = (new f).init(this, [d[n]].concat(ra(e[n]))) : (b[i] ? k = b[i] : a[i] !== u && (b[i] = k = (new f).init(this, a[i], d[n])), l[n] = k), l[n].index = i;
            if (b && (g !== (c = b.length) ||
                j))for (n = 0; n < c; n++)if (n === h && !j && (n += g), b[n])b[n].destroyElements(), b[n].plotX = u;
            this.data = b;
            this.points = l
        },
        getExtremes: function (a) {
            var b = this.yAxis, c = this.processedXData, d, e = [], f = 0;
            d = this.xAxis.getExtremes();
            var g = d.min, h = d.max, i, j, k, l, a = a || this.stackedYData || this.processedYData;
            d = a.length;
            for (l = 0; l < d; l++)if (j = c[l], k = a[l], i = k !== null && k !== u && (!b.isLog || k.length || k > 0), j = this.getExtremesFromAll || this.cropped || (c[l + 1] || j) >= g && (c[l - 1] || j) <= h, i && j)if (i = k.length)for (; i--;)k[i] !== null && (e[f++] = k[i]); else e[f++] =
                k;
            this.dataMin = p(void 0, Oa(e));
            this.dataMax = p(void 0, Ca(e))
        },
        translate: function () {
            this.processedXData || this.processData();
            this.generatePoints();
            for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, i = a.pointPlacement, j = i === "between" || ja(i), k = a.threshold, a = 0; a < g; a++) {
                var l = f[a], n = l.x, m = l.y, o = l.low, q = b && e.stacks[(this.negStacks && m < k ? "-" : "") + this.stackKey];
                if (e.isLog && m <= 0)l.y = m = null, ha(10);
                l.plotX = c.translate(n, 0, 0, 0, 1, i, this.type ===
                    "flags");
                if (b && this.visible && q && q[n])q = q[n], m = q.points[this.index + "," + a], o = m[0], m = m[1], o === 0 && (o = p(k, e.min)), e.isLog && o <= 0 && (o = null), l.total = l.stackTotal = q.total, l.percentage = q.total && l.y / q.total * 100, l.stackY = m, q.setOffset(this.pointXOffset || 0, this.barW || 0);
                l.yBottom = s(o) ? e.translate(o, 0, 1, 0, 1) : null;
                h && (m = this.modifyValue(m, l));
                l.plotY = typeof m === "number" && m !== Infinity ? e.translate(m, 0, 1, 0, 1) : u;
                l.clientX = j ? c.translate(n, 0, 0, 0, 1) : l.plotX;
                l.negative = l.y < (k || 0);
                l.category = d && d[l.x] !== u ? d[l.x] : l.x
            }
            this.getSegments()
        },
        animate: function (a) {
            var b = this.chart, c = b.renderer, d;
            d = this.options.animation;
            var e = this.clipBox || b.clipBox, f = b.inverted, g;
            if (d && !da(d))d = ca[this.type].animation;
            g = ["_sharedClip", d.duration, d.easing, e.height].join(",");
            a ? (a = b[g], d = b[g + "m"], a || (b[g] = a = c.clipRect(r(e, {width: 0})), b[g + "m"] = d = c.clipRect(-99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), this.group.clip(a), this.markerGroup.clip(d), this.sharedClipKey = g) : ((a = b[g]) && a.animate({width: b.plotSizeX}, d), b[g + "m"] && b[g + "m"].animate({
                width: b.plotSizeX +
                99
            }, d), this.animate = null)
        },
        afterAnimate: function () {
            var a = this.chart, b = this.sharedClipKey, c = this.group, d = this.clipBox;
            if (c && this.options.clip !== !1) {
                if (!b || !d)c.clip(d ? a.renderer.clipRect(d) : a.clipRect);
                this.markerGroup.clip()
            }
            I(this, "afterAnimate");
            setTimeout(function () {
                b && a[b] && (d || (a[b] = a[b].destroy()), a[b + "m"] && (a[b + "m"] = a[b + "m"].destroy()))
            }, 100)
        },
        drawPoints: function () {
            var a, b = this.points, c = this.chart, d, e, f, g, h, i, j, k, l = this.options.marker, n = this.pointAttr[""], m, o, q, t = this.markerGroup, s = p(l.enabled,
                !this.requireSorting || this.activePointCount < 0.5 * this.xAxis.len / l.radius);
            if (l.enabled !== !1 || this._hasPointMarkers)for (f = b.length; f--;)if (g = b[f], d = U(g.plotX), e = g.plotY, k = g.graphic, m = g.marker || {}, o = !!g.marker, a = s && m.enabled === u || m.enabled, q = c.isInsidePlot(v(d), e, c.inverted), a && e !== u && !isNaN(e) && g.y !== null)if (a = g.pointAttr[g.selected ? "select" : ""] || n, h = a.r, i = p(m.symbol, this.symbol), j = i.indexOf("url") === 0, k)k[q ? "show" : "hide"](!0).animate(r({
                x: d - h,
                y: e - h
            }, k.symbolName ? {width: 2 * h, height: 2 * h} : {})); else {
                if (q &&
                    (h > 0 || j))g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h, o ? m : l).attr(a).add(t)
            } else if (k)g.graphic = k.destroy()
        },
        convertAttribs: function (a, b, c, d) {
            var e = this.pointAttrToOptions, f, g, h = {}, a = a || {}, b = b || {}, c = c || {}, d = d || {};
            for (f in e)g = e[f], h[f] = p(a[g], b[f], c[f], d[f]);
            return h
        },
        getAttribs: function () {
            var a = this, b = a.options, c = ca[a.type].marker ? b.marker : b, d = c.states, e = d.hover, f, g = a.color;
            f = {stroke: g, fill: g};
            var h = a.points || [], i, j = [], k, l = a.pointAttrToOptions;
            k = a.hasPointSpecificOptions;
            var n = b.negativeColor, m =
                c.lineColor, o = c.fillColor;
            i = b.turboThreshold;
            var p;
            b.marker ? (e.radius = e.radius || c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth + e.lineWidthPlus) : e.color = e.color || ya(e.color || g).brighten(e.brightness).get();
            j[""] = a.convertAttribs(c, f);
            q(["hover", "select"], function (b) {
                j[b] = a.convertAttribs(d[b], j[""])
            });
            a.pointAttr = j;
            g = h.length;
            if (!i || g < i || k)for (; g--;) {
                i = h[g];
                if ((c = i.options && i.options.marker || i.options) && c.enabled === !1)c.radius = 0;
                if (i.negative && n)i.color = i.fillColor = n;
                k = b.colorByPoint ||
                    i.color;
                if (i.options)for (p in l)s(c[l[p]]) && (k = !0);
                if (k) {
                    c = c || {};
                    k = [];
                    d = c.states || {};
                    f = d.hover = d.hover || {};
                    if (!b.marker)f.color = f.color || !i.options.color && e.color || ya(i.color).brighten(f.brightness || e.brightness).get();
                    f = {color: i.color};
                    if (!o)f.fillColor = i.color;
                    if (!m)f.lineColor = i.color;
                    k[""] = a.convertAttribs(r(f, c), j[""]);
                    k.hover = a.convertAttribs(d.hover, j.hover, k[""]);
                    k.select = a.convertAttribs(d.select, j.select, k[""])
                } else k = j;
                i.pointAttr = k
            }
        },
        destroy: function () {
            var a = this, b = a.chart, c = /AppleWebKit\/533/.test(wa),
                d, e, f = a.data || [], g, h, i;
            I(a, "destroy");
            X(a);
            q(a.axisTypes || [], function (b) {
                if (i = a[b])la(i.series, a), i.isDirty = i.forceRedraw = !0
            });
            a.legendItem && a.chart.legend.destroyItem(a);
            for (e = f.length; e--;)(g = f[e]) && g.destroy && g.destroy();
            a.points = null;
            clearTimeout(a.animationTimeout);
            q("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function (b) {
                a[b] && (d = c && b === "group" ? "hide" : "destroy", a[b][d]())
            });
            if (b.hoverSeries === a)b.hoverSeries = null;
            la(b.series, a);
            for (h in a)delete a[h]
        },
        getSegmentPath: function (a) {
            var b = this, c = [], d = b.options.step;
            q(a, function (e, f) {
                var g = e.plotX, h = e.plotY, i;
                b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"), d && f && (i = a[f - 1], d === "right" ? c.push(i.plotX, h) : d === "center" ? c.push((i.plotX + g) / 2, i.plotY, (i.plotX + g) / 2, h) : c.push(g, i.plotY)), c.push(e.plotX, e.plotY))
            });
            return c
        },
        getGraphPath: function () {
            var a = this, b = [], c, d = [];
            q(a.segments, function (e) {
                c = a.getSegmentPath(e);
                e.length > 1 ? b = b.concat(c) : d.push(e[0])
            });
            a.singlePoints = d;
            return a.graphPath =
                b
        },
        drawGraph: function () {
            var a = this, b = this.options, c = [["graph", b.lineColor || this.color]], d = b.lineWidth, e = b.dashStyle, f = b.linecap !== "square", g = this.getGraphPath(), h = b.negativeColor;
            h && c.push(["graphNeg", h]);
            q(c, function (c, h) {
                var k = c[0], l = a[k];
                if (l)bb(l), l.animate({d: g}); else if (d && g.length)l = {
                    stroke: c[1],
                    "stroke-width": d,
                    fill: P,
                    zIndex: 1
                }, e ? l.dashstyle = e : f && (l["stroke-linecap"] = l["stroke-linejoin"] = "round"), a[k] = a.chart.renderer.path(g).attr(l).add(a.group).shadow(!h && b.shadow)
            })
        },
        clipNeg: function () {
            var a =
                this.options, b = this.chart, c = b.renderer, d = a.negativeColor || a.negativeFillColor, e, f = this.graph, g = this.area, h = this.posClip, i = this.negClip;
            e = b.chartWidth;
            var j = b.chartHeight, k = t(e, j), l = this.yAxis;
            if (d && (f || g)) {
                d = v(l.toPixels(a.threshold || 0, !0));
                d < 0 && (k -= d);
                a = {x: 0, y: 0, width: k, height: d};
                k = {x: 0, y: d, width: k, height: k};
                if (b.inverted)a.height = k.y = b.plotWidth - d, c.isVML && (a = {
                    x: b.plotWidth - d - b.plotLeft,
                    y: 0,
                    width: e,
                    height: j
                }, k = {x: d + b.plotLeft - e, y: 0, width: b.plotLeft + d, height: e});
                l.reversed ? (b = k, e = a) : (b = a, e = k);
                h ?
                    (h.animate(b), i.animate(e)) : (this.posClip = h = c.clipRect(b), this.negClip = i = c.clipRect(e), f && this.graphNeg && (f.clip(h), this.graphNeg.clip(i)), g && (g.clip(h), this.areaNeg.clip(i)))
            }
        },
        invertGroups: function () {
            function a() {
                var a = {width: b.yAxis.len, height: b.xAxis.len};
                q(["group", "markerGroup"], function (c) {
                    b[c] && b[c].attr(a).invert()
                })
            }

            var b = this, c = b.chart;
            if (b.xAxis)N(c, "resize", a), N(b, "destroy", function () {
                X(c, "resize", a)
            }), a(), b.invertGroups = a
        },
        plotGroup: function (a, b, c, d, e) {
            var f = this[a], g = !f;
            g && (this[a] =
                f = this.chart.renderer.g(b).attr({visibility: c, zIndex: d || 0.1}).add(e));
            f[g ? "attr" : "animate"](this.getPlotBox());
            return f
        },
        getPlotBox: function () {
            var a = this.chart, b = this.xAxis, c = this.yAxis;
            if (a.inverted)b = c, c = this.xAxis;
            return {translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1}
        },
        render: function () {
            var a = this, b = a.chart, c, d = a.options, e = (c = d.animation) && !!a.animate && b.renderer.isSVG && p(c.duration, 500) || 0, f = a.visible ? "visible" : "hidden", g = d.zIndex, h = a.hasRendered, i = b.seriesGroup;
            c = a.plotGroup("group", "series", f, g, i);
            a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, i);
            e && a.animate(!0);
            a.getAttribs();
            c.inverted = a.isCartesian ? b.inverted : !1;
            a.drawGraph && (a.drawGraph(), a.clipNeg());
            q(a.points, function (a) {
                a.redraw && a.redraw()
            });
            a.drawDataLabels && a.drawDataLabels();
            a.visible && a.drawPoints();
            a.drawTracker && a.options.enableMouseTracking !== !1 && a.drawTracker();
            b.inverted && a.invertGroups();
            d.clip !== !1 && !a.sharedClipKey && !h && c.clip(b.clipRect);
            e && a.animate();
            if (!h)e ? a.animationTimeout =
                setTimeout(function () {
                    a.afterAnimate()
                }, e) : a.afterAnimate();
            a.isDirty = a.isDirtyData = !1;
            a.hasRendered = !0
        },
        redraw: function () {
            var a = this.chart, b = this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
            c && (a.inverted && c.attr({
                width: a.plotWidth,
                height: a.plotHeight
            }), c.animate({translateX: p(d && d.left, a.plotLeft), translateY: p(e && e.top, a.plotTop)}));
            this.translate();
            this.setTooltipPoints && this.setTooltipPoints(!0);
            this.render();
            b && I(this, "updatedData")
        }
    };
    Gb.prototype = {
        destroy: function () {
            Pa(this, this.axis)
        },
        render: function (a) {
            var b = this.options, c = b.format, c = c ? Ja(c, this) : b.formatter.call(this);
            this.label ? this.label.attr({
                text: c,
                visibility: "hidden"
            }) : this.label = this.axis.chart.renderer.text(c, null, null, b.useHTML).css(b.style).attr({
                align: this.textAlign,
                rotation: b.rotation,
                visibility: "hidden"
            }).add(a)
        }, setOffset: function (a, b) {
            var c = this.axis, d = c.chart, e = d.inverted, f = this.isNegative, g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1), c = c.translate(0), c = Q(g - c), h = d.xAxis[0].translate(this.x) + a, i = d.plotHeight,
                f = {
                    x: e ? f ? g : g - c : h,
                    y: e ? i - h - b : f ? i - g - c : i - g,
                    width: e ? c : b,
                    height: e ? b : c
                };
            if (e = this.label)e.align(this.alignOptions, null, f), f = e.alignAttr, e[this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0)
        }
    };
    na.prototype.buildStacks = function () {
        var a = this.series, b = p(this.options.reversedStacks, !0), c = a.length;
        if (!this.isXAxis) {
            for (this.usePercentage = !1; c--;)a[b ? c : a.length - c - 1].setStackedPoints();
            if (this.usePercentage)for (c = 0; c < a.length; c++)a[c].setPercentStacks()
        }
    };
    na.prototype.renderStackTotals = function () {
        var a =
            this.chart, b = a.renderer, c = this.stacks, d, e, f = this.stackTotalGroup;
        if (!f)this.stackTotalGroup = f = b.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add();
        f.translate(a.plotLeft, a.plotTop);
        for (d in c)for (e in a = c[d], a)a[e].render(f)
    };
    O.prototype.setStackedPoints = function () {
        if (this.options.stacking && !(this.visible !== !0 && this.chart.options.chart.ignoreHiddenSeries !== !1)) {
            var a = this.processedXData, b = this.processedYData, c = [], d = b.length, e = this.options, f = e.threshold, g = e.stack, e = e.stacking, h = this.stackKey,
                i = "-" + h, j = this.negStacks, k = this.yAxis, l = k.stacks, n = k.oldStacks, m, o, p, q, r, s;
            for (q = 0; q < d; q++) {
                r = a[q];
                s = b[q];
                p = this.index + "," + q;
                o = (m = j && s < f) ? i : h;
                l[o] || (l[o] = {});
                if (!l[o][r])n[o] && n[o][r] ? (l[o][r] = n[o][r], l[o][r].total = null) : l[o][r] = new Gb(k, k.options.stackLabels, m, r, g);
                o = l[o][r];
                o.points[p] = [o.cum || 0];
                e === "percent" ? (m = m ? h : i, j && l[m] && l[m][r] ? (m = l[m][r], o.total = m.total = t(m.total, o.total) + Q(s) || 0) : o.total = ea(o.total + (Q(s) || 0))) : o.total = ea(o.total + (s || 0));
                o.cum = (o.cum || 0) + (s || 0);
                o.points[p].push(o.cum);
                c[q] = o.cum
            }
            if (e === "percent")k.usePercentage = !0;
            this.stackedYData = c;
            k.oldStacks = {}
        }
    };
    O.prototype.setPercentStacks = function () {
        var a = this, b = a.stackKey, c = a.yAxis.stacks, d = a.processedXData;
        q([b, "-" + b], function (b) {
            var e;
            for (var f = d.length, g, h; f--;)if (g = d[f], e = (h = c[b] && c[b][g]) && h.points[a.index + "," + f], g = e)h = h.total ? 100 / h.total : 0, g[0] = ea(g[0] * h), g[1] = ea(g[1] * h), a.stackedYData[f] = g[1]
        })
    };
    r(Ya.prototype, {
        addSeries: function (a, b, c) {
            var d, e = this;
            a && (b = p(b, !0), I(e, "addSeries", {options: a}, function () {
                d = e.initSeries(a);
                e.isDirtyLegend = !0;
                e.linkSeries();
                b && e.redraw(c)
            }));
            return d
        }, addAxis: function (a, b, c, d) {
            var e = b ? "xAxis" : "yAxis", f = this.options;
            new na(this, w(a, {index: this[e].length, isX: b}));
            f[e] = ra(f[e] || {});
            f[e].push(a);
            p(c, !0) && this.redraw(d)
        }, showLoading: function (a) {
            var b = this, c = b.options, d = b.loadingDiv, e = c.loading, f = function () {
                d && B(d, {
                    left: b.plotLeft + "px",
                    top: b.plotTop + "px",
                    width: b.plotWidth + "px",
                    height: b.plotHeight + "px"
                })
            };
            if (!d)b.loadingDiv = d = $(Ka, {className: "highcharts-loading"}, r(e.style, {zIndex: 10, display: P}),
                b.container), b.loadingSpan = $("span", null, e.labelStyle, d), N(b, "redraw", f);
            b.loadingSpan.innerHTML = a || c.lang.loading;
            if (!b.loadingShown)B(d, {
                opacity: 0,
                display: ""
            }), jb(d, {opacity: e.style.opacity}, {duration: e.showDuration || 0}), b.loadingShown = !0;
            f()
        }, hideLoading: function () {
            var a = this.options, b = this.loadingDiv;
            b && jb(b, {opacity: 0}, {
                duration: a.loading.hideDuration || 100, complete: function () {
                    B(b, {display: P})
                }
            });
            this.loadingShown = !1
        }
    });
    r(Fa.prototype, {
        update: function (a, b, c, d) {
            function e() {
                f.applyOptions(a);
                if (da(a) && !Ha(a))f.redraw = function () {
                    if (h)a && a.marker && a.marker.symbol ? f.graphic = h.destroy() : h.attr(f.pointAttr[f.state || ""]);
                    if (a && a.dataLabels && f.dataLabel)f.dataLabel = f.dataLabel.destroy();
                    f.redraw = null
                };
                i = f.index;
                g.updateParallelArrays(f, i);
                k.data[i] = f.options;
                g.isDirty = g.isDirtyData = !0;
                if (!g.fixedBox && g.hasCartesianSeries)j.isDirtyBox = !0;
                k.legendType === "point" && j.legend.destroyItem(f);
                b && j.redraw(c)
            }

            var f = this, g = f.series, h = f.graphic, i, j = g.chart, k = g.options, b = p(b, !0);
            d === !1 ? e() : f.firePointEvent("update",
                {options: a}, e)
        }, remove: function (a, b) {
            var c = this, d = c.series, e = d.points, f = d.chart, g, h = d.data;
            Ra(b, f);
            a = p(a, !0);
            c.firePointEvent("remove", null, function () {
                g = Ma(c, h);
                h.length === e.length && e.splice(g, 1);
                h.splice(g, 1);
                d.options.data.splice(g, 1);
                d.updateParallelArrays(c, "splice", g, 1);
                c.destroy();
                d.isDirty = !0;
                d.isDirtyData = !0;
                a && f.redraw()
            })
        }
    });
    r(O.prototype, {
        addPoint: function (a, b, c, d) {
            var e = this.options, f = this.data, g = this.graph, h = this.area, i = this.chart, j = this.xAxis && this.xAxis.names, k = g && g.shift || 0, l = e.data,
                n, m = this.xData;
            Ra(d, i);
            c && q([g, h, this.graphNeg, this.areaNeg], function (a) {
                if (a)a.shift = k + 1
            });
            if (h)h.isArea = !0;
            b = p(b, !0);
            d = {series: this};
            this.pointClass.prototype.applyOptions.apply(d, [a]);
            g = d.x;
            h = m.length;
            if (this.requireSorting && g < m[h - 1])for (n = !0; h && m[h - 1] > g;)h--;
            this.updateParallelArrays(d, "splice", h, 0, 0);
            this.updateParallelArrays(d, h);
            if (j && d.name)j[g] = d.name;
            l.splice(h, 0, a);
            n && (this.data.splice(h, 0, null), this.processData());
            e.legendType === "point" && this.generatePoints();
            c && (f[0] && f[0].remove ? f[0].remove(!1) :
                (f.shift(), this.updateParallelArrays(d, "shift"), l.shift()));
            this.isDirtyData = this.isDirty = !0;
            b && (this.getAttribs(), i.redraw())
        }, remove: function (a, b) {
            var c = this, d = c.chart, a = p(a, !0);
            if (!c.isRemoving)c.isRemoving = !0, I(c, "remove", null, function () {
                c.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                d.linkSeries();
                a && d.redraw(b)
            });
            c.isRemoving = !1
        }, update: function (a, b) {
            var c = this, d = this.chart, e = this.userOptions, f = this.type, g = H[f].prototype, h = ["group", "markerGroup", "dataLabelsGroup"], i;
            q(h, function (a) {
                h[a] = c[a];
                delete c[a]
            });
            a = w(e, {animation: !1, index: this.index, pointStart: this.xData[0]}, {data: this.options.data}, a);
            this.remove(!1);
            for (i in g)g.hasOwnProperty(i) && (this[i] = u);
            r(this, H[a.type || f].prototype);
            q(h, function (a) {
                c[a] = h[a]
            });
            this.init(d, a);
            d.linkSeries();
            p(b, !0) && d.redraw(!1)
        }
    });
    r(na.prototype, {
        update: function (a, b) {
            var c = this.chart, a = c.options[this.coll][this.options.index] = w(this.userOptions, a);
            this.destroy(!0);
            this._addedPlotLB = u;
            this.init(c, r(a, {events: u}));
            c.isDirtyBox = !0;
            p(b, !0) && c.redraw()
        }, remove: function (a) {
            for (var b =
                this.chart, c = this.coll, d = this.series, e = d.length; e--;)d[e] && d[e].remove(!1);
            la(b.axes, this);
            la(b[c], this);
            b.options[c].splice(this.options.index, 1);
            q(b[c], function (a, b) {
                a.options.index = b
            });
            this.destroy();
            b.isDirtyBox = !0;
            p(a, !0) && b.redraw()
        }, setTitle: function (a, b) {
            this.update({title: a}, b)
        }, setCategories: function (a, b) {
            this.update({categories: a}, b)
        }
    });
    ia = ma(O);
    H.line = ia;
    ca.area = w(T, {threshold: 0});
    var qa = ma(O, {
        type: "area", getSegments: function () {
            var a = this, b = [], c = [], d = [], e = this.xAxis, f = this.yAxis, g = f.stacks[this.stackKey],
                h = {}, i, j, k = this.points, l = this.options.connectNulls, n, m;
            if (this.options.stacking && !this.cropped) {
                for (n = 0; n < k.length; n++)h[k[n].x] = k[n];
                for (m in g)g[m].total !== null && d.push(+m);
                d.sort(function (a, b) {
                    return a - b
                });
                q(d, function (b) {
                    var d = 0, k;
                    if (!l || h[b] && h[b].y !== null)if (h[b])c.push(h[b]); else {
                        for (n = a.index; n <= f.series.length; n++)if (k = g[b].points[n + "," + b]) {
                            d = k[1];
                            break
                        }
                        i = e.translate(b);
                        j = f.toPixels(d, !0);
                        c.push({y: null, plotX: i, clientX: i, plotY: j, yBottom: j, onMouseOver: sa})
                    }
                });
                c.length && b.push(c)
            } else O.prototype.getSegments.call(this),
                b = this.segments;
            this.segments = b
        }, getSegmentPath: function (a) {
            var b = O.prototype.getSegmentPath.call(this, a), c = [].concat(b), d, e = this.options;
            d = b.length;
            var f = this.yAxis.getThreshold(e.threshold), g;
            d === 3 && c.push("L", b[1], b[2]);
            if (e.stacking && !this.closedStacks)for (d = a.length - 1; d >= 0; d--)g = p(a[d].yBottom, f), d < a.length - 1 && e.step && c.push(a[d + 1].plotX, g), c.push(a[d].plotX, g); else this.closeSegment(c, a, f);
            this.areaPath = this.areaPath.concat(c);
            return b
        }, closeSegment: function (a, b, c) {
            a.push("L", b[b.length - 1].plotX,
                c, "L", b[0].plotX, c)
        }, drawGraph: function () {
            this.areaPath = [];
            O.prototype.drawGraph.apply(this);
            var a = this, b = this.areaPath, c = this.options, d = c.negativeColor, e = c.negativeFillColor, f = [["area", this.color, c.fillColor]];
            (d || e) && f.push(["areaNeg", d, e]);
            q(f, function (d) {
                var e = d[0], f = a[e];
                f ? f.animate({d: b}) : a[e] = a.chart.renderer.path(b).attr({
                    fill: p(d[2], ya(d[1]).setOpacity(p(c.fillOpacity, 0.75)).get()),
                    zIndex: 0
                }).add(a.group)
            })
        }, drawLegendSymbol: M.drawRectangle
    });
    H.area = qa;
    ca.spline = w(T);
    ia = ma(O, {
        type: "spline",
        getPointSpline: function (a, b, c) {
            var d = b.plotX, e = b.plotY, f = a[c - 1], g = a[c + 1], h, i, j, k;
            if (f && g) {
                a = f.plotY;
                j = g.plotX;
                var g = g.plotY, l;
                h = (1.5 * d + f.plotX) / 2.5;
                i = (1.5 * e + a) / 2.5;
                j = (1.5 * d + j) / 2.5;
                k = (1.5 * e + g) / 2.5;
                l = (k - i) * (j - d) / (j - h) + e - k;
                i += l;
                k += l;
                i > a && i > e ? (i = t(a, e), k = 2 * e - i) : i < a && i < e && (i = L(a, e), k = 2 * e - i);
                k > g && k > e ? (k = t(g, e), i = 2 * e - k) : k < g && k < e && (k = L(g, e), i = 2 * e - k);
                b.rightContX = j;
                b.rightContY = k
            }
            c ? (b = ["C", f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, i || e, d, e], f.rightContX = f.rightContY = null) : b = ["M", d, e];
            return b
        }
    });
    H.spline =
        ia;
    ca.areaspline = w(ca.area);
    qa = qa.prototype;
    ia = ma(ia, {
        type: "areaspline",
        closedStacks: !0,
        getSegmentPath: qa.getSegmentPath,
        closeSegment: qa.closeSegment,
        drawGraph: qa.drawGraph,
        drawLegendSymbol: M.drawRectangle
    });
    H.areaspline = ia;
    ca.column = w(T, {
        borderColor: "#FFFFFF",
        borderRadius: 0,
        groupPadding: 0.2,
        marker: null,
        pointPadding: 0.1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {brightness: 0.1, shadow: !1, halo: !1},
            select: {color: "#C0C0C0", borderColor: "#000000", shadow: !1}
        },
        dataLabels: {
            align: null,
            verticalAlign: null, y: null
        },
        stickyTracking: !1,
        tooltip: {distance: 6},
        threshold: 0
    });
    ia = ma(O, {
        type: "column",
        pointAttrToOptions: {stroke: "borderColor", fill: "color", r: "borderRadius"},
        cropShoulder: 0,
        trackerGroups: ["group", "dataLabelsGroup"],
        negStacks: !0,
        init: function () {
            O.prototype.init.apply(this, arguments);
            var a = this, b = a.chart;
            b.hasRendered && q(b.series, function (b) {
                if (b.type === a.type)b.isDirty = !0
            })
        },
        getColumnMetrics: function () {
            var a = this, b = a.options, c = a.xAxis, d = a.yAxis, e = c.reversed, f, g = {}, h, i = 0;
            b.grouping === !1 ? i = 1 : q(a.chart.series, function (b) {
                var c = b.options, e = b.yAxis;
                if (b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos)c.stacking ? (f = b.stackKey, g[f] === u && (g[f] = i++), h = g[f]) : c.grouping !== !1 && (h = i++), b.columnIndex = h
            });
            var c = L(Q(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len), j = c * b.groupPadding, k = (c - 2 * j) / i, l = b.pointWidth, b = s(l) ? (k - l) / 2 : k * b.pointPadding, l = p(l, k - 2 * b);
            return a.columnMetrics = {
                width: l, offset: b + (j + ((e ? i - (a.columnIndex || 0) : a.columnIndex) || 0) * k - c / 2) *
                (e ? -1 : 1)
            }
        },
        translate: function () {
            var a = this, b = a.chart, c = a.options, d = a.borderWidth = p(c.borderWidth, a.activePointCount > 0.5 * a.xAxis.len ? 0 : 1), e = a.yAxis, f = a.translatedThreshold = e.getThreshold(c.threshold), g = p(c.minPointLength, 5), h = a.getColumnMetrics(), i = h.width, j = a.barW = t(i, 1 + 2 * d), k = a.pointXOffset = h.offset, l = -(d % 2 ? 0.5 : 0), n = d % 2 ? 0.5 : 1;
            b.renderer.isVML && b.inverted && (n += 1);
            c.pointPadding && (j = La(j));
            O.prototype.translate.apply(a);
            q(a.points, function (c) {
                var d = p(c.yBottom, f), h = L(t(-999 - d, c.plotY), e.len + 999 + d),
                    q = c.plotX + k, r = j, s = L(h, d), u;
                u = t(h, d) - s;
                Q(u) < g && g && (u = g, s = v(Q(s - f) > g ? d - g : f - (e.translate(c.y, 0, 1, 0, 1) <= f ? g : 0)));
                c.barX = q;
                c.pointWidth = i;
                c.tooltipPos = b.inverted ? [e.len - h, a.xAxis.len - q - r / 2] : [q + r / 2, h + e.pos - b.plotTop];
                r = v(q + r) + l;
                q = v(q) + l;
                r -= q;
                d = Q(s) < 0.5;
                u = v(s + u) + n;
                s = v(s) + n;
                u -= s;
                d && (s -= 1, u += 1);
                c.shapeType = "rect";
                c.shapeArgs = {x: q, y: s, width: r, height: u}
            })
        },
        getSymbol: sa,
        drawLegendSymbol: M.drawRectangle,
        drawGraph: sa,
        drawPoints: function () {
            var a = this, b = this.chart, c = a.options, d = b.renderer, e = c.animationLimit || 250,
                f, g;
            q(a.points, function (h) {
                var i = h.plotY, j = h.graphic;
                if (i !== u && !isNaN(i) && h.y !== null)f = h.shapeArgs, i = s(a.borderWidth) ? {"stroke-width": a.borderWidth} : {}, g = h.pointAttr[h.selected ? "select" : ""] || a.pointAttr[""], j ? (bb(j), j.attr(i)[b.pointCount < e ? "animate" : "attr"](w(f))) : h.graphic = d[h.shapeType](f).attr(g).attr(i).add(a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius); else if (j)h.graphic = j.destroy()
            })
        },
        animate: function (a) {
            var b = this.yAxis, c = this.options, d = this.chart.inverted, e = {};
            if (ba)a ? (e.scaleY =
                0.001, a = L(b.pos + b.len, t(b.pos, b.toPixels(c.threshold))), d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? "translateX" : "translateY"] = b.pos, this.group.animate(e, this.options.animation), this.animate = null)
        },
        remove: function () {
            var a = this, b = a.chart;
            b.hasRendered && q(b.series, function (b) {
                if (b.type === a.type)b.isDirty = !0
            });
            O.prototype.remove.apply(a, arguments)
        }
    });
    H.column = ia;
    ca.bar = w(ca.column);
    qa = ma(ia, {type: "bar", inverted: !0});
    H.bar = qa;
    ca.scatter = w(T, {
        lineWidth: 0, tooltip: {
            headerFormat: '<span style="color:{series.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
        }, stickyTracking: !1
    });
    qa = ma(O, {
        type: "scatter",
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
        singularTooltips: !0,
        drawGraph: function () {
            this.options.lineWidth && O.prototype.drawGraph.call(this)
        }
    });
    H.scatter = qa;
    ca.pie = w(T, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: [null, null],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
            distance: 30, enabled: !0, formatter: function () {
                return this.point.name
            }
        },
        ignoreHiddenPoint: !0,
        legendType: "point",
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        states: {hover: {brightness: 0.1, shadow: !1}},
        stickyTracking: !1,
        tooltip: {followPointer: !0}
    });
    T = {
        type: "pie",
        isCartesian: !1,
        pointClass: ma(Fa, {
            init: function () {
                Fa.prototype.init.apply(this, arguments);
                var a = this, b;
                if (a.y < 0)a.y = null;
                r(a, {visible: a.visible !== !1, name: p(a.name, "Slice")});
                b = function (b) {
                    a.slice(b.type === "select")
                };
                N(a, "select", b);
                N(a, "unselect", b);
                return a
            }, setVisible: function (a) {
                var b = this, c = b.series,
                    d = c.chart;
                b.visible = b.options.visible = a = a === u ? !b.visible : a;
                c.options.data[Ma(b, c.data)] = b.options;
                q(["graphic", "dataLabel", "connector", "shadowGroup"], function (c) {
                    if (b[c])b[c][a ? "show" : "hide"](!0)
                });
                b.legendItem && d.legend.colorizeItem(b, a);
                if (!c.isDirty && c.options.ignoreHiddenPoint)c.isDirty = !0, d.redraw()
            }, slice: function (a, b, c) {
                var d = this.series;
                Ra(c, d.chart);
                p(b, !0);
                this.sliced = this.options.sliced = a = s(a) ? a : !this.sliced;
                d.options.data[Ma(this, d.data)] = this.options;
                a = a ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                };
                this.graphic.animate(a);
                this.shadowGroup && this.shadowGroup.animate(a)
            }, haloPath: function (a) {
                var b = this.shapeArgs, c = this.series.chart;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.plotLeft + b.x, c.plotTop + b.y, b.r + a, b.r + a, {
                    innerR: this.shapeArgs.r,
                    start: b.start,
                    end: b.end
                })
            }
        }),
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        axisTypes: [],
        pointAttrToOptions: {stroke: "borderColor", "stroke-width": "borderWidth", fill: "color"},
        singularTooltips: !0,
        getColor: sa,
        animate: function (a) {
            var b = this, c = b.points, d = b.startAngleRad;
            if (!a)q(c, function (a) {
                var c = a.graphic, a = a.shapeArgs;
                c && (c.attr({r: b.center[3] / 2, start: d, end: d}), c.animate({
                    r: a.r,
                    start: a.start,
                    end: a.end
                }, b.options.animation))
            }), b.animate = null
        },
        setData: function (a, b, c, d) {
            O.prototype.setData.call(this, a, !1, c, d);
            this.processData();
            this.generatePoints();
            p(b, !0) && this.chart.redraw(c)
        },
        generatePoints: function () {
            var a, b = 0, c, d, e, f = this.options.ignoreHiddenPoint;
            O.prototype.generatePoints.call(this);
            c = this.points;
            d = c.length;
            for (a = 0; a < d; a++)e = c[a], b += f && !e.visible ? 0 : e.y;
            this.total = b;
            for (a = 0; a < d; a++)e = c[a], e.percentage = b > 0 ? e.y / b * 100 : 0, e.total = b
        },
        translate: function (a) {
            this.generatePoints();
            var b = 0, c = this.options, d = c.slicedOffset, e = d + c.borderWidth, f, g, h, i = c.startAngle || 0, j = this.startAngleRad = oa / 180 * (i - 90), i = (this.endAngleRad = oa / 180 * (p(c.endAngle, i + 360) - 90)) - j, k = this.points, l = c.dataLabels.distance, c = c.ignoreHiddenPoint, n, m = k.length, o;
            if (!a)this.center = a = this.getCenter();
            this.getX = function (b, c) {
                h =
                    V.asin(L((b - a[1]) / (a[2] / 2 + l), 1));
                return a[0] + (c ? -1 : 1) * aa(h) * (a[2] / 2 + l)
            };
            for (n = 0; n < m; n++) {
                o = k[n];
                f = j + b * i;
                if (!c || o.visible)b += o.percentage / 100;
                g = j + b * i;
                o.shapeType = "arc";
                o.shapeArgs = {
                    x: a[0],
                    y: a[1],
                    r: a[2] / 2,
                    innerR: a[3] / 2,
                    start: v(f * 1E3) / 1E3,
                    end: v(g * 1E3) / 1E3
                };
                h = (g + f) / 2;
                h > 1.5 * oa ? h -= 2 * oa : h < -oa / 2 && (h += 2 * oa);
                o.slicedTranslation = {translateX: v(aa(h) * d), translateY: v(fa(h) * d)};
                f = aa(h) * a[2] / 2;
                g = fa(h) * a[2] / 2;
                o.tooltipPos = [a[0] + f * 0.7, a[1] + g * 0.7];
                o.half = h < -oa / 2 || h > oa / 2 ? 1 : 0;
                o.angle = h;
                e = L(e, l / 2);
                o.labelPos = [a[0] + f + aa(h) *
                l, a[1] + g + fa(h) * l, a[0] + f + aa(h) * e, a[1] + g + fa(h) * e, a[0] + f, a[1] + g, l < 0 ? "center" : o.half ? "right" : "left", h]
            }
        },
        drawGraph: null,
        drawPoints: function () {
            var a = this, b = a.chart.renderer, c, d, e = a.options.shadow, f, g;
            if (e && !a.shadowGroup)a.shadowGroup = b.g("shadow").add(a.group);
            q(a.points, function (h) {
                d = h.graphic;
                g = h.shapeArgs;
                f = h.shadowGroup;
                if (e && !f)f = h.shadowGroup = b.g("shadow").add(a.shadowGroup);
                c = h.sliced ? h.slicedTranslation : {translateX: 0, translateY: 0};
                f && f.attr(c);
                d ? d.animate(r(g, c)) : h.graphic = d = b[h.shapeType](g).setRadialReference(a.center).attr(h.pointAttr[h.selected ?
                    "select" : ""]).attr({"stroke-linejoin": "round"}).attr(c).add(a.group).shadow(e, f);
                h.visible !== void 0 && h.setVisible(h.visible)
            })
        },
        sortByAngle: function (a, b) {
            a.sort(function (a, d) {
                return a.angle !== void 0 && (d.angle - a.angle) * b
            })
        },
        drawLegendSymbol: M.drawRectangle,
        getCenter: Z.getCenter,
        getSymbol: sa
    };
    T = ma(O, T);
    H.pie = T;
    O.prototype.drawDataLabels = function () {
        var a = this, b = a.options, c = b.cursor, d = b.dataLabels, e = a.points, f, g, h = a.hasRendered || 0, i, j;
        if (d.enabled || a._hasPointLabels)a.dlProcessOptions && a.dlProcessOptions(d),
            j = a.plotGroup("dataLabelsGroup", "data-labels", d.defer ? "hidden" : "visible", d.zIndex || 6), p(d.defer, !0) && (j.attr({opacity: +h}), h || N(a, "afterAnimate", function () {
            a.visible && j.show();
            j[b.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
        })), g = d, q(e, function (b) {
            var e, h = b.dataLabel, m, o, q = b.connector, t = !0;
            f = b.options && b.options.dataLabels;
            e = p(f && f.enabled, g.enabled);
            if (h && !e)b.dataLabel = h.destroy(); else if (e) {
                d = w(g, f);
                e = d.rotation;
                m = b.getLabelConfig();
                i = d.format ? Ja(d.format, m) : d.formatter.call(m, d);
                d.style.color =
                    p(d.color, d.style.color, a.color, "black");
                if (h)if (s(i))h.attr({text: i}), t = !1; else {
                    if (b.dataLabel = h = h.destroy(), q)b.connector = q.destroy()
                } else if (s(i)) {
                    h = {
                        fill: d.backgroundColor,
                        stroke: d.borderColor,
                        "stroke-width": d.borderWidth,
                        r: d.borderRadius || 0,
                        rotation: e,
                        padding: d.padding,
                        zIndex: 1
                    };
                    for (o in h)h[o] === u && delete h[o];
                    h = b.dataLabel = a.chart.renderer[e ? "text" : "label"](i, 0, -999, null, null, null, d.useHTML).attr(h).css(r(d.style, c && {cursor: c})).add(j).shadow(d.shadow)
                }
                h && a.alignDataLabel(b, h, d, null, t)
            }
        })
    };
    O.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart, g = f.inverted, h = p(a.plotX, -999), i = p(a.plotY, -999), j = b.getBBox();
        if (a = this.visible && (a.series.forceDL || f.isInsidePlot(h, v(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g)))d = r({
            x: g ? f.plotWidth - i : h,
            y: v(g ? f.plotHeight - h : i),
            width: 0,
            height: 0
        }, d), r(c, {
            width: j.width,
            height: j.height
        }), c.rotation ? b[e ? "attr" : "animate"]({
            x: d.x + c.x + d.width / 2,
            y: d.y + c.y + d.height / 2
        }).attr({align: c.align}) : (b.align(c, null, d), g = b.alignAttr, p(c.overflow, "justify") ===
        "justify" ? this.justifyDataLabel(b, c, g, j, d, e) : p(c.crop, !0) && (a = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + j.width, g.y + j.height)));
        if (!a)b.attr({y: -999}), b.placed = !1
    };
    O.prototype.justifyDataLabel = function (a, b, c, d, e, f) {
        var g = this.chart, h = b.align, i = b.verticalAlign, j, k;
        j = c.x;
        if (j < 0)h === "right" ? b.align = "left" : b.x = -j, k = !0;
        j = c.x + d.width;
        if (j > g.plotWidth)h === "left" ? b.align = "right" : b.x = g.plotWidth - j, k = !0;
        j = c.y;
        if (j < 0)i === "bottom" ? b.verticalAlign = "top" : b.y = -j, k = !0;
        j = c.y + d.height;
        if (j > g.plotHeight)i === "top" ?
            b.verticalAlign = "bottom" : b.y = g.plotHeight - j, k = !0;
        if (k)a.placed = !f, a.align(b, null, e)
    };
    if (H.pie)H.pie.prototype.drawDataLabels = function () {
        var a = this, b = a.data, c, d = a.chart, e = a.options.dataLabels, f = p(e.connectorPadding, 10), g = p(e.connectorWidth, 1), h = d.plotWidth, i = d.plotHeight, j, k, l = p(e.softConnector, !0), n = e.distance, m = a.center, o = m[2] / 2, r = m[1], s = n > 0, u, w, x, A = [[], []], y, B, I, H, z, R = [0, 0, 0, 0], N = function (a, b) {
            return b.y - a.y
        };
        if (a.visible && (e.enabled || a._hasPointLabels)) {
            O.prototype.drawDataLabels.apply(a);
            q(b,
                function (a) {
                    a.dataLabel && a.visible && A[a.half].push(a)
                });
            for (H = 2; H--;) {
                var G = [], M = [], F = A[H], K = F.length, E;
                if (K) {
                    a.sortByAngle(F, H - 0.5);
                    for (z = b = 0; !b && F[z];)b = F[z] && F[z].dataLabel && (F[z].dataLabel.getBBox().height || 21), z++;
                    if (n > 0) {
                        w = L(r + o + n, d.plotHeight);
                        for (z = t(0, r - o - n); z <= w; z += b)G.push(z);
                        w = G.length;
                        if (K > w) {
                            c = [].concat(F);
                            c.sort(N);
                            for (z = K; z--;)c[z].rank = z;
                            for (z = K; z--;)F[z].rank >= w && F.splice(z, 1);
                            K = F.length
                        }
                        for (z = 0; z < K; z++) {
                            c = F[z];
                            x = c.labelPos;
                            c = 9999;
                            var S, P;
                            for (P = 0; P < w; P++)S = Q(G[P] - x[1]), S < c && (c = S,
                                E = P);
                            if (E < z && G[z] !== null)E = z; else for (w < K - z + E && G[z] !== null && (E = w - K + z); G[E] === null;)E++;
                            M.push({i: E, y: G[E]});
                            G[E] = null
                        }
                        M.sort(N)
                    }
                    for (z = 0; z < K; z++) {
                        c = F[z];
                        x = c.labelPos;
                        u = c.dataLabel;
                        I = c.visible === !1 ? "hidden" : "visible";
                        c = x[1];
                        if (n > 0) {
                            if (w = M.pop(), E = w.i, B = w.y, c > B && G[E + 1] !== null || c < B && G[E - 1] !== null)B = L(t(0, c), d.plotHeight)
                        } else B = c;
                        y = e.justify ? m[0] + (H ? -1 : 1) * (o + n) : a.getX(B === r - o - n || B === r + o + n ? c : B, H);
                        u._attr = {visibility: I, align: x[6]};
                        u._pos = {x: y + e.x + ({left: f, right: -f}[x[6]] || 0), y: B + e.y - 10};
                        u.connX = y;
                        u.connY =
                            B;
                        if (this.options.size === null)w = u.width, y - w < f ? R[3] = t(v(w - y + f), R[3]) : y + w > h - f && (R[1] = t(v(y + w - h + f), R[1])), B - b / 2 < 0 ? R[0] = t(v(-B + b / 2), R[0]) : B + b / 2 > i && (R[2] = t(v(B + b / 2 - i), R[2]))
                    }
                }
            }
            if (Ca(R) === 0 || this.verifyDataLabelOverflow(R))this.placeDataLabels(), s && g && q(this.points, function (b) {
                j = b.connector;
                x = b.labelPos;
                if ((u = b.dataLabel) && u._pos)I = u._attr.visibility, y = u.connX, B = u.connY, k = l ? ["M", y + (x[6] === "left" ? 5 : -5), B, "C", y, B, 2 * x[2] - x[4], 2 * x[3] - x[5], x[2], x[3], "L", x[4], x[5]] : ["M", y + (x[6] === "left" ? 5 : -5), B, "L", x[2], x[3],
                    "L", x[4], x[5]], j ? (j.animate({d: k}), j.attr("visibility", I)) : b.connector = j = a.chart.renderer.path(k).attr({
                    "stroke-width": g,
                    stroke: e.connectorColor || b.color || "#606060",
                    visibility: I
                }).add(a.dataLabelsGroup); else if (j)b.connector = j.destroy()
            })
        }
    }, H.pie.prototype.placeDataLabels = function () {
        q(this.points, function (a) {
            var a = a.dataLabel, b;
            if (a)(b = a._pos) ? (a.attr(a._attr), a[a.moved ? "animate" : "attr"](b), a.moved = !0) : a && a.attr({y: -999})
        })
    }, H.pie.prototype.alignDataLabel = sa, H.pie.prototype.verifyDataLabelOverflow =
        function (a) {
            var b = this.center, c = this.options, d = c.center, e = c = c.minSize || 80, f;
            d[0] !== null ? e = t(b[2] - t(a[1], a[3]), c) : (e = t(b[2] - a[1] - a[3], c), b[0] += (a[3] - a[1]) / 2);
            d[1] !== null ? e = t(L(e, b[2] - t(a[0], a[2])), c) : (e = t(L(e, b[2] - a[0] - a[2]), c), b[1] += (a[0] - a[2]) / 2);
            e < b[2] ? (b[2] = e, this.translate(b), q(this.points, function (a) {
                if (a.dataLabel)a.dataLabel._pos = null
            }), this.drawDataLabels && this.drawDataLabels()) : f = !0;
            return f
        };
    if (H.column)H.column.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart, g = f.inverted,
            h = a.dlBox || a.shapeArgs, i = a.below || a.plotY > p(this.translatedThreshold, f.plotSizeY), j = p(c.inside, !!this.options.stacking);
        if (h && (d = w(h), g && (d = {
                x: f.plotWidth - d.y - d.height,
                y: f.plotHeight - d.x - d.width,
                width: d.height,
                height: d.width
            }), !j))g ? (d.x += i ? 0 : d.width, d.width = 0) : (d.y += i ? d.height : 0, d.height = 0);
        c.align = p(c.align, !g || j ? "center" : i ? "right" : "left");
        c.verticalAlign = p(c.verticalAlign, g || j ? "middle" : i ? "top" : "bottom");
        O.prototype.alignDataLabel.call(this, a, b, c, d, e)
    };
    T = K.TrackerMixin = {
        drawTrackerPoint: function () {
            var a =
                this, b = a.chart, c = b.pointer, d = a.options.cursor, e = d && {cursor: d}, f = function (c) {
                var d = c.target, e;
                if (b.hoverSeries !== a)a.onMouseOver();
                for (; d && !e;)e = d.point, d = d.parentNode;
                if (e !== u && e !== b.hoverPoint)e.onMouseOver(c)
            };
            q(a.points, function (a) {
                if (a.graphic)a.graphic.element.point = a;
                if (a.dataLabel)a.dataLabel.element.point = a
            });
            if (!a._hasTracking)q(a.trackerGroups, function (b) {
                if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                        c.onTrackerMouseOut(a)
                    }).css(e), $a))a[b].on("touchstart",
                    f)
            }), a._hasTracking = !0
        }, drawTrackerGraph: function () {
            var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, i = f.options.tooltip.snap, j = a.tracker, k = b.cursor, l = k && {cursor: k}, k = a.singlePoints, n, m = function () {
                if (f.hoverSeries !== a)a.onMouseOver()
            }, o = "rgba(192,192,192," + (ba ? 1.0E-4 : 0.002) + ")";
            if (e && !c)for (n = e + 1; n--;)d[n] === "M" && d.splice(n + 1, 0, d[n + 1] - i, d[n + 2], "L"), (n && d[n] === "M" || n === e) && d.splice(n, 0, "L", d[n - 2] + i, d[n - 1]);
            for (n = 0; n < k.length; n++)e =
                k[n], d.push("M", e.plotX - i, e.plotY, "L", e.plotX + i, e.plotY);
            j ? j.attr({d: d}) : (a.tracker = h.path(d).attr({
                "stroke-linejoin": "round",
                visibility: a.visible ? "visible" : "hidden",
                stroke: o,
                fill: c ? o : P,
                "stroke-width": b.lineWidth + (c ? 0 : 2 * i),
                zIndex: 2
            }).add(a.group), q([a.tracker, a.markerGroup], function (a) {
                a.addClass("highcharts-tracker").on("mouseover", m).on("mouseout", function (a) {
                    g.onTrackerMouseOut(a)
                }).css(l);
                if ($a)a.on("touchstart", m)
            }))
        }
    };
    if (H.column)ia.prototype.drawTracker = T.drawTrackerPoint;
    if (H.pie)H.pie.prototype.drawTracker =
        T.drawTrackerPoint;
    if (H.scatter)qa.prototype.drawTracker = T.drawTrackerPoint;
    r(lb.prototype, {
        setItemEvents: function (a, b, c, d, e) {
            var f = this;
            (c ? b : a.legendGroup).on("mouseover", function () {
                a.setState("hover");
                b.css(f.options.itemHoverStyle)
            }).on("mouseout", function () {
                b.css(a.visible ? d : e);
                a.setState()
            }).on("click", function (b) {
                var c = function () {
                    a.setVisible()
                }, b = {browserEvent: b};
                a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : I(a, "legendItemClick", b, c)
            })
        }, createCheckboxForItem: function (a) {
            a.checkbox =
                $("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
            N(a.checkbox, "click", function (b) {
                I(a, "checkboxClick", {checked: b.target.checked}, function () {
                    a.select()
                })
            })
        }
    });
    E.legend.itemStyle.cursor = "pointer";
    r(Ya.prototype, {
        showResetZoom: function () {
            var a = this, b = E.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = c.relativeTo === "chart" ? null : "plotBox";
            this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                    a.zoomOut()
                },
                d, e && e.hover).attr({align: c.position.align, title: b.resetZoomTitle}).add().align(c.position, !1, f)
        }, zoomOut: function () {
            var a = this;
            I(a, "selection", {resetSelection: !0}, function () {
                a.zoom()
            })
        }, zoom: function (a) {
            var b, c = this.pointer, d = !1, e;
            !a || a.resetSelection ? q(this.axes, function (a) {
                b = a.zoom()
            }) : q(a.xAxis.concat(a.yAxis), function (a) {
                var e = a.axis, h = e.isXAxis;
                if (c[h ? "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"])b = e.zoom(a.min, a.max), e.displayBtn && (d = !0)
            });
            e = this.resetZoomButton;
            if (d && !e)this.showResetZoom(); else if (!d &&
                da(e))this.resetZoomButton = e.destroy();
            b && this.redraw(p(this.options.chart.animation, a && a.animation, this.pointCount < 100))
        }, pan: function (a, b) {
            var c = this, d = c.hoverPoints, e;
            d && q(d, function (a) {
                a.setState()
            });
            q(b === "xy" ? [1, 0] : [1], function (b) {
                var d = a[b ? "chartX" : "chartY"], h = c[b ? "xAxis" : "yAxis"][0], i = c[b ? "mouseDownX" : "mouseDownY"], j = (h.pointRange || 0) / 2, k = h.getExtremes(), l = h.toValue(i - d, !0) + j, i = h.toValue(i + c[b ? "plotWidth" : "plotHeight"] - d, !0) - j;
                h.series.length && l > L(k.dataMin, k.min) && i < t(k.dataMax, k.max) && (h.setExtremes(l,
                    i, !1, !1, {trigger: "pan"}), e = !0);
                c[b ? "mouseDownX" : "mouseDownY"] = d
            });
            e && c.redraw(!1);
            B(c.container, {cursor: "move"})
        }
    });
    r(Fa.prototype, {
        select: function (a, b) {
            var c = this, d = c.series, e = d.chart, a = p(a, !c.selected);
            c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                c.selected = c.options.selected = a;
                d.options.data[Ma(c, d.data)] = c.options;
                c.setState(a && "select");
                b || q(e.getSelectedPoints(), function (a) {
                    if (a.selected && a !== c)a.selected = a.options.selected = !1, d.options.data[Ma(a, d.data)] = a.options, a.setState(""),
                        a.firePointEvent("unselect")
                })
            })
        }, onMouseOver: function (a) {
            var b = this.series, c = b.chart, d = c.tooltip, e = c.hoverPoint;
            if (e && e !== this)e.onMouseOut();
            this.firePointEvent("mouseOver");
            d && (!d.shared || b.noSharedTooltip) && d.refresh(this, a);
            this.setState("hover");
            c.hoverPoint = this
        }, onMouseOut: function () {
            var a = this.series.chart, b = a.hoverPoints;
            this.firePointEvent("mouseOut");
            if (!b || Ma(this, b) === -1)this.setState(), a.hoverPoint = null
        }, importEvents: function () {
            if (!this.hasImportedEvents) {
                var a = w(this.series.options.point,
                    this.options).events, b;
                this.events = a;
                for (b in a)N(this, b, a[b]);
                this.hasImportedEvents = !0
            }
        }, setState: function (a, b) {
            var c = this.plotX, d = this.plotY, e = this.series, f = e.options.states, g = ca[e.type].marker && e.options.marker, h = g && !g.enabled, i = g && g.states[a], j = i && i.enabled === !1, k = e.stateMarkerGraphic, l = this.marker || {}, n = e.chart, m = e.halo, o, a = a || "";
            o = this.pointAttr[a] || e.pointAttr[a];
            if (!(a === this.state && !b || this.selected && a !== "select" || f[a] && f[a].enabled === !1 || a && (j || h && i.enabled === !1) || a && l.states && l.states[a] &&
                l.states[a].enabled === !1)) {
                if (this.graphic)g = g && this.graphic.symbolName && o.r, this.graphic.attr(w(o, g ? {
                    x: c - g,
                    y: d - g,
                    width: 2 * g,
                    height: 2 * g
                } : {})), k && k.hide(); else {
                    if (a && i)if (g = i.radius, l = l.symbol || e.symbol, k && k.currentSymbol !== l && (k = k.destroy()), k)k[b ? "animate" : "attr"]({
                        x: c - g,
                        y: d - g
                    }); else if (l)e.stateMarkerGraphic = k = n.renderer.symbol(l, c - g, d - g, 2 * g, 2 * g).attr(o).add(e.markerGroup), k.currentSymbol = l;
                    if (k)k[a && n.isInsidePlot(c, d, n.inverted) ? "show" : "hide"]()
                }
                if ((c = f[a] && f[a].halo) && c.size) {
                    if (!m)e.halo = m = n.renderer.path().add(e.seriesGroup);
                    m.attr(r({fill: ya(this.color || e.color).setOpacity(c.opacity).get()}, c.attributes))[b ? "animate" : "attr"]({d: this.haloPath(c.size)})
                } else m && m.attr({d: []});
                this.state = a
            }
        }, haloPath: function (a) {
            var b = this.series, c = b.chart, d = b.getPlotBox(), e = c.inverted;
            return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX : this.plotY) - a, a * 2, a * 2)
        }
    });
    r(O.prototype, {
        onMouseOver: function () {
            var a = this.chart, b = a.hoverSeries;
            if (b && b !== this)b.onMouseOut();
            this.options.events.mouseOver &&
            I(this, "mouseOver");
            this.setState("hover");
            a.hoverSeries = this
        }, onMouseOut: function () {
            var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
            if (d)d.onMouseOut();
            this && a.events.mouseOut && I(this, "mouseOut");
            c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide();
            this.setState();
            b.hoverSeries = null
        }, setState: function (a) {
            var b = this.options, c = this.graph, d = this.graphNeg, e = b.states, b = b.lineWidth, a = a || "";
            if (this.state !== a)this.state = a, e[a] && e[a].enabled === !1 || (a && (b = e[a].lineWidth || b + (e[a].lineWidthPlus ||
                0)), c && !c.dashstyle && (a = {"stroke-width": b}, c.attr(a), d && d.attr(a)))
        }, setVisible: function (a, b) {
            var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, h = c.visible;
            f = (c.visible = a = c.userOptions.visible = a === u ? !h : a) ? "show" : "hide";
            q(["group", "dataLabelsGroup", "markerGroup", "tracker"], function (a) {
                if (c[a])c[a][f]()
            });
            if (d.hoverSeries === c)c.onMouseOut();
            e && d.legend.colorizeItem(c, a);
            c.isDirty = !0;
            c.options.stacking && q(d.series, function (a) {
                if (a.options.stacking && a.visible)a.isDirty = !0
            });
            q(c.linkedSeries,
                function (b) {
                    b.setVisible(a, !1)
                });
            if (g)d.isDirtyBox = !0;
            b !== !1 && d.redraw();
            I(c, f)
        }, setTooltipPoints: function (a) {
            var b = [], c, d, e = this.xAxis, f = e && e.getExtremes(), g = e ? e.tooltipLen || e.len : this.chart.plotSizeX, h, i, j = [];
            if (!(this.options.enableMouseTracking === !1 || this.singularTooltips)) {
                if (a)this.tooltipPoints = null;
                q(this.segments || this.points, function (a) {
                    b = b.concat(a)
                });
                e && e.reversed && (b = b.reverse());
                this.orderTooltipPoints && this.orderTooltipPoints(b);
                a = b.length;
                for (i = 0; i < a; i++)if (e = b[i], c = e.x, c >= f.min &&
                    c <= f.max) {
                    h = b[i + 1];
                    c = d === u ? 0 : d + 1;
                    for (d = b[i + 1] ? L(t(0, U((e.clientX + (h ? h.wrappedClientX || h.clientX : g)) / 2)), g) : g; c >= 0 && c <= d;)j[c++] = e
                }
                this.tooltipPoints = j
            }
        }, show: function () {
            this.setVisible(!0)
        }, hide: function () {
            this.setVisible(!1)
        }, select: function (a) {
            this.selected = a = a === u ? !this.selected : a;
            if (this.checkbox)this.checkbox.checked = a;
            I(this, a ? "select" : "unselect")
        }, drawTracker: T.drawTrackerGraph
    });
    r(K, {
        Axis: na,
        Chart: Ya,
        Color: ya,
        Point: Fa,
        Tick: Ta,
        Renderer: Za,
        Series: O,
        SVGElement: S,
        SVGRenderer: ta,
        arrayMin: Oa,
        arrayMax: Ca,
        charts: W,
        dateFormat: cb,
        format: Ja,
        pathAnim: vb,
        getOptions: function () {
            return E
        },
        hasBidiBug: Ob,
        isTouchDevice: Ib,
        numberFormat: Ba,
        seriesTypes: H,
        setOptions: function (a) {
            E = w(!0, E, a);
            Bb();
            return E
        },
        addEvent: N,
        removeEvent: X,
        createElement: $,
        discardElement: Qa,
        css: B,
        each: q,
        extend: r,
        map: Va,
        merge: w,
        pick: p,
        splat: ra,
        extendClass: ma,
        pInt: y,
        wrap: Na,
        svg: ba,
        canvas: ga,
        vml: !ba && !ga,
        product: "Highcharts",
        version: "4.0.4"
    })
})();
/*
 Highcharts JS v4.0.4 (2014-09-02)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (l, C) {
    function K(a, b, c) {
        this.init.call(this, a, b, c)
    }

    var P = l.arrayMin, Q = l.arrayMax, s = l.each, F = l.extend, q = l.merge, R = l.map, o = l.pick, x = l.pInt, p = l.getOptions().plotOptions, g = l.seriesTypes, v = l.extendClass, L = l.splat, r = l.wrap, M = l.Axis, y = l.Tick, H = l.Point, S = l.Pointer, T = l.CenteredSeriesMixin, z = l.TrackerMixin, t = l.Series, w = Math, D = w.round, A = w.floor, N = w.max, U = l.Color, u = function () {
    };
    F(K.prototype, {
        init: function (a, b, c) {
            var d = this, e = d.defaultOptions;
            d.chart = b;
            if (b.angular)e.background = {};
            d.options = a = q(e, a);
            (a = a.background) && s([].concat(L(a)).reverse(), function (a) {
                var b = a.backgroundColor, a = q(d.defaultBackgroundOptions, a);
                if (b)a.backgroundColor = b;
                a.color = a.backgroundColor;
                c.options.plotBands.unshift(a)
            })
        },
        defaultOptions: {center: ["50%", "50%"], size: "85%", startAngle: 0},
        defaultBackgroundOptions: {
            shape: "circle",
            borderWidth: 1,
            borderColor: "silver",
            backgroundColor: {linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1}, stops: [[0, "#FFF"], [1, "#DDD"]]},
            from: -Number.MAX_VALUE,
            innerRadius: 0,
            to: Number.MAX_VALUE,
            outerRadius: "105%"
        }
    });
    var G = M.prototype, y = y.prototype, V = {
        getOffset: u, redraw: function () {
            this.isDirty = !1
        }, render: function () {
            this.isDirty = !1
        }, setScale: u, setCategories: u, setTitle: u
    }, O = {
        isRadial: !0,
        defaultRadialGaugeOptions: {
            labels: {align: "center", x: 0, y: null},
            minorGridLineWidth: 0,
            minorTickInterval: "auto",
            minorTickLength: 10,
            minorTickPosition: "inside",
            minorTickWidth: 1,
            tickLength: 10,
            tickPosition: "inside",
            tickWidth: 2,
            title: {rotation: 0},
            zIndex: 2
        },
        defaultRadialXOptions: {
            gridLineWidth: 1, labels: {align: null, distance: 15, x: 0, y: null},
            maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0
        },
        defaultRadialYOptions: {
            gridLineInterpolation: "circle",
            labels: {align: "right", x: -3, y: -2},
            showLastLabel: !1,
            title: {x: 4, text: null, rotation: 90}
        },
        setOptions: function (a) {
            a = this.options = q(this.defaultOptions, this.defaultRadialOptions, a);
            if (!a.plotBands)a.plotBands = []
        },
        getOffset: function () {
            G.getOffset.call(this);
            this.chart.axisOffset[this.side] = 0;
            this.center = this.pane.center = T.getCenter.call(this.pane)
        },
        getLinePath: function (a, b) {
            var c = this.center, b = o(b,
                c[2] / 2 - this.offset);
            return this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], b, b, {
                start: this.startAngleRad,
                end: this.endAngleRad,
                open: !0,
                innerR: 0
            })
        },
        setAxisTranslation: function () {
            G.setAxisTranslation.call(this);
            if (this.center)this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0
        },
        beforeSetTickPositions: function () {
            this.autoConnect && (this.max += this.categories &&
                1 || this.pointRange || this.closestPointRange || 0)
        },
        setAxisSize: function () {
            G.setAxisSize.call(this);
            if (this.isRadial) {
                this.center = this.pane.center = l.CenteredSeriesMixin.getCenter.call(this.pane);
                if (this.isCircular)this.sector = this.endAngleRad - this.startAngleRad;
                this.len = this.width = this.height = this.center[2] * o(this.sector, 1) / 2
            }
        },
        getPosition: function (a, b) {
            return this.postTranslate(this.isCircular ? this.translate(a) : 0, o(this.isCircular ? b : this.translate(a), this.center[2] / 2) - this.offset)
        },
        postTranslate: function (a,
                                 b) {
            var c = this.chart, d = this.center, a = this.startAngleRad + a;
            return {x: c.plotLeft + d[0] + Math.cos(a) * b, y: c.plotTop + d[1] + Math.sin(a) * b}
        },
        getPlotBandPath: function (a, b, c) {
            var d = this.center, e = this.startAngleRad, f = d[2] / 2, h = [o(c.outerRadius, "100%"), c.innerRadius, o(c.thickness, 10)], j = /%$/, k, m = this.isCircular;
            this.options.gridLineInterpolation === "polygon" ? d = this.getPlotLinePath(a).concat(this.getPlotLinePath(b, !0)) : (m || (h[0] = this.translate(a), h[1] = this.translate(b)), h = R(h, function (a) {
                j.test(a) && (a = x(a, 10) * f / 100);
                return a
            }), c.shape === "circle" || !m ? (a = -Math.PI / 2, b = Math.PI * 1.5, k = !0) : (a = e + this.translate(a), b = e + this.translate(b)), d = this.chart.renderer.symbols.arc(this.left + d[0], this.top + d[1], h[0], h[0], {
                start: a,
                end: b,
                innerR: o(h[1], h[0] - h[2]),
                open: k
            }));
            return d
        },
        getPlotLinePath: function (a, b) {
            var c = this, d = c.center, e = c.chart, f = c.getPosition(a), h, j, k;
            c.isCircular ? k = ["M", d[0] + e.plotLeft, d[1] + e.plotTop, "L", f.x, f.y] : c.options.gridLineInterpolation === "circle" ? (a = c.translate(a)) && (k = c.getLinePath(0, a)) : (s(e.xAxis, function (a) {
                a.pane ===
                c.pane && (h = a)
            }), k = [], a = c.translate(a), d = h.tickPositions, h.autoConnect && (d = d.concat([d[0]])), b && (d = [].concat(d).reverse()), s(d, function (f, c) {
                j = h.getPosition(f, a);
                k.push(c ? "L" : "M", j.x, j.y)
            }));
            return k
        },
        getTitlePosition: function () {
            var a = this.center, b = this.chart, c = this.options.title;
            return {
                x: b.plotLeft + a[0] + (c.x || 0),
                y: b.plotTop + a[1] - {high: 0.5, middle: 0.25, low: 0}[c.align] * a[2] + (c.y || 0)
            }
        }
    };
    r(G, "init", function (a, b, c) {
        var i;
        var d = b.angular, e = b.polar, f = c.isX, h = d && f, j, k;
        k = b.options;
        var m = c.pane || 0;
        if (d) {
            if (F(this,
                    h ? V : O), j = !f)this.defaultRadialOptions = this.defaultRadialGaugeOptions
        } else if (e)F(this, O), this.defaultRadialOptions = (j = f) ? this.defaultRadialXOptions : q(this.defaultYAxisOptions, this.defaultRadialYOptions);
        a.call(this, b, c);
        if (!h && (d || e)) {
            a = this.options;
            if (!b.panes)b.panes = [];
            this.pane = (i = b.panes[m] = b.panes[m] || new K(L(k.pane)[m], b, this), m = i);
            m = m.options;
            b.inverted = !1;
            k.chart.zoomType = null;
            this.startAngleRad = b = (m.startAngle - 90) * Math.PI / 180;
            this.endAngleRad = k = (o(m.endAngle, m.startAngle + 360) - 90) * Math.PI /
                180;
            this.offset = a.offset || 0;
            if ((this.isCircular = j) && c.max === C && k - b === 2 * Math.PI)this.autoConnect = !0
        }
    });
    r(y, "getPosition", function (a, b, c, d, e) {
        var f = this.axis;
        return f.getPosition ? f.getPosition(c) : a.call(this, b, c, d, e)
    });
    r(y, "getLabelPosition", function (a, b, c, d, e, f, h, j, k) {
        var m = this.axis, i = f.y, n = f.align, g = (m.translate(this.pos) + m.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360;
        m.isRadial ? (a = m.getPosition(this.pos, m.center[2] / 2 + o(f.distance, -25)), f.rotation === "auto" ? d.attr({rotation: g}) : i === null && (i = m.chart.renderer.fontMetrics(d.styles.fontSize).b -
            d.getBBox().height / 2), n === null && (n = m.isCircular ? g > 20 && g < 160 ? "left" : g > 200 && g < 340 ? "right" : "center" : "center", d.attr({align: n})), a.x += f.x, a.y += i) : a = a.call(this, b, c, d, e, f, h, j, k);
        return a
    });
    r(y, "getMarkPath", function (a, b, c, d, e, f, h) {
        var j = this.axis;
        j.isRadial ? (a = j.getPosition(this.pos, j.center[2] / 2 + d), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, d, e, f, h);
        return b
    });
    p.arearange = q(p.area, {
        lineWidth: 1,
        marker: null,
        threshold: null,
        tooltip: {pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
        trackByArea: !0,
        dataLabels: {align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0},
        states: {hover: {halo: !1}}
    });
    g.arearange = v(g.area, {
        type: "arearange", pointArrayMap: ["low", "high"], toYData: function (a) {
            return [a.low, a.high]
        }, pointValKey: "low", getSegments: function () {
            var a = this;
            s(a.points, function (b) {
                if (!a.options.connectNulls && (b.low === null || b.high === null))b.y = null; else if (b.low === null && b.high !== null)b.y = b.high
            });
            t.prototype.getSegments.call(this)
        }, translate: function () {
            var a = this.yAxis;
            g.area.prototype.translate.apply(this);
            s(this.points, function (b) {
                var c = b.low, d = b.high, e = b.plotY;
                d === null && c === null ? b.y = null : c === null ? (b.plotLow = b.plotY = null, b.plotHigh = a.translate(d, 0, 1, 0, 1)) : d === null ? (b.plotLow = e, b.plotHigh = null) : (b.plotLow = e, b.plotHigh = a.translate(d, 0, 1, 0, 1))
            })
        }, getSegmentPath: function (a) {
            var b, c = [], d = a.length, e = t.prototype.getSegmentPath, f, h;
            h = this.options;
            var j = h.step;
            for (b = HighchartsAdapter.grep(a, function (a) {
                return a.plotLow !== null
            }); d--;)f = a[d], f.plotHigh !== null && c.push({plotX: f.plotX, plotY: f.plotHigh});
            a = e.call(this,
                b);
            if (j)j === !0 && (j = "left"), h.step = {left: "right", center: "center", right: "left"}[j];
            c = e.call(this, c);
            h.step = j;
            h = [].concat(a, c);
            c[0] = "L";
            this.areaPath = this.areaPath.concat(a, c);
            return h
        }, drawDataLabels: function () {
            var a = this.data, b = a.length, c, d = [], e = t.prototype, f = this.options.dataLabels, h = f.align, j, k = this.chart.inverted;
            if (f.enabled || this._hasPointLabels) {
                for (c = b; c--;)if (j = a[c], j.y = j.high, j._plotY = j.plotY, j.plotY = j.plotHigh, d[c] = j.dataLabel, j.dataLabel = j.dataLabelUpper, j.below = !1, k) {
                    if (!h)f.align = "left";
                    f.x = f.xHigh
                } else f.y = f.yHigh;
                e.drawDataLabels && e.drawDataLabels.apply(this, arguments);
                for (c = b; c--;)if (j = a[c], j.dataLabelUpper = j.dataLabel, j.dataLabel = d[c], j.y = j.low, j.plotY = j._plotY, j.below = !0, k) {
                    if (!h)f.align = "right";
                    f.x = f.xLow
                } else f.y = f.yLow;
                e.drawDataLabels && e.drawDataLabels.apply(this, arguments)
            }
            f.align = h
        }, alignDataLabel: function () {
            g.column.prototype.alignDataLabel.apply(this, arguments)
        }, getSymbol: u, drawPoints: u
    });
    p.areasplinerange = q(p.arearange);
    g.areasplinerange = v(g.arearange, {
        type: "areasplinerange",
        getPointSpline: g.spline.prototype.getPointSpline
    });
    (function () {
        var a = g.column.prototype;
        p.columnrange = q(p.column, p.arearange, {lineWidth: 1, pointRange: null});
        g.columnrange = v(g.arearange, {
            type: "columnrange",
            translate: function () {
                var b = this, c = b.yAxis, d;
                a.translate.apply(b);
                s(b.points, function (a) {
                    var f = a.shapeArgs, h = b.options.minPointLength, j;
                    a.tooltipPos = null;
                    a.plotHigh = d = c.translate(a.high, 0, 1, 0, 1);
                    a.plotLow = a.plotY;
                    j = d;
                    a = a.plotY - d;
                    a < h && (h -= a, a += h, j -= h / 2);
                    f.height = a;
                    f.y = j
                })
            },
            trackerGroups: ["group", "dataLabelsGroup"],
            drawGraph: u,
            pointAttrToOptions: a.pointAttrToOptions,
            drawPoints: a.drawPoints,
            drawTracker: a.drawTracker,
            animate: a.animate,
            getColumnMetrics: a.getColumnMetrics
        })
    })();
    p.gauge = q(p.line, {
        dataLabels: {
            enabled: !0,
            defer: !1,
            y: 15,
            borderWidth: 1,
            borderColor: "silver",
            borderRadius: 3,
            crop: !1,
            style: {fontWeight: "bold"},
            verticalAlign: "top",
            zIndex: 2
        }, dial: {}, pivot: {}, tooltip: {headerFormat: ""}, showInLegend: !1
    });
    z = {
        type: "gauge", pointClass: v(H, {
            setState: function (a) {
                this.state = a
            }
        }), angular: !0, drawGraph: u, fixedBox: !0, forceDL: !0,
        trackerGroups: ["group", "dataLabelsGroup"], translate: function () {
            var a = this.yAxis, b = this.options, c = a.center;
            this.generatePoints();
            s(this.points, function (d) {
                var e = q(b.dial, d.dial), f = x(o(e.radius, 80)) * c[2] / 200, h = x(o(e.baseLength, 70)) * f / 100, j = x(o(e.rearLength, 10)) * f / 100, k = e.baseWidth || 3, m = e.topWidth || 1, i = b.overshoot, n = a.startAngleRad + a.translate(d.y, null, null, null, !0);
                i && typeof i === "number" ? (i = i / 180 * Math.PI, n = Math.max(a.startAngleRad - i, Math.min(a.endAngleRad + i, n))) : b.wrap === !1 && (n = Math.max(a.startAngleRad,
                    Math.min(a.endAngleRad, n)));
                n = n * 180 / Math.PI;
                d.shapeType = "path";
                d.shapeArgs = {
                    d: e.path || ["M", -j, -k / 2, "L", h, -k / 2, f, -m / 2, f, m / 2, h, k / 2, -j, k / 2, "z"],
                    translateX: c[0],
                    translateY: c[1],
                    rotation: n
                };
                d.plotX = c[0];
                d.plotY = c[1]
            })
        }, drawPoints: function () {
            var a = this, b = a.yAxis.center, c = a.pivot, d = a.options, e = d.pivot, f = a.chart.renderer;
            s(a.points, function (c) {
                var b = c.graphic, k = c.shapeArgs, e = k.d, i = q(d.dial, c.dial);
                b ? (b.animate(k), k.d = e) : c.graphic = f[c.shapeType](k).attr({
                    stroke: i.borderColor || "none", "stroke-width": i.borderWidth ||
                    0, fill: i.backgroundColor || "black", rotation: k.rotation
                }).add(a.group)
            });
            c ? c.animate({
                translateX: b[0],
                translateY: b[1]
            }) : a.pivot = f.circle(0, 0, o(e.radius, 5)).attr({
                "stroke-width": e.borderWidth || 0,
                stroke: e.borderColor || "silver",
                fill: e.backgroundColor || "black"
            }).translate(b[0], b[1]).add(a.group)
        }, animate: function (a) {
            var b = this;
            if (!a)s(b.points, function (a) {
                var d = a.graphic;
                d && (d.attr({rotation: b.yAxis.startAngleRad * 180 / Math.PI}), d.animate({rotation: a.shapeArgs.rotation}, b.options.animation))
            }), b.animate =
                null
        }, render: function () {
            this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup);
            t.prototype.render.call(this);
            this.group.clip(this.chart.clipRect)
        }, setData: function (a, b) {
            t.prototype.setData.call(this, a, !1);
            this.processData();
            this.generatePoints();
            o(b, !0) && this.chart.redraw()
        }, drawTracker: z && z.drawTrackerPoint
    };
    g.gauge = v(g.line, z);
    p.boxplot = q(p.column, {
        fillColor: "#FFFFFF",
        lineWidth: 1,
        medianWidth: 2,
        states: {hover: {brightness: -0.3}},
        threshold: null,
        tooltip: {pointFormat: '<span style="color:{series.color}">●</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},
        whiskerLength: "50%",
        whiskerWidth: 2
    });
    g.boxplot = v(g.column, {
        type: "boxplot", pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function (a) {
            return [a.low, a.q1, a.median, a.q3, a.high]
        }, pointValKey: "high", pointAttrToOptions: {fill: "fillColor", stroke: "color", "stroke-width": "lineWidth"},
        drawDataLabels: u, translate: function () {
            var a = this.yAxis, b = this.pointArrayMap;
            g.column.prototype.translate.apply(this);
            s(this.points, function (c) {
                s(b, function (b) {
                    c[b] !== null && (c[b + "Plot"] = a.translate(c[b], 0, 1, 0, 1))
                })
            })
        }, drawPoints: function () {
            var a = this, b = a.points, c = a.options, d = a.chart.renderer, e, f, h, j, k, m, i, n, g, l, p, I, r, q, J, u, v, t, w, x, z, y, E = a.doQuartiles !== !1, B = parseInt(a.options.whiskerLength, 10) / 100;
            s(b, function (b) {
                g = b.graphic;
                z = b.shapeArgs;
                p = {};
                q = {};
                u = {};
                y = b.color || a.color;
                if (b.plotY !== C)if (e = b.pointAttr[b.selected ?
                        "selected" : ""], v = z.width, t = A(z.x), w = t + v, x = D(v / 2), f = A(E ? b.q1Plot : b.lowPlot), h = A(E ? b.q3Plot : b.lowPlot), j = A(b.highPlot), k = A(b.lowPlot), p.stroke = b.stemColor || c.stemColor || y, p["stroke-width"] = o(b.stemWidth, c.stemWidth, c.lineWidth), p.dashstyle = b.stemDashStyle || c.stemDashStyle, q.stroke = b.whiskerColor || c.whiskerColor || y, q["stroke-width"] = o(b.whiskerWidth, c.whiskerWidth, c.lineWidth), u.stroke = b.medianColor || c.medianColor || y, u["stroke-width"] = o(b.medianWidth, c.medianWidth, c.lineWidth), u["stroke-linecap"] = "round",
                        i = p["stroke-width"] % 2 / 2, n = t + x + i, l = ["M", n, h, "L", n, j, "M", n, f, "L", n, k], E && (i = e["stroke-width"] % 2 / 2, n = A(n) + i, f = A(f) + i, h = A(h) + i, t += i, w += i, I = ["M", t, h, "L", t, f, "L", w, f, "L", w, h, "L", t, h, "z"]), B && (i = q["stroke-width"] % 2 / 2, j += i, k += i, r = ["M", n - x * B, j, "L", n + x * B, j, "M", n - x * B, k, "L", n + x * B, k]), i = u["stroke-width"] % 2 / 2, m = D(b.medianPlot) + i, J = ["M", t, m, "L", w, m], g)b.stem.animate({d: l}), B && b.whiskers.animate({d: r}), E && b.box.animate({d: I}), b.medianShape.animate({d: J}); else {
                    b.graphic = g = d.g().add(a.group);
                    b.stem = d.path(l).attr(p).add(g);
                    if (B)b.whiskers = d.path(r).attr(q).add(g);
                    if (E)b.box = d.path(I).attr(e).add(g);
                    b.medianShape = d.path(J).attr(u).add(g)
                }
            })
        }
    });
    p.errorbar = q(p.boxplot, {
        color: "#000000",
        grouping: !1,
        linkedTo: ":previous",
        tooltip: {pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
        whiskerWidth: null
    });
    g.errorbar = v(g.boxplot, {
        type: "errorbar", pointArrayMap: ["low", "high"], toYData: function (a) {
            return [a.low, a.high]
        }, pointValKey: "high", doQuartiles: !1, drawDataLabels: g.arearange ?
            g.arearange.prototype.drawDataLabels : u, getColumnMetrics: function () {
            return this.linkedParent && this.linkedParent.columnMetrics || g.column.prototype.getColumnMetrics.call(this)
        }
    });
    p.waterfall = q(p.column, {
        lineWidth: 1,
        lineColor: "#333",
        dashStyle: "dot",
        borderColor: "#333",
        states: {hover: {lineWidthPlus: 0}}
    });
    g.waterfall = v(g.column, {
        type: "waterfall", upColorProp: "fill", pointArrayMap: ["low", "y"], pointValKey: "y", init: function (a, b) {
            b.stacking = !0;
            g.column.prototype.init.call(this, a, b)
        }, translate: function () {
            var a =
                this.yAxis, b, c, d, e, f, h, j, k, m, i;
            b = this.options.threshold;
            g.column.prototype.translate.apply(this);
            k = m = b;
            d = this.points;
            for (c = 0, b = d.length; c < b; c++) {
                e = d[c];
                f = e.shapeArgs;
                h = this.getStack(c);
                i = h.points[this.index + "," + c];
                if (isNaN(e.y))e.y = this.yData[c];
                j = N(k, k + e.y) + i[0];
                f.y = a.translate(j, 0, 1);
                e.isSum ? (f.y = a.translate(i[1], 0, 1), f.height = a.translate(i[0], 0, 1) - f.y) : e.isIntermediateSum ? (f.y = a.translate(i[1], 0, 1), f.height = a.translate(m, 0, 1) - f.y, m = i[1]) : k += h.total;
                f.height < 0 && (f.y += f.height, f.height *= -1);
                e.plotY =
                    f.y = D(f.y) - this.borderWidth % 2 / 2;
                f.height = N(D(f.height), 0.001);
                e.yBottom = f.y + f.height;
                f = e.plotY + (e.negative ? f.height : 0);
                this.chart.inverted ? e.tooltipPos[0] = a.len - f : e.tooltipPos[1] = f
            }
        }, processData: function (a) {
            var b = this.yData, c = this.points, d, e = b.length, f, h, j, k, m, i;
            h = f = j = k = this.options.threshold || 0;
            for (i = 0; i < e; i++)m = b[i], d = c && c[i] ? c[i] : {}, m === "sum" || d.isSum ? b[i] = h : m === "intermediateSum" || d.isIntermediateSum ? b[i] = f : (h += m, f += m), j = Math.min(h, j), k = Math.max(h, k);
            t.prototype.processData.call(this, a);
            this.dataMin =
                j;
            this.dataMax = k
        }, toYData: function (a) {
            if (a.isSum)return a.x === 0 ? null : "sum"; else if (a.isIntermediateSum)return a.x === 0 ? null : "intermediateSum";
            return a.y
        }, getAttribs: function () {
            g.column.prototype.getAttribs.apply(this, arguments);
            var a = this.options, b = a.states, c = a.upColor || this.color, a = l.Color(c).brighten(0.1).get(), d = q(this.pointAttr), e = this.upColorProp;
            d[""][e] = c;
            d.hover[e] = b.hover.upColor || a;
            d.select[e] = b.select.upColor || c;
            s(this.points, function (a) {
                if (a.y > 0 && !a.color)a.pointAttr = d, a.color = c
            })
        }, getGraphPath: function () {
            var a =
                this.data, b = a.length, c = D(this.options.lineWidth + this.borderWidth) % 2 / 2, d = [], e, f, h;
            for (h = 1; h < b; h++)f = a[h].shapeArgs, e = a[h - 1].shapeArgs, f = ["M", e.x + e.width, e.y + c, "L", f.x, e.y + c], a[h - 1].y < 0 && (f[2] += e.height, f[5] += e.height), d = d.concat(f);
            return d
        }, getExtremes: u, getStack: function (a) {
            var b = this.yAxis.stacks, c = this.stackKey;
            this.processedYData[a] < this.options.threshold && (c = "-" + c);
            return b[c][a]
        }, drawGraph: t.prototype.drawGraph
    });
    p.bubble = q(p.scatter, {
        dataLabels: {
            formatter: function () {
                return this.point.z
            }, inside: !0,
            style: {color: "white", textShadow: "0px 0px 3px black"}, verticalAlign: "middle"
        },
        marker: {lineColor: null, lineWidth: 1},
        minSize: 8,
        maxSize: "20%",
        states: {hover: {halo: {size: 5}}},
        tooltip: {pointFormat: "({point.x}, {point.y}), Size: {point.z}"},
        turboThreshold: 0,
        zThreshold: 0
    });
    z = v(H, {
        haloPath: function () {
            return H.prototype.haloPath.call(this, this.shapeArgs.r + this.series.options.states.hover.halo.size)
        }
    });
    g.bubble = v(g.scatter, {
        type: "bubble",
        pointClass: z,
        pointArrayMap: ["y", "z"],
        parallelArrays: ["x", "y", "z"],
        trackerGroups: ["group",
            "dataLabelsGroup"],
        bubblePadding: !0,
        pointAttrToOptions: {stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor"},
        applyOpacity: function (a) {
            var b = this.options.marker, c = o(b.fillOpacity, 0.5), a = a || b.fillColor || this.color;
            c !== 1 && (a = U(a).setOpacity(c).get("rgba"));
            return a
        },
        convertAttribs: function () {
            var a = t.prototype.convertAttribs.apply(this, arguments);
            a.fill = this.applyOpacity(a.fill);
            return a
        },
        getRadii: function (a, b, c, d) {
            var e, f, h, j = this.zData, k = [], m = this.options.sizeBy !== "width";
            for (f = 0, e = j.length; f <
            e; f++)h = b - a, h = h > 0 ? (j[f] - a) / (b - a) : 0.5, m && h >= 0 && (h = Math.sqrt(h)), k.push(w.ceil(c + h * (d - c)) / 2);
            this.radii = k
        },
        animate: function (a) {
            var b = this.options.animation;
            if (!a)s(this.points, function (a) {
                var d = a.graphic, a = a.shapeArgs;
                d && a && (d.attr("r", 1), d.animate({r: a.r}, b))
            }), this.animate = null
        },
        translate: function () {
            var a, b = this.data, c, d, e = this.radii;
            g.scatter.prototype.translate.call(this);
            for (a = b.length; a--;)c = b[a], d = e ? e[a] : 0, c.negative = c.z < (this.options.zThreshold || 0), d >= this.minPxSize / 2 ? (c.shapeType = "circle",
                c.shapeArgs = {x: c.plotX, y: c.plotY, r: d}, c.dlBox = {
                x: c.plotX - d,
                y: c.plotY - d,
                width: 2 * d,
                height: 2 * d
            }) : c.shapeArgs = c.plotY = c.dlBox = C
        },
        drawLegendSymbol: function (a, b) {
            var c = x(a.itemStyle.fontSize) / 2;
            b.legendSymbol = this.chart.renderer.circle(c, a.baseline - c, c).attr({zIndex: 3}).add(b.legendGroup);
            b.legendSymbol.isMarker = !0
        },
        drawPoints: g.column.prototype.drawPoints,
        alignDataLabel: g.column.prototype.alignDataLabel
    });
    M.prototype.beforePadding = function () {
        var a = this, b = this.len, c = this.chart, d = 0, e = b, f = this.isXAxis, h =
            f ? "xData" : "yData", j = this.min, k = {}, m = w.min(c.plotWidth, c.plotHeight), i = Number.MAX_VALUE, n = -Number.MAX_VALUE, g = this.max - j, l = b / g, p = [];
        this.tickPositions && (s(this.series, function (b) {
            var h = b.options;
            if (b.bubblePadding && (b.visible || !c.options.chart.ignoreHiddenSeries))if (a.allowZoomOutside = !0, p.push(b), f)s(["minSize", "maxSize"], function (a) {
                var b = h[a], f = /%$/.test(b), b = x(b);
                k[a] = f ? m * b / 100 : b
            }), b.minPxSize = k.minSize, b = b.zData, b.length && (i = o(h.zMin, w.min(i, w.max(P(b), h.displayNegative === !1 ? h.zThreshold : -Number.MAX_VALUE))),
                n = o(h.zMax, w.max(n, Q(b))))
        }), s(p, function (a) {
            var b = a[h], c = b.length, m;
            f && a.getRadii(i, n, k.minSize, k.maxSize);
            if (g > 0)for (; c--;)typeof b[c] === "number" && (m = a.radii[c], d = Math.min((b[c] - j) * l - m, d), e = Math.max((b[c] - j) * l + m, e))
        }), p.length && g > 0 && o(this.options.min, this.userMin) === C && o(this.options.max, this.userMax) === C && (e -= b, l *= (b + d - e) / b, this.min += d / l, this.max += e / l))
    };
    (function () {
        function a(a, b, c) {
            a.call(this, b, c);
            if (this.chart.polar)this.closeSegment = function (a) {
                var b = this.xAxis.center;
                a.push("L", b[0], b[1])
            },
                this.closedStacks = !0
        }

        function b(a, b) {
            var c = this.chart, d = this.options.animation, e = this.group, i = this.markerGroup, n = this.xAxis.center, g = c.plotLeft, l = c.plotTop;
            if (c.polar) {
                if (c.renderer.isSVG)d === !0 && (d = {}), b ? (c = {
                    translateX: n[0] + g,
                    translateY: n[1] + l,
                    scaleX: 0.001,
                    scaleY: 0.001
                }, e.attr(c), i && i.attr(c)) : (c = {
                    translateX: g,
                    translateY: l,
                    scaleX: 1,
                    scaleY: 1
                }, e.animate(c, d), i && i.animate(c, d), this.animate = null)
            } else a.call(this, b)
        }

        var c = t.prototype, d = S.prototype, e;
        c.toXY = function (a) {
            var b, c = this.chart, d = a.plotX;
            b =
                a.plotY;
            a.rectPlotX = d;
            a.rectPlotY = b;
            d = (d / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360;
            d < 0 && (d += 360);
            a.clientX = d;
            b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - b);
            a.plotX = a.polarPlotX = b.x - c.plotLeft;
            a.plotY = a.polarPlotY = b.y - c.plotTop
        };
        c.orderTooltipPoints = function (a) {
            if (this.chart.polar && (a.sort(function (a, b) {
                    return a.clientX - b.clientX
                }), a[0]))a[0].wrappedClientX = a[0].clientX + 360, a.push(a[0])
        };
        g.area && r(g.area.prototype, "init", a);
        g.areaspline && r(g.areaspline.prototype, "init", a);
        g.spline &&
        r(g.spline.prototype, "getPointSpline", function (a, b, c, d) {
            var e, i, n, g, l, p, o;
            if (this.chart.polar) {
                e = c.plotX;
                i = c.plotY;
                a = b[d - 1];
                n = b[d + 1];
                this.connectEnds && (a || (a = b[b.length - 2]), n || (n = b[1]));
                if (a && n)g = a.plotX, l = a.plotY, b = n.plotX, p = n.plotY, g = (1.5 * e + g) / 2.5, l = (1.5 * i + l) / 2.5, n = (1.5 * e + b) / 2.5, o = (1.5 * i + p) / 2.5, b = Math.sqrt(Math.pow(g - e, 2) + Math.pow(l - i, 2)), p = Math.sqrt(Math.pow(n - e, 2) + Math.pow(o - i, 2)), g = Math.atan2(l - i, g - e), l = Math.atan2(o - i, n - e), o = Math.PI / 2 + (g + l) / 2, Math.abs(g - o) > Math.PI / 2 && (o -= Math.PI), g = e + Math.cos(o) *
                    b, l = i + Math.sin(o) * b, n = e + Math.cos(Math.PI + o) * p, o = i + Math.sin(Math.PI + o) * p, c.rightContX = n, c.rightContY = o;
                d ? (c = ["C", a.rightContX || a.plotX, a.rightContY || a.plotY, g || e, l || i, e, i], a.rightContX = a.rightContY = null) : c = ["M", e, i]
            } else c = a.call(this, b, c, d);
            return c
        });
        r(c, "translate", function (a) {
            a.call(this);
            if (this.chart.polar && !this.preventPostTranslate)for (var a = this.points, b = a.length; b--;)this.toXY(a[b])
        });
        r(c, "getSegmentPath", function (a, b) {
            var c = this.points;
            if (this.chart.polar && this.options.connectEnds !== !1 &&
                b[b.length - 1] === c[c.length - 1] && c[0].y !== null)this.connectEnds = !0, b = [].concat(b, [c[0]]);
            return a.call(this, b)
        });
        r(c, "animate", b);
        r(c, "setTooltipPoints", function (a, b) {
            this.chart.polar && F(this.xAxis, {tooltipLen: 360});
            return a.call(this, b)
        });
        if (g.column)e = g.column.prototype, r(e, "animate", b), r(e, "translate", function (a) {
            var b = this.xAxis, c = this.yAxis.len, d = b.center, e = b.startAngleRad, i = this.chart.renderer, g, l;
            this.preventPostTranslate = !0;
            a.call(this);
            if (b.isRadial) {
                b = this.points;
                for (l = b.length; l--;)g = b[l],
                    a = g.barX + e, g.shapeType = "path", g.shapeArgs = {
                    d: i.symbols.arc(d[0], d[1], c - g.plotY, null, {
                        start: a,
                        end: a + g.pointWidth,
                        innerR: c - o(g.yBottom, c)
                    })
                }, this.toXY(g), g.tooltipPos = [g.plotX, g.plotY], g.ttBelow = g.plotY > d[1]
            }
        }), r(e, "alignDataLabel", function (a, b, d, e, g, i) {
            if (this.chart.polar) {
                a = b.rectPlotX / Math.PI * 180;
                if (e.align === null)e.align = a > 20 && a < 160 ? "left" : a > 200 && a < 340 ? "right" : "center";
                if (e.verticalAlign === null)e.verticalAlign = a < 45 || a > 315 ? "bottom" : a > 135 && a < 225 ? "top" : "middle";
                c.alignDataLabel.call(this, b, d, e, g, i)
            } else a.call(this,
                b, d, e, g, i)
        });
        r(d, "getIndex", function (a, b) {
            var c, d = this.chart, e;
            d.polar ? (e = d.xAxis[0].center, c = b.chartX - e[0] - d.plotLeft, d = b.chartY - e[1] - d.plotTop, c = 180 - Math.round(Math.atan2(c, d) / Math.PI * 180)) : c = a.call(this, b);
            return c
        });
        r(d, "getCoordinates", function (a, b) {
            var c = this.chart, d = {xAxis: [], yAxis: []};
            c.polar ? s(c.axes, function (a) {
                var e = a.isXAxis, f = a.center, g = b.chartX - f[0] - c.plotLeft, f = b.chartY - f[1] - c.plotTop;
                d[e ? "xAxis" : "yAxis"].push({
                    axis: a, value: a.translate(e ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g,
                            2) + Math.pow(f, 2)), !0)
                })
            }) : d = a.call(this, b);
            return d
        })
    })()
})(Highcharts);
/*
 Highcharts JS v4.0.4 (2014-09-02)

 (c) 2009-2013 Torstein Hønsi

 License: www.highcharts.com/license
 */
(function (d) {
    function x(f, a, b, c) {
        var e, g, j;
        b *= t;
        a *= t;
        var i = [], h, k, o;
        b *= -1;
        h = c.x;
        k = c.y;
        o = (c.z === 0 ? 1.0E-4 : c.z) * (c.vd || 25);
        o = Math.max(500, o);
        var q = l(b), n = m(b), r = l(a), s = m(a), p, v, u;
        d.each(f, function (a) {
            p = a.x - h;
            v = a.y - k;
            u = a.z || 0;
            e = n * p - q * u;
            g = -q * r * p - n * r * u + s * v;
            j = q * s * p + n * s * u + r * v;
            e = e * ((o - j) / o) + h;
            g = g * ((o - j) / o) + k;
            i.push({x: z(e), y: z(g), z: z(j)})
        });
        return i
    }

    function A(f) {
        return f !== void 0 && f !== null
    }

    function w(f, a, b, c, e, g, d, i) {
        var h = [];
        return g > e && g - e > n / 2 + 1.0E-4 ? (h = h.concat(w(f, a, b, c, e, e + n / 2, d, i)), h = h.concat(w(f, a,
            b, c, e + n / 2, g, d, i))) : g < e && e - g > n / 2 + 1.0E-4 ? (h = h.concat(w(f, a, b, c, e, e - n / 2, d, i)), h = h.concat(w(f, a, b, c, e - n / 2, g, d, i))) : (h = g - e, ["C", f + b * m(e) - b * B * h * l(e) + d, a + c * l(e) + c * B * h * m(e) + i, f + b * m(g) + b * B * h * l(g) + d, a + c * l(g) - c * B * h * m(g) + i, f + b * m(g) + d, a + c * l(g) + i])
    }

    function D(f) {
        if (this.chart.is3d()) {
            var a = this.chart.options.plotOptions.column.grouping;
            a !== void 0 && !a && this.group.zIndex !== void 0 && this.group.attr({zIndex: this.group.zIndex * 10});
            var b = this.options, c = this.options.states;
            this.borderWidth = b.borderWidth = b.edgeWidth || 1;
            d.each(this.data, function (a) {
                if (a.y !== null)a = a.pointAttr, this.borderColor = d.pick(b.edgeColor, a[""].fill), a[""].stroke = this.borderColor, a.hover.stroke = d.pick(c.hover.edgeColor, this.borderColor), a.select.stroke = d.pick(c.select.edgeColor, this.borderColor)
            })
        }
        f.apply(this, [].slice.call(arguments, 1))
    }

    var n = Math.PI, t = n / 180, l = Math.sin, m = Math.cos, z = Math.round, B = 4 * (Math.sqrt(2) - 1) / 3 / (n / 2);
    d.SVGRenderer.prototype.toLinePath = function (f, a) {
        var b = [];
        d.each(f, function (a) {
            b.push("L", a.x, a.y)
        });
        b[0] = "M";
        a && b.push("Z");
        return b
    };
    d.SVGRenderer.prototype.cuboid = function (f) {
        var a = this.g(), f = this.cuboidPath(f);
        a.front = this.path(f[0]).attr({zIndex: f[3], "stroke-linejoin": "round"}).add(a);
        a.top = this.path(f[1]).attr({zIndex: f[4], "stroke-linejoin": "round"}).add(a);
        a.side = this.path(f[2]).attr({zIndex: f[5], "stroke-linejoin": "round"}).add(a);
        a.fillSetter = function (a) {
            var c = d.Color(a).brighten(0.1).get(), e = d.Color(a).brighten(-0.1).get();
            this.front.attr({fill: a});
            this.top.attr({fill: c});
            this.side.attr({fill: e});
            this.color = a;
            return this
        };
        a.opacitySetter = function (a) {
            this.front.attr({opacity: a});
            this.top.attr({opacity: a});
            this.side.attr({opacity: a});
            return this
        };
        a.attr = function (a) {
            a.shapeArgs || A(a.x) ? (a = this.renderer.cuboidPath(a.shapeArgs || a), this.front.attr({
                d: a[0],
                zIndex: a[3]
            }), this.top.attr({d: a[1], zIndex: a[4]}), this.side.attr({
                d: a[2],
                zIndex: a[5]
            })) : d.SVGElement.prototype.attr.call(this, a);
            return this
        };
        a.animate = function (a, c, e) {
            A(a.x) && A(a.y) ? (a = this.renderer.cuboidPath(a), this.front.attr({zIndex: a[3]}).animate({d: a[0]},
                c, e), this.top.attr({zIndex: a[4]}).animate({d: a[1]}, c, e), this.side.attr({zIndex: a[5]}).animate({d: a[2]}, c, e)) : a.opacity ? (this.front.animate(a, c, e), this.top.animate(a, c, e), this.side.animate(a, c, e)) : d.SVGElement.prototype.animate.call(this, a, c, e);
            return this
        };
        a.destroy = function () {
            this.front.destroy();
            this.top.destroy();
            this.side.destroy();
            return null
        };
        a.attr({zIndex: -f[3]});
        return a
    };
    d.SVGRenderer.prototype.cuboidPath = function (d) {
        var a = d.x, b = d.y, c = d.z, e = d.height, g = d.width, j = d.depth, i = d.alpha, h = d.beta,
            a = [{x: a, y: b, z: c}, {x: a + g, y: b, z: c}, {x: a + g, y: b + e, z: c}, {x: a, y: b + e, z: c}, {
                x: a,
                y: b + e,
                z: c + j
            }, {x: a + g, y: b + e, z: c + j}, {x: a + g, y: b, z: c + j}, {
                x: a,
                y: b,
                z: c + j
            }], a = x(a, i, h, d.origin), d = ["M", a[0].x, a[0].y, "L", a[7].x, a[7].y, "L", a[6].x, a[6].y, "L", a[1].x, a[1].y, "Z"], b = ["M", a[3].x, a[3].y, "L", a[2].x, a[2].y, "L", a[5].x, a[5].y, "L", a[4].x, a[4].y, "Z"], c = ["M", a[1].x, a[1].y, "L", a[2].x, a[2].y, "L", a[5].x, a[5].y, "L", a[6].x, a[6].y, "Z"], e = ["M", a[0].x, a[0].y, "L", a[7].x, a[7].y, "L", a[4].x, a[4].y, "L", a[3].x, a[3].y, "Z"];
        return [["M", a[0].x, a[0].y,
            "L", a[1].x, a[1].y, "L", a[2].x, a[2].y, "L", a[3].x, a[3].y, "Z"], a[7].y < a[1].y ? d : a[4].y > a[2].y ? b : [], a[6].x > a[1].x ? c : a[7].x < a[0].x ? e : [], (a[0].z + a[1].z + a[2].z + a[3].z) / 4, h > 0 ? (a[0].z + a[7].z + a[6].z + a[1].z) / 4 : (a[3].z + a[2].z + a[5].z + a[4].z) / 4, i > 0 ? (a[1].z + a[2].z + a[5].z + a[6].z) / 4 : (a[0].z + a[7].z + a[4].z + a[3].z) / 4]
    };
    d.SVGRenderer.prototype.arc3d = function (f) {
        f.alpha *= t;
        f.beta *= t;
        var a = this.g(), b = this.arc3dPath(f), c = a.renderer, e = b.zTop * 100;
        a.shapeArgs = f;
        a.top = c.path(b.top).attr({zIndex: b.zTop}).add(a);
        a.side1 = c.path(b.side2).attr({zIndex: b.zSide2});
        a.side2 = c.path(b.side1).attr({zIndex: b.zSide1});
        a.inn = c.path(b.inn).attr({zIndex: b.zInn});
        a.out = c.path(b.out).attr({zIndex: b.zOut});
        a.fillSetter = function (a) {
            this.color = a;
            var b = d.Color(a).brighten(-0.1).get();
            this.side1.attr({fill: b});
            this.side2.attr({fill: b});
            this.inn.attr({fill: b});
            this.out.attr({fill: b});
            this.top.attr({fill: a});
            return this
        };
        a.translateXSetter = function (a) {
            this.out.attr({translateX: a});
            this.inn.attr({translateX: a});
            this.side1.attr({translateX: a});
            this.side2.attr({translateX: a});
            this.top.attr({translateX: a})
        };
        a.translateYSetter = function (a) {
            this.out.attr({translateY: a});
            this.inn.attr({translateY: a});
            this.side1.attr({translateY: a});
            this.side2.attr({translateY: a});
            this.top.attr({translateY: a})
        };
        a.animate = function (a, b, c) {
            A(a.end) || A(a.start) ? (this._shapeArgs = this.shapeArgs, d.SVGElement.prototype.animate.call(this, {_args: a}, {
                duration: b, step: function () {
                    var a = arguments[1], b = a.elem, c = b._shapeArgs, e = a.end, a = a.pos, c = d.merge(c, {
                        x: c.x + (e.x - c.x) * a,
                        y: c.y + (e.y - c.y) * a,
                        r: c.r + (e.r - c.r) * a,
                        innerR: c.innerR + (e.innerR - c.innerR) *
                        a,
                        start: c.start + (e.start - c.start) * a,
                        end: c.end + (e.end - c.end) * a
                    }), e = b.renderer.arc3dPath(c);
                    b.shapeArgs = c;
                    b.top.attr({d: e.top, zIndex: e.zTop});
                    b.inn.attr({d: e.inn, zIndex: e.zInn});
                    b.out.attr({d: e.out, zIndex: e.zOut});
                    b.side1.attr({d: e.side1, zIndex: e.zSide1});
                    b.side2.attr({d: e.side2, zIndex: e.zSide2})
                }
            }, c)) : d.SVGElement.prototype.animate.call(this, a, b, c);
            return this
        };
        a.destroy = function () {
            this.top.destroy();
            this.out.destroy();
            this.inn.destroy();
            this.side1.destroy();
            this.side2.destroy();
            d.SVGElement.prototype.destroy.call(this)
        };
        a.hide = function () {
            this.top.hide();
            this.out.hide();
            this.inn.hide();
            this.side1.hide();
            this.side2.hide()
        };
        a.show = function () {
            this.top.show();
            this.out.show();
            this.inn.show();
            this.side1.show();
            this.side2.show()
        };
        a.zIndex = e;
        a.attr({zIndex: e});
        return a
    };
    d.SVGRenderer.prototype.arc3dPath = function (d) {
        var a = d.x, b = d.y, c = d.start, e = d.end - 1.0E-5, g = d.r, j = d.innerR, i = d.depth, h = d.alpha, k = d.beta, o = m(c), q = l(c), d = m(e), y = l(e), r = g * m(k), s = g * m(h), p = j * m(k);
        j *= m(h);
        var v = i * l(k), u = i * l(h), i = ["M", a + r * o, b + s * q], i = i.concat(w(a, b,
            r, s, c, e, 0, 0)), i = i.concat(["L", a + p * d, b + j * y]), i = i.concat(w(a, b, p, j, e, c, 0, 0)), i = i.concat(["Z"]), k = k > 0 ? n / 2 : 0, h = h > 0 ? 0 : n / 2, k = c > -k ? c : e > -k ? -k : c, t = e < n - h ? e : c < n - h ? n - h : e, h = ["M", a + r * m(k), b + s * l(k)], h = h.concat(w(a, b, r, s, k, t, 0, 0)), h = h.concat(["L", a + r * m(t) + v, b + s * l(t) + u]), h = h.concat(w(a, b, r, s, t, k, v, u)), h = h.concat(["Z"]), k = ["M", a + p * o, b + j * q], k = k.concat(w(a, b, p, j, c, e, 0, 0)), k = k.concat(["L", a + p * m(e) + v, b + j * l(e) + u]), k = k.concat(w(a, b, p, j, e, c, v, u)), k = k.concat(["Z"]), o = ["M", a + r * o, b + s * q, "L", a + r * o + v, b + s * q + u, "L", a + p * o + v, b + j * q +
        u, "L", a + p * o, b + j * q, "Z"], a = ["M", a + r * d, b + s * y, "L", a + r * d + v, b + s * y + u, "L", a + p * d + v, b + j * y + u, "L", a + p * d, b + j * y, "Z"], b = l((c + e) / 2), c = l(c), e = l(e);
        return {
            top: i,
            zTop: g,
            out: h,
            zOut: Math.max(b, c, e) * g,
            inn: k,
            zInn: Math.max(b, c, e) * g,
            side1: o,
            zSide1: c * g * 0.99,
            side2: a,
            zSide2: e * g * 0.99
        }
    };
    d.Chart.prototype.is3d = function () {
        return this.options.chart.options3d && this.options.chart.options3d.enabled
    };
    d.wrap(d.Chart.prototype, "isInsidePlot", function (d) {
        return this.is3d() ? !0 : d.apply(this, [].slice.call(arguments, 1))
    });
    d.getOptions().chart.options3d =
    {
        enabled: !1,
        alpha: 0,
        beta: 0,
        depth: 100,
        viewDistance: 25,
        frame: {
            bottom: {size: 1, color: "rgba(255,255,255,0)"},
            side: {size: 1, color: "rgba(255,255,255,0)"},
            back: {size: 1, color: "rgba(255,255,255,0)"}
        }
    };
    d.wrap(d.Chart.prototype, "init", function (f) {
        var a = [].slice.call(arguments, 1), b;
        if (a[0].chart.options3d && a[0].chart.options3d.enabled)b = a[0].plotOptions || {}, b = b.pie || {}, b.borderColor = d.pick(b.borderColor, void 0);
        f.apply(this, a)
    });
    d.wrap(d.Chart.prototype, "setChartSize", function (d) {
        d.apply(this, [].slice.call(arguments,
            1));
        if (this.is3d()) {
            var a = this.inverted, b = this.clipBox, c = this.margin;
            b[a ? "y" : "x"] = -(c[3] || 0);
            b[a ? "x" : "y"] = -(c[0] || 0);
            b[a ? "height" : "width"] = this.chartWidth + (c[3] || 0) + (c[1] || 0);
            b[a ? "width" : "height"] = this.chartHeight + (c[0] || 0) + (c[2] || 0)
        }
    });
    d.wrap(d.Chart.prototype, "redraw", function (d) {
        if (this.is3d())this.isDirtyBox = !0;
        d.apply(this, [].slice.call(arguments, 1))
    });
    d.Chart.prototype.retrieveStacks = function (f, a) {
        var b = {}, c = 1;
        if (f || !a)return this.series;
        d.each(this.series, function (a) {
            b[a.options.stack || 0] ?
                b[a.options.stack || 0].series.push(a) : (b[a.options.stack || 0] = {series: [a], position: c}, c++)
        });
        b.totalStacks = c + 1;
        return b
    };
    d.wrap(d.Axis.prototype, "init", function (f) {
        var a = arguments;
        if (a[1].is3d())a[2].tickWidth = d.pick(a[2].tickWidth, 0), a[2].gridLineWidth = d.pick(a[2].gridLineWidth, 1);
        f.apply(this, [].slice.call(arguments, 1))
    });
    d.wrap(d.Axis.prototype, "render", function (d) {
        d.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a = this.chart, b = a.renderer, c = a.options.chart.options3d, e = c.alpha, g =
                c.beta * (a.yAxis[0].opposite ? -1 : 1), j = c.frame, i = j.bottom, h = j.back, j = j.side, k = c.depth, o = this.height, q = this.width, l = this.left, m = this.top, c = {
                x: a.plotLeft + a.plotWidth / 2,
                y: a.plotTop + a.plotHeight / 2,
                z: k,
                vd: c.viewDistance
            };
            if (this.horiz)this.axisLine && this.axisLine.hide(), g = {
                x: l,
                y: m + (a.yAxis[0].reversed ? -i.size : o),
                z: 0,
                width: q,
                height: i.size,
                depth: k,
                alpha: e,
                beta: g,
                origin: c
            }, this.bottomFrame ? this.bottomFrame.animate(g) : this.bottomFrame = b.cuboid(g).attr({
                fill: i.color,
                zIndex: a.yAxis[0].reversed && e > 0 ? 4 : -1
            }).css({stroke: i.color}).add();
            else {
                var n = {
                    x: l,
                    y: m,
                    z: k + 1,
                    width: q,
                    height: o + i.size,
                    depth: h.size,
                    alpha: e,
                    beta: g,
                    origin: c
                };
                this.backFrame ? this.backFrame.animate(n) : this.backFrame = b.cuboid(n).attr({
                    fill: h.color,
                    zIndex: -3
                }).css({stroke: h.color}).add();
                this.axisLine && this.axisLine.hide();
                a = {
                    x: (a.yAxis[0].opposite ? q : 0) + l - j.size,
                    y: m,
                    z: 0,
                    width: j.size,
                    height: o + i.size,
                    depth: k + h.size,
                    alpha: e,
                    beta: g,
                    origin: c
                };
                this.sideFrame ? this.sideFrame.animate(a) : this.sideFrame = b.cuboid(a).attr({
                    fill: j.color,
                    zIndex: -2
                }).css({stroke: j.color}).add()
            }
        }
    });
    d.wrap(d.Axis.prototype,
        "getPlotLinePath", function (d) {
            var a = d.apply(this, [].slice.call(arguments, 1));
            if (!this.chart.is3d())return a;
            if (a === null)return a;
            var b = this.chart, c = b.options.chart.options3d, e = c.depth;
            c.origin = {x: b.plotLeft + b.plotWidth / 2, y: b.plotTop + b.plotHeight / 2, z: e, vd: c.viewDistance};
            var a = [{x: a[1], y: a[2], z: this.horiz || this.opposite ? e : 0}, {x: a[1], y: a[2], z: e}, {
                x: a[4],
                y: a[5],
                z: e
            }, {
                x: a[4],
                y: a[5],
                z: this.horiz || this.opposite ? 0 : e
            }], e = b.options.inverted ? c.beta : c.alpha, g = b.options.inverted ? c.alpha : c.beta;
            g *= b.yAxis[0].opposite ?
                -1 : 1;
            a = x(a, e, g, c.origin);
            return a = this.chart.renderer.toLinePath(a, !1)
        });
    d.wrap(d.Axis.prototype, "getPlotBandPath", function (d) {
        if (this.chart.is3d()) {
            var a = arguments, b = a[1], a = this.getPlotLinePath(a[2]);
            (b = this.getPlotLinePath(b)) && a ? b.push(a[7], a[8], a[4], a[5], a[1], a[2]) : b = null;
            return b
        } else return d.apply(this, [].slice.call(arguments, 1))
    });
    d.wrap(d.Tick.prototype, "getMarkPath", function (d) {
        var a = d.apply(this, [].slice.call(arguments, 1));
        if (!this.axis.chart.is3d())return a;
        var b = this.axis.chart, c = b.options.chart.options3d,
            e = {
                x: b.plotLeft + b.plotWidth / 2,
                y: b.plotTop + b.plotHeight / 2,
                z: c.depth,
                vd: c.viewDistance
            }, a = [{x: a[1], y: a[2], z: 0}, {
                x: a[4],
                y: a[5],
                z: 0
            }], g = b.inverted ? c.beta : c.alpha, c = b.inverted ? c.alpha : c.beta;
        c *= b.yAxis[0].opposite ? -1 : 1;
        a = x(a, g, c, e);
        return a = ["M", a[0].x, a[0].y, "L", a[1].x, a[1].y]
    });
    d.wrap(d.Tick.prototype, "getLabelPosition", function (d) {
        var a = d.apply(this, [].slice.call(arguments, 1));
        if (!this.axis.chart.is3d())return a;
        var b = this.axis.chart, c = b.options.chart.options3d, e = {
            x: b.plotLeft + b.plotWidth / 2, y: b.plotTop +
            b.plotHeight / 2, z: c.depth, vd: c.viewDistance
        }, g = b.inverted ? c.beta : c.alpha, c = b.inverted ? c.alpha : c.beta;
        c *= b.yAxis[0].opposite ? -1 : 1;
        return a = x([{x: a.x, y: a.y, z: 0}], g, c, e)[0]
    });
    d.wrap(d.Axis.prototype, "drawCrosshair", function (d) {
        var a = arguments;
        this.chart.is3d() && a[2] && (a[2] = {plotX: a[2].plotXold || a[2].plotX, plotY: a[2].plotYold || a[2].plotY});
        d.apply(this, [].slice.call(a, 1))
    });
    d.wrap(d.seriesTypes.column.prototype, "translate", function (f) {
        f.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a =
                this.chart, b = this.options, c = a.options.chart.options3d, e = b.depth || 25, g = {
                x: a.plotWidth / 2,
                y: a.plotHeight / 2,
                z: c.depth,
                vd: c.viewDistance
            }, j = c.alpha, i = c.beta * (a.yAxis[0].opposite ? -1 : 1), h = (b.stacking ? b.stack || 0 : this._i) * (e + (b.groupZPadding || 1));
            b.grouping !== !1 && (h = 0);
            h += b.groupZPadding || 1;
            d.each(this.data, function (a) {
                if (a.y !== null) {
                    var b = a.shapeArgs, c = a.tooltipPos;
                    a.shapeType = "cuboid";
                    b.alpha = j;
                    b.beta = i;
                    b.z = h;
                    b.origin = g;
                    b.depth = e;
                    c = x([{x: c[0], y: c[1], z: h}], j, i, g)[0];
                    a.tooltipPos = [c.x, c.y]
                }
            })
        }
    });
    d.wrap(d.seriesTypes.column.prototype,
        "animate", function (f) {
            if (this.chart.is3d()) {
                var a = arguments[1], b = this.yAxis, c = this, e = this.yAxis.reversed;
                if (d.svg)a ? d.each(c.data, function (a) {
                    if (a.y !== null && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, !e))a.shapeArgs.y = a.stackY ? a.plotY + b.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height)
                }) : (d.each(c.data, function (a) {
                    if (a.y !== null)a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, c.options.animation)
                }), this.drawDataLabels(),
                    c.animate = null)
            } else f.apply(this, [].slice.call(arguments, 1))
        });
    d.wrap(d.seriesTypes.column.prototype, "init", function (d) {
        d.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a = this.options, b = a.grouping, c = a.stacking, e = 0;
            if ((b === void 0 || b) && c) {
                b = this.chart.retrieveStacks(b, c);
                c = a.stack || 0;
                for (e = 0; e < b[c].series.length; e++)if (b[c].series[e] === this)break;
                e = b.totalStacks * 10 - 10 * (b.totalStacks - b[c].position) - e
            }
            a.zIndex = e
        }
    });
    d.wrap(d.Series.prototype, "alignDataLabel", function (d) {
        if (this.chart.is3d() &&
            (this.type === "column" || this.type === "columnrange")) {
            var a = this.chart, b = a.options.chart.options3d, c = arguments[4], e = {
                x: c.x,
                y: c.y,
                z: 0
            }, e = x([e], b.alpha, b.beta * (a.yAxis[0].opposite ? -1 : 1), {
                x: a.plotWidth / 2,
                y: a.plotHeight / 2,
                z: b.depth,
                vd: b.viewDistance
            })[0];
            c.x = e.x;
            c.y = e.y
        }
        d.apply(this, [].slice.call(arguments, 1))
    });
    d.seriesTypes.columnrange && d.wrap(d.seriesTypes.columnrange.prototype, "drawPoints", D);
    d.wrap(d.seriesTypes.column.prototype, "drawPoints", D);
    var C = d.getOptions();
    C.plotOptions.cylinder = d.merge(C.plotOptions.column);
    C = d.extendClass(d.seriesTypes.column, {type: "cylinder"});
    d.seriesTypes.cylinder = C;
    d.wrap(d.seriesTypes.cylinder.prototype, "translate", function (f) {
        f.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a = this.chart, b = a.options, c = b.plotOptions.cylinder, b = b.chart.options3d, e = c.depth || 0, g = {
                x: a.inverted ? a.plotHeight / 2 : a.plotWidth / 2,
                y: a.inverted ? a.plotWidth / 2 : a.plotHeight / 2,
                z: b.depth,
                vd: b.viewDistance
            }, j = b.alpha, i = c.stacking ? (this.options.stack || 0) * e : this._i * e;
            i += e / 2;
            c.grouping !== !1 && (i = 0);
            d.each(this.data,
                function (a) {
                    var b = a.shapeArgs;
                    a.shapeType = "arc3d";
                    b.x += e / 2;
                    b.z = i;
                    b.start = 0;
                    b.end = 2 * n;
                    b.r = e * 0.95;
                    b.innerR = 0;
                    b.depth = b.height * (1 / l((90 - j) * t)) - i;
                    b.alpha = 90 - j;
                    b.beta = 0;
                    b.origin = g
                })
        }
    });
    d.wrap(d.seriesTypes.pie.prototype, "translate", function (f) {
        f.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var a = this, b = a.chart, c = a.options, e = c.depth || 0, g = b.options.chart.options3d, j = {
                x: b.plotWidth / 2,
                y: b.plotHeight / 2,
                z: g.depth
            }, i = g.alpha, h = g.beta, k = c.stacking ? (c.stack || 0) * e : a._i * e;
            k += e / 2;
            c.grouping !== !1 &&
            (k = 0);
            d.each(a.data, function (b) {
                b.shapeType = "arc3d";
                var c = b.shapeArgs;
                if (b.y)c.z = k, c.depth = e * 0.75, c.origin = j, c.alpha = i, c.beta = h, c = (c.end + c.start) / 2, b.slicedTranslation = {
                    translateX: z(m(c) * a.options.slicedOffset * m(i * t)),
                    translateY: z(l(c) * a.options.slicedOffset * m(i * t))
                }
            })
        }
    });
    d.wrap(d.seriesTypes.pie.prototype.pointClass.prototype, "haloPath", function (d) {
        var a = arguments;
        return this.series.chart.is3d() ? [] : d.call(this, a[1])
    });
    d.wrap(d.seriesTypes.pie.prototype, "drawPoints", function (f) {
        if (this.chart.is3d()) {
            var a =
                this.options, b = this.options.states;
            this.borderWidth = a.borderWidth = a.edgeWidth || 1;
            this.borderColor = a.edgeColor = d.pick(a.edgeColor, a.borderColor, void 0);
            b.hover.borderColor = d.pick(b.hover.edgeColor, this.borderColor);
            b.hover.borderWidth = d.pick(b.hover.edgeWidth, this.borderWidth);
            b.select.borderColor = d.pick(b.select.edgeColor, this.borderColor);
            b.select.borderWidth = d.pick(b.select.edgeWidth, this.borderWidth);
            d.each(this.data, function (a) {
                var c = a.pointAttr;
                c[""].stroke = a.series.borderColor || a.color;
                c[""]["stroke-width"] =
                    a.series.borderWidth;
                c.hover.stroke = b.hover.borderColor;
                c.hover["stroke-width"] = b.hover.borderWidth;
                c.select.stroke = b.select.borderColor;
                c.select["stroke-width"] = b.select.borderWidth
            })
        }
        f.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d()) {
            var c = this.group;
            d.each(this.points, function (a) {
                a.graphic.out.add(c);
                a.graphic.inn.add(c);
                a.graphic.side1.add(c);
                a.graphic.side2.add(c)
            })
        }
    });
    d.wrap(d.seriesTypes.pie.prototype, "drawDataLabels", function (f) {
        this.chart.is3d() && d.each(this.data, function (a) {
            var b =
                a.shapeArgs, c = b.r, d = b.depth, f = b.alpha * t, b = (b.start + b.end) / 2, a = a.labelPos;
            a[1] += -c * (1 - m(f)) * l(b) + (l(b) > 0 ? l(f) * d : 0);
            a[3] += -c * (1 - m(f)) * l(b) + (l(b) > 0 ? l(f) * d : 0);
            a[5] += -c * (1 - m(f)) * l(b) + (l(b) > 0 ? l(f) * d : 0)
        });
        f.apply(this, [].slice.call(arguments, 1))
    });
    d.wrap(d.seriesTypes.pie.prototype, "addPoint", function (d) {
        d.apply(this, [].slice.call(arguments, 1));
        this.chart.is3d() && this.update()
    });
    d.wrap(d.seriesTypes.pie.prototype, "animate", function (f) {
        if (this.chart.is3d()) {
            var a = arguments[1], b = this.options.animation, c = this.center,
                e = this.group, g = this.markerGroup;
            if (d.svg)if (b === !0 && (b = {}), a) {
                if (e.oldtranslateX = e.translateX, e.oldtranslateY = e.translateY, a = {
                        translateX: c[0],
                        translateY: c[1],
                        scaleX: 0.001,
                        scaleY: 0.001
                    }, e.attr(a), g)g.attrSetters = e.attrSetters, g.attr(a)
            } else a = {
                translateX: e.oldtranslateX,
                translateY: e.oldtranslateY,
                scaleX: 1,
                scaleY: 1
            }, e.animate(a, b), g && g.animate(a, b), this.animate = null
        } else f.apply(this, [].slice.call(arguments, 1))
    });
    d.wrap(d.seriesTypes.scatter.prototype, "translate", function (f) {
        f.apply(this, [].slice.call(arguments,
            1));
        if (this.chart.is3d()) {
            var a = this.chart, b = this.chart.options.chart.options3d, c = b.alpha, e = b.beta, g = {
                x: a.inverted ? a.plotHeight / 2 : a.plotWidth / 2,
                y: a.inverted ? a.plotWidth / 2 : a.plotHeight / 2,
                z: b.depth,
                vd: b.viewDistance
            }, b = b.depth, j = a.options.zAxis || {min: 0, max: b}, i = b / (j.max - j.min);
            d.each(this.data, function (a) {
                var b = {x: a.plotX, y: a.plotY, z: (a.z - j.min) * i}, b = x([b], c, e, g)[0];
                a.plotXold = a.plotX;
                a.plotYold = a.plotY;
                a.plotX = b.x;
                a.plotY = b.y;
                a.plotZ = b.z
            })
        }
    });
    d.wrap(d.seriesTypes.scatter.prototype, "init", function (d) {
        var a =
            d.apply(this, [].slice.call(arguments, 1));
        if (this.chart.is3d())this.pointArrayMap = ["x", "y", "z"], this.tooltipOptions.pointFormat = this.userOptions.tooltip ? this.userOptions.tooltip.pointFormat || "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>" : "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>";
        return a
    });
    if (d.VMLRenderer)d.setOptions({animate: !1}), d.VMLRenderer.prototype.cuboid = d.SVGRenderer.prototype.cuboid, d.VMLRenderer.prototype.cuboidPath = d.SVGRenderer.prototype.cuboidPath,
        d.VMLRenderer.prototype.toLinePath = d.SVGRenderer.prototype.toLinePath, d.VMLRenderer.prototype.createElement3D = d.SVGRenderer.prototype.createElement3D, d.VMLRenderer.prototype.arc3d = function (f) {
        f = d.SVGRenderer.prototype.arc3d.call(this, f);
        f.css({zIndex: f.zIndex});
        return f
    }, d.VMLRenderer.prototype.arc3dPath = d.SVGRenderer.prototype.arc3dPath, d.Chart.prototype.renderSeries = function () {
        for (var d, a = this.series.length; a--;)d = this.series[a], d.translate(), d.setTooltipPoints && d.setTooltipPoints(), d.render()
    },
        d.wrap(d.Axis.prototype, "render", function (d) {
            d.apply(this, [].slice.call(arguments, 1));
            this.sideFrame && (this.sideFrame.css({zIndex: 0}), this.sideFrame.front.attr({fill: this.sideFrame.color}));
            this.bottomFrame && (this.bottomFrame.css({zIndex: 1}), this.bottomFrame.front.attr({fill: this.bottomFrame.color}));
            this.backFrame && (this.backFrame.css({zIndex: 0}), this.backFrame.front.attr({fill: this.backFrame.color}))
        })
})(Highcharts);
/*
 Highcharts JS v4.0.4 (2014-09-02)
 Exporting module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (f) {
    var A = f.Chart, t = f.addEvent, B = f.removeEvent, l = f.createElement, o = f.discardElement, v = f.css, k = f.merge, r = f.each, p = f.extend, D = Math.max, j = document, C = window, E = f.isTouchDevice, F = f.Renderer.prototype.symbols, s = f.getOptions(), y;
    p(s.lang, {
        printChart: "Print chart",
        downloadPNG: "Download PNG image",
        downloadJPEG: "Download JPEG image",
        downloadPDF: "Download PDF document",
        downloadSVG: "Download SVG vector image",
        contextButtonTitle: "Chart context menu"
    });
    s.navigation = {
        menuStyle: {
            border: "1px solid #A0A0A0",
            background: "#FFFFFF", padding: "5px 0"
        },
        menuItemStyle: {padding: "0 10px", background: "none", color: "#303030", fontSize: E ? "14px" : "11px"},
        menuItemHoverStyle: {background: "#4572A5", color: "#FFFFFF"},
        buttonOptions: {
            symbolFill: "#E0E0E0",
            symbolSize: 14,
            symbolStroke: "#666",
            symbolStrokeWidth: 3,
            symbolX: 12.5,
            symbolY: 10.5,
            align: "right",
            buttonSpacing: 3,
            height: 22,
            theme: {fill: "white", stroke: "none"},
            verticalAlign: "top",
            width: 24
        }
    };
    s.exporting = {
        type: "image/png", url: "http://export.highcharts.com/", buttons: {
            contextButton: {
                menuClassName: "highcharts-contextmenu",
                symbol: "menu",
                _titleKey: "contextButtonTitle",
                menuItems: [{
                    textKey: "printChart", onclick: function () {
                        this.print()
                    }
                }, {separator: !0}, {
                    textKey: "downloadPNG", onclick: function () {
                        this.exportChart()
                    }
                }, {
                    textKey: "downloadJPEG", onclick: function () {
                        this.exportChart({type: "image/jpeg"})
                    }
                }, {
                    textKey: "downloadPDF", onclick: function () {
                        this.exportChart({type: "application/pdf"})
                    }
                }, {
                    textKey: "downloadSVG", onclick: function () {
                        this.exportChart({type: "image/svg+xml"})
                    }
                }]
            }
        }
    };
    f.post = function (b, a, d) {
        var c, b = l("form", k({
            method: "post",
            action: b, enctype: "multipart/form-data"
        }, d), {display: "none"}, j.body);
        for (c in a)l("input", {type: "hidden", name: c, value: a[c]}, null, b);
        b.submit();
        o(b)
    };
    p(A.prototype, {
        getSVG: function (b) {
            var a = this, d, c, z, h, g = k(a.options, b);
            if (!j.createElementNS)j.createElementNS = function (a, b) {
                return j.createElement(b)
            };
            b = l("div", null, {
                position: "absolute",
                top: "-9999em",
                width: a.chartWidth + "px",
                height: a.chartHeight + "px"
            }, j.body);
            c = a.renderTo.style.width;
            h = a.renderTo.style.height;
            c = g.exporting.sourceWidth || g.chart.width ||
                /px$/.test(c) && parseInt(c, 10) || 600;
            h = g.exporting.sourceHeight || g.chart.height || /px$/.test(h) && parseInt(h, 10) || 400;
            p(g.chart, {animation: !1, renderTo: b, forExport: !0, width: c, height: h});
            g.exporting.enabled = !1;
            g.series = [];
            r(a.series, function (a) {
                z = k(a.options, {animation: !1, enableMouseTracking: !1, showCheckbox: !1, visible: a.visible});
                z.isInternal || g.series.push(z)
            });
            d = new f.Chart(g, a.callback);
            r(["xAxis", "yAxis"], function (b) {
                r(a[b], function (a, c) {
                    var g = d[b][c], f = a.getExtremes(), h = f.userMin, f = f.userMax;
                    g && (h !== void 0 || f !== void 0) && g.setExtremes(h, f, !0, !1)
                })
            });
            c = d.container.innerHTML;
            g = null;
            d.destroy();
            o(b);
            c = c.replace(/zIndex="[^"]+"/g, "").replace(/isShadow="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g, " xlink:href=").replace(/\n/, " ").replace(/<\/svg>.*?$/, "</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g,
                " ").replace(/&shy;/g, "­").replace(/<IMG /g, "<image ").replace(/height=([^" ]+)/g, 'height="$1"').replace(/width=([^" ]+)/g, 'width="$1"').replace(/hc-svg-href="([^"]+)">/g, 'xlink:href="$1"/>').replace(/id=([^" >]+)/g, 'id="$1"').replace(/class=([^" >]+)/g, 'class="$1"').replace(/ transform /g, " ").replace(/:(path|rect)/g, "$1").replace(/style="([^"]+)"/g, function (a) {
                    return a.toLowerCase()
                });
            return c = c.replace(/(url\(#highcharts-[0-9]+)&quot;/g, "$1").replace(/&quot;/g, "'")
        }, exportChart: function (b, a) {
            var b =
                b || {}, d = this.options.exporting, d = this.getSVG(k({chart: {borderRadius: 0}}, d.chartOptions, a, {
                exporting: {
                    sourceWidth: b.sourceWidth || d.sourceWidth,
                    sourceHeight: b.sourceHeight || d.sourceHeight
                }
            })), b = k(this.options.exporting, b);
            f.post(b.url, {
                filename: b.filename || "chart",
                type: b.type,
                width: b.width || 0,
                scale: b.scale || 2,
                svg: d
            }, b.formAttributes)
        }, print: function () {
            var b = this, a = b.container, d = [], c = a.parentNode, f = j.body, h = f.childNodes;
            if (!b.isPrinting)b.isPrinting = !0, r(h, function (a, b) {
                if (a.nodeType === 1)d[b] = a.style.display,
                    a.style.display = "none"
            }), f.appendChild(a), C.focus(), C.print(), setTimeout(function () {
                c.appendChild(a);
                r(h, function (a, b) {
                    if (a.nodeType === 1)a.style.display = d[b]
                });
                b.isPrinting = !1
            }, 1E3)
        }, contextMenu: function (b, a, d, c, f, h, g) {
            var e = this, k = e.options.navigation, q = k.menuItemStyle, m = e.chartWidth, n = e.chartHeight, j = "cache-" + b, i = e[j], u = D(f, h), w, x, o, s = function (a) {
                e.pointer.inClass(a.target, b) || x()
            };
            if (!i)e[j] = i = l("div", {className: b}, {
                position: "absolute",
                zIndex: 1E3,
                padding: u + "px"
            }, e.container), w = l("div", null, p({
                MozBoxShadow: "3px 3px 10px #888",
                WebkitBoxShadow: "3px 3px 10px #888", boxShadow: "3px 3px 10px #888"
            }, k.menuStyle), i), x = function () {
                v(i, {display: "none"});
                g && g.setState(0);
                e.openMenu = !1
            }, t(i, "mouseleave", function () {
                o = setTimeout(x, 500)
            }), t(i, "mouseenter", function () {
                clearTimeout(o)
            }), t(document, "mouseup", s), t(e, "destroy", function () {
                B(document, "mouseup", s)
            }), r(a, function (a) {
                if (a) {
                    var b = a.separator ? l("hr", null, null, w) : l("div", {
                        onmouseover: function () {
                            v(this, k.menuItemHoverStyle)
                        }, onmouseout: function () {
                            v(this, q)
                        }, onclick: function () {
                            x();
                            a.onclick.apply(e,
                                arguments)
                        }, innerHTML: a.text || e.options.lang[a.textKey]
                    }, p({cursor: "pointer"}, q), w);
                    e.exportDivElements.push(b)
                }
            }), e.exportDivElements.push(w, i), e.exportMenuWidth = i.offsetWidth, e.exportMenuHeight = i.offsetHeight;
            a = {display: "block"};
            d + e.exportMenuWidth > m ? a.right = m - d - f - u + "px" : a.left = d - u + "px";
            c + h + e.exportMenuHeight > n && g.alignOptions.verticalAlign !== "top" ? a.bottom = n - c - u + "px" : a.top = c + h - u + "px";
            v(i, a);
            e.openMenu = !0
        }, addButton: function (b) {
            var a = this, d = a.renderer, c = k(a.options.navigation.buttonOptions, b), j =
                c.onclick, h = c.menuItems, g, e, l = {
                stroke: c.symbolStroke,
                fill: c.symbolFill
            }, q = c.symbolSize || 12;
            if (!a.btnCount)a.btnCount = 0;
            if (!a.exportDivElements)a.exportDivElements = [], a.exportSVGElements = [];
            if (c.enabled !== !1) {
                var m = c.theme, n = m.states, o = n && n.hover, n = n && n.select, i;
                delete m.states;
                j ? i = function () {
                    j.apply(a, arguments)
                } : h && (i = function () {
                    a.contextMenu(e.menuClassName, h, e.translateX, e.translateY, e.width, e.height, e);
                    e.setState(2)
                });
                c.text && c.symbol ? m.paddingLeft = f.pick(m.paddingLeft, 25) : c.text || p(m, {
                    width: c.width,
                    height: c.height, padding: 0
                });
                e = d.button(c.text, 0, 0, i, m, o, n).attr({
                    title: a.options.lang[c._titleKey],
                    "stroke-linecap": "round"
                });
                e.menuClassName = b.menuClassName || "highcharts-menu-" + a.btnCount++;
                c.symbol && (g = d.symbol(c.symbol, c.symbolX - q / 2, c.symbolY - q / 2, q, q).attr(p(l, {
                    "stroke-width": c.symbolStrokeWidth || 1,
                    zIndex: 1
                })).add(e));
                e.add().align(p(c, {width: e.width, x: f.pick(c.x, y)}), !0, "spacingBox");
                y += (e.width + c.buttonSpacing) * (c.align === "right" ? -1 : 1);
                a.exportSVGElements.push(e, g)
            }
        }, destroyExport: function (b) {
            var b =
                b.target, a, d;
            for (a = 0; a < b.exportSVGElements.length; a++)if (d = b.exportSVGElements[a])d.onclick = d.ontouchstart = null, b.exportSVGElements[a] = d.destroy();
            for (a = 0; a < b.exportDivElements.length; a++)d = b.exportDivElements[a], B(d, "mouseleave"), b.exportDivElements[a] = d.onmouseout = d.onmouseover = d.ontouchstart = d.onclick = null, o(d)
        }
    });
    F.menu = function (b, a, d, c) {
        return ["M", b, a + 2.5, "L", b + d, a + 2.5, "M", b, a + c / 2 + 0.5, "L", b + d, a + c / 2 + 0.5, "M", b, a + c - 1.5, "L", b + d, a + c - 1.5]
    };
    A.prototype.callbacks.push(function (b) {
        var a, d = b.options.exporting,
            c = d.buttons;
        y = 0;
        if (d.enabled !== !1) {
            for (a in c)b.addButton(c[a]);
            t(b, "destroy", b.destroyExport)
        }
    })
})(Highcharts);
/*
 Data plugin for Highcharts

 (c) 2012-2014 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (g) {
    var j = g.each, q = HighchartsAdapter.inArray, s = g.splat, l, n = function (a, b) {
        this.init(a, b)
    };
    g.extend(n.prototype, {
        init: function (a, b) {
            this.options = a;
            this.chartOptions = b;
            this.columns = a.columns || this.rowsToColumns(a.rows) || [];
            this.rawColumns = [];
            this.columns.length ? this.dataFound() : (this.parseCSV(), this.parseTable(), this.parseGoogleSpreadsheet())
        }, getColumnDistribution: function () {
            var a = this.chartOptions, b = this.options, c = [], f = function (a) {
                    return (g.seriesTypes[a || "line"].prototype.pointArrayMap || [0]).length
                },
                e = a && a.chart && a.chart.type, d = [], i = [], p, h;
            j(a && a.series || [], function (a) {
                d.push(f(a.type || e))
            });
            j(b && b.seriesMapping || [], function (a) {
                c.push(a.x || 0)
            });
            c.length === 0 && c.push(0);
            j(b && b.seriesMapping || [], function (b) {
                var c = new l, m, j = d[p] || f(e), o = g.seriesTypes[((a && a.series || [])[p] || {}).type || e || "line"].prototype.pointArrayMap || ["y"];
                c.addColumnReader(b.x, "x");
                for (m in b)b.hasOwnProperty(m) && m !== "x" && c.addColumnReader(b[m], m);
                for (h = 0; h < j; h++)c.hasReader(o[h]) || c.addColumnReader(void 0, o[h]);
                i.push(c);
                p++
            });
            b = g.seriesTypes[e || "line"].prototype.pointArrayMap;
            b === void 0 && (b = ["y"]);
            this.valueCount = {global: f(e), xColumns: c, individual: d, seriesBuilders: i, globalPointArrayMap: b}
        }, dataFound: function () {
            if (this.options.switchRowsAndColumns)this.columns = this.rowsToColumns(this.columns);
            this.getColumnDistribution();
            this.parseTypes();
            this.findHeaderRow();
            this.parsed() !== !1 && this.complete()
        }, parseCSV: function () {
            var a = this, b = this.options, c = b.csv, f = this.columns, e = b.startRow || 0, d = b.endRow || Number.MAX_VALUE, i = b.startColumn ||
                0, p = b.endColumn || Number.MAX_VALUE, h, g, r = 0;
            c && (g = c.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(b.lineDelimiter || "\n"), h = b.itemDelimiter || (c.indexOf("\t") !== -1 ? "\t" : ","), j(g, function (b, c) {
                var g = a.trim(b), t = g.indexOf("#") === 0;
                c >= e && c <= d && !t && g !== "" && (g = b.split(h), j(g, function (a, b) {
                    b >= i && b <= p && (f[b - i] || (f[b - i] = []), f[b - i][r] = a)
                }), r += 1)
            }), this.dataFound())
        }, parseTable: function () {
            var a = this.options, b = a.table, c = this.columns, f = a.startRow || 0, e = a.endRow || Number.MAX_VALUE, d = a.startColumn || 0, i = a.endColumn ||
                Number.MAX_VALUE;
            b && (typeof b === "string" && (b = document.getElementById(b)), j(b.getElementsByTagName("tr"), function (a, b) {
                b >= f && b <= e && j(a.children, function (a, e) {
                    if ((a.tagName === "TD" || a.tagName === "TH") && e >= d && e <= i)c[e - d] || (c[e - d] = []), c[e - d][b - f] = a.innerHTML
                })
            }), this.dataFound())
        }, parseGoogleSpreadsheet: function () {
            var a = this, b = this.options, c = b.googleSpreadsheetKey, f = this.columns, e = b.startRow || 0, d = b.endRow || Number.MAX_VALUE, i = b.startColumn || 0, g = b.endColumn || Number.MAX_VALUE, h, j;
            c && jQuery.ajax({
                dataType: "json",
                url: "https://spreadsheets.google.com/feeds/cells/" + c + "/" + (b.googleSpreadsheetWorksheet || "od6") + "/public/values?alt=json-in-script&callback=?",
                error: b.error,
                success: function (b) {
                    var b = b.feed.entry, c, l = b.length, o = 0, n = 0, k;
                    for (k = 0; k < l; k++)c = b[k], o = Math.max(o, c.gs$cell.col), n = Math.max(n, c.gs$cell.row);
                    for (k = 0; k < o; k++)if (k >= i && k <= g)f[k - i] = [], f[k - i].length = Math.min(n, d - e);
                    for (k = 0; k < l; k++)if (c = b[k], h = c.gs$cell.row - 1, j = c.gs$cell.col - 1, j >= i && j <= g && h >= e && h <= d)f[j - i][h - e] = c.content.$t;
                    a.dataFound()
                }
            })
        }, findHeaderRow: function () {
            var a =
                0;
            j(this.columns, function (b) {
                b.isNumeric && typeof b[0] !== "string" && (a = null)
            });
            this.headerRow = a
        }, trim: function (a) {
            return typeof a === "string" ? a.replace(/^\s+|\s+$/g, "") : a
        }, parseTypes: function () {
            for (var a = this.columns, b = this.rawColumns, c = a.length, f, e, d, i, g, h, j = [], l, m = this.chartOptions; c--;) {
                f = a[c].length;
                b[c] = [];
                for (l = (g = q(c, this.valueCount.xColumns) !== -1) && m && m.xAxis && s(m.xAxis)[0].type === "category"; f--;)if (e = j[f] || a[c][f], d = parseFloat(e), i = b[c][f] = this.trim(e), l)a[c][f] = i; else if (i == d)a[c][f] = d, d > 31536E6 ?
                    a[c].isDatetime = !0 : a[c].isNumeric = !0; else if (d = this.parseDate(e), g && typeof d === "number" && !isNaN(d)) {
                    if (j[f] = e, a[c][f] = d, a[c].isDatetime = !0, a[c][f + 1] !== void 0) {
                        e = d > a[c][f + 1];
                        if (e !== h && h !== void 0)this.alternativeFormat ? (this.dateFormat = this.alternativeFormat, f = a[c].length, this.alternativeFormat = this.dateFormats[this.dateFormat].alternative) : a[c].unsorted = !0;
                        h = e
                    }
                } else if (a[c][f] = i === "" ? null : i, f !== 0 && (a[c].isDatetime || a[c].isNumeric))a[c].mixed = !0;
                g && a[c].mixed && (a[c] = b[c])
            }
            if (a[0].isDatetime && h) {
                b = typeof a[0][0] !==
                    "number";
                for (c = 0; c < a.length; c++)a[c].reverse(), b && a[c].unshift(a[c].pop())
            }
        }, dateFormats: {
            "YYYY-mm-dd": {
                regex: /^([0-9]{4})[\-\/\.]([0-9]{2})[\-\/\.]([0-9]{2})$/, parser: function (a) {
                    return Date.UTC(+a[1], a[2] - 1, +a[3])
                }
            }, "dd/mm/YYYY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/, parser: function (a) {
                    return Date.UTC(+a[3], a[2] - 1, +a[1])
                }, alternative: "mm/dd/YYYY"
            }, "mm/dd/YYYY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/, parser: function (a) {
                    return Date.UTC(+a[3], a[1] - 1, +a[2])
                }
            },
            "dd/mm/YY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/, parser: function (a) {
                    return Date.UTC(+a[3] + 2E3, a[2] - 1, +a[1])
                }, alternative: "mm/dd/YY"
            }, "mm/dd/YY": {
                regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/, parser: function (a) {
                    console.log(a);
                    return Date.UTC(+a[3] + 2E3, a[1] - 1, +a[2])
                }
            }
        }, parseDate: function (a) {
            var b = this.options.parseDate, c, f, e = this.options.dateFormat || this.dateFormat, d;
            b && (c = b(a));
            if (typeof a === "string") {
                if (e)b = this.dateFormats[e], (d = a.match(b.regex)) && (c = b.parser(d));
                else for (f in this.dateFormats)if (b = this.dateFormats[f], d = a.match(b.regex)) {
                    this.dateFormat = f;
                    this.alternativeFormat = b.alternative;
                    c = b.parser(d);
                    break
                }
                d || (d = Date.parse(a), typeof d === "object" && d !== null && d.getTime ? c = d.getTime() - d.getTimezoneOffset() * 6E4 : typeof d === "number" && !isNaN(d) && (c = d - (new Date(d)).getTimezoneOffset() * 6E4))
            }
            return c
        }, rowsToColumns: function (a) {
            var b, c, f, e, d;
            if (a) {
                d = [];
                c = a.length;
                for (b = 0; b < c; b++) {
                    e = a[b].length;
                    for (f = 0; f < e; f++)d[f] || (d[f] = []), d[f][b] = a[b][f]
                }
            }
            return d
        }, parsed: function () {
            if (this.options.parsed)return this.options.parsed.call(this,
                this.columns)
        }, getFreeIndexes: function (a, b) {
            var c, f, e = [], d = [], i;
            for (f = 0; f < a; f += 1)e.push(!0);
            for (c = 0; c < b.length; c += 1) {
                i = b[c].getReferencedColumnIndexes();
                for (f = 0; f < i.length; f += 1)e[i[f]] = !1
            }
            for (f = 0; f < e.length; f += 1)e[f] && d.push(f);
            return d
        }, complete: function () {
            var a = this.columns, b, c = this.options, f, e, d, i, g = [], h;
            if (c.complete || c.afterComplete) {
                for (d = 0; d < a.length; d++)if (this.headerRow === 0)a[d].name = a[d].shift();
                f = [];
                e = this.getFreeIndexes(a.length, this.valueCount.seriesBuilders);
                for (d = 0; d < this.valueCount.seriesBuilders.length; d++)h =
                    this.valueCount.seriesBuilders[d], h.populateColumns(e) && g.push(h);
                for (; e.length > 0;) {
                    h = new l;
                    h.addColumnReader(0, "x");
                    d = q(0, e);
                    d !== -1 && e.splice(d, 1);
                    for (d = 0; d < this.valueCount.global; d++)h.addColumnReader(void 0, this.valueCount.globalPointArrayMap[d]);
                    h.populateColumns(e) && g.push(h)
                }
                g.length > 0 && g[0].readers.length > 0 && (h = a[g[0].readers[0].columnIndex], h !== void 0 && (h.isDatetime ? b = "datetime" : h.isNumeric || (b = "category")));
                if (b === "category")for (d = 0; d < g.length; d++) {
                    h = g[d];
                    for (e = 0; e < h.readers.length; e++)if (h.readers[e].configName ===
                        "x")h.readers[e].configName = "name"
                }
                for (d = 0; d < g.length; d++) {
                    h = g[d];
                    e = [];
                    for (i = 0; i < a[0].length; i++)e[i] = h.read(a, i);
                    f[d] = {data: e};
                    if (h.name)f[d].name = h.name
                }
                a = {xAxis: {type: b}, series: f};
                c.complete && c.complete(a);
                c.afterComplete && c.afterComplete(a)
            }
        }
    });
    g.Data = n;
    g.data = function (a, b) {
        return new n(a, b)
    };
    g.wrap(g.Chart.prototype, "init", function (a, b, c) {
        var f = this;
        b && b.data ? g.data(g.extend(b.data, {
            afterComplete: function (e) {
                var d, i;
                if (b.hasOwnProperty("series"))if (typeof b.series === "object")for (d = Math.max(b.series.length,
                    e.series.length); d--;)i = b.series[d] || {}, b.series[d] = g.merge(i, e.series[d]); else delete b.series;
                b = g.merge(e, b);
                a.call(f, b, c)
            }
        }), b) : a.call(f, b, c)
    });
    l = function () {
        this.readers = [];
        this.pointIsArray = !0
    };
    l.prototype.populateColumns = function (a) {
        var b = !0;
        j(this.readers, function (b) {
            if (b.columnIndex === void 0)b.columnIndex = a.shift()
        });
        j(this.readers, function (a) {
            a.columnIndex === void 0 && (b = !1)
        });
        return b
    };
    l.prototype.read = function (a, b) {
        var c = this.pointIsArray, f = c ? [] : {}, e;
        j(this.readers, function (d) {
            var e = a[d.columnIndex][b];
            c ? f.push(e) : f[d.configName] = e
        });
        if (this.name === void 0 && this.readers.length >= 2 && (e = this.getReferencedColumnIndexes(), e.length >= 2))e.shift(), e.sort(), this.name = a[e.shift()].name;
        return f
    };
    l.prototype.addColumnReader = function (a, b) {
        this.readers.push({columnIndex: a, configName: b});
        if (!(b === "x" || b === "y" || b === void 0))this.pointIsArray = !1
    };
    l.prototype.getReferencedColumnIndexes = function () {
        var a, b = [], c;
        for (a = 0; a < this.readers.length; a += 1)c = this.readers[a], c.columnIndex !== void 0 && b.push(c.columnIndex);
        return b
    };
    l.prototype.hasReader = function (a) {
        var b, c;
        for (b = 0; b < this.readers.length; b += 1)if (c = this.readers[b], c.configName === a)return !0
    }
})(Highcharts);
