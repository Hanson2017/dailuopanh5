import React, { Component } from 'react';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';
import Api from '../../../utils/api'
import Util from '../../../utils/util'
import { fetchPosts } from '../../../redux/actions/index';
import Load from '../../../components/loading';
import LoadMore from '../../../components/loadMore';
import UpDateTime from '../../../components/upDateTime';
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


const List = createReactClass({
    getInitialState: function () {
        return {
            fixed: false,
        }
    },
    render() {
        const { dispatch, data, history } = this.props;

        return (
            <div className='blackListContainer'>
                {
                    data.isFetching ?
                        null
                        :
                        <ListFiexd data={data.items} history={history} isFixed={this.state.fixed} />
                }

                <div className="tabBlack" ref={'tabList'}>
                    {
                        data.isFetching ?
                            <Load />
                            :
                            <dl className={this.props.ctype == 'black' ? 'tabListBlack' : 'tabListBlack tabListzhengyi'}>
                                <dt className='item'>
                                    <span className='ic1'>平台名称</span>
                                    {
                                        this.props.ctype == 'black' ?
                                            <span className='ic3'>黑名单原因</span>
                                            :
                                            null
                                    }
                                    <span className='ic2'>{this.props.ctype == 'black' ? '出事时间' : '争议时间'}</span>
                                    
                                    <span className='ic4 yygs'>运营公司</span>
                                    <span className='ic5'>省份</span>
                                    <span className='ic6'>城市</span>
                                </dt>
                                {
                                    data.items.map((item, i) => {
                                        return (
                                            <dd key={i} onClick={() => { history.push('/detail/' + item.id_dlp) }} className="item">
                                                <span className='ic1'>{item.plat_name}</span>
                                                {
                                                    this.props.ctype == 'black' ?
                                                        <span className='ic3'>{item.info_operation}</span>
                                                        :
                                                        null
                                                }
                                                <span className='ic2'>{this.props.ctype == 'black' ? Util.formatDate(item.blacktime) : item.negative_time}</span>
                                               
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
        )


    },
    loadMore() {
        const columnID = this.props.columnID;
        const { dispatch, data } = this.props;

        const url = Api[this.props.column] + '?type=all&pagesize=50&page=' + data.page;
        if (!data.loadMore && data.pageCount >= data.page) {
            dispatch(fetchPosts(columnID, url, 2, 'dataList'))
        }
    },
    componentDidMount() {
        const columnID = this.props.columnID;
        const { dispatch, data } = this.props;
        const url = Api[this.props.column] + '?type=all&pagesize=50&page=' + 1;
        dispatch(fetchPosts(columnID, url, 1, 'dataList'))
        this.refs.tabList.addEventListener('scroll', this.handleScroll)

    },
    componentWillUnmount() {
        this.refs.tabList.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
        if (this.refs.tabList.scrollLeft > 0) {
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

function mapStateToProps(state, ownProps) {
    return {
        data: state[ownProps.columnID],
        updatetime: state[ownProps.columnID].updatetime
    };
}


export default connect(mapStateToProps)(List);
