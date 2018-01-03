import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import TabBar from '../../../components/tabBar2/tabs';

import Hexin from './hexin';
import Fuzhu from './fuzhu';
import Other from './other';
import Module from './module';

class DetailHealth extends React.Component {
    render() {
        const { detailHealth, platName, detailCommon } = this.props;
        if (detailHealth.isFetching || detailCommon.isFetching) {
            return <Loading />
        }
        else {
            return (
                <TabBar>
                    <div name={'核心指标'}>
                        {
                            detailCommon.dataSource.platstatus != 1 ?
                                <span className='nullBlack'>黑名单平台，已停止数据监控</span>
                                :
                                <Hexin data={detailHealth.dataSource} />
                        }
                    </div>
                    <div name={'辅助指标'}>
                        {
                            detailCommon.dataSource.platstatus != 1 ?
                                <span className='nullBlack'>黑名单平台，已停止数据监控</span>
                                :
                                <Fuzhu data={detailHealth.dataSource} />
                        }
                    </div>
                    <div name={'其他指标'}>
                        {
                            detailCommon.dataSource.platstatus != 1 ?
                                <span className='nullBlack'>黑名单平台，已停止数据监控</span>
                                :
                                <Other data={detailHealth.dataSource} />
                        }
                    </div>
                    <div name={'健康度模型'}>
                        {
                            detailCommon.dataSource.platstatus != 1 ?
                                <span className='nullBlack'>黑名单平台，已停止数据监控</span>
                                :
                                <Module data={detailHealth.dataSource} platName={platName} />
                        }
                    </div>
                </TabBar>
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
        platName: state.deatail.common.dataSource.plat_name,
        detailCommon: state.deatail.common
    };
}

export default connect(mapStateToProps)(DetailHealth);


