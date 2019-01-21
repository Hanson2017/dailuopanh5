import React, { Component } from 'react';
import Header from '../../components/navbar/index';
import TabBar from '../../components/tabBar/tabQuery2';
import Rongzi from './rongzi/'
import Yewu from './yewu/'
import ListTab from './listTab/'
import './index.scss';

const width = document.body.clientWidth;

export default class Query extends React.Component {
    constructor() {
        super()
        this.state = {
            tab1: 0,
            tab2: 0
        }
        this.chageTab2 = this.chageTab2.bind(this)
    }
    componentWillMount() {
        const tabIndex = this.props.location.state;
        this.setState({
            tab1: tabIndex.tabId.tab1,
            tab2: tabIndex.tabId.tab2,
        })
    }
    render() {
        const { history } = this.props;
        const { tab1, tab2 } = this.state;
        return (
            <div className='queryContainer'>
                <Header title={'多维度查询'} history={history} />
                <TabBar current={tab1} chageTab2={this.chageTab2}>
                    <Rongzi name={'融资背景'} tabIndex={tab1 == 0 ? tab2 : null} history={history} />
                    <Yewu name={'业务类型'} tabIndex={tab1 == 1 ? tab2 : null} history={history} />
                    <ListTab name={'地区'} tabIndex={tab1 == 2 ? tab2 : null} type={'diqu'} columnID={'queryDiqu'} tabWidth={(width - 0.2 * 50 * 8) / (50 * 6)} history={history} />
                    <ListTab name={'上线时间'} tabIndex={tab1 == 3 ? tab2 : null} type={'shangxian'} columnID={'queryShangxian'} tabWidth={(width - 0.2 * 50 * 5.5) / (50 * 4)} titleText={'年'} history={history} />
                    <ListTab name={'银行存管'} tabIndex={tab1 == 4 ? tab2 : null} type={'cunguan'} columnID={'queryCunguan'} tabWidth={(width - 0.2 * 50 * 4.5) / (50 * 3)} history={history} />
                </TabBar>
            </div>
        )
    }
    chageTab2(num) {
        this.setState({
            tab2: 0
        })
    }
}
