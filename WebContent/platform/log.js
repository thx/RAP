'use strict';

!function (global) {
    var _trendData = null;
    var _realtimeData = null;
    var NO_DATA_HTML = '<div class="alert alert-info" style="margin:15px;">暂时没有数据</div>';
    var FLUSH_SEC = 10;
    var _realtimeIndex = -1;

    // Radialize the colors
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {cx: 0.5, cy: 0.3, r: 0.7},
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

    Highcharts.setOptions({
        credits: {
            enabled: false
        },
        global: {
            useUTC: false
        }
    });

    function toTitle(c) {
        switch (c) {
            case 'user':
                return '用户';
            case 'project':
                return '项目';
            case 'checkIn':
                return '文档提交';
        }
        return c;
    }

    function loadTrends(data) {
        _trendData = data;
        loadTrend('user');
        loadTrend('project');
        loadTrend('checkIn');
    }

    function loadTrend(key) {
        var categories = [];
        var series = [];
        var i, xLoaded = false, n, key, trendData;

        var serie;
        var data = _trendData[key];
        var sum = data[data.length - 1].startValue || 0;

        if (!data || !data.length) {
            $('#' + key + 'Trend').html(NO_DATA_HTML);
            return;
        }

        serie = {name: toTitle(key) + '数', data: []};
        for (i = 0, n = data.length - 1; i < n; i++) {

            sum += data[i].num;
            serie.data.push(sum);
            if (typeof data[i].date === 'string') {
                data[i].date = new Date(data[i].date);
            }
            categories[i] = $.format.date(data[i].date, 'yyyy-MM');

        }
        series.push(serie);


        $('#' + key + 'Trend').highcharts({
            chart: {
                width: 570,
                height: 350
            },
            title: {
                text: toTitle(key) + '数变化趋势',
                x: -20 //center
            },
            subtitle: {
                text: '最近12月变化趋势数据',
                x: -20
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: toTitle(key) + '数'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: series
        });
    }

    function loadStatistics(data) {
        var chartData = [];

        // render action use pie charts
        var teamData = data.actionNumByTeam;

        var i = 0, n = teamData.length, item;

        for (; i < n; i++) {
            item = teamData[i];
            if (i == 0) {
                chartData.push({
                    name: item.name,
                    y: item.num,
                    sliced: true,
                    selected: true
                });
            } else {
                chartData.push([item.name, item.num]);
            }
        }

        $('#team').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: '各团队使用RAP管理的接口数'
            },
            tooltip: {
                pointFormat: '{series.name}: 定义了 <b>{point.y}</b> 个接口，占比: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '接口数',
                data: chartData
            }]
        });

        // render mock data column chart
        var mockData = data.mockNumByProject;
        var mockChartData = [];
        var categories = [];

        i = 0;
        n = mockData.length;

        for (; i < n; i++) {
            item = mockData[i];
            mockChartData.push({
                name: item.name,
                y: item.mockNum
            });
            categories.push(item.name);
        }

        $('#mockByProjectTop5').highcharts({
            chart: {
                type: 'column',
                margin: 75,
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            xAxis: {
                categories: categories
            },
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            title: {
                text: 'Mock调用TOP5'
            },
            series: [{
                name: 'Mock服务调用次数',
                data: mockChartData
            }]
        });

        // render mock data column chart
        var mockDataToday = data.mockNumByProjectToday;
        var mockChartDataToday = [];
        var categoriesToday = [];

        i = 0;
        n = mockDataToday.length;

        for (; i < n; i++) {
            item = mockDataToday[i];
            mockChartDataToday.push({
                name: item.name,
                y: item.mockNum
            });
            categoriesToday.push(item.name);
        }

        $('#mockByProjectTop5Today').highcharts({
            chart: {
                type: 'column',
                margin: 75,
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            xAxis: {
                categories: categoriesToday
            },
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            title: {
                text: '今日Mock调用TOP5'
            },
            series: [{
                name: 'Mock服务调用次数',
                data: mockChartDataToday
            }]
        });
    }

    function loadRealtime(startData, updateUrl, serverTime) {
        _realtimeData = startData;
        _realtimeIndex = startData.length - FLUSH_SEC;

        $('#realtime').highcharts({
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {

                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            if (_realtimeIndex >= _realtimeData.length) {
                                return;
                            }
                            var item = _realtimeData[_realtimeIndex++];
                            series.addPoint([item.time, item.count], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '实时服务器QPS'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                min: 0
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: '服务器访问次数',
                data: (function () {
                    // intialize realtime data
                    var data = [],
                        i;

                    for (i = 0; i < startData.length - FLUSH_SEC; i += 1) {
                        data.push({
                            x: startData[i].time,
                            y: startData[i].count || 0
                        });
                    }

                    // data loader
                    function dynamicallyLoadData() {
                        $.ajax({
                            url: updateUrl,
                            data: {
                                time: _realtimeData[_realtimeData.length - 1].time
                            },
                            success: function (json) {
                                var data = JSON.parse(json);
                                for (var i = 0; i < data.length; i++) {
                                    _realtimeData.push(data[i]);
                                }
                                setTimeout(dynamicallyLoadData, 5000);
                            }
                        });
                    }

                    setTimeout(dynamicallyLoadData, 5000);

                    return data;
                }())
            }]
        });
    }

    global.loadTrends = loadTrends;
    global.loadStatistics = loadStatistics;
    global.loadRealtime = loadRealtime;
    global.getRealtimeData = function () {
        return _realtimeData
    };
}(this);