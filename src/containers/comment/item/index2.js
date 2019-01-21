import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import Util from '../../../utils/util';
import Theme from '../../../utils/theme';
import './index.scss';

export default class CommentItem2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
    }
    render() {
        const { data, leftNo } = this.props;
        const { isHidden } = this.state;
        const triangleName = isHidden ? 'triangle-down' : 'triangle-up';
        return (
            <li className="commentListContainer commentListContainer2">
                {
                    !leftNo ?
                        <div className="leftC">
                            <Link to={'/detail/' + data.cid} className="platBox" >{data.title}</Link>
                        </div>
                        :
                        null
                }

                <div className="rightC">
                    <div className="hd">
                        <div className="left">
                            <span className="icon"><Icon type={require('../../../assets/icons/new/ico-portrait.svg')} color={'#73C3FF'} size={'xxs'} /></span>
                            <span className="username">{data.username}</span>
                        </div>
                        <div className="date">{Util.formatDate(data.updatetime)}</div>
                    </div>
                    <div className="bd">
                        {
                            isHidden ?
                                Util.cutText(Util.delHtmlTag(data.detail), 65)
                                :
                                Util.delHtmlTag(data.detail)
                        }

                    </div>
                    {
                        Util.delHtmlTag(data.detail).length > 65 ?
                            <div className="openCon"
                                onClick={() => {
                                    this.setState({
                                        isHidden: !this.state.isHidden
                                    })
                                }}
                            >
                                <span className="icon"><Icon type={require('../../../assets/icons/new/' + triangleName + '.svg')} color={isHidden ? '#bbb' : Theme.color} size={'xxs'} /></span>
                                <span className={isHidden ? 'open' : 'close'}>{isHidden ? '展开' : '收起'}</span>
                            </div>
                            :
                            null
                    }

                </div>

            </li>
        )
    }
}