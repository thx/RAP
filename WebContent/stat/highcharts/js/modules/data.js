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
