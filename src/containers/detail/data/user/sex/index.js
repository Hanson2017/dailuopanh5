import React, { Component } from 'react';

export default class Sex extends React.Component {
    render() {
        const { data } = this.props;
        const male = data.male;
        const female = data.female;
        const maxValue = male > female ? male : female;
        if (male !== 0) {
            return (
                <div className="userAge userSex">
                    <div className="list male">
                        <span className="label">男性用户</span>
                        <span className="bili">{male}%</span>
                        <span className="progress" style={{ width: (male / maxValue / 2 * 100 + '%') }}></span>
                    </div>
                    <div className="list female">
                        <span className="label">女性用户</span>
                        <span className="bili">{female}%</span>
                        <span className="progress" style={{ width: (female / maxValue / 2 * 100 + '%') }}></span>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="userSex">
                    <div className="null">暂无性别数据</div>
                </div>
            )
        }

    }
}
