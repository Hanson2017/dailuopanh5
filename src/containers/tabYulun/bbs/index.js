import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Title from '../../../components/title';
import Util from '../../../utils/util';
import Api from '../../../utils/api';

export default class TabYulunBBs extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="bbs box mt10">
                <Title data={'平台点评'} />
                <div className="content">
                    <a className="hd" target="_blank" href={Util.goBBs(Api.bbsHejUrl)}>
                        <div className="img">
                            <img src={require('../../../assets/images/hejicon.gif')} className='icon' alt="华尔街的旗帜" />
                        </div>
                        <div className="con">
                            <h6 className="tit">华尔街的旗帜</h6>
                            <p>综合讨论区，主要讨论关于P2P平台的风控内容，严禁吹子和黑子。</p>
                            <div className="more">
                                进入板块
                                <Icon type={require('../../../assets/icons/new/arrow-right.svg')} color={'#0096E6'} size={'xxs'} />
                            </div>
                        </div>
                    </a>
                    <div className="list">
                        {
                            data.bbsHejList.map((item, i) => {
                                return (
                                    <a className="item" target="_blank" key={i} href={Util.goBBs(item.linkurl)}>{item.title}</a>
                                )
                            })
                        }
                    </div>


                    <a className="hd" target="_blank" href={Util.goBBs(Api.bbsBgtUrl)}>
                        <div className="img">
                            <img src={require('../../../assets/images/bgticon.png')} className='icon' alt="曝光台" />
                        </div>
                        <div className="con">
                            <h6 className="tit">曝光台</h6>
                            <p>各类信息曝光，由管理员审核真实证据后进行发布。</p>
                            <div className="more">
                                进入板块
                                <Icon type={require('../../../assets/icons/new/arrow-right.svg')} color={'#ccc'} size={'xxs'} />
                            </div>
                        </div>
                    </a>
                    <div className="list">
                        {
                            data.bbsBgtList.map((item, i) => {
                                return (
                                    <a className="item" target="_blank" key={i} href={Util.goBBs(item.linkurl)}>{item.title}</a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}