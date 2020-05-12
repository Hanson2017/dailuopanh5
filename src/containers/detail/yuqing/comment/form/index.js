import React, { Component } from 'react';
import { Icon, Modal, Toast } from 'antd-mobile';
import Api from '../../../../../utils/api';
import Theme from '../../../../../utils/theme';
import Header from '../../../../../components/navbar/index';

const alertShow = Modal.alert;
const clientHeight = window.screen.height;

export default class PlatDetailCommentsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cid: null,
            platName: null,
            value: '',
            disabled: false,
            type: null,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        this.setState({
            cid: this.props.location.state.cid,
            platName: this.props.location.state.platName
        });
    }
    render() {
        const { history } = this.props;
        const { disabled, platName } = this.state;
        return (
            <div className="ptNoTab commentFormContainer">
                <Header title={platName + ' | 点评'} history={history} black={true} search={'null'} />
                <div className="content box" style={{ minHeight: clientHeight - 42 }}>
                    <textarea placeholder="输入评论" className="input" onChange={this.handleChange} />
                    <button className="submit" onClick={() => { this.onSubmit() }}>提交评论</button>
                </div>
            </div>
        )
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    onSubmit() {
        const that = this;
        const { history } = this.props;
        const { cid, value, type } = this.state;
        const loginState = JSON.parse(localStorage.loginState);
        const userid = loginState.r_id;
        const username = loginState.r_username;
        const url = Api.commentAdd;

        if (value == '') {
            Toast.fail('请输入评论', 2)

            return false;
        }

        let formData = new FormData();

        formData.append("cid", cid);// 评测ID
        formData.append("type", type);// 评论类型 
        formData.append("detail", value);// 评测内容 
        formData.append("userid", userid);// 登录用户ID 
        formData.append("username", username);// username 登录用户名 

        let opt = {
            method: 'POST',
            body: formData
        }

        fetch(url, opt)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (response) {

                if (response.result == 1) {
                    Toast.success('提交成功!')
                    setTimeout(
                        () => {
                            that.goBackSuccee();
                        },
                        1000
                    );
                }
                else {
                    Toast.fail(response.resultmsg)
                }
            });
    }
    goBackSuccee() {
        const { history } = this.props;
        history.goBack();
    }
}