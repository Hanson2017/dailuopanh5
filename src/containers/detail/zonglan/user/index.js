import React, { Component } from 'react';
import Title from '../../../../components/title';
import Age from './age';
import Relate from './relatePlat';

export default class DetailZongFlow extends React.Component {
    render() {
        const { dataAge, dataReplat, platName } = this.props;
        return (
            <div className="box mt10 userCon">
                <Title data={'用户数据'} />
                <div className="content">
                    <Age data={dataAge} />

                    {
                        dataReplat !== '' && dataReplat !== null && dataReplat.length>0 ?
                            <div>
                                <div className="replatTit">{platName}的用户还关注</div>
                                <Relate data={dataReplat} />
                            </div>
                            :
                            null
                    }

                </div>
            </div>
        )
    }
}