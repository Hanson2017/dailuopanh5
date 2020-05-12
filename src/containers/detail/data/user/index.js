import React, { Component } from 'react';
import Title from '../../../../components/title';
import Age from '../../zonglan/user/age';
import Sex from './sex';
import Area from './area';
import RelatePlat from '../../zonglan/user/relatePlat';

export default class Basic extends React.Component {

    render() {
        const { data, platName } = this.props;

        if (data != null) {
            return (
                <div className='detailDataUserContainer'>
                    <div className="box sexCon">
                        <Title data={'年龄/性别分布'} />
                        <div className="content">
                            <Age data={data.age} />
                            <Sex data={data} />

                        </div>
                    </div>
                    <Area data={data.areaDetail.data} />
                    <div className="box mt10 replatCon">
                        <Title data={'"' + platName + '"' + '用户还关注'} />
                        <div className="content">
                            <RelatePlat data={data.replat} />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='detailDataUserContainer'>
                     <div className='null'>暂无用户数据</div>
                </div>
               
            )
        }

    }
    componentDidMount() {




    }
}