import React, { Component } from 'react';
import { InputItem, Modal } from 'antd-mobile';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import Api from '../../../utils/api';
import './index.scss';


export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            searchList: [],
            searchHotList: [],
            errorText: '',
            modal1: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    render() {
        const history = this.props.history;
        const { searchList, searchKey, searchHotList } = this.state;
        return (
            <div className='searchBar'>
                <img src={require('../../../assets/images/s-logo.png')} className='sLogo' alt="贷罗盘" />
                <div className='searchCon'>
                    <input type="text" placeholder={'输入你关心平台的名称，如"人人贷"'} className='searchInput' value={searchKey} onChange={this.handleChange} onKeyUp={
                        (e) => {
                            e.keyCode === 13 && this.handleSubmit()
                        }}
                    />
                    {
                        searchList.length > 0 ?
                            <div className='searchList'>
                                <ul>
                                    {
                                        searchList.map((item, i) => {
                                            const url = '/detail/' + item.id_dlp;
                                            return (
                                                <li key={i}> <Link to={url} className='link'>{item.plat_name}</Link></li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                            :
                            searchKey != '' ?
                                <div className='searchList'>
                                    <span className='null'>你输入的平台名称不存在</span>
                                </div>
                                :
                                null
                    }

                </div>
                <buttom className='searchBtn' onClick={this.handleSubmit}>搜索</buttom>
                <div className="searchHot">
                    <span>热门搜索：</span>
                    {
                        searchHotList.length > 0 ?
                            searchHotList.map((item, i) => {
                                const url = '/detail/' + searchHotList[i].id_dlp;
                                return (
                                    <Link key={i} to={url}>{item.plat_name}</Link>
                                )
                            })
                            :
                            null
                    }
                </div>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose}
                    title=" "
                    footer={[{ text: 'OK', onPress: this.onClose }]}

                >
                    <div style={{ height: 'auto', overflow: 'scroll' }}>
                        {this.state.errorText}
                    </div>
                </Modal>
            </div>
        )
    }
    componentDidMount() {
        this.getHotSearch()
    }
    getSearch(keywords) {
        const url = Api.search + '?keywords=' + keywords;
        const that = this;
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                that.setState({
                    searchList: json,
                })
            });
    }
    getHotSearch() {
        const url = Api.getSearchTop;
        const that = this;
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                that.setState({
                    searchHotList: json.hotplat,
                })
            });
    }
    handleChange(event) {
        this.setState({ searchKey: event.target.value });
        if (event.target.value != '') {
            this.getSearch(event.target.value);
        }
        else {
            this.setState({
                searchList: []
            })
        }
    }
    handleSubmit() {
        var history = this.props.history;
        const searchKey = this.state.searchKey;
        const searchList = this.state.searchList;
        if (searchKey == '') {
            this.setState({
                errorText: '请输出你关心平台的名称'
            })
            this.showModal('modal1')
        }
        else {
            if (searchList.length == 1) {
                const url = '/detail/' + searchList[0].id_dlp;
                history.push(url)
            }
            else if (searchList.length > 1) {
                const location = {
                    pathname: '/search',
                    state: searchKey
                }
                history.push(location)
            }
            else {
                this.setState({
                    errorText: '你搜索的平台不存在'
                })
                this.showModal('modal1')
            }
        }
    }
    showModal(e) {
        // e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            modal1: true,
        });
    }
    onClose() {
        this.setState({
            modal1: false,
        });
    }
}

