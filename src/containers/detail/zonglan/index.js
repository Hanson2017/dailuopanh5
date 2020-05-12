import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../../utils/api';
import { fetchPostsDeatail } from '../../../redux/actions/index';
import Loading from '../../../components/loading';

import Top from './top';
import Fund from './fund';
import Pingji from './pingji';
import Health from './health';
import Pingce from './pingce';
import Yulun from './yulun';
import Comment from './comment';
import Gudong from '../info/gudong/guquan';
import Shouyiren from '../info/gudong/shouyiren';
import GongshangBG from '../info/gudong/biangeng';
import Flow from './flow';
import User from './user';

import './index.scss';

class DetailZonglan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            platId: 0,
        };
    }
    render() {
        const { dataZonglan, detailCommon, id, history } = this.props;

        if (dataZonglan.isFetching) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <div className="detailZonglanContainer">
                    <Top dataZonglan={dataZonglan.dataSource} detailCommon={detailCommon.dataSource} />
                    {
                        detailCommon.dataSource.platstatus == 1 && dataZonglan.dataSource.fund_firm !== null ?
                            <Fund data={dataZonglan.dataSource.fund_firm} detailCommon={detailCommon.dataSource} platId={id} history={history} />
                            :
                            null
                    }
                    <Pingji data={dataZonglan.dataSource.dataDetail} detailCommon={detailCommon.dataSource} />
                    {
                        detailCommon.dataSource.platstatus == 1 ?
                            <Health data={dataZonglan.dataSource.healthDetail} dataDlp={dataZonglan.dataSource.dataDetail.dlp} listdata={dataZonglan.dataSource.listdata} />
                            :
                            null
                    }
                    <Pingce data={dataZonglan.dataSource.mplist} />
                    <Yulun data={dataZonglan.dataSource.sentlist} />
                    <Comment data={dataZonglan.dataSource.commentlist} />
                    <Gudong data={dataZonglan.dataSource.gudongxinxi} title={'股东监控'} />
                    <GongshangBG data={dataZonglan.dataSource.gongshangbiangeng}  />
                    <Shouyiren data={dataZonglan.dataSource.shouyiren} />
                    <Flow data={dataZonglan.dataSource.flow} />
                    <User dataAge={dataZonglan.dataSource.age} dataReplat={dataZonglan.dataSource.replat} platName={detailCommon.dataSource.plat_name} />
                </div>
            )
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
     
        const { id, dispatch } = this.props;
        const url = Api.detail + '?type=home' + '&id_dlp=' + id;
        dispatch(fetchPostsDeatail('zonglan', url));
       
    }

}

function mapStateToProps(state) {
    return {
        dataZonglan: state.deatail.zonglan,
        detailCommon: state.deatail.common
    };
}

export default connect(mapStateToProps)(DetailZonglan);