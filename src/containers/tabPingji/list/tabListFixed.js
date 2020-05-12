import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { Icon } from 'antd-mobile';
import Util from '../../../utils/util';

var TabListFixed = createReactClass({
    render() {
        const {history,data,isFixed}=this.props;
        return (
            <dl className={isFixed ? "tabList tabListTag tabList-Left fixed" : 'tabList tabListTag tabList-Left'}>
                <dt className='item'>
                    <span className='ic1'>排名</span>
                    <span className='ic2'>平台名称</span>
                </dt>
                {
                    data.map((item, index) => {
                        return (
                            <dd  className={Util.isbest(item.goodtag)?'item isbest':'item'} key={index} onClick={() => { history.push('/detail/' + item.id_dlp) }}>
                                <span className='ic1'>{index + 1} </span>
                                <span className='ic2'>{item.plat_name}{Util.isbest(item.goodtag)?<Icon type={require('../../../assets/icons/new/ico-star.svg')} color={'#DBAF74'} size={'xxs'} />:null}</span>
                                {
                                   item.flmllist.length > 0 ?
                                        <div className='tabTag'>
                                            {
                                                item.flmllist.length > 0 ?
                                                    item.flmllist.map((list, i) => {
                                                        const url = 'http://m.fanlimofang.com/Activity/Detail/' + list.activityid
                                                        return (
                                                            list.investtype == 1 ?
                                                                null
                                                                :
                                                                <i className='hongbao' key={i} onClick={(e) => {
                                                                    window.open(url)
                                                                    e.stopPropagation()
                                                                }}
                                                                >
                                                                    {list.invest}奖{list.rebate}
                                                                </i>
                                                        )
                                                    })
                                                    :
                                                    null
                                            }
                                        </div>
                                        :
                                        null
                                }
                            </dd>
                        )
                    })
                }

            </dl>
        )
    }
})

export default TabListFixed;



