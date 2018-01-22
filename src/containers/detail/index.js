import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { History } from 'react-router';
import { connect } from 'react-redux';

import Api from '../../utils/api';
import { fetchPostsDeatail } from '../../redux/actions/index'
import Loading from '../../components/loading/index';
import Header from '../../components/navbar/detail';
import DetailTop from './detailTop/index';
import TabBar from '../../components/tabBar/tabs';
import UpDateTime from '../../components/upDateTime/index';
import './index.scss';


import Pingji from './pingji/';
import Health from './health/';
import Data from './data/';
import Pingce from './pingce';
import Gudong from './gudong/';
import Yulun from './yulun/';
import Comment from './comment/';
import Activity from './activity/';

var Detail = createReactClass({
    render() {
        const { detailCommon } = this.props;
        if (detailCommon.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div>
                    <Header detailCommon={detailCommon.dataSource} />
                    <DetailTop detailCommon={detailCommon.dataSource} />
                    <div className='detailContainer'>
                        <UpDateTime updatetime={detailCommon.dataSource.updatetime} />
                        <TabBar>
                            <Pingji name={'评级'} id={this.props.params.id} />
                            <Health name={'健康度'} id={this.props.params.id} />
                            <Data name={'数据'} id={this.props.params.id} />
                            <Gudong name={'股东'} id={this.props.params.id} />
                            <Pingce name={'评测'} id={this.props.params.id} />
                            
                            <Yulun name={'舆论'} id={this.props.params.id} />
                            <Comment name={'评论'} id={this.props.params.id} />
                            <Activity name={'活动'} id={this.props.params.id} />
                        </TabBar>
                    </div>
                </div>
            )
        }

    },
    componentDidMount: function () {
        const url = Api.detail + '?type=head' + '&id_dlp=' + this.props.params.id;
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('common', url))
    },
    componentDidUpdate(prevProps) {
        let oldId = prevProps.params.id
        let newId = this.props.params.id
        if (newId !== oldId) {
            const url = Api.detail + '?type=head' + '&id_dlp=' + newId;
            const { dispatch } = this.props;
            dispatch(fetchPostsDeatail('common', url))
        }
    }
})

function mapStateToProps(state) {
    return { detailCommon: state.deatail.common };
}

export default connect(mapStateToProps)(Detail);