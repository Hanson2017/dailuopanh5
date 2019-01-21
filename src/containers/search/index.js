import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import fetch from 'isomorphic-fetch';
import { Link } from 'react-router-dom';
import Api from '../../utils/api';
import Loading from '../../components/loading';
import Header from './header/index';
import List from './list/index';
import './index.scss';
const clientHeight = window.screen.height;

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            searchList: [],
            searchHotList: [],
            searchHistoryList: [],
            searchDemoList: [],
            loading: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        if (localStorage.storageHistory) {
            const storageHistory = JSON.parse(localStorage.getItem('storageHistory'));
            this.setState({
                searchHistoryList: storageHistory
            })
        }
    }
    render() {
        const { history } = this.props;
        const { loading, searchHotList, searchDemoList, searchHistoryList, searchList, searchKey } = this.state;
        var searchDemoListStr = ''
        if (!loading) {
            for (var index = 0; index < searchDemoList.length; index++) {
                searchDemoListStr += '"' + searchDemoList[index].plat_name + '"'
            }
        }

        return (
            <div className="searchContainer">
                <Header history={history} searchKey={searchKey} searchText={searchDemoListStr} that={this} />
                {
                    searchList == '' && searchList.length <= 0 ?
                        loading ?
                            <Loading />
                            :
                            <div className="content" style={{ minHeight: clientHeight - 50 }}>
                                <div className="hot">
                                    <h6 className="tit">热门搜索：</h6>
                                    <div className="list">
                                        {
                                            searchHotList.map((item, i) => {
                                                return (
                                                    <Link key={i} to={'/detail/' + item.id_dlp} className="link">{item.plat_name}</Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {
                                    searchHistoryList.length > 0 ?
                                        <div className="history">
                                            <h6 className="tit">搜索历史：</h6>
                                            <ul className="list">
                                                {
                                                    searchHistoryList.reverse().map((item, i) => {
                                                        return (
                                                            <li key={i}>
                                                                <Link className="name" to={'/detail/' + item.id}>
                                                                    <Icon type={require('../../assets/icons/new/ico-time.svg')} color={'#bbb'} size={'xxs'} />
                                                                    <i className="plat">{item.platname}</i>
                                                                </Link>
                                                                <span className="clear" onClick={() => {
                                                                    this.clearHistory(i)
                                                                }}>
                                                                    <Icon type={require('../../assets/icons/new/ico-x.svg')} color={'#bbb'} size={'xxs'} />
                                                                </span>
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>
                                        </div>
                                        :
                                        null
                                }

                            </div>
                        :
                        null
                }
                {
                    searchList.length > 0 ?
                        <List searchList={searchList} searchKey={searchKey} />
                        :
                        null
                }

            </div>
        )
    }
    componentDidMount() {
        this.getHotSearch();
    }
    handleChange(value) {
        this.setState({ searchKey: value });
        if (value != '') {
            this.getSearch(value);
        }
        else {
            this.setState({
                searchList: []
            })
        }
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
        const that = this;
        const url = Api.getSearchTop;

        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (response) {
                that.setState({
                    searchHotList: response.hotplat,
                    searchDemoList: response.replat,
                    loading: false
                })
            });
    }
    clearHistory(index) {
        const { searchHistoryList } = this.state;
        const storageHistoryNew = searchHistoryList;

        storageHistoryNew.splice(index, 1);

        localStorage.setItem('storageHistory',JSON.stringify(storageHistoryNew.reverse()))

        this.setState({
            searchHistoryList:JSON.parse(localStorage.getItem('storageHistory'))
        })

    }
}