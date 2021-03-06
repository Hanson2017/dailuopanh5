import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

export default class SearchHeader extends React.Component {
    render() {
        const {history}=this.props;
        return (
            <div className='navbarSearch'>
                <button className='searchBtn' onClick={() => history.goBack()}> <Icon type={require('../../../assets/icons/new/arrow-left.svg')} color={'#fff'} size={'md'} /></button>
                <div className='searchInputWp'>
                    <span className='searchIcon'><Icon type={require('../../../assets/icons/new/ico-search.svg')} color={'#bbb'} size={'xxs'} /></span>
                    <input type="text" autoFocus="autoFocus" placeholder={'输入你关心平台的名称，如"拍拍贷"'} className='searchInput' value={this.props.searchKey} onChange={this.handleChange.bind(this)} />
                </div>
            </div>
        )
    }
    handleChange(event) {
        const {that}=this.props;
        that.handleChange(event.target.value)
    }
}

