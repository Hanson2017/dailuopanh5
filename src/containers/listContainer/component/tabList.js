import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import createReactClass from 'create-react-class';
import Theme from '../../../utils/theme';

const TabList = createReactClass({
    render() {
        const {history,data,listCout}=this.props;
        var totalWidth = 8.18;
        for (var i = 0; i < listCout.length; i++) {
            totalWidth = parseFloat(listCout[i].width) + totalWidth
        }

        return (
            <dl className={this.props.pageName ? 'tabList doubleTabList' : 'tabList'} style={{ width: totalWidth + 'rem' }}>
                <dt className={this.props.pageName ? 'item doubleItem' : 'item'}>
                    <span className='ic1'>&nbsp;</span>
                    <span className='ic2'>&nbsp;</span>
                    {
                        listCout.map((text, index) => {
                            if (this.props.pageName) {
                                return (
                                    <span key={index} className={'ic' + (index + 3)} style={{ width: text.width + 'rem' }}>
                                        {text.title}
                                        <br />
                                        {text.title2}
                                    </span>
                                )
                            }
                            else {
                                return (
                                    <span key={index} className={'ic' + (index + 3)} style={{ width: text.width + 'rem' }}>{text.title} </span>
                                )
                            }

                        })
                    }
                </dt>
                {
                    data.items.map((item, index) => {
                        return (
                            <dd className={item.flmllist.length > 0 || this.props.Ttype || this.props.pageName ? "item itemRowH" : 'item'} key={index} onClick={() => { history.push('/detail/' + item.id_dlp) }}>
                                <span className='ic1'>&nbsp;</span>
                                <span className='ic2'>&nbsp;</span>
                                {
                                    this.props.listCout.map((text, index) => {
                                        if (this.props.pageName) {
                                            return (
                                                <span className={'ic' + (index + 3)} style={{ width: text.width + 'rem' }} key={index}>
                                                    {item[text.field]}

                                                    <i className='db'>{item[text.field2]}</i>
                                                </span>
                                            )
                                        }
                                        else {
                                            return (
                                                <span className={'icc'+ (index + 3)+' ic' + (index + 3)} style={{ width: text.width + 'rem' }} key={index}>

                                                    <i style={text.isArrow ? { width: text.isArrowWidth + 'rem' } : null}>
                                                        {text.field == 'pr_zz' || text.field == 'pr_az' ? '权重  ' : null}
                                                        {item[text.field] !== '' && item[text.field] !== null ?
                                                            text.field == 'changnum' ?
                                                                Math.abs(item[text.field])
                                                                :
                                                                item[text.field]
                                                            :
                                                            '暂无'
                                                        }
                                                        {item[text.field2] ? '/' + item[text.field2] : null}
                                                        {text.percent ? '%' : null}
                                                    </i>
                                                    {
                                                        text.isArrow ?

                                                            item.changnum != 0 ?

                                                                <i className='icon'>
                                                                    <Icon type={item.changnum >= 0 ? require('../../../assets/icons/new/arrow-up.svg') : require('../../../assets/icons/new/arrow-down.svg')} color={item.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} />

                                                                </i>
                                                                :
                                                                null
                                                            :
                                                            null
                                                    }

                                                </span>
                                            )
                                        }

                                    })
                                }
                            </dd>
                        )
                    })
                }

            </dl>

        )
    }
})

export default TabList;




