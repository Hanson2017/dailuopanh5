import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Icon } from 'antd-mobile';
import { fetchPosts } from '../../../../../redux/actions/index';
import Api from '../../../../../utils/api';
import Loading from '../../../../../components/loading/index';
import LoadMore from '../../../../../components/loadMore';
import './index.scss';

class Item extends React.Component {
    render() {
        const data = this.props.data;
        let fundType = null;
        const url = '/detail/' + data.id_dlp;
        switch (data.fundtype) {
            case 1:
                fundType = '1号'
                break;
            case 2:
                fundType = '2号'
                break;
            case 3:
                fundType = '3号'
                break;
            case 4:
                fundType = '活期'
                break;
            default:
                fundType = null
        }
        return (
            <li>
                <Link to={url}>

                    <div className='hd'>
                        <span className='platName'>{data.plat_name}</span>
                        {
                            data.platstatus == 1 ?

                                <span className='state'>（正常）</span>
                                :
                                data.platstatus == 3 ?
                                    <span className='state stateZhengyi'>（争议中）</span>
                                    :
                                    <span className='state stateBlack'>（黑名单）</span>

                        }
                        {
                            fundType != null ?
                                <span className='shifan'>（示范投资{fundType}）</span>
                                : null
                        }
                    </div>
                    <div className='bd'>
                        <div className='rankZh'>
                            <span>综合排名：</span>
                            {
                                data.ordernum != 0 ?
                                    <div>
                                        <span className='order'>第{data.ordernum}名</span>
                                        <span className='arrow'>
                                            <Icon type={data.changnum >= 0 ? require('../../../../../assets/icons/arrow-up.svg') : require('../../../../../assets/icons/arrow-down.svg')} color={data.changnum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                                        </span>
                                        <span className='num'>(共{data.countnum}家)</span>
                                    </div>
                                    :
                                    <span className='null'>暂无</span>
                            }
                        </div>
                        <dl className='rank'>
                            {this.item('之家', data.wdzj)}
                            {this.item('天眼', data.p2peye)}
                            {this.item('贷罗盘', data.dlp)}
                            {this.item('融360', data.rong360)}
                            {this.item('星火', data.xinghuo)}
                            {this.item('羿飞', data.yifei)}
                        </dl>
                        <div className='yulun'>本周新舆论：{data.infonum}条</div>
                    </div>


                </Link>
            </li>
        )
    }
    item(nameText, data) {
        return (
            <dd>
                <span className='name'>{nameText}: </span>
                {
                    data != null ?
                        <div className='paiming'>
                            <span className='order'>第{data.ordernum}名</span>
                            <span className='arrow'>
                                <Icon type={data.changenum >= 0 ? require('../../../../../assets/icons/arrow-up.svg') : require('../../../../../assets/icons/arrow-down.svg')} color={data.changenum >= 0 ? '#ff0063' : '#009963'} size={'xxs'} />
                            </span>
                            <span className='num'>({data.countnum}家)</span>
                        </div>
                        :
                        <span className='null'>暂无</span>
                }
            </dd>
        )

    }
}

class Guanzhu extends React.Component {
    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
    }
    render() {
        const { datas } = this.props;
        if (datas.isFetching) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <div className='guanzhuWp'>
                    {
                        datas.items.length != 0 ?
                            <ul className='guanzhuList'>
                                {
                                    datas.items.map((item, i) => {
                                        return (
                                            <Item data={item} key={i} />
                                        )
                                    })
                                }
                            </ul>
                            :
                            <span className='nullAtt'>暂无关注平台</span>
                    }
                    {
                        datas.totalNum > 20 ?
                            <LoadMore onClick={this.loadMore} data={datas} />
                            :
                            null
                    }

                </div>
            )
        }

    }
    componentDidMount() {

        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.attentionList + '?memberid=' + memberid + '&page=' + 1 + '&pagesize=20';

        const { dispatch, datas } = this.props;
        dispatch(fetchPosts('guanzhuList', url, 1, 'dataList'))

    }
    loadMore() {
        const { dispatch, datas } = this.props;
        const loginState = JSON.parse(localStorage.loginState);
        const memberid = loginState.r_id;
        const url = Api.attentionList + '?memberid=' + memberid + '&page=' + datas.page + '&pagesize=20';
        if (!datas.loadMore && datas.pageCount >= datas.page) {
            dispatch(fetchPosts('guanzhuList', url, 2, 'dataList'))
        }
    }
}

function mapStateToProps(state) {
    return { datas: state.guanzhuList };
}

export default connect(mapStateToProps)(Guanzhu);