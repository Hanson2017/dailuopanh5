import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index';
import List from '../black/list/index';

class Zhengyi extends React.Component {
    render() {
        const { totalNum } = this.props;
        return (
            <div className='container'>
                <Header title={'争议中名单'} location={this.props.location} />
                <NumBar numText={'争议状态统计平台数量：' + totalNum + '家'} />
                <div className='noTabContainer'>
                    <List column={'zhengyi'} columnID={'zhengyiList'} ctype={'zhengyi'} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { totalNum: state.totalNum.totalNum };
}

export default connect(mapStateToProps)(Zhengyi);


