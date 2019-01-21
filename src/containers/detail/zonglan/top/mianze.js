import React, { Component } from 'react';

export default class DetailZonglanMianze extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            check: false,
            isHidden: true,
        }
    }
    render() {
        const { check, isHidden } = this.state;
        const { that, siteUrl } = this.props;
        return (
            <div className="mianzePopContainer">
                <div className="mask"></div>
                <div className="content">
                    <div className="header">风险提示及免责声明确认书</div>
                    <div className="body">
                        <p>1、贷罗盘仅为信息提供平台，贷罗盘不参与用户在任何网贷平台出借交易的过程，也不接受、不触碰、不吸纳任何用户的出借资金。</p>
                        <p>2、贷罗盘仅提供各网贷平台的信息，不构成对任何网贷平台的安全性的评价或出借建议。任何平台都存在不同程度的出借风险，用户应自行、谨慎评估各平台的风险，自行决策是否出借，并自行承担全部风险。</p>
                        <p>3、网贷平台如出现任何风险（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），贷罗盘均不承担任何责任。</p>
                        <p>4、用户应合理、谨慎评估自己的风险承受能力，在自己的风险承受能力的范围内在平台进行出借。</p>
                        <p>5、再次强调，网贷出借不是银行存款，具备一定风险性，存在出借本金无法收回的风险。任何风险由用户自行承担，贷罗盘均不承担任何责任。</p>
                    </div>
                    <div className="footer">
                        <div className="agreed"
                            onClick={() => {
                                this.setState({
                                    check: !this.state.check,
                                    isHidden: true,
                                })
                            }}
                        >
                            <span className={check ? "checkBoxGou checkBox" : "checkBox"}>{check ? '√' : null}</span>
                            本人已充分阅读理解《风险提示及免责声明确认书》内容并愿意承担风险后果
                        </div>
                        {
                            !check && !isHidden ?
                                <p className="errorText">*请先阅读《风险提示及免责声明确认书》，如同意，请勾选</p>
                                :
                                null
                        }
                        <button className={!check ? "disable btn" : "btn"}
                            onClick={() => {
                                if (check) {
                                    window.open(siteUrl);
                                    that.setState({
                                        isHiddenMianze: true,
                                    })
                                }
                                else {
                                    this.setState({
                                        isHidden: false,
                                    })
                                }

                            }}
                        >同意并前往</button>
                        <button className="btn btnCancel"
                            onClick={() => {
                                that.setState({
                                    isHiddenMianze: true,
                                })
                            }}
                        >关闭</button>
                    </div>
                </div>
            </div>
        )
    }

}