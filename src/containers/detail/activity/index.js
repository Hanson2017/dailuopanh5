import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd-mobile';
import Api from '../../../utils/api';
import Loading from '../../../components/loading/index';
import Title from '../../../components/title';
import Item from '../../activity/item';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import './index.scss';


class List extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <dl>
                <dt className={data.investtype == 1 ? 'ft' : null}>
                    <span className="iconOut"><i className="iconIn"></i></span>
                    <span className="type">{data.investtype == 0 ? '首投' : '复投'}</span>
                </dt>
                <dd className="invest">
                    <span className="text investText">{data.invest}</span>
                    <span className="label">出借金额</span>
                </dd>
                <dd className="rebate">
                    <span className="text rebateText">{data.rebate}</span>
                    <span className="label">获取回报</span>
                </dd>
                <dd className="rate">
                    <span className="text rateText">{data.rate}%</span>
                    <span className="label">相当于年华</span>
                </dd>
                <dd className="more">
                    <Icon type={require('../../../assets/icons/new/arrow-right.svg')} color={'#ccc'} size={'xxs'} />
                </dd>
            </dl>
        )
    }
}

class DetailActivity extends React.Component {
    render() {
        const { detailActivity } = this.props;
        const data = detailActivity.dataSource;
        if (detailActivity.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className='detailActivityContainer'>
                    <div className="box top">
                        <Title data='平台当前活动' />
                        <div className="content">
                            {
                                data.dataView.length > 0 ?
                                    <div className='list'>
                                        {
                                            data.dataView.map((text, i) => {
                                                return (
                                                    <List data={text} key={i} />
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className='null'>暂无活动</div>
                            }
                        </div>
                    </div>
                    <div className="box mt10 appDown">
                        <Title data='活动APP下载' borderNot={true} />
                        <div className="content">
                            <div className="l">
                                <img src={require('../../../assets/images/appDown.png')} className="logo" />
                            </div>
                            <div className="r">
                                <p>我们推荐使用“返利魔方APP”参加平台活动，以大幅度提升您的出借回报率。</p>
                                <a className='link' target="_blank" href='http://a.app.qq.com/o/simple.jsp?pkgname=org.zywx.wbpalmstar.widgetone.uex11575732'>
                                    前往下载&nbsp;&nbsp;
                                    <Icon type={require('../../../assets/icons/new/arrow-right.svg')} color={'#ccc'} size={'xxs'} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="box mt10 other">
                        <Title data='其他热门活动' borderNot={true} mfTag={true} borderNot={true} />
                        <div className="content">
                            {
                                data.dataList.length > 0 ?
                                    <div className='list'>
                                        {
                                            data.dataList.map((text, i) => {
                                                return (
                                                    <Item data={text} key={i} />
                                                )
                                            })
                                        }
                                        
                                    </div>
                                    :
                                    <div className='null'>暂无活动</div>
                            }

                        </div>
                    </div>

                </div>
            )
        }

    }
    componentDidMount() {
        const url = Api.detail + '?type=activity' + '&id_dlp=' + this.props.id;
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('activity', url))
    }
}

function mapStateToProps(state) {
    return { detailActivity: state.deatail.activity };
}

export default connect(mapStateToProps)(DetailActivity);


