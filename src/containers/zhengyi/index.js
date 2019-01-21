import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/navbar/index';
import NumBar from '../../components/numBar/index';
import List from '../black/list/index';

class Zhengyi extends React.Component {
    render() {
        const { totalNum ,updatetime,history} = this.props;
        return (
            <div className='zhengyiContainer'>
                <Header title={'争议中名单'} history={history} black={true}/>
                <div className="update">
                    更新时间：{updatetime}<i>|</i>共{totalNum}家争议平台
                </div>
                <List column={'zhengyi'} columnID={'zhengyiList'} ctype={'zhengyi'} history={history} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
         totalNum: state.totalNum.totalNum,
         updatetime: state.zhengyiList.updatetime
        };
    
}

export default connect(mapStateToProps)(Zhengyi);


