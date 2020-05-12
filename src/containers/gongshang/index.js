import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';
import Header from '../../components/navbar/index';
import Api from '../../utils/api';
import Util from '../../utils/util';
import Loading from '../../components/loading';
import LoadMore from '../../components/loadMore';
import { fetchPosts } from '../../redux/actions/index';
import './index.scss';

class ListFiexd extends React.Component {
    render() {
        const { data, history, isFixed } = this.props;
        return (
            <dl className={isFixed ? 'tabListBlack tabListBlackLeft fixed' : 'tabListBlack tabListBlackLeft'}>
                <dt className='item'>
                    <span className='ic1'>平台名称</span>

                </dt>
                {
                    data.map((item, i) => {
                        return (
                            <dd key={i} onClick={() => { history.push('/detail/' + item.id_dlp) }} className="item">
                                <span className='ic1'>{item.plat_name}</span>
                            </dd>
                        )
                    })
                }
            </dl>
        )
    }
}

const Gongshang = createReactClass({
    getInitialState: function () {
        return {
            fixed: false,
            pagesize: 50
        }
    },
    render() {
        const { data, history } = this.props;
        console.log(data)
        return (
            <div className='gongshangContainer'>
                <Header title={'工商变更监控'} history={history} black={true} />
                <div className="blackListContainer">
                    {
                        data.isFetching ?
                            null
                            :
                            <ListFiexd data={data.items} history={history} isFixed={this.state.fixed} />
                    }
                    <div className="tabBlack" ref={'tabList11'}>
                        {
                            data.isFetching ?
                                <Loading />
                                :
                                <dl className={'tabListBlack'}>
                                    <dt className='item'>
                                        <span className='ic1'>平台名称</span>
                                        <span className='ic2'>变更项目</span>
                                        <span className='ic3'>变更日期</span>
                                        <span className='ic4 yygs'>运营公司</span>
                                        <span className='ic5'>省份</span>
                                        <span className='ic6'>城市</span>
                                    </dt>
                                    {
                                        data.items.map((item, i) => {
                                            return (
                                                <dd key={i} onClick={() => { history.push('/detail/' + item.id_dlp) }} className="item">
                                                    <span className='ic1'>{item.plat_name}</span>
                                                    <span className='ic2'>{item.type}</span>
                                                    <span className='ic3'>{Util.formatDate(item.updatetime)}</span>
                                                    <span className='ic4 yygs'>{item.info_yygs}</span>
                                                    <span className='ic5'>{item.province}</span>
                                                    <span className='ic6'>{item.city}</span>
                                                </dd>
                                            )
                                        })
                                    }
                                </dl>
                        }

                    </div>
                    {
                        data.isFetching ?
                            null
                            :
                            <LoadMore onClick={this.loadMore} data={data} />
                    }
                </div>
            </div>
        )
    },
    loadMore() {
        const { dispatch, data } = this.props;
        const url = Api.gongshangList + '?pagesize=' + this.state.pagesize + '&page=' + data.page;
        if (!data.loadMore && data.pageCount >= data.page) {
            dispatch(fetchPosts('gongshangList', url, 2, 'dataList'))
        }
    },
    componentDidMount() {
        const url = Api.gongshangList + '?pagesize=' + this.state.pagesize + '&page=' + 1;
        const { dispatch } = this.props;
        dispatch(fetchPosts('gongshangList', url, 1, 'dataList'))
        this.refs.tabList11.addEventListener('scroll', this.handleScroll)
    },
    componentWillUnmount() {
        this.refs.tabList11.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
        if (this.refs.tabList11.scrollLeft > 0) {
            this.setState({
                fixed: true
            })
        }
        else {
            this.setState({
                fixed: false
            })
        }
    }
    
})



function mapStateToProps(state) {
    return {
        data: state.gongshangList,
    };

}

export default connect(mapStateToProps)(Gongshang);


