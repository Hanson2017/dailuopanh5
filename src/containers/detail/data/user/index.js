import React, { Component } from 'react';
import './index.scss';
import Title from '../../../../components/title';

import { barCharSex } from '../../../../echart/bar';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ageText: ['18岁及以下', '19-24岁', '25-34岁', '35-49岁', '50岁及以上'],
            ageList: [],
            ageMaxValue: 0
        };
    }
    render() {
        let data = this.props.data;
        if (data != null) {
            var areaData = data.areaDetail.data;
        }
        if (data != null) {
            return (
                <div className='userData'>
                    <Title titleText={'基础信息'} />
                    <div className='areaDetail'>
                        {
                            areaData != null ?
                                <ul className='userDataList areaList'>
                                    {
                                        areaData.list.map((list, i) => {
                                            return (
                                                <li key={i}>
                                                    <span className={'ic1 ' + ('id' + i)}>{i + 1}</span>
                                                    <span className='ic2'>{list.province}</span>
                                                    <span className='progress ic3'><i style={{ width: list.perctent * 100 + '%' }}></i></span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                :
                                <div className='dataNull'>暂无数据</div>
                        }
                    </div>
                    <Title titleText={'投资人年龄占比'} />
                    <div className='ageDetail'>
                        {
                            data.age != '' ?
                                <ul className='userDataList ageList'>
                                    {
                                        this.state.ageList.map((list, i) => {
                                            return (
                                                <li key={i}>
                                                    <span className='ic1'>{this.state.ageText[i]}</span>
                                                    <span className='ic2'>{list}%</span>
                                                    <span className='progress ic3'><i style={{ width: list / this.state.ageMaxValue * 100 + '%' }}></i></span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                :
                                <div className='dataNull'>暂无数据</div>
                        }
                    </div>
                    <Title titleText={'投资人性别占比'} />
                    {
                        data.male != 0 ?
                            <div className='echartSex' id='echartSex'></div>
                            :
                            <div className='dataNull'>暂无数据</div>
                    }

                </div>
            )
        }
        else {
            return (
                <div className='dataNull'>暂无用户数据</div>
            )
        }

    }
    componentDidMount() {
        let data = this.props.data;
        let that = this;
        if (data != null && data.age != '') {
            var age = data.age.split(',')
            var newdata = [];
            for (var i = 0; i < age.length; i++) {
                newdata.push(parseInt(age[i]))
            }
            that.setState({
                ageList: newdata,
                ageMaxValue: Math.max.apply(null, newdata)
            })
        }

        if (data.male != 0) {
            const echartSex = document.getElementById('echartSex');
            var sexData = [data.male, data.female];
            echarts.init(echartSex).setOption(barCharSex(sexData));
        }



    }
}