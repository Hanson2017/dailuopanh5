import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import TabBar from '../../../components/tabBar2/tabs';

import Gudong from './gudong';
import Gongshang from './gongshang';
import Jichu from './jichu';

import './index.scss';

class DetailInfo extends React.Component {
    render() {
        const { detailInfo } = this.props;
        const dataSource = detailInfo.dataSource
        if (detailInfo.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className="detailInfoContainer">
                    <TabBar>
                        <div name={'股东监控'}>
                            <Gudong data={dataSource.dataDetail} />
                        </div>
                        <div name={'工商信息'}>
                            <Gongshang data={dataSource.dataDetail} />
                        </div>
                        <div name={'基础信息'}>
                            <Jichu data={dataSource.dataDetail.baseinfo} />
                        </div>

                    </TabBar>
                </div>
            )
        }

    }
    componentDidMount() {
        const { dispatch, id } = this.props;
        const url = Api.detail + '?type=com' + '&id_dlp=' + id;

        dispatch(fetchPostsDeatail('gudong', url))
    }
}

function mapStateToProps(state) {
    return {
        detailInfo: state.deatail.gudong
    };
}

export default connect(mapStateToProps)(DetailInfo);


