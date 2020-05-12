import React, { Component } from 'react';

import Guquan from './guquan';
import Shouyiren from './shouyiren';
import Member from './member';
import Biangeng from './biangeng';

export default class DetailInfoGudong extends React.Component {
    render() {
        const { data } = this.props;

        var gudongxinxi = null;
        var gudongchengyuan = null;
        var shouyiren = null;
        var biangeng = null;

        if (data != null) {
            gudongxinxi = data.gudongxinxi;
            gudongchengyuan = data.zhuyaorenyuan;
            shouyiren = data.shouyiren;
            biangeng = data.gongshangbiangeng;
        }
        return (
            <div className="gudong">
                <Guquan data={gudongxinxi} title={'股权信息'} />
                <Biangeng data={biangeng} />
                <Member data={gudongchengyuan} />
                <Shouyiren data={shouyiren} />

            </div>
        )
    }
}