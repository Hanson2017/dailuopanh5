import React, { Component } from 'react';

export default class DetailUserAge extends React.Component {
    render() {
        const { data } = this.props;
        if (data != null && data != '') {

            var ageText = ['18岁及以下', '19-24岁', '25-34岁', '35-49岁', '50岁及以上'];
            var age = data.split(',')
            var newdata = [];
            for (let i = 0; i < age.length; i++) {
                newdata.push(parseInt(age[i]))
            }
            age = newdata
            var maxValue = Math.max.apply(null, age);

        }
        return (
            <div className="userAge">
                {
                    data != '' && data != null ?
                        age.map((list, i) => {
                            return (
                                <div className="list" key={i}>
                                    <span className="label">{ageText[i]}</span>
                                    <span className="bili">{list}%</span>
                                    <span className="progress" style={{width:(list/maxValue/2*100+'%')}}></span>
                                </div>
                            )
                        })
                        :
                        <div className="null">暂无数据</div>
                }

            </div>
        )
    }
}