import React, { Component } from 'react';
import './index.scss';
import Title from '../../../../components/title';

export default class Basic extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <div className='basicwp'>
                <Title titleText={'基础信息'} />
                <ul className='basicList'>
                    <li><label>运营公司</label>{data.info_yygs != '' ? data.info_yygs : '--'} </li>
                    <li><label>公司地址</label>{data.info_address != '' ? data.info_address : '--'} </li>
                    <li><label>客服电话</label>{data.info_tel != '' ? data.info_tel : '--'} </li>
                    <li><label>邮件地址</label>{data.info_email != '' ? data.info_email : '--'} </li>
                    <li><label>注册资金</label>
                        {
                            data.info_Funds == '' || data.info_Funds == '不明' ?
                                '不明'
                                :
                                data.info_Funds + '万人民币'
                        }

                    </li>
                    <li><label>ICP备案号</label>{data.info_icp != '' ? data.info_icp : '--'}</li>
                </ul>
            </div>
        )
    }
}