import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import Title from '../../../components/title';
import Item from '../../../components/activityItem';
import './index.scss';

class DetailActivity extends React.Component {
    render() {
        const { detailActivity } = this.props;
        const data = detailActivity.dataSource;
        if (detailActivity.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className='detailActivity'>
                    <Title titleText='活动' />
                    <div className='detailActivityBox'>
                        {
                            data.dataView.length > 0 ?
                                <div className='activityList'>
                                    {data.dataView.map((text, i) => {
                                        return (
                                            <Item data={text} key={i} />
                                        )
                                    })
                                    }
                                </div>
                                :
                                <div className='dataNull'>暂无活动</div>
                        }
                    </div>

                    <Title titleText='活动APP下载' />
                    <div className='detailActivityBox'>
                        <p className='appText'>参加平台活动我们推荐使用 返利魔方APP</p>
                        <a className='app' href='http://a.app.qq.com/o/simple.jsp?pkgname=org.zywx.wbpalmstar.widgetone.uex11575732'>返利魔方APP下载</a>
                    </div>

                    <Title titleText='其他热门活动' />
                    <div className='detailActivityBox'>
                        {
                            data.dataList.length > 0 ?
                                <div className='activityList'>
                                    {data.dataList.map((text, i) => {
                                        return (
                                            <Item data={text} key={i} />
                                        )
                                    })
                                    }
                                </div>
                                :
                                <div className='dataNull'>暂无活动</div>
                        }
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


