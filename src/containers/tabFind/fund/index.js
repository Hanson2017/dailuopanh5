import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/title';
import Item from '../../home/fund/item';

export default class TabFindFund extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="fund box">
                <Title data={'示范出借概况'} screenUrlInfo={{ screenUrl: '/fund', tabId: null }} />
                <div className="content">
                   
                    <div className="list">
                        <Item typeNo={1} type={'稳健型'} data={data.list.Listfund1} />
                        <Item typeNo={2} type={'平衡型'} data={data.list.Listfund2} />
                        <Item typeNo={3} type={'收益型'} data={data.list.Listfund3} />
                    </div>
                    <div className="note">
                        示范出借是贷罗盘运营团队发起的网贷项目出借组合，按照风险评估分为“稳健型”、“平衡型”、“收益型”三种，可供广大用户参考。
                    </div>
                </div>
            </div>
        )
    }
}