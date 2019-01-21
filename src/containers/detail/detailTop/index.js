import React, { Component } from 'react';

export default class DetailTop extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <div className='detailTop'>
                {
                    data.platstatus != 1 ?
                        <span className="state black"><strong>黑名单，建议远离</strong><i className="pie">|</i>更新：{data.updatetime}</span>
                        :
                        data.negative_time == null ?
                            <span className="state normal">状态：正常运营<i className="pie">|</i>更新：{data.updatetime}</span>
                            :
                            <span className="state black"><strong>争议中，需特别谨慎</strong><i className="pie">|</i>更新：{data.updatetime}</span>
                }
            </div>
        )
    }
}
