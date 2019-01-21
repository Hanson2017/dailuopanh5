import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../../../utils/api';
import Loading from '../../../../components/loading/index';
import Title from '../../../../components/title';
import { fetchPostsDeatail } from '../../../../redux/actions/index';
import PingceItem from './pingceItem';
import YulunItem from './yulunItem';
import CommentItem from '../../../comment/item/index2';

class DetailYuqingAll extends React.Component {

    render() {
        const { detailYuqingAll } = this.props;
        const data = detailYuqingAll.dataSource;
        if (detailYuqingAll.isFetching) {
            return <Loading />
        }
        else {
            return (
                <div className="allCon">
                    <div className="box">
                        <Title data={'评测监控'} />
                        <ul className="content list">
                            {
                                data.mplist != null && data.mplist.length > 0 ?
                                    data.mplist.map((item, i) => {
                                        return (
                                            <PingceItem key={i} data={item} />
                                        )
                                    })
                                    :
                                    <li className="null">暂无数据</li>
                            }
                        </ul>
                    </div>
                    <div className="box mt10">
                        <Title data={'舆论监控'} />
                        <ul className="content list">
                            {
                                data.sentlist != null && data.sentlist.length > 0 ?
                                    data.sentlist.map((item, i) => {
                                        return (
                                            <YulunItem key={i} data={item} />
                                        )
                                    })
                                    :
                                    <li className="null">暂无数据</li>
                            }
                        </ul>
                    </div>
                    <div className="box mt10 comm">
                        <Title data={'点评监控'} />
                        <ul className="content">
                            {
                                data.commentlist != null && data.commentlist.length > 0 ?
                                    data.commentlist.map((item, i) => {
                                        return (
                                            <CommentItem key={i} data={item} leftNo={true} />
                                        )
                                    })
                                    :
                                    <li className="null">暂无数据</li>
                            }
                        </ul>
                    </div>
                </div>
            )
        }

    }
    componentDidMount() {
        const url = Api.detail + '?type=yuqing' + '&id_dlp=' + this.props.id;
        const { dispatch } = this.props;
        dispatch(fetchPostsDeatail('yuqingAll', url))
    }
}

function mapStateToProps(state) {
    return {
        detailYuqingAll: state.deatail.yuqingAll
    };
}

export default connect(mapStateToProps)(DetailYuqingAll);
