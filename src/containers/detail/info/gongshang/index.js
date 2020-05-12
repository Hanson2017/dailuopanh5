import React, { Component, PropTypes } from 'react';

export default class DetailInfoGongshang extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className="box gongshang">
                {
                    data !== null ?
                        <ul className="gongshangList">
                            <li>
                                <span className="label">公司名称：</span>
                                <span className="text">{data.companyname}</span>
                            </li>
                            <li>
                                <span className="label">社会信用代码：</span>
                                <span className="text">{data.xinyongdaima}</span>
                            </li>
                            <li>
                                <span className="label">注册号：</span>
                                <span className="text">{data.zhucehao}</span>
                            </li>
                            <li>
                                <span className="label">组织机构代码：</span>
                                <span className="text">{data.zuzhidaima}</span>
                            </li>
                            <li>
                                <span className="label">公司类型：</span>
                                <span className="text">{data.gongshileixing}</span>
                            </li>
                            <li>
                                <span className="label">经营状态：</span>
                                <span className="text">{data.jingyingzhuangtai}</span>
                            </li>
                            <li>
                                <span className="label">法定代表人：</span>
                                <span className="text">{data.faren}</span>
                            </li>
                            <li>
                                <span className="label">成立日期：</span>
                                <span className="text">{data.chengliriqi}</span>
                            </li>
                            <li>
                                <span className="label">营业期限：</span>
                                <span className="text">{data.yingyeqixian}</span>
                            </li>
                            <li>
                                <span className="label">注册资本：</span>
                                <span className="text">{data.zhuceziben} 万人民币</span>
                            </li>
                            <li>
                                <span className="label">核准日期：</span>
                                <span className="text">{data.fazhaoriqi}</span>
                            </li>
                            <li>
                                <span className="label">登记机关：</span>
                                <span className="text">{data.dengjijiguan}</span>
                            </li>
                            <li>
                                <span className="label">企业地址：</span>
                                <span className="text">{data.qiyedizhi}</span>
                            </li>
                            <li>
                                <span className="label">经营范围：</span>
                            </li>
                            <li>
                                <div className="fanwei">{data.jingyingfanwei}</div>
                            </li>
                        </ul>
                        :
                        <div className="null">暂无数据</div>
                }

            </div>
        )
    }

}