
import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Title from '../../../../components/title';

class List extends React.Component {
    render() {
        const { label, data, score, score2 } = this.props;
        if (data !== null) {
            return (
                <div className={label == '综合指数' ? "list zh" : 'list'}>
                    <div className="hd">
                        <span className="label">{label}</span>
                        <span className="score">{data[score]}&nbsp;{score2 ? data[score2] : null}</span>
                        <span className="orderText">统计{data.totalNum}家平台中排名</span>
                        <span className="ordernum">{data.ordernum}</span>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={label == '综合指数' ? "list zh" : 'list'}>
                    <div className="hd">
                        <span className="label">{label}</span>
                        <span className="null">暂无</span>
                    </div>
                </div>
            )
        }
    }
}

export default class DetailZongPingji extends React.Component {
    render() {
        const { data, detailCommon } = this.props;
        const wdzj = data.wdzj;
        const p2peye = data.p2peye;
        const dlp = data.dlp;
        const rong360 = data.rong360;
        const yifei = data.yifei;
        const yuanwang = data.yuanwang;
        return (
            <div className="box mt10 pingjiCon detailPingjiBox">
                <Title data={'评级情况'} />
                <div className="content">
                    {
                        data.score !== null && data.score !== 0 && detailCommon.platstatus == 1 ?
                            <List label={'综合指数'} data={data} score={'score'} />
                            :
                            <List label={'综合指数'} data={null} />
                    }
                    <List label={'之家评级'} data={wdzj} score={'fzzhishu'} />
                    <List label={'天眼评级'} data={p2peye} score={'level'} score2={'score'} />
                    {
                        dlp !== null && detailCommon.platstatus == 1 && dlp.ordernum > 0 ?
                            <List label={'贷罗盘指数'} data={dlp} score={'score'} />
                            :
                            <List label={'贷罗盘指数'} data={null} />
                    }
                    <List label={'融360评级'} data={rong360} score={'level'} />
                  
                </div>
            </div>
        )
    }

}