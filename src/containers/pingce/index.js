import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/loading/index';
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index';
import UpDateTime from '../../components/upDateTime';
import LoadMore from '../../components/loadMore';

import Api from '../../utils/api';
import Util from '../../utils/util';
import { fetchPosts } from '../../redux/actions/index';

class Pingce extends React.Component {
    render() {
        const { datas,history } = this.props;
        const pathname = this.props.location.pathname;
        var totalNum = 0;
        if (!datas.isFetching) {
            totalNum = datas.dataView;
        }

        return (
            <div>
                <Header title={'评测监控'} history={history} pathname={pathname} />
                <NumBar numText={'评测监控平台数量：' + totalNum + '家'} />
                <div className='noTabContainer'>
                    <UpDateTime updatetime={Util.setDate(new Date())} />
                    {
                        datas.isFetching ?
                            <Loading />
                            :
                            <div>
                                <div className='pingceNum'>评测总条数{datas.totalNum}条</div>
                                <div className='yulunList'>
                                    {

                                        datas.items.map((text, i) => {
                                            return (
                                                <a onClick={() => history.push('/pingce/' + text.id)} key={i} className='link' target='_blank'>
                                                    <h6 className='title'>{text.title}</h6>
                                                    <p className='time'> {Util.formatDate(text.updatetime)}</p>
                                                </a>
                                            )
                                        })
                                    }
                                    <LoadMore onClick={this.loadMore.bind(this)} data={datas} />
                                </div>
                            </div>
                    }

                </div>

            </div>
        )
    }
    componentDidMount() {
        const url = Api.pingCeList + '?pagesize=50&page=' + 1;
        const { dispatch, datas } = this.props;
        dispatch(fetchPosts('pingceList', url, 1, 'dataList'))
    }
    loadMore() {
        const { dispatch, datas } = this.props;
        const url = Api.pingCeList + '?pagesize=50&page=' + datas.page;

        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts('pingceList', url, 2, 'dataList'))
        }
    }
}



function mapStateToProps(state) {
    return { datas: state.pingceList };
}

export default connect(mapStateToProps)(Pingce);
