import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';
import Title from '../../../../../components/title';
import Theme from '../../../../../utils/theme';

class List extends React.Component {
    render() {
        const { data, iconName, title } = this.props;
        var color;
        if (data.status == '强' || data.status == '偏强' || data.status == '极强') {
            color = '#39B54A';
        }
        else if (data.status == '偏弱' || data.status == '正常') {
            color = '#FFA500';
        }
        else {
            color = '#ED1C24';
        }
        return (
            <div className="listItem">
                <Icon type={require('../../../../../assets/icons/new/' + iconName + '.svg')} color={color} size={'lg'} />
                <span className="text">{title}<i style={{ color: color }}>{data.status}</i></span>
            </div>
        )
    }
}


export default class DetailHealthAllZhibiao extends React.Component {
    render() {
        const { data } = this.props;
        const dataDetail = data.dataDetail;
        const inamount = dataDetail.inamount; //资金流
        const mobility = dataDetail.mobility; //流动性
        const dispersion = dataDetail.dispersion; //分散度
        const popularity = dataDetail.popularity; //人气
        const stayStill = dataDetail.stayStill; //体量
        const loyalty = dataDetail.loyalty; //忠诚度
        const growth = dataDetail.growth; //成长性
        const rate = dataDetail.rate; //收益率
        return (
            <div className="box mt10 zhibiao">
                <Title data={'指标概况'} />
                {
                    data.dlpDetail !== null && data.dlpDetail !== '' ?
                        <div className="content">
                            <p className="note">数据说明：极强 &gt; 强 &gt; 偏强 &gt; 正常 &gt; 偏弱 &gt; 弱 &gt; 极弱</p>
                            <div className="list">
                                <List data={inamount} iconName={'zb-zijin'} title={'资金流'} />
                                <List data={mobility} iconName={'zb-liudong'} title={'流动性'} />
                                <List data={dispersion} iconName={'zb-fensan'} title={'分散度'} />
                                <List data={popularity} iconName={'zb-renqi'} title={'人气'} />
                                <List data={stayStill} iconName={'zb-tiliang'} title={'体量'} />
                                <List data={loyalty} iconName={'zb-zhongchengdu'} title={'忠诚度'} />
                                <List data={growth} iconName={'zb-chengzhang'} title={'成长性'} />
                                <List data={rate} iconName={'zb-shouyi'} title={'收益率'} />
                            </div>
                        </div>
                        :
                        <div className="null">暂无数据</div>
                }

            </div>
        )
    }
}