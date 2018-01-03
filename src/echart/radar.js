export function radarEchart(platname, platdata, platdata_ind) {
    return {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'center',
            data: [{ name: platname, icon: 'circle' }, { name: '行业平均数值', icon: 'circle' }]
        },
        grid: {
            borderWidth: 0,
            x: 20,
            x2: 0,
            y: 0,
            y2: 0
        },
        calculable: true,
        polar: [
            {
                indicator: [
                    { text: '资金流', min: -50, max: 100 },
                    { text: '分散度', min: -50, max: 100 },
                    { text: '流动性', min: -50, max: 100 },
                    { text: '收益率', min: -50, max: 100 },
                    { text: '人气', min: -50, max: 100 },
                    { text: '体量', min: -50, max: 100 },
                    { text: '忠诚度', min: -50, max: 100 },
                    { text: '成长性', min: -50, max: 100 }
                ],
                radius: '50%',
                center: ['50%', '55%']
            }
        ],
        series: [
            {
                name: platname,
                type: 'radar',
                symbolSize: 3,
                tooltip: {
                    trigger: 'item'
                },
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'helianthus'
                        }
                    }
                },
                data: [
                    {
                        itemStyle: {
                            normal: {
                                color: '#ff7f50'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#ff7f50'
                            }
                        },
                        value: platdata,
                        name: platname
                    },
                    {
                        itemStyle: {
                            normal: {
                                color: '#87cefa'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#87cefa'
                            }
                        },
                        value: platdata_ind,
                        name: '行业平均数值'
                    }

                ]
            }
        ]
    }
}