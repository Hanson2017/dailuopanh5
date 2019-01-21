import React, { Component } from 'react';
import Title from '../../../components/title';
import Item from './item';
import './index.scss';

export default class HomeFund extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="homeFundContainer box mt10">
                <Title data={'示范出借概况'} screenUrlInfo={{ screenUrl: '/fund', tabId: null }} />
                <div className="content">
                    <Item typeNo={1} type={'稳健型'} data={data.Listfund1} />
                    <Item typeNo={2} type={'平衡型'} data={data.Listfund2} />
                    <Item typeNo={3} type={'收益型'} data={data.Listfund3} />
                </div>
            </div>
        )
    }
}