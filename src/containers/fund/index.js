import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../../components/loading/index';
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index';
import TabBar from '../../components/tabBar/tabs';

import Api from '../../utils/api';
import { fetchPostsFund } from '../../redux/actions/index';

import All from './temp/all/index';
import List from './temp/list/index';
import './index.scss';

class Fund extends React.Component {

    render() {
        const { funds } = this.props;
        return (
            <div style={this.props.location ? { 'paddingTop': '2.2rem' } : { 'paddingTop': '2.2rem', marginBottom: '1rem' }}>
                <Header title={'示范投资'} location={this.props.location} />
                <NumBar numText={'示范投资为贷罗盘自有资金进行投资示范，可供广大投资人参考'} />
                {
                    funds.isFetching ?
                        <Loading />
                        :
                        <TabBar>
                            <All name={'综合'} data={funds.dataSource} />
                            <List name={'稳健型'} data={funds.dataSource.fund1} fundType={1} fundEchartID={'fundEchartID1'} />
                            <List name={'平衡型'} data={funds.dataSource.fund2} fundType={2} fundEchartID={'fundEchartID2'} />
                            <List name={'收益型'} data={funds.dataSource.fund3} fundType={3} fundEchartID={'fundEchartID3'} />
                            <List name={'活期'} data={funds.dataSource.fund4} fundType={4} fundEchartID={'fundEchartID4'} />
                        </TabBar>
                }

            </div>
        )
    }
    componentDidMount() {
        const url = Api.fund;
        const { dispatch } = this.props;
        dispatch(fetchPostsFund('funds', url))
    }
}

function mapStateToProps(state) {
    return { funds: state.funds };
}

export default connect(mapStateToProps)(Fund);
