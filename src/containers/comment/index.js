import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Loading from '../../components/loading/index';
import Header from '../../components/navbar/index';
import UpDateTime from '../../components/topUpdate';
import LoadMore from '../../components/loadMore';
import Item from './item/index2';

import Api from '../../utils/api';
import Util from '../../utils/util';
import { fetchPosts } from '../../redux/actions/index';


import './index.scss';

class Commentlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatetime: Util.setDate(new Date())
        }
    }
    render() {
        const { datas, history } = this.props;
        const {updatetime}=this.state;
        return (
            <div className="commentContainer">
                <Header title={'全部平台点评'} history={history} />
                <UpDateTime updatetime={updatetime} /> 
                    {
                        datas.isFetching ?
                            <Loading />
                            :
                            <div className="content">            
                               
                                <ul className='list'>
                                    {

                                        datas.items.map((item, i) => {
                                            return (
                                                <Item data={item} key={i} />
                                            )
                                        })
                                    }
                                   
                                </ul>
                                <LoadMore onClick={this.loadMore.bind(this)} data={datas} />
                            </div>
                    }

            </div>
        )
    }
    componentDidMount() {
        const url = Api.commentList_plat + '?pagesize=50&page=' + 1;
        const { dispatch, datas } = this.props;
        dispatch(fetchPosts('commentList', url, 1, 'dataList'))
    }
    loadMore() {
        const { dispatch, datas } = this.props;
        const url = Api.commentList_plat + '?pagesize=50&page=' + datas.page;
        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts('commentList', url, 2, 'dataList'))
        }
    }
}

function mapStateToProps(state) {
    return { datas: state.commentList };
}

export default connect(mapStateToProps)(Commentlist);