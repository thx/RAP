var ecui = {};

(function () {
    var a = "call", c = "style", d = false, f = "getParent", g = "getOuter", h = null, m = true, p = "$setSize", q = "getWidth", r = "", t = "px", u = "getHeight", v = "width", w = "getBody", B = "hide", C = "_aCol", D = "setSize", F = "length", G = "getItems", K = "value", L = "push", Q = "display", R = "_eInput", S = "lastChild", T = "height", X = "getBase", Y = "left", Z = "isShow", $ = "type", cb = "position", db = "className", eb = "$flushRows", hb = "name", ib = "paint", jb = "show", kb = "setParent", lb = "target", mb = "setPosition", nb = "$click", qb = "$dispose", rb = "offsetWidth", sb = "base", tb = "setValue", ub = "firstChild", vb = "getBodyWidth", xb = "absolute", yb = "parentNode", zb = "appendChild", Ab = "alterClass", Db = "Control", Eb = "mousedown", Jb = "getBodyHeight", Kb = "getValue", Lb = "setSelected", Mb = "_sClass", Rb = "$pressend", Sb = "_aRow", Tb = "focus", Ub = "$alterItems", Vb = "offsetHeight", Wb = "_eItems", Xb = "_eBase", Yb = "_nValue", Zb = "splice", bc = "getWidthRevise", cc = "_uBlock", dc = "change", fc = "getBaseClass", gc = "getHeightRevise", hc = "body", ic = "$mousedown", jc = "innerHTML", kc = "mouseup", lc = "none", mc = "_aTree", nc = "_nTotal", vc = "_eOuter", wc = "checked", xc = "getClass", yc = "tagName", zc = "_oInner", Ac = "paddingLeft", Bc = "paddingTop", Ic = "getElementsByTagName", Jc = "prototype", Kc = "preventDefault", Lc = "_sValue", Mc = "$mouseover", Nc = "cssText", Oc = "_uOptions", Pc = "_eCol", Qc = "borderLeftWidth", Rc = "_sName", Sc = "setClass", Tc = "zIndex", Uc = "$append", Vc = "getAttribute", dd = "getTarget", ed = "_uHead", fd = "getControl", gd = "_nStep", hd = "$blur", jd = "_cScroll", kd = "$pressstart", ld = "-", md = "$setBody", nd = "_cParent", od = "substring", pd = "ec-", qd = "_nHeight", rd = "_nWidth", sd = "paddingRight", Dd = '">', Ed = "blur", Fd = "borderRightWidth", Gd = "$setBodyHTML", Hd = "_cSelect", Id = "contain", Jd = "getUID", Kd = "_cEditedRow", Ld = "getType", Md = "disabled", Nd = "$mouseout", Od = "_nStatus", Pd = "_cSuperior", Qd = "setAttribute", Rd = "selected", ie = "clearCache", je = "$focus", ke = "wheelDelta", le = "getStep", me = /px$/, ne = "click", oe = "select", pe = "zoom", qe = "browser", re = "mouseout", se = "_eBody", te = "$flushCols", ue = "$scroll", ve = "mousemove", we = "$setParent", xe = "VScroll", ye = "mouseover", ze = "getMovie", Ae = "$remove", Be = "split", Ce = "$resize", De = "paddingBottom", Ee = "_cHScroll", Fe = "right", Ge = "_aInferior", He = "setEnabled", Ie = "_uPrev", Je = "onmousedown", Ke = "bottom", Le = "onpropertychange", Me = "textOverflow", Ne = "$getSection", Oe = "$flush", af = "$alterClass", bf = "pressstart", cf = "isEnabled", df = "$create", ef = "borderTopWidth", ff = "_cEditor", gf = "_nLeftLock", hf = "_uLockedMain", jf = "_nYear", kf = "_nTableWidth", lf = "hidden", mf = "$setStyles", nf = "-item", of = "_cCheck", pf = "_cOver", qf = "$pressover", rf = "_nLastIndex", sf = "drag", tf = "$pressout", uf = "on", vf = "_cPopup", wf = "_nMonth", xf = "$initRow", yf = "_cVScroll", zf = "$createChild", Af = "setItemSize", Bf = "mousewheel", Cf = "getInput", Df = "true", Ef = "$initItem", Ff = "setTotal", Gf = "insertBefore", dg = "_bEnabled", eg = "_cInferior", fg = "_oRange", gg = "HScroll", hg = "pressover", ig = "toLowerCase", jg = "action", kg = "$initItems", lg = "inline-block", mg = "scrollTop", ng = "firefox", og = "auto", pg = "onappend", qg = "pressout", rg = "keydown", sg = "_uTitle", tg = "_uLockedHead", ug = "isSelected", vg = "setBodySize", wg = "getInner", xg = 32768, yg = '<input type="hidden" name="', zg = "string", Ag = "keypress", Bg = "_nOptionSize", Cg = "method", Dg = "scrollLeft", Eg = "keyup", Fg = "setChecked", Gg = "_uVScroll", Hg = "pressend", Ig = "_eComplete", Jg = "$allowPrev", Kg = "_fAction", Lg = "$getPageStep", Mg = "setName", Ng = /\s+/, Og = "_bEllipsis", Pg = "replace", Qg = "$forcibly", Rg = "pressmove", th = "_sHeight", uh = "getSuperior", vh = "$calcDragValue", wh = "onselectstart", xh = "lockFlush", yh = "INPUT", zh = "$dragend", Ah = "$dragmove", Bh = "ellipsis", Ch = "resize", Dh = "clearOvered", Eh = "previousSibling", Fh = "readOnly", Gh = "LABEL", Hh = "_sItemsDisplay", Ih = "$keydown", Jh = "_nRightLock", Kh = "$allowNext", Lh = "setRange", Mh = "static", Nh = "borderBottomWidth", Oh = "_uHScroll", Ph = "ondblclick", Qh = "getScrollTop", Rh = "$keypress", Sh = "-row", Th = "getChildItems", Uh = "getMonth", Vh = "isAvailable", Wh = "_aLockedRow", Xh = "getOvered", Yh = "relative", Zh = "number", $h = "setEllipsis", _h = "elements", ai = "_nStartIndex", bi = "constructor", Ai = "calcLeftRevise", Bi = "createTextRange", Ci = "-layout", Di = "getScrollLeft", Ei = "createElement", Fi = "addEventListener", Gi = "releaseCapture", Hi = "select-multiple", Ii = "onalterclassend", Ji = "selectstart", Ki = "(e)===false||o.$", Li = '<div style="position:absolute;left:0px;top:0px" class="', Mi = "-corner", Ni = "calcTopRevise", Oi = "-checked", Pi = "onalterclassbefore";

    baidu.dom._styleFixer[Q] = baidu[qe].ie && baidu[qe].ie < 8 ? {
        set: function (a, b) {

            a = a[c];
            if (b == lg) {

                a[Q] = "inline";
                a[pe] = 1
            } else a[Q] = b
        }
    } : baidu[qe][ng] && baidu[qe][ng] < 3 ? {
        set: function (b, a) {


            b[c][Q] = a == lg ? "-moz-inline-box" : a
        }
    } : void 0;


    var k = ecui, Ug = k.array = {}, ah = k[qe] = {}, U = k.dom = {}, Xd = k.ext = {}, kh = k[zg] = {}, J = k.ui = {}, _c = k.util = {}, Hc = baidu, bh = Hc.array, jh = Hc[qe], Gb = Hc.dom, lh = Hc[zg], _ = ah.ie = jh.ie, dh = ah[ng] = jh[ng], _g = dh ? "textContent" : "innerText", bb = void 0, Ue = window, O = document, Ud = Math, Cb = Ud.min, I = Ud.max, ih = Ud.abs, Fb = Ud.floor, sc = parseInt, qc = Ug.indexOf = bh.indexOf, Bd = Ug.remove = bh.remove, Ad = U.addClass = Gb.addClass, Qb = U.children = Gb.children, yi = U[Id] = function (a, b) {


        return a == b || Gb.contains(a, b)
    }, Te = U.coordinates = function (a) {
        if (M(a, cb) != xb)a[c][cb] = Yh
    }, z = U.create = function (a, e) {


        a = pc(a || "div");
        if (/^<(\w+)/.test(a)) {


            var f = [], b = RegExp.$1[ig](), d = 0, c = O[Ei]("div");


            switch (b) {
                case"td":
                case"th":


                    a = "<tr>" + a + "</tr>";
                    d++;
                case"tr":

                    a = "<tbody>" + a + "</tbody>";
                    d++;
                case"tbody":

                    a = "<table>" + a + "</table>";
                    d++
            }


            c[jc] = a;


            while (d--)c = c[ub];


            while (b = c[ub]) {
                f[L](b);
                e ? e[zb](b) : c.removeChild(b)
            }

            return f[F] > 1 ? f : f[0]
        } else {


            b = O[Ei](a);
            e && e[zb](b);
            return b
        }
    }, _e = U.first = Gb.first, Xe = U.getInvalidHeight = function (a) {


        return A(a, Bc, De, ef, Nh)
    }, Ze = U.getInvalidWidth = function (a) {


        return A(a, Ac, sd, Qc, Fd)
    }, cd = U.getPosition = Gb.getPosition, M = U.getStyle = Gb.getStyle, $f = U.getText = function (a) {


        return a[_g]
    }, ac = U.insertAfter = Gb.insertAfter, rc = U[Gf] = Gb[Gf], Wc = U.insertFloor = function (a) {


        var b = z(), c;


        while (c = a[ub])b[zb](c);


        return a[zb](b)
    }, Ib = U.remove = function (a) {


        var b = a[yb];
        b && b.removeChild(a);
        return a
    }, Lf = U.removeClass = Gb.removeClass, If = U.setInputName = function (a, d) {


        var b = a;
        if (_) {
            if (a[hb] != d) {


                a = z('<input type="' + b[$] + '" name="' + d + Dd);
                a[K] = b[K];
                a[db] = b[db];
                a[Md] = b[Md];
                a[Fh] = b[Fh];
                a[c][Nc] = b[c][Nc];
                ac(a, b);
                Ib(b)
            }
        } else a[hb] = d;


        return a
    }, Ec = U.setStyle = Gb.setStyle, Gc = U.setStyles = Gb.setStyles, Pf = U.setText = function (b, a) {


        b[_g] = a
    }, A = U.sumStyles = function (c) {


        for (var d = 1, a = 0, b; b = arguments[d++];)a += sc(M(c, b)) || 0;


        return a
    }, bg = kh.toCamelCase = lh.toCamelCase, pc = kh.trim = lh.trim, P = _c.copy = Hc.object.extend, oi = _c.createSWF = baidu.swf.create, rh = _c.findPrototype = function (c, b) {


        for (var
                 d = c[b], a = c[bi][Jc]; a; a = a[bi].superClass)if (d != a[b])return a[b]
    }, fe = _c.getView = function () {


        var h = "scrollHeight", i = "scrollWidth", a = O[hc], b = a[yb], c = O.compatMode == "BackCompat" ? a : O.documentElement, e = b[mg] + a[mg], d = b[Dg] + a[Dg], f = c.clientWidth, g = c.clientHeight;


        return {top: e, right: f + d, bottom: g + e, left: d, width: I(b[i], a[i], f), height: I(b[h], a[h], g)}
    }, N = _c.inherits = function (a, b, d, c) {


        Hc.lang.inherits(a, b);
        P(a, c);
        P(a = a[Jc], d);
        return a
    }, di = _c.parse = Hc.json.parse, ui = _c.stringify = Hc.json.stringify, Wd = k.Timer = function (d, e, b) {


        var c = Array[Jc].slice[a](arguments, 3);
        this._nID = setTimeout(function () {
            d.apply(b, c);
            c = b = h
        }, e)
    }, Xf, _f, Sf, W, ce, Sd, zd, Jf, V, Cd, Wf, $b, cg, Pe, Vf, Mf, Qe, Tg, $e, tc, $c, Xc, Bb;


    U.ready = Gb.ready;


    Wd[Jc].stop = function () {
        clearTimeout(this._nID)
    };


    (function () {
        var gb, nb, fb, G, S = [], ab, E, C, ob, N = [], R, zb = 0, U = {}, n, j = overedControl = outCachedControl = focusedControl = h, qb = [], b = {
            mousedown: function (a) {


                a = Bb(a);
                j = a[dd]();


                Xc(j);
                if (j) {

                    j[Eb](a);
                    j[bf](a)
                }
            }, mouseover: function (c) {


                c = Bb(c);

                var e = wb(overedControl = c[dd](), outCachedControl), d = b[$], d = d != sf && d != pe, a;


                for (a = outCachedControl; a != e; a = a[f]()) {
                    a[re](c);

                    j == a && (d && a[qg](c))
                }


                for (a = overedControl; a != e; a = a[f]()) {
                    a[ye](c);

                    j == a && (d && a[hg](c))
                }


                outCachedControl = h
            }, mousemove: function (b) {


                b = Bb(b);


                for (var a = b[dd](); a; a = a[f]()) {
                    a[ve](b);
                    j == a && a[Rg](b)
                }
            }, mouseout: function (a) {


                outCachedControl = $b(Bb(a)[lb])
            }, mouseup: function (a) {


                a = Bb(a);

                var b = a[dd]();
                b && b[kc](a);
                if (j) {


                    j[Hg](a);

                    j[Id](b) && j[ne](a);
                    j = h
                }
            }
        }, Ab = {
            type: "custom", mousedown: function (a) {


                a = Bb(a);

                j = a[dd]();
                j[Eb](a);
                j[bf](a)
            }, mouseup: function (a) {


                $c();
                b[kc](a)
            }
        }, w = {
            type: sf, mousemove: function (c) {


                c = Bb(c);


                var a = b[lb], h = a.getX() + E - b.x, g = a.getY() + C - b.y, f = Cb(I(h, b[Y]), b[Fe]), e = Cb(I(g, b.top), b[Ke]);


                a.ondragmove && a.ondragmove(c, f, e) === d || (a[Ah](c, f, e) === d || a[mb](f, e));


                b.x = E + a.getX() - h;
                b.y = C + a.getY() - g
            }, mouseup: function (a) {


                var c = b[lb];
                c.ondragend && c.ondragend(Bb(a)) === d || c[zh](a);
                $c();

                _ && O[hc][Gi](d);
                b[kc](a)
            }
        }, pb = {
            type: "forcibly", mousedown: function (a) {


                a = Bb(a);

                var e = b, c = e[lb];
                if (c.onforcibly && c.onforcibly(a) === d || c[Qg](a) === d)e != b && b[Eb](a); else $c()
            }
        }, X = {
            type: pe, mousemove: function (f) {


                f = Bb(f);
                var e = b[lb], a = b[v], h = b[v] = E - b.x + a, c = b[T], i = b[T] = C - b.y + c, g = b.minWidth, l = b.maxWidth, j = b.minHeight, k = b.maxHeight;


                b.x = E;
                b.y = C;

                var n = b[Y], m = b.top;


                a = g !== bb ? I(g, h) : h;
                c = j !== bb ? I(j, i) : i;
                a = l !== bb ? Cb(l, a) : a;
                c = k !== bb ? Cb(k, c) : c;


                e[mb](a < 0 ? n + a : n, c < 0 ? m + c : m);
                e.onzoom && e.onzoom(f) === d || (e.$zoom(f) === d || e[D](ih(a), ih(c)))
            }, mouseup: function (c) {


                var a = b[lb];
                a.onzoomend && a.onzoomend(Bb(c)) === d || a.$zoomend(c);
                $c();
                _ && O[hc][Gi](d);


                a == n ? a[B]() : vb();

                b[kc](c)
            }
        };


        Xf = k.$bind = function (a, b) {
            a[fd] = function () {
                return b
            };

            a = h
        };


        _f = k.$connect = function (c, e, b) {
            if (b) {

                var d = R[b];
                d ? e[a](c, d) : (U[b] || (U[b] = []))[L]({func: e, caller: c})
            }
        };


        Sf = k.$fastCreate = function (a, b, c) {
            c.uid = pd + ++zb;
            c[sb] = pc(b[db])[Be](Ng)[0];

            a = new a(b, c);
            a[we]($b(b[yb]));
            N[L](a);

            return a
        };


        W = k.blank = function () {
        };


        ce = k.calcHeightRevise = function (a) {
            return (gb ? A(a, Bc, De) : 0) + (nb ? A(a, ef, Nh) : 0)
        };


        k[Ai] = function (a) {
            return fb && M(a, cb) != Mh ? A(a, Qc) : 0
        };


        k[Ni] = function (a) {
            return fb && M(a, cb) != Mh ? A(a, ef) : 0
        };


        Sd = k.calcWidthRevise = function (a) {
            return (gb ? A(a, Ac, sd) : 0) + (nb ? A(a, Qc, Fd) : 0)
        };


        zd = k.cancel = function () {
            return d
        };


        Jf = k.capture = function () {
            if (!G) {

                G = this;
                return m
            }
        };


        V = k.create = function (b, c) {
            c = c || {};
            var f = c.parent, l = c[sb], e = c.element, i = c.id, k = c[$], j, m = 0;


            k && k != b || (k = c[$] = pd + b[ig]());
            c.uid = pd + ++zb;
            if (e) {
                if (e[fd])return e[fd]()
            } else e = z();


            Ad(e, k);


            l ? Ad(e, l) : (l = pc(e[db]));
            c[sb] = l[Be](Ng)[0];


            b = new J[bg(ld + b)](e, c);
            if (f)b[kb](f); else if (f = $b(b[g]()[yb]))f[pg] && f[pg](b) === d || (f[Uc](b) === d || b[we](f));


            N[L](b);

            j = c.decorate;
            j && j[Pg](/([^(]+)\(([^)]+)\)/g, function (d, a, c) {

                a = Xd[bg(ld + pc(a))];


                c = pc(c)[Be](Ng);
                for (var e = 0; d = c[e++];)(new a(b, d))[ib]()
            });


            b.oncreate && b.oncreate(c) === d || b[df](c);
            if (i)R[i] = b;
            if (j = U[i])for (U[i] = h; i = j[m++];)i.func[a](i.caller, b);


            return b
        };


        Cd = k.custom = function () {
            if (Jf[a](this))eb(Ab)
        };


        Wf = k[sf] = function (a, e, i) {
            if (e[$] == Eb) {

                var f = a[g](), b = f.offsetParent, h = b[yc];


                P(w, h == "BODY" || h == "HTML" ? fe() : {
                    top: 0,
                    right: b[rb] - A(b, Qc, Fd),
                    bottom: b[Vb] - A(b, ef, Nh),
                    left: 0
                });


                P(w, i);
                w[Fe] = I(w[Fe] - a[q](), w[Y]);
                w[Ke] = I(w[Ke] - a[u](), w.top);
                w[lb] = a;
                eb(w);


                f[c][cb] = xb;

                _ && O[hc].setCapture();
                a.ondragstart && a.ondragstart(e) === d || a.$dragstart(e)
            }
        };


        Bb = k.event = function (a) {
            var d = "clientLeft", b = O[hc], c = b[yb];
            if (_) {


                a = Ue.event;
                a.pageX = c[Dg] + b[Dg] + a.clientX - b[d] - c[d];
                a.pageY = c[mg] + b[mg] + a.clientY - b.clientTop - c.clientTop;
                a[lb] = a.srcElement;
                a.which = a.keyCode;
                a.stopPropagation = Jb;
                a[Kc] = K
            }
            if (G) {


                a._cControl = G[fd]();
                G = h
            }

            a[dd] = Fb;

            E = a.pageX;
            C = a.pageY;

            ob = a.which || ob;

            return a
        };


        $b = k.findControl = function (a) {
            for (; a && a.nodeType == 1; a = a[yb])if (a[fd])return a[fd]();


            return h
        };


        cg = k.forcibly = function (a) {
            pb[lb] = a;
            eb(pb);

            H(O, Ji, K);
            H(O, Eb, K)
        };


        k.get = function (d) {
            if (!R) {

                H(Ue, Ch, vb);
                H(Ue, "unload", Gb);
                for (a in b)H(O, a, b[a]);


                R = {};


                var c = O[hc], a = z('<div style="position:relative;width:8px;padding:2px;border:1px solid"><div style="position:relative;left:0px"></div></div>', c);


                ab = z('<div style="position:absolute;top:0px;left:0px;background-color:#000"></div>', c);


                gb = a[rb] & 4;
                nb = a[rb] & 2;
                fb = a[ub].offsetLeft > 2;
                Ib(a);


                k.init(c)
            }

            return R[d] || h
        };


        Pe = k.getFocused = function () {
            return focusedControl
        };


        Vf = k.getKey = function () {
            return ob
        };


        Mf = k.getMouseX = function (a) {
            if (a) {

                a = a[g]();
                return E - cd(a)[Y] + A(a, Qc)
            }

            return E
        };


        Qe = k.getMouseY = function (a) {
            if (a) {

                a = a[g]();
                return C - cd(a).top + A(a, ef)
            }

            return C
        };


        Tg = k.getPressed = function () {
            return j
        };


        k.init = function (a) {

            for (var f = 0, b = a[Ic]("*"), j = []; a = b[f];)j[f++] = a;


            for (f = 0; a = j[f++];)if (a[yb]) {
                if (b = a[Vc]("ecui")) {


                    b = b[Be](";");

                    for (var e = {}, i = b[F]; i--;) {
                        var h = b[i], g = h.indexOf(":"), k = pc(g >= 0 ? h[od](0, g) : h), c = g >= 0 ? pc(h[od](g + 1)) || Df : Df;


                        e[bg(pc(k))] = /^\d+(\.\d+)?$/.test(c) ? +c : c == Df ? m : c == "false" ? d : c
                    }


                    e.element = a;
                    V(e[$], e)
                }
            }
        };


        $e = k.loseFocus = function (a) {
            a[Id](focusedControl) && Xc(a[f]())
        };


        tc = k.mask = function (a, e) {
            var h = fe(), g, e = e || 32767;
            if (Zh != typeof a) {
                if (a !== d) {


                    a || S.pop();
                    a = S[F]
                }
                if (!a) {


                    ab[c][Q] = lc;
                    if (_ == 6) {


                        g = document[Ic](oe);
                        for (var f = 0, b; b = g[f]; f++)if (b[Vc](B) == Df) {

                            Gc(b, {visibility: "visible"});
                            b[Qd](B, "false")
                        }
                    }


                    return
                }

                a = S[a - 1];
                e = a[1];
                a = a[0]
            } else S[L]([a, e]);
            if (_ == 6 && S[F] == 1) {


                g = document[Ic](oe);
                for (var f = 0, b; b = g[f]; f++) {
                    if (M(b, Q) == lc || M(b, "visibility") == lf)continue;


                    b[Qd](B, Df);
                    Gc(b, {visibility: lf})
                }
            }


            Gc(ab, {width: h[v] + t, height: h[T] + t, display: r, opacity: a, zIndex: e})
        };


        k.query = function (a) {
            a = a || {};

            for (var
                     h = 0, c = [], e = a[$], d = a.parent, g = a.custom, b; b = N[h++];)if ((!e || b instanceof e) && ((!d || b[f]() == d) && (!g || g(b))))c[L](b);


            return c
        };


        $c = k.restore = function () {
            Z(b, m);
            Z(b = qb.pop());

            hb(O, Ji, K);
            hb(O, Eb, K)
        };


        k[oe] = function (e, c, g) {
            if (c[$] == Eb) {
                if (!n) {


                    n = V(Db, {element: z('<div style="overflow:hidden"><div class="ec-selector-box"></div></div>', O[hc])});


                    n[p] = Hb;
                    for (var b = 3, f = ["start", r, "end"]; b--;) {
                        var d = f[b], a = oe + d;

                        n["$zoom" + d] = new Function("e", "var o=this.target;o.on" + a + "&&o.on" + a + Ki + a + "(e)")
                    }
                }


                n[mb](E, C);
                n[D](1, 1);
                n[Sc](g || "ec-selector"), n[jb]();

                n[lb] = e;

                k[pe](n, c)
            }
        };


        Xc = k.setFocused = function (a) {
            var c = wb(focusedControl, a), b;


            for (b = focusedControl; b != c; b = b[f]())b[Ed]();


            for (focusedControl = a; a != c; a = a[f]())a[Tb]()
        };


        k[pe] = function (a, b, e) {
            if (b[$] == Eb) {


                a[g]()[c][cb] = xb;


                e && P(X, e);
                P(X, {left: a.getX(), top: a.getY(), width: a[q](), height: a[u]()});


                X[lb] = a;
                eb(X);

                _ && O[hc].setCapture();
                a.onzoomstart && a.onzoomstart(b) === d || a.$zoomstart(b)
            }
        };


        function H(a, c, b) {
            a.attachEvent ? a.attachEvent(uf + c, b) : a[Fi](c, b, d)
        }


        function K(a) {
            a[Kc]()
        }


        function hb(a, c, b) {
            a.detachEvent ? a.detachEvent(uf + c, b) : a.removeEventListener(c, b, d)
        }


        function wb(a, b) {
            if (a != b) {

                var c = [], e = [], d = 0;


                while (a) {
                    c[L](a);
                    a = a[f]()
                }

                while (b) {
                    e[L](b);
                    b = b[f]()
                }


                c.reverse();
                e.reverse();


                for (; c[d] == e[d]; d++);
                a = c[d - 1]
            }


            return a || h
        }


        function Fb() {
            return this._cControl
        }


        function tb(a, b) {
            for (; a; a = a[nd])if (a[Bf](b) === d)return d
        }


        function vb() {

            var c = 0, a = b[$];


            tc(d);
            if (a != pe) {


                a == sf && b[kc]();


                for (; a = N[c++];)a[f]() || a[Ch]()
            }


            _ ? new Wd(tc, 0, h, m) : tc(m)
        }


        function Gb() {


            G = ab = O = h;

            for (var b = 0, a; a = N[b++];)try {
                a.dispose()
            } catch (a) {
            }
        }


        function K() {
            this.returnValue = d
        }


        function eb(c) {
            var a = {};
            Z(b, m);

            P(a, b);
            P(a, c);
            a.x = E;
            a.y = C;
            Z(a);

            qb[L](b);
            b = a
        }


        function Z(b, c) {
            for (var
                     f = 0, e = [Eb, ye, ve, re, kc], d = c ? hb : H, a; a = e[f++];)b[a] && d(O, a, b[a])
        }


        function Hb(f, d) {
            var b = this[g]()[ub], e = b[c];


            J[Db][Jc][p][a](this, f, d);
            e[v] = I(1, f - Sd(b)) + t;
            e[T] = I(1, d - ce(b)) + t
        }


        function Jb() {
            this.cancelBubble = m
        }


        k.dom.ready(k.get);

        (function () {


            for (var e = 0, c = [rg, Ag, Eg], a; a = c[e++];)b[a] = new Function("e", "e=ecui.event(e);for(var o=ecui.getFocused();o;o=o.getParent())if(o." + a + " && o." + a + "(e) === false)return false");
            if (_)b.dblclick = function () {


                var a = G;
                if (a) {


                    G = h;

                    a[Je]()
                }


                b[Eb]();
                b[kc]()
            };


            b[dh ? "DOMMouseScroll" : Bf] = function (a) {
                a = Bb(a);
                a[ke] || (a[ke] = a.detail * -40);
                if (b[$] == sf || (tb(overedControl, a) === d || tb(focusedControl, a) === d))a[Kc]()
            }
        })()
    })();


    var E = J[Db] = function (e, f) {

        var a = this, j = [Eb, ye, ve, re, kc, ne], g = 6, b = e[c], i = f.capture !== d ? Jf : h;


        a._sUID = f.uid;
        a._sBaseClass = a[Mb] = f[sb];
        a._sType = f[$];

        me.test(b[v]) || (a._sWidth = b[v]);
        me.test(b[T]) || (a[th] = b[T]);

        a[Xb] = a[se] = e;
        a[dg] = m;


        while (g--) {
            b = uf + j[g];
            a[b] = e[b];
            e[b] = i
        }

        a[nd] = e.onclick = h;
        if (_)e[Ph] = e[b];


        Xf(e, a)
    }, b = E[Jc];


    b[af] = function (b, c) {
        var a = this;
        a[Pi] && a[Pi](b, c);

        (c ? Lf : Ad)(a[Xb], a[Mb] + ld + b + " " + a._sType + ld + b);


        a[Ii] && a[Ii](b, c)
    };


    b[hd] = function () {
        this[Ab](Tb, m)
    };


    b[df] = function () {
        this[ib]()
    };


    b[qb] = function () {
        this[Xb] = this[se] = h
    };


    b[je] = function () {
        this[Ab](Tb)
    };


    b[Ne] = function (a) {
        return this["_u" + a]
    };


    b[Nd] = function () {
        this[Ab]("over", m)
    };


    b[Mc] = function () {
        this[Ab]("over")
    };


    b[Rb] = b[tf] = function () {
        this[Ab]("press", m)
    };


    b[qf] = b[kd] = function () {
        this[Ab]("press")
    };


    b[Ce] = function () {
        var b = this, l = b[g](), a = b[Xb], h = b._sWidth, i = b[th], f = a[c];
        if (h !== bb) {


            b[ie]();
            if (h !== bb)f[v] = h;
            if (i !== bb)f[T] = i;


            var j = b[q](), k = b[u]();
            if (a != l) {


                var n = a.nextSibling, m = a[yb];
                if (_) {


                    e = me.test(M(a, v));
                    d = me.test(M(a, T))
                } else {


                    var e = a[rb], d = a[Vb], f = m[c];


                    f[v] = e + 100 + t;
                    f[T] = d + 100 + t;

                    e = e == a[rb];
                    d = d == a[Vb]
                }


                l[yb][zb](a);
                if (h !== bb && !e)j = b[rd] = a[rb];
                if (i !== bb && !d)k = b[qd] = a[Vb];


                m[Gf](a, n)
            }


            b[p](j, k)
        }
    };


    b[md] = function (a) {
        this[se] = a
    };


    b[Gd] = function (a) {
        this[se][jc] = a
    };


    b[we] = function (a) {
        this[nd] = a
    };


    b[p] = function (d, a) {
        var f = this, b = f[Xb], e = b[c];
        if (d) {


            e[v] = d - Sd(b) + t;
            f[rd] = d
        }
        if (a) {


            e[T] = a - ce(b) + t;
            f[qd] = a
        }
    };


    b[Ab] = function (b, a) {
        this[af](b, a);
        this[ie]()
    };


    b[ie] = function () {
        this[rd] = this[qd] = bb
    };


    b[Id] = function (a) {
        for (; a; a = a[nd])if (a == this)return m
    };


    b.dispose = function () {
        try {
            this.ondispose && this.ondispose()
        } catch (a) {
        }


        this[qb]()
    };


    b[X] = function () {
        return this[Xb]
    };


    b[fc] = function () {
        return this._sBaseClass
    };


    b[w] = function () {
        return this[se]
    };


    b[Jb] = function () {
        return this[u]() - this[gc]()
    };


    b[vb] = function () {
        return this[q]() - this[bc]()
    };


    b[xc] = function () {
        return this[Mb]
    };


    b[u] = function () {
        var b = this, a = b[Xb];
        return b[qd] = b[qd] || (a[Vb] || A(a, T) + ce(a))
    };


    b[gc] = function () {
        return Xe(this[Xb])
    };


    b[g] = function () {
        return this[Xb]
    };


    b[f] = function () {
        return this[nd]
    };


    b[Ld] = function () {
        return this._sType
    };


    b[Jd] = function () {
        return this._sUID
    };


    b[q] = function () {
        var b = this, a = b[Xb];
        return b[rd] = b[rd] || (a[rb] || A(a, v) + Sd(a))
    };


    b[bc] = function () {
        return Ze(this[Xb])
    };


    b.getX = function () {
        var a = this[g](), b = M(a, Y);

        return this[Z]() ? me.test(b) ? sc(b) : a.offsetLeft - k[Ai](a) : 0
    };


    b.getY = function () {
        var a = this[g](), b = M(a, "top");

        return this[Z]() ? me.test(b) ? sc(b) : a.offsetTop - k[Ni](a) : 0
    };


    b[B] = function () {
        var a = this, e = a[g](), d = e[c], b = a[Z]();
        if (b) {


            a._sDisplay = d[Q];
            d[Q] = lc;
            a.onhide && a.onhide();

            $e(a)
        }

        return b
    };


    b[cf] = function () {
        var a = this[nd];

        return this[dg] && (!a || a[cf]())
    };


    b[Z] = function () {
        var a = this[g]();
        return M(a, Q) != lc && !(!a[rb])
    };


    b[ib] = function () {
        this[p](this[q](), this[u]())
    };


    b[vg] = function (b, a) {
        this[D](b && b + this[bc](), a && a + this[gc]())
    };


    b[Sc] = function (a) {
        var d = this, e = d[Xb], b = [], g = 0, c = d._sType, f = d[Mb];


        a = a || c;
        if (a != f) {


            e[db][Pg](new RegExp("(^|\\s)" + f + "(-[^\\s]+)", "g"), function (f, e, d) {
                b[L](c + d);
                c != a && b[L](a + d)
            });


            b[L](c);
            c != a && b[L](a);

            e[db] = b.join(" ");
            d[Mb] = a
        }
    }, (b[He] = function (a) {


        var b = this;
        a = a !== d;
        if (b[dg] != a) {


            b[Ab](Md, a);

            a || $e(b);
            b[dg] = a
        }
    });


    b[kb] = function (a) {
        var b = this, c = b[nd], f = b[g](), e;
        if (a)if (a instanceof E)e = a[se]; else {


            e = a;
            a = $b(a)
        }
        if (a != c) {
            if (c) {


                c.onremove && c.onremove(b);
                c[Ae](b)
            }
            if (a) {
                if (a[pg] && a[pg](b) === d || a[Uc](b) === d)a = e = h
            }
        }


        e ? e[zb](f) : Ib(f);
        b[nd] = a;
        b[ie]()
    };


    b[mb] = function (d, b) {
        var a = this[g]()[c];
        a[Y] = d + t;
        a.top = b + t
    };


    b[D] = function (b, a) {
        var c = this;
        if (b && b != c[q]() || a && a != c[u]())c[p](b, a);
        if (b)c._sWidth = bb;
        if (a)c[th] = bb
    };


    b[jb] = function () {
        var a = this, b = !a[Z]();
        if (b) {

            a[g]()[c][Q] = a._sDisplay || r;
            a.onshow && a.onshow()
        }

        return b
    };


    (function () {


        for (var d = 0, c = [Tb, Ed, ne, rg, Ag, Eg, Bf, Eb, ye, ve, re, kc, bf, hg, Rg, qg, Hg, dc, Ch], a; a = c[d++];) {


            b[a] = new Function("e", "var o=this;if(" + (d < c[F] - 2 ? "o.isEnabled()&&" : r) + "(o.on" + a + "&&o.on" + a + Ki + a + "(e)===false))return false");


            b["$" + a] = b["$" + a] || W
        }


        b[Qg] = b[Uc] = b[Ae] = b.$selectstart = b.$select = b.$selectend = b.$zoomstart = b.$zoom = b.$zoomend = b.$dragstart = b[Ah] = b[zh] = W
    })();


    var _d = J.Scroll = function (f, d) {

        var e = this, l = "-block", k = 0, j = ["Prev", "Next"], i = d[sb], h = d[$], b;


        E[a](e, f, d);
        Te(e[w]());


        for (; b = j[k++];) {
            d = b[ig]();
            b = e["_u" + b] = V(Db, {base: i + ld + d, parent: e, type: h + ld + d});


            b[Kg] = d == "prev" ? ag : Kf;
            P(b, ae);
            b[X]()[Je] = Cd;

            d = b[g]()[c];
            d[cb] = xb;
            d.top = d[Y] = "0px"
        }


        b = e[cc] = V(Db, {base: i + l, parent: e, type: h + l});


        P(b, Se);
        b[zh] = bd;
        b[X]()[Je] = Cd;
        b[g]()[c][cb] = xb;


        e[Yb] = e[nc] = 0;
        e[gd] = 1;
        f[Je] = Cd;


        f[wh] = zd
    }, Se = {}, ae = {}, ab = N(_d, E), Yg = J[xe] = function (b, c) {


        _d[a](this, b, c)
    }, xd = N(Yg, _d), hi = J[gg] = function (b, c) {


        _d[a](this, b, c)
    }, yd = N(hi, _d);


    function Kf(c) {
        var a = this, b = a[Yb];
        bd(a);
        if (b < a[nc]) {

            a[Kh]() && a[tb](b + c);
            a._oTimer = new Wd(Kf, 200, a, c)
        }
    }


    function hh(c, d) {
        var b = c[f]();
        b[Tb]();
        c[Kg][a](b, I(b[gd], 5));


        d[Kc]()
    }


    function ag(c) {
        var a = this, b = a[Yb];
        bd(a);
        if (b) {

            a[Jg]() && a[tb](b - c);
            a._oTimer = new Wd(ag, 200, a, c)
        }
    }


    function bd(b) {
        var a = b._oTimer;
        a && a.stop()
    }


    Se[Ah] = function (e, d, c) {
        var a = this[f](), b = a[vh](d, c);


        a.$setValue(b == a[nc] ? b : b - b % a[gd]);
        a.scroll()
    };


    Se[ic] = function (c) {
        var d = this;
        b[ic][a](d, c);

        d[f]()[Tb]();
        Wf(d, c, d[fg]);


        c[Kc]()
    };


    Se[Lh] = function (d, c, a, b) {
        this[fg] = {top: d, right: c, bottom: a, left: b}
    };


    ae[Rb] = function (c) {
        bd(this[f]());
        b[Rb][a](this, c)
    };


    ae[tf] = function (c) {
        bd(this[f]());
        b[tf][a](this, c)
    };


    ae[qf] = function (c) {
        hh(this, c);
        b[qf][a](this, c)
    };


    ae[kd] = function (c) {
        hh(this, c);
        b[kd][a](this, c)
    };


    ab[df] = W;


    ab[Rb] = function (c) {
        bd(this);
        b[Rb][a](this, c)
    };


    ab[tf] = function (c) {
        bd(this);
        b[tf][a](this, c)
    };


    ab[qf] = function (c) {
        this[Kg](this[Lg]());
        b[qf][a](this, c)
    };


    ab[kd] = function (d) {
        var c = this;
        (c[Kg] = c[Jg]() ? ag : Kf)[a](c, c[Lg]());
        c[Tb]();
        b[kd][a](c, d);


        d[Kc]()
    };


    ab.$setValue = function (a) {
        this[Yb] = a
    };


    ab[Tb] = function () {
        var a = this[f]();
        a && (!a[Id](Pe()) && Xc(a))
    };


    ab[le] = function () {
        return this[gd]
    };


    ab.getTotal = function () {
        return this[nc]
    };


    ab[Kb] = function () {
        return this[Yb]
    };


    ab[B] = function () {
        this[tb](0);
        return b[B][a](this)
    };


    ab.scroll = function () {
        var b = this, a = b[f]();
        b[dc]();
        a && (a.onscroll && a.onscroll(b) === d || a[ue](b))
    };


    ab.setStep = function (a) {
        if (a > 0)this[gd] = a
    };


    ab[Ff] = function (a) {
        var b = this;
        if (a >= 0 && b[nc] != a) {

            b[nc] = a;
            if (b[Yb] > a) {


                b[Yb] = a;
                b.scroll()
            }

            b[Oe]()
        }
    };


    ab[tb] = function (a) {
        var b = this;
        a = I(Cb(a, b[nc]), 0);
        if (b[Yb] != a) {


            b[Yb] = a;
            b.scroll();
            b[Oe]()
        }
    };


    ab.skip = function (a) {
        this[tb](this[Yb] + a * this[gd])
    };


    xd[Kh] = function () {
        var a = this[cc];
        return Qe(this) > a.getY() + a[u]()
    };


    xd[Jg] = function () {
        return Qe(this) < this[cc].getY()
    };


    xd[vh] = function (e, d) {
        var c = this, b = c[cc], a = b[fg];

        return (d - a.top) / (a[Ke] - c[Ie][u]() - b[u]()) * c[nc]
    };


    xd[Oe] = function () {

        var a = this, c = a[nc], b = a[cc], g = a[u](), d = a[Ie][u](), e = a[Jb](), f = I(Fb(e * g / (g + c)), b[gc]() + 5);
        if (c) {


            b[D](0, f);
            b[mb](0, d + Fb(a[Yb] / c * (e - f)));
            b[Lh](d, 0, e + d, 0)
        }
    };


    xd[Lg] = function () {
        var a = this[u]();
        return a - a % this[gd]
    };


    xd[p] = function (h, g) {
        var b = this, e = b[w](), c, f = b._uNext, d = A(e, Bc);


        ab[p][a](b, h, g);

        c = b[vb]();


        b[Ie][D](c, d);
        f[D](c, A(e, De));
        b[cc][D](c);
        f[mb](0, b[Jb]() + d);

        b[Oe]()
    };


    yd[Kh] = function () {
        var a = this[cc];
        return Mf(this) > a.getX() + a[q]()
    };


    yd[Jg] = function () {
        return Mf(this) < this[cc].getX()
    };


    yd[vh] = function (d, e) {
        var c = this, b = c[cc], a = b[fg];

        return (d - a[Y]) / (a[Fe] - c[Ie][q]() - b[q]()) * c[nc]
    };


    yd[Oe] = function () {

        var a = this, c = a[nc], b = a[cc], g = a[q](), e = a[Ie][q](), d = a[vb](), f = I(Fb(d * g / (g + c)), b[bc]() + 5);
        if (c) {


            b[D](f);
            b[mb](e + Fb(a[Yb] / c * (d - f)), 0);
            b[Lh](0, d + e, 0, e)
        }
    };


    yd[Lg] = function () {
        var a = this[q]();
        return a - a % this[gd]
    };


    yd[p] = function (h, g) {
        var b = this, d = b[w](), c, e = b._uNext, f = A(d, Ac);


        ab[p][a](b, h, g);

        c = b[Jb]();


        b[Ie][D](f, c);
        e[D](A(d, sd), c);
        b[cc][D](0, c);
        e[mb](b[vb]() + f, 0);

        b[Oe]()
    };


    var Yc = J.Panel = function (f, e) {

        var h = this, k = 0, i = [], j = e[sb], b;


        E[a](h, f, e);
        h._bAbsolute = !(!e[xb]);
        h._nWheelDelta = e[ke];
        Te(f);

        e.vScroll !== d && i[L](xe);
        b = Wc(f);
        b[c][Nc] = (i[F] ? "white-space:nowrap;" : r) + "position:absolute;top:0px;left:0px";
        h[md](b);
        e.hScroll !== d && i[L](gg);

        b = Wc(f);
        b[db] = j + Ci;
        b[c][Nc] = "overflow:hidden;position:absolute";


        for (; b = i[k];) {
            (h["_u" + b] = V(b, {base: j + ld + b[ig](), parent: f}))[g]()[c][cb] = xb;
            if (k++)(h._uCorner = V(Db, {base: j + Mi, parent: f, type: e[$] + Mi}))[g]()[c][cb] = xb
        }
    }, wb = N(Yc, E);


    wb[Ih] = wb[Rh] = function (e) {
        var a = Vf(), c = a % 2, f = e[lb], b;
        if (a >= 37 && (a <= 40 && !f[K])) {


            b = c ? this[Oh] : this[Gg];
            b && b.skip(a + c - 39);
            return d
        }
    };


    wb.$mousewheel = function (c) {
        var a = this[Gg];
        if (a && a[Z]()) {


            var d = a[Kb](), b = this._nWheelDelta || (Fb(20 / a[le]()) || 1);

            a.skip(c[ke] < 0 ? b : -b);
            return d == a[Kb]()
        }
    };


    wb[ue] = function () {
        var b = this, a = b[w]()[c];
        a[Y] = -I(b[Di](), 0) + t;
        a.top = -I(b[Qh](), 0) + t
    };


    wb[p] = function (K, J) {
        var j = this;
        b[p][a](j, K, J);

        var n = j[w](), G = j[X](), f, C = A(G, Ac, sd), E = A(G, Bc, De), h = j[vb](), i = j[Jb](), l = n[rb], k = n[Vb], e = j[Gg], d = j[Oh], g = j._uCorner, H = e && e[q](), F = d && d[u](), x = h - H, s = i - F, y = x + C, z = s + E, L = 0, o = cd(n), O = o[Y], N = o.top, r;
        if (j._bAbsolute) {
            for (r = n[Ic]("*"); f = r[L++];)if (f[rb] && M(f, cb) != Mh) {


                o = cd(f);
                l = I(l, o[Y] - O + f[rb]);
                k = I(k, o.top - N + f[Vb])
            }
        }


        e && e[mb](y, 0);
        d && d[mb](0, z);
        g && g[mb](y, z);
        if (l <= h && k <= i) {


            e && e[B]();
            d && d[B]();
            g && g[B]()
        } else while (m) {
            if (g) {
                if (l > x && k > s) {


                    d[jb]();
                    d[Ff](l - x);
                    d[D](y);
                    e[jb]();
                    e[Ff](k - s);
                    e[D](0, z);
                    g[jb]();
                    g[D](H, F);
                    h = x;
                    i = s;
                    break
                }

                g[B]()
            }
            if (d)if (l > h) {


                d[jb]();
                d[Ff](l - h);
                d[D](h + C);
                e && e[B]();
                i = s
            } else d[B]();
            if (e)if (k > i) {


                d && d[B]();
                e[jb]();
                e[Ff](k - i);
                e[D](0, i + E);
                h = x
            } else e[B]();


            break
        }


        f = n[yb];
        r = f[c];
        r[v] = h - Sd(f) + t;
        r[T] = i - ce(f) + t
    };


    wb[Di] = function () {
        var a = this[Oh];
        return a ? a[Kb]() : -1
    };


    wb[Qh] = function () {
        var a = this[Gg];
        return a ? a[Kb]() : -1
    };


    var ud = J.Edit = function (b, f) {


        var i = this, k = "input", e = b, j = [rg, Ag, Eg, Tb, Ed, dc];
        if (b[yc] == yh) {


            b = z();
            ac(b, e);
            b[zb](e);
            b[db] = e[db]
        } else if (e = b[Ic](k)[0]) {


            b[jc] = r;
            b[zb](e)
        } else {


            b[jc] = '<input name="' + (f[hb] || r) + Dd;
            e = b[ub];
            e[K] = f[K] || r
        }


        i[R] = e;

        E[a](i, b, f);


        b[c].overflow = lf;
        e[db] = r;
        e[c].border = lc;


        for (b = 0; f = j[b++];) {
            f = uf + f;
            i[f] = e[f]
        }

        e.onchange = h;


        P(e, Ve);
        _ ? Vd(i, d) : e[Fi](k, Zg, d);

        Ec(i[g](), Q, lg)
    }, fb = N(ud, E), Ve = {}, Zg = _ ? function () {
        if (event.propertyName == K) {


            var a = $b(this);
            Vd(a);
            a[dc]();
            Vd(a, d)
        }
    } : function () {


        $b(this)[dc]()
    }, Vd = ud.stop = _ ? function (a, b) {


        a[R][Le] = b !== d ? h : Zg
    } : W;


    Ve.onblur = function () {
        var a = $b(this);

        a[hd] = b[hd];
        a[cf]() && $e(a);
        delete a[hd]
    };


    Ve.onfocus = function () {
        var a = $b(this);

        a[je] = b[je];

        a[cf]() ? Xc(a) : this[Ed]();
        delete a[je]
    };


    fb[qb] = function () {
        this[R] = h;
        b[qb][a](this)
    };


    fb[p] = function (g, f) {
        var d = this, e = d[R][c];
        b[p][a](d, g, f);
        e[v] = d[vb]() + t;
        e[T] = d[Jb]() + t
    };


    fb[Cf] = function () {
        return this[R]
    };


    fb.getName = function () {
        return this[R][hb]
    };


    fb[Kb] = function () {
        return this[R][K]
    };


    fb.setCaret = _ ? function (b) {
        var a = this[R][Bi]();
        a.moveStart("character", b);
        a.collapse(m);
        a[oe]()
    } : function (a) {

        this[R].setSelectionRange(a, a)
    };


    fb[He] = function (c) {
        b[He][a](this, c);
        this[R][Fh] = c === d
    };


    fb[Mg] = function (a) {
        this[R] = If(this[R], a)
    };


    fb[tb] = function (b) {
        var a = this;
        Vd(a);
        a[R][K] = b;
        a[dc]();
        Vd(a, d)
    };


    fb[Be] = _ ? function () {
        var b = this[R], a = O.selection.createRange(), d = a.text;


        a.setEndPoint("StartToStart", b[Bi]());

        var e = a.text[F], c = b[K];


        return {left: c[od](0, e - d[F]), right: c[od](e), selection: d}
    } : function () {


        var a = this[R], b = a[K], c = a.selectionStart, d = a.selectionEnd;


        return {left: b[od](0, c), right: b[od](d), selection: b[od](c, d)}
    };


    (function () {
        for (var c = 0, b = [rg, Ag, Eg], a; a = b[c++];)Ve[uf + a] = new Function("e", "var c=ecui,o=c.findControl(this),s=c.ui.Edit.stop,r;e=c.event(e);e.stopPropagation();if(o.on" + a + "){s(o);r=o.on" + a + "(e)!==false&&o.$" + a + "(e);s(o,false);return r}");


        for (c = 0, (b = [Ed, Tb]); a = b[c++];)fb["$" + a] = new Function("var e=this._eInput,f=e.on" + a + ";e.on" + a + "=null;try{e." + a + "()}catch(v){}e.on" + a + "=f;ecui.ui.Control.prototype.$" + a + ".call(this)")
    })();


    var vi = J.Label = function (c, b) {

        E[a](this, c, b);

        _f(this, this.setFor, b['for'])
    }, gh = N(vi, E);


    gh[nb] = function (b) {
        var a = this._cFor;
        a && a[ne](b)
    };


    gh.setFor = function (a) {
        this._cFor = a
    };


    var pi = J.Checkbox = function (b, e) {

        var d = this, f = b[yc] == yh ? b[wc] : e[wc];

        ud[a](d, b, e);
        b = d[Cf]();
        b[c][Q] = lc;
        b[wc] = m;

        d[Ge] = [];
        d[Od] = 2;
        d[Fg](f);

        _f(d, d.setSuperior, e.superior)
    }, _b = N(pi, ud);


    function eh(a, c, b) {
        a[Sc](a[fc]() + [Oi, r, "-part"][c], b)
    }


    function $g(a, b) {
        var e = a[Pd], c = a[Od], d = b !== c;
        if (d) {


            eh(a, c, m);
            eh(a, b);

            a[Od] = b;
            a[Cf]()[Md] = !(!b);


            e && Zf(e);

            a[dc]()
        }

        return d
    }


    function Zf(d) {
        for (var c = 0, b, a; b = d[Ge][c];) {
            if (c++ && a != b[Od]) {

                a = 2;
                break
            }

            a = b[Od]
        }


        c && $g(d, a)
    }


    _b[nb] = function (b) {
        fb[nb][a](this, b);

        this[Fg](this[Od])
    };


    _b[Ih] = _b[Rh] = function (a) {
        return a.which != 32
    };


    _b.$keyup = function (a) {
        if (a.which == 32) {

            this[nb](a);
            return d
        }
    };


    _b.getInferiors = function () {
        return this[Ge]
    };


    _b[uh] = function () {
        return this[Pd]
    };


    _b.isChecked = function () {
        return !this[Od]
    };


    _b[Fg] = function (a) {
        if (!this[cf]())return;
        if ($g(this, a ? 0 : 1))for (var


                                         c = 0, b; b = this[Ge][c++];)b[Fg](a)
    };


    _b.setSuperior = function (a) {
        var c = this, b = c[Pd];
        if (b) {


            Bd(b[Ge], c);
            Zf(b)
        }
        if (a) {


            a[Ge][L](c);
            Zf(a)
        }

        c[Pd] = a
    };


    _b[He] = function (b) {
        fb[He][a](this, b);
        this[Cf]()[Md] = !b
    };


    var td = J.Radio = function (c, d) {

        var e = this, b = {};
        if (c[yc] == yh) {


            c = ac(z(), b = c);
            Ib(b);
            c[db] = b[db]
        }


        E[a](e, c, d);

        e[Mg](b[hb] || (d[hb] || r));
        e[tb](b[K] || (d[K] || r));
        (d[wc] || b[wc]) && e[wc]();

        Ec(e[g](), Q, lg)
    }, Cc = N(td, E);


    function ki() {
        if (event.propertyName == K) {

            var d = 0, b = this[K], c = td[pd + this[hb]], a;


            this[Le] = h;
            for (; a = c[d++];)if (a[Lc] == b) {

                a[wc]();
                break
            }
        }
    }


    Cc[nb] = function (c) {
        b[nb][a](this, c);
        this[wc]()
    };


    Cc[wc] = function () {
        var b = this;
        if (d = b[G]()) {


            var a = d[of], c = d[R], d;
            if (a != b) {


                a && a[Sc](a[fc]());

                a = c[Le];
                c[Le] = h;
                c[K] = b[Lc];
                c[Le] = a;

                d[of] = b
            }
        }


        b[Sc](b[fc]() + Oi)
    };


    Cc[G] = function () {
        return td[pd + this[Rc]]
    };


    Cc.getName = function () {
        return this[Rc]
    };


    Cc[Kb] = function () {
        return this[Lc]
    };


    Cc.isChecked = function () {
        var a = this[G]();
        return a && a[of] == this
    };


    Cc[Mg] = function (d) {
        var c = this, b = c[Rc], a = td[pd + b];
        if (d != b) {
            if (a) {


                b = a[R];
                if (a[of] == c) {


                    b[K] = r;
                    a[of] = h
                }

                Bd(a, c);

                a = a[0];

                a ? a[w]()[zb](b) : Ib(b)
            }
            if (d) {


                c[Sc](c[fc]());

                a = td[b = pd + d];
                if (!a) {


                    a = td[b] = [];
                    b = a[R] = z(yg + d + Dd, c[w]());
                    if (_)b[Le] = ki
                }


                a[L](c)
            }
        }


        c[Rc] = d
    };


    Cc[tb] = function (a) {
        this[Lc] = a
    };


    var We = J.Item = function (b, d) {

        E[a](this, b, d);
        this[w]()[c].overflow = lf
    }, Nb = N(We, E), gb = J.Items = {};


    Nb[ic] = function (c) {
        b[ic][a](this, c);
        c[Kc]()
    };


    Nb[Nd] = W;


    Nb[Mc] = function (g) {
        var d = this, h = d[f](), e = h[G](), c = e[pf];
        if (d != c) {


            c && b[Nd][a](c);
            b[Mc][a](d, g);
            e[pf] = d
        }
    };


    Nb[Ab] = function (g, d) {
        var c = this, f = c[q](), e = c[u]();

        b[Ab][a](c, g, d);
        c[D](f, e)
    };


    Nb[kb] = function (c) {
        var d = this, e = d._fType, g = d[f](), i = b[kb];
        if (c && gb[c[Jd]()]) {


            e || (e = d._fType = c[bi]);
            if (c instanceof e) {


                i[a](d, c);


                c = d[f]();


                g && g[Ub]();
                c && c[Ub]();
                return
            }


            c = h
        }

        i[a](d, c)
    };


    gb[Uc] = function (b) {
        if (!(b instanceof We) || rh(this, Uc)[a](this, b) === d)return d;


        this[G]()[L](b)
    };


    gb[kg] = function () {
        var a = this, c = 0, d = Qb(a[w]()), b;


        a[Ub] = W;


        gb[a[Jd]()] = [];


        for (; b = d[c];)a.add(b, c++);


        delete a[Ub]
    };


    gb[Ae] = function (b) {
        rh(this, Ae)[a](this, b);
        Bd(this[G](), b)
    };


    gb.add = function (b, h) {
        var d = this, e = d[G](), c = d[xc]() + nf;
        if (b instanceof We)b[kb](d); else {
            if (zg == typeof b)b = z("<div>" + b + "</div>");


            b = V("Item", {element: b, base: c, parent: d});


            c = Array[Jc].slice[a](arguments, 1);
            c[0] = b;
            d[Ef] && d[Ef].apply(d, c);
            b[X]()[wh] = zd;

            d[Ub]()
        }
        if (b[f]() && ((c = e[h]) && c != b)) {


            rc(b[g](), c[g]());
            e[Zb](h, 0, e.pop())
        }


        return b
    };


    gb.append = function (b) {
        b = Array[Jc].slice[a](arguments);
        b[Zb](1, 0, bb);
        this.add.apply(this, b)
    };


    gb[Dh] = function () {
        var d = this[G](), c = d[pf];

        c && b[Nd][a](c);
        d[pf] = h
    };


    gb[G] = function () {
        return gb[this[Jd]()]
    };


    gb[Xh] = function () {
        return this[G]()[pf]
    };


    gb.remove = function (a) {
        if (Zh == typeof a)a = this[G]()[a];


        a && a[kb]()
    };


    gb[Af] = function (c, d) {
        for (var e = 0, b = this[G](), a; a = b[e++];)a[D](c, d)
    };


    var ri = J.Select = function (f, h) {

        var b = this, k = 0, m = h[$], n = f.options, j = f, i = -1, l, e;
        if (n) {


            f = ac(z(), f);

            for (; e = n[k]; k++) {
                l = z(r, f);
                Pf(l, e.text);
                l[Qd](K, e[K]);
                if (e[Rd])i = k
            }


            f[db] = j[db];
            Ib(j);


            h[hb] = j[hb] || h[hb]
        }


        e = b[Oc] = V("Panel", {base: h[sb] + "-options", element: Wc(f), parent: O[hc], hScroll: d});


        b[jd] = e[Ne](xe);
        ud[a](b, f, h);
        Te(b[w]());


        b[Cf]()[c][Q] = lc;


        e[B]();
        e[we](b);
        f = e[w]();
        e = e[g]()[c];
        e[Tc] = 65535;
        e[cb] = xb;


        b[Bg] = h.optionSize || 5;

        b[Uc] = W;


        b._uText = V("Item", {base: m + "-text", parent: b, capture: d});


        (b._uButton = V(Db, {base: m + "-button", parent: b, capture: d}))[g]()[c][cb] = xb;


        b[md](f);
        if (_)b.$change = ei;


        delete b[Uc];

        b[kg]();


        i >= 0 ? b[Lb](i) : b[tb](b[Kb]())
    }, pb = N(ri, ud), Hf = {};


    function ei() {
        var a = this, b = a[Hd], c = a[Kb]();


        delete a.$change;
        if (b && b[Lc] != c)a[tb](c)
    }


    function Of(a) {
        var b = a[Oc], d = a[jd], i = cd(a[g]()), c = a[Hd], h = i.top, f = h + a[u](), e = b[u]();
        if (b[Z]()) {


            b[mb](i[Y], f + e <= fe()[Ke] ? f : h - e);


            b[ib]();


            c && c[Mc]();

            d[tb](d[le]() * qc(a[G](), c))
        }
    }


    function qh(e, a, f) {
        var d = e[G](), c = d[F], b = f ? e[Xh]() : e[Hd];
        if (c) {


            a = f ? ((b ? qc(d, b) : a > 0 ? c - 1 : 0) + a + c) % c : qc(d, b) + a;
            if (a >= 0 && a < c) {


                b = d[a];
                b[Mc]()
            }
        }


        return b
    }


    P(pb, gb);


    Hf[Kb] = function () {
        return this[Lc]
    };


    Hf[Bf] = function (a) {
        this[f]()[Oc][Bf](a);
        return d
    };


    pb[Ub] = function () {
        var a = this, e = a[Oc], c = a[Bg], b = a[jd], g = b[le](), d = a[G]()[F], f = e[vb]() - (d > c ? b[q]() : 0);


        a[Af](f);


        e[vg](0, (Cb(d, c) || 1) * g)
    };


    pb[Qg] = function (c) {
        var b = this, a = c[dd]();
        b[Oc][B]();
        tc();


        a instanceof We && (a[f]() == b && b[Lb](a))
    };


    pb[Ef] = function (a, b) {
        var b = b === bb ? a[X]()[Vc](K) : b;
        a[D](0, this._uText[u](), m);
        a[Lc] = b === h ? $f(a[w]()) : b;

        P(a, Hf)
    };


    pb[Ih] = function (k) {
        var a = this, b = k.which, i = a[G](), h = a[Xh](), j = a[Oc];
        if (Tg() != a) {
            if (!j[Z]()) {
                if (b == 40 || b == 13) {


                    a[kd]();
                    a[Rb]();
                    return d
                }
            } else if (b == 40 || b == 38) {


                var n = i[F], g = a[Bg], f = a[jd], l = f[le](), e = f[Kb]() / l, c = qc(i, qh(a, b == 40 ? 1 : -1, m));


                f.skip((c < e ? c : c >= e + g ? c - g + 1 : e) - e);


                return d
            } else if (b == 13 || b == 27) {


                j[B]();
                b == 13 && (h && a[Lb](h));
                tc();
                $c()
            }
        }
    };


    pb[Rh] = function (b) {
        var a = Vf();
        return a < 37 || (a > 40 || a == 13)
    };


    pb.$mousewheel = function (a) {
        if (!this[Oc][Z]()) {

            this[Lb](qh(this, a[ke] < 0 ? 1 : -1));
            return d
        }
    };


    pb[Rb] = function (b) {
        fb[Rb][a](this, b);

        cg(this);
        tc(0, 65534)
    };


    pb[kd] = function (b) {
        fb[kd][a](this, b);
        this[Oc][jb]();
        Of(this)
    };


    pb[Ae] = function (b) {
        this[Hd] == b && this[Lb]();
        gb[Ae][a](this, b)
    };


    pb[p] = function (d, c) {
        var b = this, e = b[Oc];

        fb[p][a](b, d, c);
        c = b[Jb]();


        e[D](d);
        b[jd].setStep(c);
        b[Af](0, c);


        d = b[vb]() - c;
        b._uText[D](d, c, m);


        e = b._uButton;
        e[D](c, c);
        e[mb](d, 0);

        b[Ub]();
        Of(b)
    };


    pb.getSelected = function () {
        return this[Hd]
    };


    pb.setOptionSize = function (a) {
        if (a > 1) {

            this[Bg] = a;
            this[Ub]();
            Of(this)
        }
    };


    pb[Lb] = function (b) {
        var d = this, e = d._uText;
        if (Zh == typeof b)b = d[G]()[b];
        if (d[Hd] != b) {
            if (b) {


                var f = b[w](), c = b[Lc];


                e[Gd](f[jc]);
                c = c !== bb ? c : $f(f)
            } else {


                e[Gd](r);
                c = r
            }

            fb[tb][a](d, c);

            d[Hd] = b || h
        }
    };


    pb[tb] = function (d) {

        var b = this, e = 0, c = b[G](), a;


        b[dc] = W;
        for (; a = c[e++];)if (a[Lc] == d) {

            b[Lb](a);
            break
        }


        a || b[Lb]();
        delete b[dc]
    };


    var wi = J.Grid = function (k, e) {


        var h = this, i = h._aItem = [], g = Qb(k), b = g[F], j = h._nRow = e.row || b, d = 0, c = 0, f;


        E[a](h, k, e);


        for (; b--;)d = I(d, (g[b] = Qb(Ib(g[b])))[F]);


        d = h._nCol = e.col || d;


        for (c = 0; c < j;)if (b = g[c++])for (f = 0; f < d;)i[L](b[f++]);


        for (c = 0, (f = d * j); c < f;) {
            b = i[c] || z();
            Ec(b, "float", Y);
            b = i[c] = V(Db, {element: b, base: e[sb] + nf, parent: h, type: e[$] + nf});


            P(b, Tf);


            b._nIndex = c++
        }
    }, Vg = N(wi, E), Tf = {};


    Tf.getIndex = function () {
        return this._nIndex
    };


    Vg[p] = function (e, d) {
        var c = this, g = c._aItem, f = c._nCol, k = c._nRow, l = 0, h, i = c[bc](m), j = c[gc](m);
        if (g[F]) {


            e = Fb(((e ? e : c[q](m)) - i) / f);
            d = Fb(((d ? d : c[u](m)) - j) / k);

            for (; h = g[l++];)h[D](e, d);


            b[p][a](c, e * f + i, d * k + j)
        }
    };


    Vg.getItem = function (b, a) {
        return this._aItem[a === bb ? b : b * this._nCol + a]
    };


    (function () {
        for (var c = 0, b = [Tb, Ed, ne, Eb, ye, ve, re, kc, bf, hg, Rg, qg, Hg], a; a = b[c++];)Tf[a] = new Function("e", "var o=this,p=o.getParent();o.isEnabled()&&(p.on" + a + "&&p.on" + a + ".call(o,e)===false||p.$" + a + ".call(o,e))")
    })();


    var gi = J.Calendar = function (h, b) {


        var e = this, j = "Grid", g = Wc(h), c = 0, f = b[sb], d = e._uNames = V(j, {
            element: rc(z(), g),
            base: f + "-weekname",
            col: 7,
            row: 1
        }), i = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"];


        E[a](e, h, b);

        for (; c < 7; c++)d.getItem(c)[Gd](i[c]);


        d = e._uDate = V(j, {element: g, base: f + "-date", col: 7, row: 6});


        d[nb] = ti;

        e.setDate(b.year, b.month)
    }, Zd = N(gi, E);


    function ti(e) {
        var d = this, h = "ondateclick", c = d[f]()[f](), g = d._nDay;


        b[nb][a](d, e);
        c[h] && c[h](new Date(c[jf], c[wf], g))
    }


    Zd[p] = function (f, g) {
        var c = this, e = c._uNames, d = c._uDate;


        e[p](f);
        d[p](f);


        b[p][a](c, d[q]() + c[bc](m), e[u]() + d[u]() + c[gc](m))
    };


    Zd[Uh] = function () {
        return this[wf] + 1
    };


    Zd.getYear = function () {
        return this[jf]
    };


    Zd.move = function (c) {
        var b = this, a = new Date(b[jf], b[wf] + c, 1);
        b.setDate(a.getFullYear(), a[Uh]() + 1)
    };


    Zd.setDate = function (b, a) {
        var d = this, h = "getDate", c = new Date(), b = b || c.getFullYear(), a = a ? a - 1 : c[Uh]();
        if (d[jf] != b || d[wf] != a) {


            d[jf] = b;
            d[wf] = a;

            c = c[h]();

            for (var

                     e = new Date(b, a, 0), k = day = 1 - (e.getDay() + 1) % 7, i = e[h](), j = d._uDate, g = 0, e = new Date(b, a + 1, 0), f = e[h](); a = j.getItem(g); g++, day++) {


                b = day > 0 && day <= f;
                a[He](b);
                a[Gd](b ? day : day <= 0 ? i + day : day - f);

                a[Ab]("today", day != c);
                a._nDay = day
            }


            d[dc]()
        }
    };


    var zi = J.Form = function (f, b) {


        var e = this, h = b[sb], d = _e(f);


        d = d && d[yc] == Gh ? d : z();
        e._nTitleAuto = b.titleAuto;
        Yc[a](e, f, b);

        b[B] && e[B]();


        b = e[sg] = V(Db, {element: d, parent: f, base: h + "-title"});


        b[ic] = fi;
        b[g]()[c][cb] = xb;
        d[Je] = Cd;

        d[wh] = zd;


        b = e._uClose = V(Db, {parent: f, base: h + "-close"});


        b[nb] = mi;
        b[g]()[c][cb] = xb;


        e[g]()[c][Tc] = ee[L](e) - 1 + fh
    }, vd = N(zi, Yc), fh = 4096, ee = [];


    function mi(c) {
        b[nb][a](this, c);
        this[f]()[B]()
    }


    function fi(d) {
        var c = this[f]();

        b[nb][a](this, d);
        c[Id](Pe()) || Xc(c);
        Wf(c, d);

        d[Kc]()
    }


    vd[je] = function () {
        var e = this, b = qc(ee, e), d;


        wb[je][a](e);
        if (e[g]()[c][Tc] < xg) {


            ee[L](ee[Zb](b, 1)[0]);
            for (; d = ee[b];)d[g]()[c][Tc] = fh + b++
        }
    };


    vd[p] = function (h, g) {
        var c = this, b = c._nTitleAuto, f = c[sg], e = c[Ne](xe), d = c[Ne](gg);


        wb[p][a](c, h, g);

        c[sg][D](b == v ? c[vb]() : 0, b == T ? c[Jb]() : 0);
        if (e && (e[Z]() && b == v)) {


            b = f[u]();
            e[mb](e.getX(), b);
            e[p](0, e[u]() - b)
        } else if (d && (d[Z]() && b == T)) {


            b = f[q]();
            d[mb](b, d.getY());
            d[p](d[q]() - b)
        }
    };


    vd[B] = function () {
        wb[B][a](this);
        this[g]()[c][Tc] == xg && tc()
    };


    vd.setTitle = function (a) {
        this[sg][Gd](a)
    };


    vd[jb] = function () {
        var b = this, c = wb[jb][a](b);
        b[Id](Pe()) || Xc(b);
        return c
    };


    vd.showModal = function () {
        this[jb]();
        this[g]()[c][Tc] = xg;
        tc(.05)
    };


    var be = J.Tree = function (b, f) {

        var d = this, e = _e(b), i = f[sb], h = 0, g;


        E[a](d, b, f);

        d[mc] = [];
        if (e && e[yc] == Gh) {


            g = d[Wb] = Wc(b);
            b[zb](e);


            ch(d);


            for (e = Qb(g); g = e[h++];) {
                f.element = g;
                d.add(d[zf](f))
            }
        }
        if (!b[rb] || f.fold) {


            b[c][Q] = r;
            d.setFold()
        }
    }, ob = N(be, E);


    function ch(a) {
        var b = a[Wb], d = a[Ld](), c = a[fc]();
        if (b) {


            b[db] = d + "-items " + (d != c ? c + "-items" : r);
            if (!b[fd]) {

                ac(b, a[g]());
                Xf(b, a)
            }
        }
    }


    function Yf(a) {
        a[Sc](a[fc]() + (a[mc][F] ? a[Wb][rb] ? r : "-fold" : "-empty"))
    }


    ob[nb] = function (e) {
        var d = this, c = d[Wb];
        b[nb][a](d, e);
        c && d.setFold(!(!c[rb]))
    };


    ob[zf] = function (a) {
        return V("Tree", a)
    };


    ob[qb] = function () {
        this[Wb] = h;
        b[qb][a](this)
    };


    ob[Ce] = ob[p] = W;


    ob.add = function (a, e) {
        var d = this, c = a, b = d[mc];
        if (zg == typeof a) {


            a = d[zf]({base: d[fc]()});
            a[Gd](c)
        }

        a[kb](d);
        if (a[f]() && (c = b[e]) != a) {


            b[Zb](e, 0, b.pop());
            b = a[Wb];
            b && ac(b, rc(a[g](), c[g]()))
        }

        return a
    };


    ob.getChildTrees = function () {
        return this[mc]
    };


    ob.getFirst = function () {
        return this[mc][0] || h
    };


    ob.getLast = function () {
        var a = this[mc];
        return a[a[F] - 1] || h
    };


    ob.getNext = function () {
        var a = this[f]();
        if (a instanceof be) {


            a = a[mc];
            return a[qc(a, this) + 1] || h
        }
    };


    ob.getPrev = function () {
        var a = this[f]();
        if (a instanceof be) {


            a = a[mc];
            return a[qc(a, this) - 1] || h
        }
    };


    ob[B] = function () {
        var f = this, d = f[Wb], e = b[B][a](f);
        if (e && d) {


            d = d[c];
            f[Hh] = d[Q];
            d[Q] = lc
        }

        return e
    };


    ob.setFold = function (a) {
        var b = this;
        a = a !== d;
        if (b[mc][F]) {


            b[Wb][c][Q] = a ? lc : r;
            Yf(b);
            b[dc]()
        }
    };


    ob[kb] = function (d) {
        var h = this, e = h[f](), c;
        if (e instanceof be) {


            items = e[mc];
            Bd(items, h);
            Yf(e)
        }


        e = d instanceof be;
        if (e) {

            c = d[Wb];
            if (!c) {


                c = d[Wb] = z();
                ch(d)
            }
        }


        b[kb][a](h, c);
        if (e) {


            d[mc][L](h);
            Yf(d)
        }


        c = h[Wb];
        if (c)d ? ac(c, h[g]()) : Ib(c)
    };


    ob[jb] = function () {
        var d = this, e = d[Hh];
        if (b[jb][a](d) && e !== bb) {

            d[Wb][c][Q] = e;
            d[Hh] = bb;
            return m
        }
    };


    var Re = J.Table = function (e, g) {

        var f = this, m = g[sb], l = g[$], k = [xe, gg];


        f[Sb] = [];
        f[C] = [];
        if (e[yc] == "TABLE") {


            var i = _e(e), b = e;


            i = Qb(i && i[yc] == "TBODY" ? i : e);
            h = i[Zb](0, 1)[0];


            e = ac(z(), e);
            e[db] = b[db];
            e[c][Nc] = b[c][Nc];


            Ib(b)
        }


        g[ke] = 1;
        Yc[a](f, e, g);


        f[xh]();


        while (b = k.pop())if (b = f["_c" + b] = f[Ne](b))b[tb] = xi;


        b = f[ed] = V(Db, {
            element: e = z('<div style="overflow:hidden;position:absolute;top:0px" class="' + m + '-area"><div style="white-space:nowrap;position:absolute">' + ge(h ? r : "<tr></tr>") + "</div></div>", e),
            type: l + "-area"
        });


        e = e[Ic]("tbody")[0];
        b[md](h ? e[zb](h) : e[S]);
        if (h) {


            for (var j = 0, h = Qb(h); b = h[j]; j++) {
                f.addCol(b);
                b = Qf(b[fd]());
                for (k = 0; g = i[k]; k++) {
                    g = (j ? g : (i[k] = Qb(g)))[j];
                    Ad(g, b.n);
                    g[Mb] = b.c;
                    g[c][v] = b.w
                }
            }


            e = f[w]();


            for (j = 0; h = i[j++];) {
                b = z(ge(r, m, l), e);
                b[S][S][zb](h[0][yb]);
                f[xf](b, j)
            }
        }


        f[ib] = W;
        f[xh](d);
        delete f[ib]
    }, H = N(Re, Yc), Pb = Re.Row = {}, Zc = {};


    function xi(b) {
        var e = this, g = e[Kb](), d = e[f]()[e instanceof Yg ? Sb : C], c = 1;


        b = Cb(I(b, 0), e.getTotal());
        if (b > g) {
            for (; ; c++)if (b <= d[c]._nPos)break
        } else if (b < g) {
            for (c = d[F]; c--;)if (b >= d[c]._nPos)break
        } else return;


        ab[tb][a](e, d[c]._nPos)
    }


    function Wg(g, b, e) {
        var c = g[f]().oncellout;
        c && c[a](b, e) === d || Lf(b, b[Mb] + "-over")
    }


    function Sg(a, b) {
        return '<td class="' + a.n + '" style="width:' + a.w + Dd + (b || "&nbsp;") + "</td>"
    }


    function mh() {
        var a = $b(this);
        a[f]()[C] && (a[f]()[C][qc(a[C], this)][ff] && a.edit())
    }


    function sh(a) {
        var b = a[yf], d = a[ed][w]()[rb], c = b && b[Z]() ? b[q]() : 0;
        if (a[Ee][Z]())delete a[kf]; else {


            a[kf] || (a[kf] = a[q]());
            a[p](d + c + a[bc]())
        }

        a[ed][D](a[vb]() - c)
    }


    function Qf(a) {
        var f = /-head$/, e = a[X](), b = a[xc](), d = a[Ld](), c = b[Pg](f, r) + nf;


        return {w: M(e, v), c: c, n: c + (b != d ? " " + d[Pg](f, r) + nf : r)}
    }


    function Ye(c, b) {
        for (var d = 0, a; a = c[C][d++];)if (yi(a, b[lb]))return a
    }


    function ge(c, b, a) {
        return (a ? '<div style="position:relative" class="' + b + "-row " + (b != a ? a + Sh : r) + Dd : r) + '<table cellspacing="0" style="border-spacing:0px;table-layout:fixed"><tbody>' + c + "</tbody></table>" + (a ? "</div>" : r)
    }


    Pb[nb] = function (d) {
        var e = this, c = e[f]().onrowclick;
        b[nb][a](e, d);
        c && c[a](e, d)
    };


    Pb[qb] = function () {
        this[C] = this[Pc] = h;
        b[qb][a](this)
    };


    Pb[ic] = function (c) {
        var e = this, d = e[f](), g = d[Pc] = Ye(e, c), i = d.oncelldown, h = d.onrowdown;


        g && (i && i[a](g, c));
        h && h[a](e, c);

        b[ic][a](e, c)
    };


    Pb.$mousemove = function (e) {
        var g = this, i = g[f](), h = g[Pc], c = g[Pc] = Ye(g, e), l = i.onrowmove, k = i.oncellout, j = i.oncellmove;
        if (h != c) {


            h && Wg(g, h, e);
            if (c)k && k[a](c, e) === d || Ad(c, c[Mb] + "-over")
        }


        c && (j && j[a](c, e));
        l && l[a](g, e);

        b.$mousemove[a](g, e)
    };


    Pb[Nd] = function (d) {
        var c = this, e = c[f]().onrowout, g = c[Pc];


        c[Pc] = h;
        g && Wg(c, g, d);
        e && e[a](c, d);

        b[Nd][a](c, d)
    };


    Pb[Mc] = function (c) {
        var e = this, d = e[f]().onrowover;
        d && d[a](e, c);

        b[Mc][a](e, c)
    };


    Pb.$mouseup = function (c) {
        var d = this, h = d[f](), e = Ye(d, c), g = h.oncellup, i = h.onrowup;


        e && (g && g[a](e, c));
        i && i[a](d, c);

        b.$mouseup[a](d, c)
    };


    Pb[Rb] = function (i) {
        var g = this, d = g[f](), c = Ye(g, i), e = d.oncellclick;


        c && (d[Pc] == c && (e && e[a](c)));
        d[Pc] = h;

        b[Rb][a](g)
    };


    Pb.edit = function () {
        var e = this, i = e[f](), j = 0, a = i[Kd];
        if (!a || e != a && (!e.onsave || e.onsave() !== d)) {


            i.save();
            i[Kd] = e;
            for (; a = i[C][j];) {
                var b = a[ff], h = e[C][j++];
                if (b) {


                    a.onupdate && a.onupdate(b) === d || b[tb]($f(h));
                    a = Wc(h);
                    a[c][Nc] = "overflow:hidden;white-space:nowrap";
                    b[kb](h);
                    b[g]()[c].top = M(h, Bc);
                    b[D](a[rb], a[Vb]);

                    a[c][Nc] = "visibility:hidden"
                }
            }
        }
    };


    Zc[mf] = function (h, i) {
        var j = this, b = j[f]()[f](), k = qc(b[C], j), e = 0, g = h == Me && (i && b.flushCols == W), d = 0, a;
        if (g) {


            for (; a = b[C][e++];)if (a[Z]())d += a[q]();


            j[f]()[X]()[S][S][c][v] = d + t;
            e = 0
        }


        for (; a = b[Sb][e++];) {
            if (g)a[X]()[S][c][v] = d + t;


            Ec(a[C][k], h, i);
            a[ie]()
        }


        b[ib]()
    };


    Zc[B] = function () {
        var c = b[B][a](this);
        c && this[mf](Q, lc);
        return c
    };


    Zc.setEditor = function (a) {
        if (!this[f]()[f]()[Kd]) {


            a[g]()[c][cb] = xb;
            this[ff] = a
        }
    };


    Zc[$h] = function (a) {
        a = a !== d;
        this[Og] = a;
        a = a ? Bh : r;

        this[mf](Me, a);
        Ec(this[w](), Me, a)
    };


    Zc[D] = function (f) {
        var c = this, e = c[Og];
        e && c[$h](d);

        b[D][a](c, f);
        c[mf](v, M(c[g](), v));

        e && c[$h](e)
    };


    Zc[jb] = function () {
        var c = b[jb][a](this);
        c && this[mf](Q, r);
        return c
    };


    H[qb] = function () {
        this[Pc] = h;
        wb[qb][a](this)
    };


    H[te] = function () {
        var b = this, e = b[ed], d = 0, f = b[X](), h = 0, a = e[w]()[Vb];


        b[kf] && b[p](b[kf]);


        e[D](0, a);
        e[g]()[c][Y] = A(f, Ac) + t;
        f[c][Bc] = a + t;


        for (; a = b[C][h++];) {
            a._nPos = d;
            if (a[Z]())d += a[q]()
        }


        e[X]()[S][S][c][v] = d + t
    };


    H[eb] = function () {
        var a = this, g = a[yf], e = a[Ee], h = a[ed], i = 0, d = A(h[X]()[S][S], v), b = 0, f;


        for (; f = a[Sb][i++];) {
            f[X]()[S][c][v] = d + t;
            f._nPos = b;
            b += f[u]()
        }


        a[p](e ? 0 : d + (g && a[Jb]() < b ? g[q]() : 0) + a[bc](), g ? 0 : b + (e && a[vb]() < d ? e[u]() : 0) + a[gc]());


        e ? sh(a) : h[vg](d)
    };


    H[xf] = function (a, g) {
        var c = this;
        for (var
                 d = 0, e = a[Ic]("tr")[0], a = Sf(E, a, {type: c[Ld]() + Sh}), f = a[C] = Qb(e), b; b = f[d];) {


            c[C][d++][Og] && Ec(b, Me, Bh);
            b[Ph] = mh
        }


        a[md](e);


        P(a, Pb);
        a.getCol = c.getCol;

        c[Sb][Zb](g, 0, a);
        return a
    };


    H[Ce] = function () {
        var b = this, c = b[Ee];

        wb[Ce][a](b);
        b[yf] || b[p](0, b[w]()[Vb] + b[gc]() + (c && c[Z]() ? c[u]() : 0));


        c && sh(b)
    };


    H[ue] = function () {
        wb[ue][a](this);
        this[ed][X]()[S][c][Y] = this[w]()[c][Y]
    };


    H.addCol = function (a, i) {
        var f = this, m = "-head", e = f[C], l = 0, b = f[ed][w](), j = e[i];
        if (a[yc])var


            d = a[c][v], k = a[db][Be](Ng)[0]; else {


            d = a[v];
            k = a[sb];
            a = z("<th>" + (pc(a.title) || "&nbsp;") + "</th>")
        }
        if (j)rc(a, j[g]()); else {


            i = e[F];
            b[zb](a)
        }


        d = /%$/.test(d) ? Fb(f[q]() * sc(d) / 100) : sc(d);
        a[c][v] = d + t;
        b = V(Db, {base: k || f[xc]() + m, element: a, type: f[Ld]() + m});


        a[c][T] = r;
        b[p](d);


        P(b, Zc);
        e[Zb](i, 0, b);


        a = Qf(b);


        for (; b = f[Sb][l++];) {
            e = b[C];
            e[Zb](i, 0, j = b[w]()[Gf](z(Sg(a)), e[i] || h));


            j[Mb] = a.c;
            j[Ph] = mh
        }


        f[ib]()
    };


    H.addRow = function (k, e) {
        var c = this, d = 0, i = ["<tr>"], f = [], j = c[Sb], b = j[e], a;
        if (b)b = b[g](); else {


            b = h;
            e = j[F]
        }


        b = c[w]()[Gf](z(ge(r, c[xc](), c[Ld]())), b);

        for (; a = c[C][d];) {
            a = Qf(a);
            f[L](a.c);


            i[L](Sg(a, k[d++]))
        }


        a = z(i.join(r) + "</tr>", b[S][S]);
        c[xf](b, e);

        for (d = 0, (a = a[ub]); a; a = a.nextSibling)a[Mb] = f[d++];


        c[eb]()
    };


    H.addRows = function (e, d) {
        var a = this, f = 0, b = a[eb] == W, c;


        b || (a[eb] = W);

        for (; c = e[f++];)a.addRow(c, d++);
        if (!b) {


            delete a[eb];
            a[eb]()
        }
    };


    H.cancel = function () {
        var a = this, f = 0, b = a[Kd], d;
        if (b) {


            a[Kd] = h;

            for (; d = a[C][f];) {
                var c = d[ff], e = b[C][f++];
                if (c) {


                    c[kb]();
                    e[jc] = e[ub][jc]
                }
            }


            a[eb]()
        }
    };


    H.getCell = function (a, b) {
        a = this[Sb][a];
        return a && a[C][b] || h
    };


    H.getCol = function (a) {
        return this[C][a] || h
    };


    H.getCols = function () {
        return this[C]
    };


    H.getRow = function (a) {
        return this[Sb][a] || h
    };


    H.getRows = function () {
        return this[Sb]
    };


    H[xh] = function (b) {
        var a = this;
        if (b !== d)a[te] = a[eb] = W; else {


            delete a[te];
            delete a[eb];
            a[ib]()
        }
    };


    H[ib] = function () {
        this[te]();
        this[eb]()
    };


    H.removeCol = function (b) {
        var c = this, a = c[C][Zb](b, 1)[0], d = 0;
        if (a) {


            a[kb]();


            for (; a = c[Sb][d++];) {
                Ib(a[C][Zb](b, 1)[0]);
                a[ie]()
            }


            c[ib]()
        }
    };


    H.removeRow = function (a) {
        if (a = this[Sb][Zb](a, 1)[0]) {

            a[kb]();
            this[eb]()
        }
    };


    H.removeRows = function () {
        var a = this, d = a.getRows(), c = d[F], b = a[eb] == W;


        b || (a[eb] = W);

        while (c--)a.removeRow(c);
        if (!b) {


            delete a[eb];
            a[eb]()
        }
    };


    H.save = function () {
        var d = this, f = 0, e = d[Kd], c;
        if (e) {


            d[Kd] = h;

            for (; c = d[C][f];) {
                var a = c[ff], b = e[C][f++];
                if (a) {


                    a[kb]();
                    a = a[Kb]();
                    if (c[Og]) {

                        Ec(b, Me, r);
                        Pf(b, a);
                        Ec(b, Me, Bh)
                    } else {


                        b[jc] = r;
                        Pf(b, a)
                    }
                }
            }


            d[eb]()
        }
    };


    var si = J.LockedTable = function (m, e) {

        var b = this, l = e[sb], k = e[$], n = b[gf] = e.leftLock || 0, i = b[Jh] = e.rightLock || 0, h = z('<div style="position:absolute;top:0px;left:0px"><div class="' + l + '-area" style="overflow:hidden">' + ge('<tr><th style="padding:0px"></th></tr>') + '</div><div class="' + l + '-layout" style="overflow:hidden;position:relative">' + '<div style="white-space:nowrap;position:absolute;top:0px;left:0px;"></div></div></div>'), d, c = b[hf] = V(Db, {
            element: d = h[S],
            type: k + Ci
        });


        c[md](d[S]);

        b[Wh] = [];
        Re[a](b, m, e);

        var j = b[C], f = j[F];


        rc(h, b[X]()[ub]);
        c[we](b);


        c = b[tg] = V(Db, {element: d = h[ub], type: k + "-area"});


        c[md](d = d[Ic]("tr")[0]);


        for (i = f - i; f--;) {
            c = j[f][g]();
            f < n ? rc(c, d[ub]) : f >= i && ac(c, d[ub])
        }
    }, Td = N(si, Re), Nf = {};


    function Xg(b, e, d, h) {
        var j = b[Ee], a = b[tg], f = b[gf], i = 0, g = e + t;


        d += t;

        a[X]()[S][c][v] = g;
        Qb(a[w]())[f][c][v] = d;
        a[p](e);
        b[hf][p](e);

        for (; a = b[Wh][i++];) {
            a[X]()[S][c][v] = g;
            Qb(a[w]())[f][c][v] = d;
            h && ph(a, a._cJoint)
        }
    }


    function ph(e, f) {
        var d = e[w]()[yb][yb], b = f[w]()[yb][yb], a;
        d[c][T] = b[c][T] = r;
        a = I(d[Vb], b[Vb]);
        d[c][T] = b[c][T] = a + t;
        e[p](0, a);
        f[p](0, a);
        return a
    }


    Td[te] = function () {
        var b = this;
        for (var
                 e = 0, g = b[C], f = b[X](), i = f[c], m = g[F] - b[Jh], f = f[ub][S], h = A(f, Qc), k = A(f, Fd), l = b[q](), j, d; d = g[e]; e++)if (d[Z]()) {


            j = d[q]();
            if (e < b[gf]) {

                h += j;
                d[Z] = zd
            } else if (e >= m) {


                k += j;
                d[Z] = zd
            }
        }


        i[Ac] = h + t;
        i[sd] = k + t;

        b[p](l);
        H[te][a](b);

        for (e = 0; d = g[e++];)delete d[Z];


        i[Bc] = ph(b[ed], b[tg]) + t
    };


    Td[eb] = function () {
        var b = this, d = b[X](), e = d[ub][S], c = b[yf];


        H[eb][a](b);


        c = c && c[Z]() ? c[q]() : 0;

        Xg(b, b[q](m) - A(d, Qc, Fd) - c, b[vb]() - (b[Ee] ? c : A(d, Ac, sd) - A(e, Qc, Fd)), m);


        H[eb][a](b);
        b[hf][p](0, b[Jb]())
    };


    Td[xf] = function (c, g) {
        var d = this, c = H[xf][a](d, c, g), i = d[Ld](), f = z(ge('<tr class="' + c[w]()[db] + '"><td style="padding:0px"></td></tr>', d[fc](), i), d[hf][w]()), b = Sf(E, f, {type: i + Sh}), h = b[C] = c[C], e = h[F], j = e - d[Jh];


        P(b, Pb);
        b[md](f = f[Ic]("tr")[0]);

        d[Wh][Zb](g, 0, b);
        P(c, Nf);
        P(b, Nf);
        c._cJoint = b;
        b._cJoint = c;

        for (; e--;) {
            b = h[e];
            e < d[gf] ? rc(b, f[ub]) : e >= j && ac(b, f[ub])
        }


        return c
    };


    Td[Ce] = function () {
        var b = this, c = b[yf], f = b[Ee], d = b[tg], e = A(d[X]()[S], v) - A(Qb(d[w]())[b[gf]], v);


        H[Ce][a](b);


        c = b[q](m) - A(b[X](), Qc, Fd) - (c && c[Z]() ? c[q]() : 0);

        Xg(b, c, c - e);

        b[p](b[q](), b[u]())
    };


    Td[ue] = function () {
        H[ue][a](this);
        this[hf][w]()[c].top = this[w]()[c].top
    };


    (function () {
        for (var
                 c = 0, b = [Ed, Tb, ne, Eb, ye, ve, re, kc, bf, hg, Rg, qg, Hg], a; a = b[c++];) {


            a = "$" + a;
            Nf[a] = new Function(r, "(ecui.ui.Table.Row." + a + "||ecui.ui.Control.prototype." + a + ").apply(this,arguments);ecui.ui.Control.prototype." + a + ".apply(this._cJoint,arguments)")
        }
    })();


    var li = J.Popup = function (b, f) {

        var d = this, h = 0, e;


        E[a](d, b, f);
        b = d[g]()[c];


        d[kb](O[hc]);
        d[kg]();
        d[Ub]();

        b[Q] = lc;
        b[cb] = xb;


        d[kb] = W;


        for (b = d[G](); e = b[h++];)e[vf] && e[Sc](f[sb] + "-item-complex")
    }, uc = N(li, E), Dc = {}, oc;


    function nh(a, c) {
        var b = a[vf] = V("Popup", {base: a[f]()[xc](), element: c});


        b[we](a);
        return b
    }


    Dc[nb] = function (b) {
        Nb[nb][a](this, b);
        this[Th]()[F] || oc[hd]()
    }, (Dc[ic] = function (b) {


        Nb[ic][a](this, b);
        b[Kc]()
    });


    Dc[Mc] = function (m) {
        var e = this, c = e[vf], h = e[f](), i = h[uh](), b = h[eg], l = cd(e[g]()), k = fe();


        Nb[Mc][a](e, m);
        if (b != c) {


            b && b[B]();
            if (c && c[G]()[0]) {


                var d = l[Y], j = c[q]();


                b = d + e[q]() - 4;
                d -= j - 4;
                if (i && (i.getX() > h.getX() && d > k[Y]) || b + j > k[Fe])b = d;


                c[mb](b, l.top - 4);
                c[jb]()
            }
        }
    };


    Dc[Nd] = function (a) {
        this[Th]()[0] || this[f]()[Dh]()
    };


    Dc[Rb] = function (b) {
        Nb[Rb][a](this, b);
        b[dd]() != this && oc[hd]()
    };


    Dc.add = function (b, a) {
        return (this[vf] || nh(this)).add(b, a)
    };


    Dc[Th] = function () {
        var a = this[vf];
        return a ? a[G]() : []
    };


    uc[Ub] = function () {
        var a = this, d = a[f](), e = a[G](), c = e[F], b = 0;


        d && d[Sc](d[fc]() + (c ? "-complex" : r));
        for (; c--;)b += e[c][u]();


        a[vg](0, b);
        a[Af](a[vb]())
    };


    uc[hd] = function () {
        for (var a = this, b; b = a[Pd]; a = b);
        a[B]()
    };


    uc[Qg] = function () {
        oc[hd]();
        return d
    };


    uc[Ef] = function (a) {
        var c = a[w](), b = _e(c);


        P(a, Dc);
        a[X]()[Je] = Cd;
        if (b && b[yc] == Gh) {


            Ib(b);

            this[zf](a, Wc(c));
            c[zb](b)
        }
    };


    uc[zf] = nh;


    uc[uh] = function () {
        var a = this[f]();
        return a && a[f]() || h
    };


    uc[B] = function () {
        var d = this, c = d[Pd], f = d[eg], e = b[B][a](d);
        if (e) {


            d[Dh]();
            f && f[B]();

            oc = c;
            c ? (c[eg] = h) : $c()
        }


        return e
    };


    uc[jb] = function () {
        var d = this, h = b[jb][a](d), e = fe(), f = d[g](), i = cd(f);
        if (h) {


            d[mb](Cb(I(i[Y], e[Y]), e[Fe] - d[q]()), Cb(I(i.top, e.top), e[Ke] - d[u]()));
            if (oc) {


                f[c][Tc] = A(oc[g](), Tc) + 1;
                d[Pd] = oc;
                oc[eg] = d
            } else {


                f[c][Tc] = xg;
                cg(d)
            }


            oc = d
        }


        return h
    };


    P(uc, gb);


    var ci = J.Listbox = function (e, c) {
        var b = this;
        c.hScroll = d;
        c.vScroll = m;
        b[Rc] = c[hb] || r;

        b[Uc] = W;
        Yc[a](b, e, c);
        delete b[Uc];

        b[jd] = b[Ne](xe);
        b[kg]();
        b[Ub]()
    }, ad = N(ci, Yc), Fc = {};


    function Uf(b) {
        var g = "_nTop", d = b[f](), e = d[jd], h = e[le](), a = Qe(d), c = b[g];


        b[g] = a;
        if (a > d[u]()) {
            if (a < c)a = 0; else {


                a = Fb((a - I(0, c)) / 3);

                a ? e.skip(a) : (b[g] = c)
            }

            a += b[rf]
        } else if (a < 0) {
            if (a > c)a = 0; else {


                a = Ud.ceil((a - Cb(0, c)) / 3);

                a ? e.skip(a) : (b[g] = c)
            }

            a += b[rf]
        } else a = Fb((d[Qh]() + a) / h);


        return I(0, Cb(a, d[G]()[F] - 1))
    }


    Fc[ic] = function (b) {
        Nb[ic][a](this, b);
        k[oe](this, b, "listbox")
    };


    Fc.$select = function () {
        var i = this, c = i[ai], b = i[rf], a = Uf(i), j = i[f]()[G](), d = 0, h = -1, e = 0, g = -1;
        if (a > b)if (a < c) {


            d = b;
            h = a - 1
        } else if (b < c) {


            d = b;
            h = c - 1;
            e = c + 1;
            g = a
        } else {


            e = b + 1;
            g = a
        } else if (a < b)if (a > c) {


            d = a + 1;
            h = b
        } else if (b > c) {


            d = c + 1;
            h = b;
            e = a;
            g = c - 1
        } else {


            e = a;
            g = b - 1
        }


        i[rf] = a;


        for (; d <= h;) {
            a = j[d++];
            a[Ab](Rd, !a[ug]())
        }


        for (; e <= g;)j[e++][Ab](Rd)
    };


    Fc.$selectend = function () {
        var a = this, c = a[ai], b = Uf(a), e = a[f]()[G](), d = Cb(c, b), g = I(c, b);
        if (c == b)a[Lb](!a[ug]()); else for (; d <= g;)e[d++][Lb]()
    };


    Fc.$selectstart = function () {
        var a = this;
        a[ai] = a[rf] = Uf(a);
        a[Ab](Rd)
    };


    Fc[ug] = function () {
        return !this[R][Md]
    };


    Fc[kb] = function (b) {
        var c = this;
        Nb[kb][a](c, b);
        if (b = c[f]())c[R] = If(c[R], b[Rc])
    };


    Fc[Lb] = function (a) {
        this[Ab](Rd, this[R][Md] = a === d)
    };


    ad[Ub] = function () {
        var a = this, f = "_nItemHeight", c = a[G](), d = c[F], e = a[jd], b = a[f] = a[f] || d && c[0][u]();
        if (b) {


            e.setStep(b);
            a[Af](a[vb]() - (d * b > a[Jb]() ? e[q]() : 0));


            a[ib]()
        }
    };


    ad[Ef] = function (a, c) {
        var b = a[w]();

        (a[R] = z(yg + this[Rc] + '" disabled>', b))[K] = c === bb ? b[Vc](K) || r : c;

        P(a, Fc);
        a[Lb](!(!b[Vc](Rd)))
    };


    ad.getName = function () {
        return this[Rc]
    };


    ad.getSelected = function () {
        for (var d = 0, c = this[G](), a, b = []; a = c[d++];)a[ug]() && b[L](a);


        return b
    };


    ad.selectAll = function () {
        for (var c = 0, b = this[G](), a; a = b[c++];)a[Lb]()
    };


    ad[Mg] = function (b) {
        for (var d = 0, c = this[G](), a; a = c[d++];)a[R] = If(a[R], b);


        this[Rc] = b
    };


    P(ad, gb);


    var ni = J.Progress = function (b, d) {

        var c = this, e = d[sb], f;


        E[a](c, b, d);

        Te(b = c[w]());
        f = b[jc];
        c._eText = z(Li + e + '-text"></div>', b);


        c[Ig] = z(Li + e + '-complete"></div>', b);


        c.setText(d.rate || 0, f)
    }, Rf = N(ni, E);


    Rf[qb] = function () {
        this._eText = this[Ig] = h;
        b[qb][a](this)
    };


    Rf[p] = function (h, g) {
        var d = this, f = d._eText[c], e = d[Ig][c];

        b[p][a](d, h, g);

        f[v] = e[v] = d[vb]() + t;
        f[T] = e[T] = d[Jb]() + t
    };


    Rf.setText = function (a, e) {
        var b = this, d = b[Ig];

        a = I(Cb(a, 1), 0);
        b._eText[jc] = d[jc] = e || a * 100 + "%";
        d[c].clip = "rect(0px," + Fb(a * b[vb]()) + "px," + b[Jb]() + "px,0px)"
    };


    var he = J.SWFControl = function (e, b) {

        var c = this._sMovieId = "ECUI_SWF_" + ++ji, d = b.vars || {};


        E[a](this, e, b);

        d.id = c;
        oi({
            id: c,
            url: b.swf,
            width: b[v] || 1,
            height: b[T] || 1,
            wmode: b.wmode || "opaque",
            bgcolor: b.bgcolor || "#FFFFFF",
            align: b.align || "middle",
            vars: d
        }, e)
    }, $d = N(he, E), ji = 0;


    $d[df] = function () {
        var a = this;
        a[Vh]() ? a.$load() : new Wd(a[df], 100, a)
    };


    $d.$load = W;


    $d[ze] = function () {
        var a = this._sMovieId;
        return O[a] || Ue[a]
    };


    $d[Vh] = function () {
        var a = this[ze]();
        return !(!(a && a[Vh]))
    };


    var qi = J.PCTPStream = function (c, b) {

        this._sUrl = b.url;
        he[a](this, c, b)
    }, Yd = N(qi, he);


    Yd.$load = function () {
        $d.$load[a](this);
        this.connect(this._sUrl)
    };


    Yd.$error = function (a) {
        this.onerror && this.onerror(a)
    };


    Yd.$receive = function (a) {
        this.onreceive && this.onreceive(a)
    };


    Yd.connect = function (a) {
        a = a || this._sUrl;
        a && this[ze]().connect(this._sUrl = a)
    };


    Yd.close = function () {
        this[ze]().close();
        this._sUrl = r
    };


    var ii = J.Storage = function (b, c) {

        he[a](this, b, c)
    }, oh = N(ii, he);


    oh.restore = function (h, f) {
        var a = di(this[ze]().restore(h[od](3)));
        if (a.form) {


            var c = a[hb], k = a[_h], i = 0, b = f;
            if (!b) {


                b = z("form", O[hc]);
                b[Qd](hb, c);
                b[Qd](jg, a[jg]);
                b[Qd](Cg, a[Cg]), b[Qd](lb, a[lb])
            }


            for (; a = k[i++];) {
                var e = a[hb], g = a[$], j = a[K], d = 0;
                if (g != Hi)z(yg + e + Dd, b)[K] = j; else for (c = a.values, (d = c[F]); d--;)z(yg + e + Dd, b)[K] = c[d]
            }
        } else b = a.data;


        return b
    };


    oh.save = function (b) {
        if (b.nodeType == 1) {

            var a = b, b = {}, f = b[_h] = [], h = a[_h], j = 0, c;


            b[hb] = a[Vc](hb);
            b[jg] = a[Vc](jg);
            b[Cg] = a[Vc](Cg);
            b[lb] = a[Vc](lb);

            for (; a = h[j++];) {
                c = {};
                if (c[hb] = a[hb]) {

                    switch (c[$] = a[$]) {
                        case"radio":
                        case"checkbox":
                            if (!a[wc])continue;
                        case lf:
                        case"textarea":
                        case"text":
                        case"select-one":
                        case"password":


                            c[K] = a[K];
                            break;
                        case Hi:
                            for (var


                                     g = 0, i = a.options, d, e = c.values = {}; d = i[g++];)d[Rd] && e[L](d[K])
                    }


                    c.id = a.id;
                    f[L](c)
                }
            }


            b.form = 1
        } else b = {data: b};


        return pd + this[ze]().save(ui(b))
    };


    function de(a, b) {
        z('<div class="' + b + '" style="position:absolute;top:0px;left:0px"></div>', a[g]())
    }


    var Hb = Xd.Decorator = function (b, i) {

        var f = this, h = b[Jd](), e = (f[zc] = Hb[h] || b)[g](), a = e[c], d = f[vc] = z();


        d[db] = f[Mb] = i || b[fc]() + "-decorator";
        d[c][Nc] = "position:" + (a[cb] == xb ? a[cb] : Yh) + ";top:" + (a.top || og) + ";left:" + (a[Y] || og) + (a[Q] ? ";display:" + a[Q] : r);


        a[cb] = Yh;
        a.top = og;
        a[Y] = og;
        a[Q] = r;

        rc(d, e);
        d[zb](e);

        Hb[h] = f;


        P(b, wd)
    }, Ob = Hb[Jc], wd = {};


    Ob[af] = function (c, b) {
        var a = this;
        (b ? Lf : Ad)(a[vc], a[Mb] + ld + c);
        a[zc][af](c, b, m);
        a[ib]()
    };


    Ob[qb] = function () {
        this[vc] = h
    };


    Ob[p] = function (d, b) {
        var a = this, e = a[vc], f = e[c], g = a[zc], h = Ze(e), i = Xe(e);


        a[zc][p](d && d - h, b && b - i, m);

        f[v] = (d = g[q](m)) + t;
        f[T] = (b = g[u](m)) + t;

        a[rd] = d + h;
        a[qd] = b + i;
        a[ib]()
    };


    Ob[xc] = function () {
        return this[Mb]
    };


    Ob[u] = function () {
        var a = this;
        return a[qd] = a[qd] || a[zc][u](m) + Xe(a[vc])
    };


    Ob[gc] = function () {
        return this[zc][gc](m) + Xe(this[vc])
    };


    Ob[wg] = function () {
        return this[zc]
    };


    Ob[g] = function () {
        return this[vc]
    };


    Ob[q] = function () {
        var a = this;
        return a[rd] = a[rd] || a[zc][q](m) + Ze(a[vc])
    };


    Ob[bc] = function () {
        return this[zc][bc](m) + Ze(this[vc])
    };


    Ob[ib] = W;


    wd[qb] = function () {
        this.clear();
        this[qb]()
    };


    wd.clear = function () {
        var b = this;
        for (a in wd)delete b[a];


        var c = b[Jd](), a = Hb[c], d = a[vc];


        rc(b[g](), d);
        Ib(d);
        for (; a != b; a = a[zc])a[qb]();


        Hb[c] = h
    };


    wd[g] = function () {
        return Hb[this[Jd]()][g]()
    };


    (function () {


        for (var e = 0, d = [[p, 2], [af, 2], [bc, 0], [gc, 0], [q, 0], [u, 0]], b, c; b = d[e++];) {


            c = b[0];
            wd[c] = new Function("var o=this,d=ecui.ext.Decorator[o.getUID()],r=arguments;return r[" + b[1] + "]?o.constructor.prototype." + c + ".apply(o,r):d." + c + ".apply(d,r)")
        }


        b = Xd.LRDecorator = function (c, b) {
            Hb[a](this, c, b);

            b = this[xc]();
            de(c, b + "-left");
            de(c, b + "-right")
        };


        N(b, Hb)[ib] = function () {
            var a = this[g](), c = M(a, Bc), f = M(a, Ac), d = this[wg](), b = d[u](m) + t, e = a[S];


            Gc(e, {top: c, left: (sc(f) || 0) + d[q](m) + t, width: M(a, sd), height: b});


            Gc(e[Eh], {top: c, width: f, height: b})
        };


        b = Xd.TBDecorator = function (c, b) {
            Hb[a](this, c, b);

            b = this[xc]();
            de(c, b + "-top");
            de(c, b + "-bottom")
        };


        N(b, Hb)[ib] = function () {
            var a = this[g](), b = M(a, Bc), f = M(a, Ac), c = this[wg](), d = c[q](m) + t, e = a[S];


            Gc(e, {top: (sc(b) || 0) + c[u](m) + t, left: f, width: d, height: M(a, De)});


            Gc(e[Eh], {left: f, width: d, height: b})
        };


        b = Xd.MagicDecorator = function (d, c) {
            Hb[a](this, d, c);

            c = this[xc]() + "-widget";
            for (var b = 0; b < 9; b++)b != 4 && de(d, c + b)
        };


        N(b, Hb)[ib] = function () {
            var a = this[g](), j = this[wg](), c = 9, e = M(a, Bc), h = M(a, Ac), b = j[q](m), d = j[u](m), n = ["0px", e, (sc(e) || 0) + d + t], l = ["0px", h, (sc(h) || 0) + b + t], f = a[S];


            b = [h, b + t, M(a, sd)];
            d = [e, d + t, M(a, De)];

            for (; c--;)if (c != 4) {

                var k = Fb(c / 3), i = c % 3;


                Gc(f, {top: n[k], left: l[i], width: b[i], height: d[k]});
                f = f[Eh]
            }
        }
    })()
})()