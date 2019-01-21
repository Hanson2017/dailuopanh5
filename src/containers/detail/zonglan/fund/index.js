import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import Util from '../../../../utils/util';
import Title from '../../../../components/title';

export default class DetailZongFund extends React.Component {
    render() {
        const { data, detailCommon, platId, history } = this.props;
        const location = {
            pathname: '/detailFund',
            state: {
                platName: detailCommon.plat_name,
                platId:platId
            }
        }

        return (
            <div className="box mt10 fundCon">
                <Title data={'示范出借概况'} screenUrlInfo={{ screenUrl: location }}>

                    <span className="fundName">
                        [{data.type}号
                        {
                            data.type == 1 ?
                                '稳健型'
                                :
                                data.type == 2 ?
                                    '平衡型'
                                    :
                                    '收益型'
                        }
                        ]
                    </span>
                </Title>

                <div className="bd">
                    <div className="state">
                        {data.status_info}
                    </div>
                    <dl className="list">
                        <dt className="item">
                            <span className="ic1">出借本金</span>
                            <span className="ic2">出借项目</span>
                            <span className="ic3">本金到期</span>
                        </dt>
                        <dd className="item">
                            <span className="ic1">{data.invest_num}万</span>
                            <span className="ic2">{data.invest_obj}</span>
                            <span className="ic3">{Util.formatDate(data.invest_endday)}</span>
                        </dd>
                    </dl>
                </div>
            </div>
        )
    }

}