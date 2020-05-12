import React, { Component } from 'react';
import { connect } from 'react-redux';

import Api from '../../../utils/api';
import Loading from '../../../components/loading/index';
import TabBar from '../../../components/tabBar2/tabs';
import { fetchPostsDeatail } from '../../../redux/actions/index';


import All from './all';
import Fuzhu from './fuzhu';
import Other from './other';
import Black from './black';

import './index.scss';

class DetailHealth extends React.Component {

    render() {
        const { detailHealth, detailCommon } = this.props;

        if (detailHealth.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className="detailHealthContainer">
                    {
                        detailCommon.platstatus != 1 ?
                            <Black data={detailHealth.dataSource} />
                            :
                            <TabBar>
                                <div name={'概览'}>
                                    <All data={detailHealth.dataSource} platName={detailCommon.plat_name} />
                                </div>
                                <div name={'辅助指标'}>
                                    <Fuzhu data={detailHealth.dataSource} />
                                </div>
                                <div name={'其他指标'}>
                                    <Other data={detailHealth.dataSource} />
                                </div>
                            </TabBar>
                    }

                </div>
            )
        }

    }
    componentDidMount() {
        const url = Api.detail + '?type=health' + '&id_dlp=' + this.props.id;
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('health', url))
    }
}

function mapStateToProps(state) {
    return {
        detailHealth: state.deatail.health,
        detailCommon: state.deatail.common.dataSource
    };
}

export default connect(mapStateToProps)(DetailHealth);


