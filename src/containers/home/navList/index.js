import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';
import Util from '../../../utils/util';
import Api from '../../../utils/api';
import Theme from '../../../utils/theme';
import Title from '../../../components/title';
import './index.scss';


const data = [
    { title: '机构评级', iconName: 'nav-pingjiJG', pathName: '/pingji/jigou', tabId: null },
    { title: '健康度分析', iconName: 'nav-health', pathName: '/health', tabId: null },
    { title: '数据详情', iconName: 'nav-data', pathName: '/data', tabId: null },
    { title: '示范出借', iconName: 'nav-fund', pathName: '/fund', tabId: null },
    { title: '热门活动', iconName: 'nav-activity', pathName: '/activity', tabId: null },
    { title: '评测监控', iconName: 'nav-pingce', pathName: '/pingce', tabId: 1 },
    { title: '舆论监控', iconName: 'nav-yulun', pathName: '/yulun', tabId: null },
    { title: '点评监控', iconName: 'nav-dianping', pathName: '/comment', tabId: null },
    { title: '流量监控', iconName: 'nav-flow', pathName: '/flow', tabId: null },
    { title: '多维度查询', iconName: 'nav-query', pathName: '/query', tabId: { tab1: 0, tab2: 0 } },
    { title: '贷罗盘论坛', iconName: 'nav-people', pathName: '/pingji/meiti', tabId: null },
    { title: '数据报表', iconName: 'nav-report', pathName: '/reports' },

    { title: '黑名单', iconName: 'nav-black', pathName: '/black' },
    { title: '争议名单', iconName: 'nav-zhengyi', pathName: '/zhengyi' },
    { title: '个人中心', iconName: 'nav-personal', pathName: '/member', tabId: 0 },

];


export default class NavList extends React.Component {
    render() {
        const history = this.props.history;
        return (
            <div className='homeNavListContainer box mt10'>
                <Title data={'快捷菜单'} />
                <div className="homeNavList">
                    {
                        data.map((item, i) => {
                            const tabId = item.tabId;
                            const location = { pathname: item.pathName, state: { tabId } };
                            if (item.title == '贷罗盘论坛') {
                                return (
                                    <a key={i} className="link" target="_blank" href={Util.goBBs(Api.bbsHome)}>
                                        <Icon type={require('../../../assets/icons/new/nav/' + item.iconName + '.svg')} color={Theme.color2} size={'md'} />
                                        <span className="text">{item.title}</span>
                                    </a>
                                )
                            }
                            else {
                                return (
                                    <Link to={location} className='link' key={i}>
                                        <Icon type={require('../../../assets/icons/new/nav/' + item.iconName + '.svg')} color={Theme.color2} size={'md'} />
                                        <span className="text">{item.title}</span>
                                    </Link>
                                )
                            }



                        })
                    }
                </div>
            </div>
        )
    }
}

