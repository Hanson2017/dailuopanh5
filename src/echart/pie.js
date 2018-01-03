export function pieFund(data) {
    return {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} ({d}%)"
        },
        calculable: true,
        series: [
            {
                name: '投资平台',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: data
            }
        ]
    }
}

export function pieYulun(data) {
    return {
        title: {
            text: '过去48小时舆论热点分布',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} ({d}%)"
        },
        calculable: true,
        series: [
            {
                name: '舆论分布',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
}

