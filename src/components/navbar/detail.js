import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import { History } from 'react-router';
import { Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import './index.scss';

var Navbar = createReactClass({
    mixins: [History],
    render: function () {
        const detailCommon = this.props.detailCommon;
        let fundType = null;
        switch (detailCommon.fundtype) {
            case 1:
                fundType = '示1'
                break;
            case 2:
                fundType = '示2'
                break;
            case 3:
                fundType = '示3'
                break;
            case 4:
                fundType = '活'
                break;
        }
        const { pathName } = this.props;
        return (
            <div className='navbar'>
                <div className="navbar-left" onClick={() => {
                    this.history.goBack()
                }}>
                    <Icon type={require('../../assets/icons/left.svg')} color={'#fff'} />
                </div>
                <div className="navbar-title">
                    {detailCommon.plat_name}
                    {
                        detailCommon.fundtype != 0 ?
                            <i style={{ color: '#009900' }}>({fundType})</i>
                            :
                            null
                    }
                    {
                        detailCommon.isflmf == 1 ?
                            <a href={'http://m.fanlimofang.com/Activity/Detail/' + detailCommon.flmllist[0].activityid}>
                                <img src={require('../../assets/images/redPacket.png')} style={{ width: 26, height: 26, marginLeft: 8, }} />
                            </a>
                            :
                            null
                    }

                </div>
                <div className="navbar-right">
                    {/* <Icon type={require('../../assets/icons/share.svg')} color={'#fff'} /> */}
                </div>
            </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        pathName: state.pathName.pathName,
    };
}

export default connect(mapStateToProps)(Navbar);