import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading/index';
import TabBar from '../../../components/tabBar2/tabs';

import Gudong from './gudongInfo';
import Gongshang from './gongshang';

class DetailGudong extends React.Component {
    render() {
        const { detailGudong } = this.props;
        if (detailGudong.isFetching) {
            return <Loading />
        }
        else {
            return (
                <TabBar>
                    <div name={'股东监控'}>
                        <Gudong data={detailGudong.dataSource.dataDetail} />
                    </div>
                    <div name={'工商信息'}>
                        <Gongshang data={detailGudong.dataSource.dataDetail} />
                    </div>
                </TabBar>
            )
        }

    }
    componentDidMount() {
        const url = Api.detail + '?type=com' + '&id_dlp=' + this.props.id;
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('gudong', url))
    }
}

function mapStateToProps(state) {
    return { detailGudong: state.deatail.gudong };
}

export default connect(mapStateToProps)(DetailGudong);


