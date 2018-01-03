import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { Grid, Icon } from 'antd-mobile';
import { Link, History } from 'react-router';

import './index.scss'



const iconList = [
    { title: '个人中心', iconName: 'homeNav-personal', router: 'member', tabId: null },
    { title: '综合评级', iconName: 'homeNav-pj', router: 'pingji', tabId: { tab1: 0 } },
    { title: '示范投资', iconName: 'homeNav-fund', router: 'fund', tabId: null },
    { title: '优惠活动', iconName: 'homeNav-hd', router: 'activity', tabId: null },
    { title: '数据查询', iconName: 'homeNav-data', router: 'data', tabId: null },
    { title: '健康指标', iconName: 'homeNav-health', router: 'health', tabId: { tab1: 0 } },
    { title: '舆论监控', iconName: 'homeNav-yulun', router: 'yulun', tabId: null },
    { title: '流量监控', iconName: 'homeNav-flow', router: 'flow', tabId: null },
    { title: '风投系平台', iconName: 'homeNav-fengtou', router: 'query', tabId: { tab1: 0, tab2: 0, column: 'rongzi' } },
    { title: '上市系平台', iconName: 'homeNav-shangshi', router: 'query', tabId: { tab1: 0, tab2: 1, column: 'rongzi' } },
    { title: '国资系平台', iconName: 'homeNav-guozi', router: 'query', tabId: { tab1: 0, tab2: 2, column: 'rongzi' } },
    { title: '银行系平台', iconName: 'homeNav-yinhang', router: 'query', tabId: { tab1: 0, tab2: 3, column: 'rongzi' } },
    { title: '车贷类平台', iconName: 'homeNav-chedai', router: 'query', tabId: { tab1: 1, tab2: 0, column: 'yewu' } },
    { title: '房贷类平台', iconName: 'homeNav-fangdai', router: 'query', tabId: { tab1: 1, tab2: 1, column: 'yewu' } },
    { title: '票据类平台', iconName: 'homeNav-piaoju', router: 'query', tabId: { tab1: 1, tab2: 2, column: 'yewu' } },
    { title: '个信类平台', iconName: 'homeNav-gexin', router: 'query', tabId: { tab1: 1, tab2: 3, column: 'yewu' } },
    { title: '企贷系平台', iconName: 'homeNav-qiye', router: 'query', tabId: { tab1: 1, tab2: 4, column: 'yewu' } },
    { title: '网基类平台', iconName: 'homeNav-wangji', router: 'query', tabId: { tab1: 1, tab2: 5, column: 'yewu' } },
    { title: '活期类平台', iconName: 'homeNav-huoqi', router: 'query', tabId: { tab1: 1, tab2: 6, column: 'yewu' } },
    { title: '5年老平台', iconName: 'homeNav-five', router: 'fiveYears', tabId: null },
    { title: '黑名单', iconName: 'homeNav-black', router: 'black' },
    { title: '争议名单', iconName: 'homeNav-zhengyi', router: 'zhengyi' },
    { title: '数据报表', iconName: 'homeNav-baobiao', router: 'reports' }
];


const data = iconList.map((item, i) => ({
    icon: <Icon type={require('../../../assets/icons/' + item.iconName + '.svg')} color={'#4d93e1'} size={'md'} />,
    text: item.title,
}));


const NavList = createReactClass({
    mixins: [History],
    render() {

        return (
            <div className='NavList'>
                <Grid data={data} hasLine={false} onClick={(el, index) => {
                    this.history.pushState(iconList[index].tabId, iconList[index].router)
                }} />
            </div>
        )
    },
    componentDidMount() {
    }
})

export default NavList
