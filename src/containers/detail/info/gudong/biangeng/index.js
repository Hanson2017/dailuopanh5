import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Title from '../../../../../components/title';
import Util from '../../../../../utils/util';

export default class Biangeng extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: [],
            ref: false
        }
    }
    componentWillMount() {
        let data = this.props.data;
        if (data !== null && data.length > 0) {
            const isHiddenNew = [];

            for (let i = 0; i < data.length; i++) {
                isHiddenNew.push(true)
            }
            this.setState({
                isHidden: isHiddenNew,
            })
        }
    }
    render() {
        const { data } = this.props;
        const { isHidden } = this.state;

        const location = {
            pathname: '/biangenglist',
            state: {
                data: data,
            }
        }
        return (
            <div className="box mt10 biangengCon">
                <Title data={'变更记录'} screenUrlInfo={data !== null && data.length > 5 ? { screenUrl: location } : null} />
                <div className="biangengList">
                    {
                        data !== null && data.length > 0 ?
                            data.map((item, i) => {
                                if (i < 5) {
                                    return (
                                        <dl key={i}>
                                            <dt>
                                                <div className="l">
                                                    <span className="number">[{i + 1}]</span>
                                                    <span className="type">{item.type == 'gudong' ? '股东变更' : '法定代表人变更'}</span>
                                                </div>
                                                <div className="r">
                                                    <span className="date">{Util.formatDate(item.updatetime)}</span>
                                                    <button className="more"
                                                        onClick={() => {
                                                            isHidden[i] = !this.state.isHidden[i]
                                                            this.setState({
                                                                ref: !this.state.ref
                                                            })
                                                        }}
                                                    >
                                                        <Icon type={isHidden[i] ? require('../../../../../assets/icons/new/circle-down.svg') : require('../../../../../assets/icons/new/circle-up.svg')} color={isHidden[i] ? '#bbb' : '#4AB3FF'} size={'sm'} />
                                                    </button>
                                                </div>

                                            </dt>
                                            {
                                                isHidden[i] ?
                                                    null
                                                    :
                                                    <dd>
                                                        <p className="note">带有*标记的为法定代表人</p>
                                                        <div className="info">
                                                            <div className="hd item">
                                                                <span className="ic1">变更前</span>
                                                                <span className="ic2">变更后</span>
                                                            </div>
                                                            <div className="bd item">
                                                                <div className="ic1">
                                                                    {
                                                                        item.detail_pre.length > 0 ?
                                                                            item.detail_pre.map((list, j) => {
                                                                                return (
                                                                                    <p className={list.type !== 0 ? 'red' : null} key={j}>{list.detail}{list.type !== 0 ? '[退出]' : null}</p>
                                                                                )
                                                                            })
                                                                            :
                                                                            null
                                                                    }
                                                                </div>
                                                                <div className="ic2">
                                                                    {
                                                                        item.detail.length > 0 ?
                                                                            item.detail.map((list, j) => {
                                                                                return (
                                                                                    <p className={list.type !== 0 ? 'red' : null} key={j}>{list.detail}{list.type !== 0 ? '[新增]' : null}</p>
                                                                                )
                                                                            })
                                                                            :
                                                                            null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </dd>
                                            }

                                        </dl>
                                    )
                                }

                            })
                            :
                            <div className="null">暂无变更信息</div>
                    }
                </div>
            </div>
        )
    }
}