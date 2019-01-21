import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../../components/loading/index';
import Header from '../../components/navbar/index';
import Update from '../../components/topUpdate';
import TabBar from '../../components/tabBar/tabs';

import Api from '../../utils/api';
import Util from '../../utils/util';
import { fetchPostsFund } from '../../redux/actions/index';

import All from './temp/all/index';
import All2 from './temp/all/index2';
import List from './temp/list/index';
import './index.scss';

class Fund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatetime: Util.setDate(new Date())
        }
    }
    render() {
        const { funds, history } = this.props;
        const { updatetime } = this.state;
        const tabIndex = this.props.location.state;
        return (
            <div className="ptTab13 fundContainer">
                <Header title={'示范出借'} history={history} />
                <Update updatetime={updatetime} />
                {
                    funds.isFetching ?
                        <Loading />
                        :
                        <All2  data={funds.dataSource} />

                        // <TabBar current={tabIndex ? tabIndex.tabId : null}>
                        //     <All name={'总览'} data={funds.dataSource} />
                        //     <List name={'1号 稳健型'} data={funds.dataSource.fund1} type={1}  echartColor={['#4847bf', '#7f7fff', '#006699', '#94c4e2', '#4d9dcf']} />
                        //     <List name={'2号 平衡型'} data={funds.dataSource.fund2} type={2} echartColor={['#ffc55c', '#e88613', '#9c6c33', '#e2b394', '#c69c6d']} />
                        //     <List name={'3号 收益型'} data={funds.dataSource.fund3} type={3} echartColor={['#b19deb', '#9c45de', '#4d226d', '#8557a7', '#662d91', '#9a308d', '#9686ae', '#9b9fc3', '#8f71a6', '#6264d6']} />

                        // </TabBar>
                }

            </div>
        )
    }
    componentDidMount() {
        const url =  Api.fund+'?type=firm';
        const { dispatch } = this.props;
        dispatch(fetchPostsFund('funds', url))
    }
}

function mapStateToProps(state) {
    return { funds: state.funds };
}

export default connect(mapStateToProps)(Fund);
