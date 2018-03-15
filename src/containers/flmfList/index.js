import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../../components/loading/index';
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index';
import UpDateTime from '../../components/upDateTime';
import Item from '../../components/activityItem';

import Api from '../../utils/api';
import Util from '../../utils/util';
import { fetchPosts } from '../../redux/actions/index';

import './index.scss';

class FlmfList extends React.Component {
    render() {
        const { flmfListData } = this.props;
        if (flmfListData.isFetching) {
            return <Loading />
        }
        else {
            const { history } = this.props;
            const pathname = this.props.location.pathname;
            return (
                <div className='flmfListWp'>
                    <Header title={'优惠活动'} history={history} pathname={pathname} />
                    <NumBar numText={'活动平台数量：' + flmfListData.totalNum + '家'} />
                    <div className='noTabContainer'>
                        <UpDateTime updatetime={Util.setDate(new Date())} />
                        {
                            flmfListData.items.length > 0 ?
                                <div className='activityList'>
                                    {flmfListData.items.map((text, i) => {
                                        return (
                                            <Item data={text} key={i} />
                                        )
                                    })
                                    }
                                </div>
                                :
                                <div className='null'>暂无活动</div>
                        }
                    </div>
                </div>
            )
        }

    }
    componentDidMount() {
        const url = Api.flmfList;
        const { dispatch } = this.props;
        dispatch(fetchPosts('flmfList', url, 1))
    }
}

function mapStateToProps(state) {
    return { flmfListData: state.flmfList };
}

export default connect(mapStateToProps)(FlmfList);