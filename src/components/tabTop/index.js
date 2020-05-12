import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import Theme from '../../utils/theme';
import Util from '../../utils/util';
import Api from '../../utils/api';
import './index.scss';

export default class TabTop extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="tabTopContainer box">
                {
                    data.map((item, i) => {
                        const tabId = item.tabId;
                        if (item.title == '贷罗盘论坛') {
                            return (
                                <a key={i} className="tab" target="_blank" href={Util.goBBs(Api.bbsHome)}>
                                    <Icon type={require('../../assets/icons/new/nav/' + item.iconName + '.svg')} color={Theme.color} size={item.iconSize} />
                                    <span className="text">{item.title}</span>
                                </a>
                            )
                        }
                        else {
                            return (
                                <Link key={i} to={{ pathname: item.routerName, state: { tabId } }} className="tab">
                                    <Icon type={require('../../assets/icons/new/nav/' + item.iconName + '.svg')} color={Theme.color} size={item.iconSize} />
                                    <span className="text">{item.title}</span>
                                </Link>
                            )
                        }

                    })
                }

            </div>
        )
    }
} 