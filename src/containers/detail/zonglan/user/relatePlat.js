import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import Title from '../../../../components/title';
import Theme from '../../../../utils/theme';

export default class DetailRelatePlat extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <ul className="relatePlat">
                {
                    data.map((item, i) => {
                        return (
                            <li key={i}>
                                <Link to={'/detail/' + item.id_dlp} key={i} className="plat">
                                    {item.plat_name}

                                </Link>
                                {
                                    item.fundtype ?
                                        <span className="fundtype">
                                            <Icon type={require('../../../../assets/icons/new/fund-icon.svg')} color={Theme['fund' + item.fundtype + 'Color']} />
                                            <i className="fundtypeNo">{item.fundtype}</i>
                                        </span>
                                        :
                                        null
                                }
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}