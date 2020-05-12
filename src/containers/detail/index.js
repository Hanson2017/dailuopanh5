import React, { Component } from 'react';
import { connect } from 'react-redux';

import Api from '../../utils/api';
import { fetchPostsDeatail } from '../../redux/actions/index'
import Loading from '../../components/loading/index';
import Header from '../../components/navbar';
import TabBar from '../../components/tabBar/tabs';

import DetailTop from './detailTop/index';
import Footer from './foot';
import Zonglan from './zonglan';
import Pingji from './pingji';
import Health from './health';
import Data from './data';
import Yuqing from './yuqing';
import Activity from './activity';
import Info from './info';



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
        const { platId } = this.state;
        if (detailCommon.isFetching) {
            return <Loading />
        }
        else {
            
            return (
                <div>
                    <Header title={detailCommon.dataSource.plat_name} history={history} black={true} />
                    <DetailTop data={detailCommon.dataSource} />
                    <div className='detailContainer'>
                        <TabBar black={true}>
                            <Zonglan name={'总览'} id={platId} history={history} />
                            <Pingji name={'评级'} id={platId} history={history} />
                            <Health name={'健康度'} id={platId} />
                            <Data name={'数据'} id={platId} />
                            <Yuqing name={'舆情'} id={platId} history={history} />
                            
                            <Info name={'信息'} id={platId} />
                        </TabBar>
                    </div>
                    <Footer id={platId} history={history} />
                </div>
            )
        }

    }
    componentDidMount() {
        const { platId } = this.state;


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
    componentWillUnmount() {
        this.storageHistory()
    }

    storageHistory() {
        const stateS = this.props.location.state;
        if (stateS && stateS.isSearch) {
            const { platId } = this.state;
            const { detailCommon } = this.props;
            const platname = detailCommon.dataSource.plat_name;


            if (localStorage.storageHistory) {

                var historyky = [];
                var storageHistoryNew = [];
                var storageHistory = JSON.parse(localStorage.getItem('storageHistory'))


                if (storageHistory.length > 9) {
                    storageHistory.splice(0, 1)
                }


                for (var i = 0; i < storageHistory.length; i++) {
                    historyky.push(storageHistory[i].platname)
                }
                var index = historyky.indexOf(platname);

                if (index != -1) {
                    storageHistory.splice(index, 1)
                }


                storageHistoryNew = storageHistory.concat({ id: platId, platname: platname })

                localStorage.setItem('storageHistory', JSON.stringify(storageHistoryNew))

            }
            else {
                localStorage.setItem('storageHistory', JSON.stringify([{ id: platId, platname: platname }]))
            }
        }
    }
}


function mapStateToProps(state) {
    return { detailCommon: state.deatail.common };
}

export default connect(mapStateToProps)(Detail);