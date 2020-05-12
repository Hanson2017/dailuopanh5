import React, { Component } from 'react';
import Title from '../../../components/title';
import Api from '../../../utils/api';
import Util from '../../../utils/util';
import Item from './item';
import './index.scss';

export default class HomeBBs extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="homeBBsContainer box mt10">
                <Title data={'论坛动态'} />
                <div className="content">
                    <div className="hd">
                       
                        <a className="link r" target='_blank' href={Util.goBBs(Api.bbsBgtUrl)}>
                            <div className="img">
                                <img src={require('../../../assets/images/bgticon.png')} className='icon' alt="曝光台" />
                            </div>
                            <div className="con">
                                <h6 className="tit">曝光台</h6>
                            </div>
                        </a>
                    </div>
                    <ul className="list">
                        {
                            data.map((item, i) => {
                                return (
                                    <Item key={i} data={item} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div >
        )
    }
}