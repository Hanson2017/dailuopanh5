import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../utils/api';
import Util from '../../utils/util';
import Loading from '../../components/loading/index';
import Header from '../../components/navbar/index';
import UpDateTime from '../../components/topUpdate';
import Item from './item';
import { fetchPosts } from '../../redux/actions/index';

import './index.scss';

class FlmfList extends React.Component {
    render() {
        const { flmfListData, history } = this.props;
        if (flmfListData.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className='activityContainer'>
                    <Header title={'热门活动'} history={history} />
                    <UpDateTime updatetime={Util.setDate(new Date())} />
                    <div className="content">
                        <div className="totalNum">活动平台数量 {flmfListData.totalNum}</div>
                        {
                            flmfListData.items.length > 0 ?
                                <div className='list'>
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