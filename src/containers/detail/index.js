import React, { Component } from 'react';
import { connect } from 'react-redux';

import Api from '../../utils/api';
import { fetchPostsDeatail } from '../../redux/actions/index'
import Loading from '../../components/loading/index';
import Header from '../../components/navbar/detail';
import DetailTop from './detailTop/index';
import TabBar from '../../components/tabBar/tabs';
import UpDateTime from '../../components/upDateTime/index';

import Pingji from './pingji/';
import Health from './health/';
import Data from './data/';
import Pingce from './pingce';
import Gudong from './gudong/';
import Yulun from './yulun/';
import Comment from './comment/';
import Activity from './activity/';

import './index.scss';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            platId: 0,
        };
    }
    componentWillMount() {
        var match = this.props.match;
        this.setState({
            platId: match.params.id
        });
    }
    render() {
        const { detailCommon, history } = this.props;
        const platId = this.state.platId;
        if (detailCommon.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div>
                    <Header detailCommon={detailCommon.dataSource} history={history} />
                    <DetailTop detailCommon={detailCommon.dataSource} />
                    <div className='detailContainer'>
                        <UpDateTime updatetime={detailCommon.dataSource.updatetime} />
                        <TabBar>
                            <Pingji name={'评级'} id={platId} history={history} />
                            <Health name={'健康度'} id={platId} />
                            <Data name={'数据'} id={platId} />
                            <Gudong name={'股东'} id={platId} />
                            <Pingce name={'评测'} id={platId} history={history} />
                            <Yulun name={'舆论'} id={platId} />
                            <Comment name={'评论'} id={platId} history={history}  />
                            <Activity name={'活动'} id={platId} />
                        </TabBar>
                    </div>
                </div>
            )
        }

    }
    componentDidMount() {
        const url = Api.detail + '?type=head' + '&id_dlp=' + this.state.platId;
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('common', url))
    }
    componentDidUpdate(prevProps) {
        let oldId = prevProps.match.params.id
        let newId = this.props.match.params.id
       
        if (newId !== oldId) {
            const url = Api.detail + '?type=head' + '&id_dlp=' + newId;
            const { dispatch } = this.props;
            dispatch(fetchPostsDeatail('common', url))
            this.setState({
                platId: newId
            });
        }
    }
}


function mapStateToProps(state) {
    return { detailCommon: state.deatail.common };
}

export default connect(mapStateToProps)(Detail);