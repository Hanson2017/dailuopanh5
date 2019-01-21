import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
const clientHeight = window.screen.height;
export default class SearchList extends React.Component {
    render() {
        const { searchList, searchKey } = this.props;
        return (
            <div className='searchListContainer' style={{ minHeight: clientHeight - 50 }}>
                {
                    searchList.length > 0 ?
                        <ul className='searchList'>
                            {
                                searchList.map((item, i) => {
                                    const location = {
                                        pathname: '/detail/' + item.id_dlp,
                                        state: { isSearch: true }
                                    }
                                    return (
                                        <li key={i}> <Link to={location} className='link'>{item.plat_name}</Link></li>
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