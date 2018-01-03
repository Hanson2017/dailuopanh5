import React, { Component } from 'react';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import Api from '../../utils/api';
import Header from './header/index';
import List from './list/index';
import './index.scss';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            searchList: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        return (
            <div>
                <Header searchKey={this.state.searchKey} searchText={'微贷'} handleChange={this.handleChange.bind(this)} />
                <List data={this.state.searchList} searchKey={this.state.searchKey} />
            </div>
        )
    }
    componentDidMount() {
        const searchKey = this.props.location.state;
        if (searchKey) {
            this.setState({
                searchKey: searchKey
            })
            this.getSearch(searchKey);
        }

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
}