import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import TabBar from '../../../components/tabBar2/tabs';

import Yunying from './yunying';
import Basic from './basic';
import User from './user';

class DetailData extends React.Component {
    render() {
        const { detailData, detailCommon } = this.props;
        if (detailData.isFetching || detailCommon.isFetching) {
            return <Loading />
        }
        else {
            return (
                <TabBar>
                    <div name={'运营数据'}>
                        {
                            detailCommon.dataSource.platstatus != 1 ?
                                <span className='nullBlack'>黑名单平台，已停止数据监控</span>
                                :
                                <Yunying data={detailData.dataSource.dataDetail} />
                        }
                    </div>
                    <div name={'用户数据'}>
                        {
                            detailCommon.dataSource.platstatus != 1 ?
                                <span className='nullBlack'>黑名单平台，已停止数据监控</span>
                                :
                                <User data={detailData.dataSource.userDetail} />
                        }
                    </div>
                    <div name={'基础数据'}>
                        <Basic data={detailData.dataSource.comDetail} />
                    </div>
                </TabBar>
            )
        }

    }
    componentDidMount() {
        const url = Api.detail + '?type=data' + '&id_dlp=' + this.props.id;
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('data', url))
    }
}

function mapStateToProps(state) {
    return {
        detailData: state.deatail.data,
        detailCommon: state.deatail.common
    };
}

export default connect(mapStateToProps)(DetailData);


