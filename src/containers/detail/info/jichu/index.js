import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';
import Theme from '../../../../utils/theme';
import Util from '../../../../utils/util';

export default class DetailInfoJichu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMore: [false, false],
            ref: false,
        };
    }
    render() {
        const { data } = this.props;
        const { isShowMore } = this.state;
        return (
            <div className="box gongshang">
                {
                    data !== null ?
                        <ul className="gongshangList">
                            <li>
                                <span className="label">运营公司：</span>
                                <span className="text">{data.info_yygs}</span>
                            </li>
                            <li>
                                <span className="label">ICP备案号：</span>
                                <span className="text">{data.info_icp}</span>
                            </li>
                            <li>
                                <span className="label">客服电话：</span>
                                <span className="text">{data.info_tel}</span>
                            </li>
                            <li>
                                <span className="label">电子邮件：</span>
                                <span className="text">{data.info_email}</span>
                            </li>
                            <li>
                                <span className="label">公司地址：</span>
                                <span className="text">{data.info_address}</span>
                            </li>

                            <li>
                                <span className="label">平台介绍：</span>
                            </li>
                            <li className="fanweiCon">
                                <div className="fanwei">
                                    {
                                        isShowMore[0] && Util.delHtmlTag(data.info_plat).length > 74 ?
                                            data.info_plat.split('<br />').map((text,i)=>{
                                                return(
                                                    <p key={i}>{text}</p>
                                                )
                                            })
                                            :
                                            Util.delHtmlTag(data.info_plat).substr(0, 74) + '...'
                                    }
                                </div>
                                {
                                    Util.delHtmlTag(data.info_plat).length > 74 ?
                                        <div className="moreCon" onClick={() => {
                                            isShowMore[0] = !isShowMore[0]
                                            this.setState({
                                                ref: !this.state.ref
                                            })
                                        }}>
                                            <Icon type={isShowMore[0] ? require('../../../../assets/icons/new/triangle-up.svg') : require('../../../../assets/icons/new/triangle-down.svg')} color={isShowMore[0] ? Theme.color : '#bbb'} size={'xs'} />
                                            <span className={isShowMore[0] ? "close" : "open"}>{isShowMore[0] ? '收起' : '展开'}</span>
                                        </div>
                                        :
                                        null
                                }

                            </li>
                            <li>
                                <span className="label">团队介绍：</span>
                            </li>
                            <li className="fanweiCon">
                               
                                <div className="fanwei">
                                    {
                                        isShowMore[1] && Util.delHtmlTag(data.info_team).length > 74 ?
                                            data.info_team.split('<br />').map((text,i)=>{
                                                return(
                                                    <p key={i}>{text}</p>
                                                )
                                            })
                                            :
                                            Util.delHtmlTag(data.info_plat).substr(0, 74) + '...'
                                    }
                                </div>
                                {
                                    Util.delHtmlTag(data.info_team).length > 74 ?
                                        <div className="moreCon" onClick={() => {
                                            isShowMore[1] = !isShowMore[1]
                                            this.setState({
                                                ref: !this.state.ref
                                            })
                                        }}>
                                            <Icon type={isShowMore[1] ? require('../../../../assets/icons/new/triangle-up.svg') : require('../../../../assets/icons/new/triangle-down.svg')} color={isShowMore[1] ? Theme.color : '#bbb'} size={'xs'} />
                                            <span className={isShowMore[1] ? "close" : "open"}>{isShowMore[1] ? '收起' : '展开'}</span>
                                        </div>
                                        :
                                        null
                                }
                            </li>
                        </ul>
                        :
                        <div className="null">暂无数据</div>
                }

            </div>
        )
    }

}