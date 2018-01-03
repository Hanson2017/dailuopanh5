import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { History } from 'react-router';
import { Icon } from 'antd-mobile';
import './index.scss';

var SearchHeader = createReactClass({
    mixins: [History],
    render() {
        return (
            <div className='searchHeaderContainer'>
                <button className='searchBtn' onClick={() => this.history.goBack()}> <Icon type={require('../../../assets/icons/left.svg')} color={'#fff'} size={'md'} /></button>
                <div className='searchInputWp'>
                    <span className='searchIcon'><Icon type={require('../../../assets/icons/search.svg')} color={'#536171'} size={'xxs'} /></span>
                    <input type="text" autofocus="autofocus" placeholder={'输入你关心平台的名称，如"人人贷"'} className='searchInput' value={this.props.searchKey} onChange={this.handleChange} />
                </div>
            </div>
        )
    },
    handleChange(event) {
        this.props.handleChange(event.target.value)
    }
})

export default SearchHeader;
