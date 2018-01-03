import React, { Component, PropTypes } from 'react';
import TabBar from '../../../components/tabBar2/tabs';
import List from '../temp/list';

const tabNames = [
    { title: '车贷',  type: { column: 'yewu', type: 'chedai', columnID: 'queryChedai' },Ttype:'车贷' },
    { title: '房贷',  type: { column: 'yewu', type: 'fangdai', columnID: 'queryFangdai' },Ttype:'房贷' },
    { title: '票据',  type: { column: 'yewu', type: 'piaojudiya', columnID: 'queryPiaoju' },Ttype:'票据' },
    { title: '个信',  type: { column: 'yewu', type: 'xinyongdai', columnID: 'queryGexin' },Ttype:'个信' },
    { title: '企业',  type: { column: 'yewu', type: 'qiyedai', columnID: 'queryQiye' },Ttype:'企业' },
    { title: '网基',  type: { column: 'yewu', type: 'zhaiquanzuhe', columnID: 'queryWangji' },Ttype:'网基' },
    { title: '活期',  type: { column: 'yewu', type: 'huoqilicai', columnID: 'queryHuoqi' },Ttype:'活期' },
    { title: '其它',  type: { column: 'yewu', type: 'qita', columnID: 'queryOther' },Ttype:'其它' },

]

export default class Yewu extends React.Component {
    render() {
        const tabIndex = this.props.tabIndex;
        return (
            <TabBar current={tabIndex}>
            {
                tabNames.map((tab,i)=>{
                    return (
                        <List key={i} name={tab.title} type={tab.type} Ttype={tab.Ttype} />
                    )
                })
            }
            
        </TabBar>
        )

    }
}