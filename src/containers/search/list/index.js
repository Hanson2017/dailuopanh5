import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.scss';
export default class SearchList extends React.Component {
    render() {
        const searchList = this.props.data;
        const searchKey = this.props.searchKey;
        return (
            <div className='searchListContainer'>
                {
                    searchList.length > 0 ?
                        <ul className='searchList'>
                            {
                                searchList.map((item, i) => {
                                    const url = '/detail/' + item.id_dlp;
                                    return (
                                        <li key={i}> <Link to={url} className='link'>{item.plat_name}</Link></li>
                                    )
                                })
                            }
                        </ul>
                        :
                        searchKey !== '' ?
                            <span className='null'>没有相关记录</span>
                            :
                            null

                }
            </div>
        )
    }

}