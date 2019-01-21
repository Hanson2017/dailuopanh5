import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import TabBar from '../../../components/tabBar2/tabs';

import Yunying from './yunying';
import Flow from './flow';
import User from './user';


import './index.scss';

class DetailData extends React.Component {
    render() {
        const { detailData, detailCommon } = this.props;
        if (detailData.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className="detailDataContainer">
                    <TabBar>
                        <div name={'运营数据'}>
                            <Yunying data={detailData.dataSource.dataDetail} />
                        </div>
                        <div name={'流量数据'}>
                            <Flow id={this.props.id} />
                        </div>
                        <div name={'用户数据'}>
                            <User data={detailData.dataSource.userDetail} platName={detailCommon.plat_name} />
                        </div>
                      
                    </TabBar>
                </div>
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
        detailCommon: state.deatail.common.dataSource
    };
}

export default connect(mapStateToProps)(DetailData);


