import React, { Component } from 'react';
import './index.scss';

export default class GongShang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMore: false
        };
    }
    render() {
        const data = this.props.data;
        let cutWord='';
        if (data != null && data.jingyingfanwei != ''&& data.jingyingfanwei != null) {
            cutWord = data.jingyingfanwei.substr(0, 40) + '...'
        }

        return (
            <div className='GongshangWp'>
                {
                    data != null ?
                        <ul className='GongshangList'>
                            <li className='first'>基本信息( {data.companyname?data.companyname:'--'} )</li>
                            <li>
                                <label>社会信用代码：</label>{data.xinyongdaima?data.xinyongdaima:'--'}
                            </li>
                            <li>
                                <label>注册号：</label>{data.zhucehao?data.zhucehao:'--'}
                            </li>
                            <li>
                                <label>组织机构代码：</label>{data.zuzhidaima?data.zuzhidaima:'--'}
                            </li>
                            <li>
                                <label>公司类型：</label>{data.gongshileixing?data.gongshileixing:'--'}
                            </li>
                            <li>
                                <label>经营状态：</label>{data.jingyingzhuangtai?data.jingyingzhuangtai:'--'}
                            </li>
                            <li>
                                <label>法定代表人：</label>{data.faren?data.faren:'--'}
                            </li>
                            <li>
                                <label>成立日期：</label>{data.chengliriqi?data.chengliriqi:'--'}
                            </li>
                            <li>
                                <label>营业期限：</label>{data.yingyeqixian?data.yingyeqixian:'--'}
                            </li>
                            <li>
                                <label>注册资本：</label>{data.zhuceziben?data.zhuceziben+'万人民币':'--'}
                        </li>
                            <li>
                                <label>核准日期：</label>{data.fazhaoriqi?data.fazhaoriqi:'--'}
                            </li>
                            <li>
                                <label>登记机关：</label>{data.dengjijiguan?data.dengjijiguan:'--'}
                            </li>
                            <li>
                                <label>企业地址：</label>{data.qiyedizhi?data.qiyedizhi:'--'}
                            </li>
                            <li>
                                <label>经营范围：</label>{this.state.isShowMore ? data.jingyingfanwei : cutWord}
                                {
                                    cutWord !=''?
                                    <a className='more btn-open' onClick={this.opneMore.bind(this)}>{this.state.isShowMore ? '点击收起' : '展开更多'}</a>
                                    :
                                    '--'
                                }
                               
                            </li>

                        </ul>
                        :
                        <div className='dataNull'>暂无工商信息</div>
                }
            </div>
        )
    }
    opneMore() {
        this.setState({
            isShowMore: !this.state.isShowMore
        })
    }
}