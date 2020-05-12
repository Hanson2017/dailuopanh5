import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/title';

const dataList = [
    { title: '风投系', tabId: { tab1: 0, tab2: 0 } },
    { title: '上市系', tabId: { tab1: 0, tab2: 1 } },
    { title: '国资系', tabId: { tab1: 0, tab2: 2 } },
    { title: '银行系', tabId: { tab1: 0, tab2: 3 } },
    { title: '民营系', tabId: { tab1: 0, tab2: 4 } },
    { title: '车贷类', tabId: { tab1: 1, tab2: 0 } },
    { title: '房贷类', tabId: { tab1: 1, tab2: 1 } },
    { title: '票据类', tabId: { tab1: 1, tab2: 2 } },
    { title: '个信类', tabId: { tab1: 1, tab2: 3 } },
    { title: '企业类', tabId: { tab1: 1, tab2: 4 } },
    { title: '网基类', tabId: { tab1: 1, tab2: 5 } },
    { title: '其他类', tabId: { tab1: 1, tab2: 6 } },
    { title: '银行直连', tabId: { tab1: 4, tab2: 0 } },
    { title: '直接存管', tabId: { tab1: 4, tab2: 1 } },
    { title: '联合存管', tabId: { tab1: 4, tab2: 2 } },
]


export default class TabDataQuery extends React.Component {
    render() {
        return (
            <div className="query mt10 box">
                <Title data={'多维度分析'} screenUrlInfo={{ screenUrl: '/query', tabId: null }} />
                <div className="navQuery">
                    {
                        dataList.map((item, i) => {
                            const tabId=item.tabId;
                            return (
                                <Link  to={{pathname: '/query/index',state: {tabId}}} key={i} className="nav">{item.title}</Link>
                            )
                        })
                    }
                    <Link to={'/query'} className="nav more">更多</Link>
                </div>
            </div>
        )
    }
}