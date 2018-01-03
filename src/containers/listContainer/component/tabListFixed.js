import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { History } from 'react-router';

var TabListFixed = createReactClass({
    mixins: [History],
    render() {
        const data = this.props.data;
        const isFixed = this.props.isFixed;
        return (
            <dl className={isFixed ? "tabList tabList-Left fixed" : 'tabList tabList-Left'}>
                <dt className={this.props.pageName ? 'item doubleItem' : 'item'}>
                    <span className='ic1'>排名</span>
                    <span className='ic2'>平台名称</span>
                </dt>
                {
                    data.items.map((item, index) => {
                        return (
                            <dd className={item.flmllist.length > 0 || this.props.Ttype || this.props.pageName ? "item itemRowH" : 'item'} key={index} onClick={() => { this.history.pushState(null, '/detail/' + item.id_dlp) }}>
                                <span className='ic1'>{index + 1} </span>
                                <span className='ic2'>{item.plat_name}</span>
                                {
                                    this.props.Ttype || item.flmllist.length > 0 ?
                                        <div className='tabTag'>
                                            {
                                                this.props.Ttype ?
                                                    <i className='tType'>
                                                        {this.props.Ttype}
                                                    </i>
                                                    :
                                                    null
                                            }
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



