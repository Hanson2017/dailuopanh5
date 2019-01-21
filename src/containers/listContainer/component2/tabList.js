import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import createReactClass from 'create-react-class';
import Theme from '../../../utils/theme';
import Util from '../../../utils/util';

const TabList = createReactClass({
    render() {
        const { history, data, field } = this.props;

        return (
            <dl className={'tabList tabListTag'}>
                <dt className={'item'}>
                    <span className='ic1'>&nbsp;</span>
                    <span className='ic2'>&nbsp;</span>
                    <span className='ic3' style={{ width: field.width }}> {field.text}</span>
                    <span className='ic3'>关键字</span>
                </dt>
                {
                    data.items.map((item, index) => {
                        return (
                            <dd className={Util.isbest(item.goodtag)?'item isbest':'item'} key={index} onClick={() => { history.push('/detail/' + item.id_dlp) }}>
                                <span className='ic1'>&nbsp;</span>
                                <span className='ic2'>&nbsp;</span>

                                {
                                    field.changnum ?
                                        <div className='ic3 icc3' style={{ width: field.width }}>
                                            <p>{item[field.name]}</p>
                                            <p className="up2">
                                                <i style={{ width: '1rem'}}>{item.changnum >= 0 ? item.changnum : -item.changnum}%</i>
                                                <i className='icon'><Icon type={item.changnum >= 0 ? require('../../../assets/icons/new/arrow-up.svg') : require('../../../assets/icons/new/arrow-down.svg')} color={item.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} /></i>
                                            </p>
                                        </div>
                                        :
                                        field.width2 ?
                                            <span className='ic3 icc3' style={{ width: field.width }}>
                                                <i style={{ width: field.width2 }}>{item[field.name]}</i>
                                                <i className='icon'><Icon type={item.changnum >= 0 ? require('../../../assets/icons/new/arrow-up.svg') : require('../../../assets/icons/new/arrow-down.svg')} color={item.changnum >= 0 ? Theme.upColor : Theme.downColor} size={'xxs'} /></i>
                                            </span>
                                            :
                                            <span className='ic3 icc3' style={{ width: field.width }}>{field.name == 'pr_zz' || field.name == 'pr_az' ? '权重  ' : null}{item[field.name]}</span>

                                }


                                {
                                    (item.goodtag !== null && item.goodtag !== '' && item.goodtag.length > 0) || (item.badtag !== null && item.badtag !== '' && item.badtag.length > 0) ?
                                        <div className="tagsTab">
                                            <div className="tags good" >
                                                <span className="icon">
                                                    <Icon type={require('../../../assets/icons/new/ico-goodTag.svg')} color={'#0096E6'} size={'xxs'} />
                                                </span>
                                                {
                                                    item.goodtag !== null && item.goodtag !== '' && item.goodtag.length > 0 ?
                                                        item.goodtag.map((list, i) => {
                                                            return (
                                                                <span key={i} className="tag" style={list.tags == '一线平台' ? { width: list.tags.length * 0.26 + 0.4 + 'rem' } : { width: list.tags.length * 0.26 + 'rem' }}>{list.tags}
                                                                    {
                                                                        list.tags == '一线平台' ?
                                                                            <Icon type={require('../../../assets/icons/new/ico-baseTag.svg')} color={'#fff'} size={'xxs'} />
                                                                            :
                                                                            null
                                                                    }
                                                                </span>

                                                            )
                                                        })
                                                        :
                                                        <span className="null">暂无</span>
                                                }
                                            </div>
                                            <div className="tags bad" >
                                                <span className="icon">
                                                    <Icon type={require('../../../assets/icons/new/ico-badTag.svg')} color={'#bbb'} size={'xxs'} />
                                                </span>
                                                {
                                                    item.badtag !== null && item.badtag !== '' && item.badtag.length > 0 ?
                                                        item.badtag.map((list, i) => {
                                                            return (
                                                                <span key={i} className="tag" style={{ width: list.tags.length * 0.26 + 'rem' }}>{list.tags}</span>
                                                            )
                                                        })
                                                        :
                                                        <span className="null">暂无</span>
                                                }
                                            </div>
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

export default TabList;




