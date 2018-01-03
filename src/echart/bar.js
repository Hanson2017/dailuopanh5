export function barChartBijiao(title, dataName, dataSource) {
    return {
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            x: 10,
            x2: 0,
            y: 30,
            y2: 0
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: dataName
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                name: title,
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = [
                                '#2da9d7', '#ccc', '#ccc', '#ccc'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: dataSource
            }
        ]
    };

}

export function barChartHealth(title, name, xdata, data, x) {
    return {
        title: {
            x: 'left',
            text: title,
            textStyle: {
                color: '#999',
                fontSize: '12',
                fontWeight: 'normal',
                fontFamily: '微软雅黑'

            }
        },
        tooltip: {},
        calculable: true,
        grid: {
            borderWidth: 0,
            x: x,
            x2: 20,
            y: 32,
            y2: 40
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    rotate: 30,
                    textStyle: {
                        color: '#777'
                    }
                },
                axisLine: {
                    show: true,

                    lineStyle: {
                        color: '#a0cdfa',
                        width: 1,
                        type: 'solid'
                    }

                },
                axisTick: {

                    lineStyle: {
                        color: '#ccc'
                    }
                },
                data: xdata
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitNumber: 3,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#999',
                        width: 1,
                        type: 'solid'
                    }

                }

            }
        ],
        series: [
            {
                name: name,
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#a0cdfa'
                    }
                },
                data: data
            }
        ]
    }
}

export function barCharSex(data) {
    return{
        tooltip: {
            trigger: 'item',
            show: false
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            x:0,
            x2:0,
            y:50,
            y2:0
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['男', '女']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                name: '性别分布',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                             '#27727B','#E87C25'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}%'
                        }
                    }
                },
                data: data
                
            }
        ]
    }
}