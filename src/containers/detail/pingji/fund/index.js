import React, { Component } from 'react';
import { History } from 'react-router';
import createReactClass from 'create-react-class';
import Util from '../../../../utils/util';
import './index.scss';

const Fund = createReactClass({
    mixins: [History],
    render() {
        let data = this.props.data;
        let platName = this.props.platName;
        let fundType;
        let fundS;
        if (data != null) {
            switch (data.fund_type) {
                case 1:
                    fundType = '1号';
                    fundS = '稳健型'
                    break;
                case 2:
                    fundType = '2号'
                    fundS = '平衡型'
                    break;
                case 3:
                    fundType = '3号'
                    fundS = '收益型'
                    break;
                case 4:
                    fundType = '活期'
                    fundS = '高流动型'
                    break;
            }
        }
        if (data != null) {
            return (
                <div className='detailFund'>
                    <div className='shifanTitle'>示范投资（{fundS}）已进入投资“{platName}”</div>
                    <div className='shifanBox'>
                        <h6 className='boxTitle'>基金投资状态</h6>
                        <div className='boxCon'>
                            <span className='boxConText'>总投资额：{data.amount}万</span>
                            <span className='boxConText'>平均收益率：{data.rate}%</span>
                        </div>
                    </div>
                    <div className='shifanBox'>
                        <h6 className='boxTitle'>示范基金投资理由</h6>
                        <div className='boxCon'>
                            {
                                data.reasons.split('<br />').map((text, i) => {
                                    return (
                                        <p key={i}>{text}</p>
                                    )
                                })

                            }
                            <p>综上，示范基金{fundType}（{fundS}）决定进入投资。</p>
                        </div>
                    </div>
                    <div className='shifanBox'>
                        <h6 className='boxTitle'>缺点分析及投资建议</h6>
                        <div className='boxCon'>
                            <p>缺点分析：</p>
                            {
                                data.analysis.split('<br />').map((text, i) => {
                                    return (
                                        <p key={i}>{text}</p>
                                    )
                                })
                            }
                            <p>投资建议</p>
                            {
                                data.proposals.split('<br />').map((text, i) => {
                                    return (
                                        <p key={i}>{text}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='shifanBox'>
                        <h6 className='boxTitle'>后续投资计划</h6>
                        <div className='boxCon'>
                            {
                                Util.formatDate(data.enddate) > Util.setDate(new Date()) ?
                                    <p>目前正在正常投资，近期暂无撤出计划。</p>
                                    :
                                    <p>示范投资正在退出，在未来10日内，将退出完毕。</p>
                            }
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='fundNullWp'>
                    <p>示范投资目前没有投资“{platName}”</p>
                    <p>想了解示范投资目前进入了哪些平台，</p>
                    <div>请进入<a onClick={() => this.history.pushState(null, '/fund')}>“示范投资”</a>模块进行查看。</div>
                </div>
            )
        }


    }
})

export default Fund;
