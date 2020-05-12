import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import Util from '../../../../utils/util';

export default class BBsItem extends React.Component {
    render() {
        const { data } = this.props;
        return (
           <li className="item">
               <a target='_blank' className="title" href={Util.goBBs(data.linkurl)}>{data.title}</a>
               <div className="ft">
                    <div className="l">
                        <span className="username">
                            <Icon type={require('../../../../assets/icons/new/ico-portrait.svg')} color={'#73C3FF'} size={'xxs'} />
                            {data.author}
                        </span>
                        <span className="views">
                            <Icon type={require('../../../../assets/icons/new/ico-eye.svg')} color={'#bbb'} size={'xxs'} />
                            {data.views}
                        </span>
                    </div>
                    <div className="date">
                        {data.addtime.substring(0, data.addtime.indexOf(' '))}
                    </div>
               </div>
           </li>
        )
    }
}