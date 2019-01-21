import React, { Component } from 'react';
import Api from '../../utils/api';
import Loading from '../../components/loading';
import NavBar from '../../components/navbar/';
import Num from './num';
import NavList from './navList';
import Dapan from './dapan';
import Pingce from './pingce';
import BBs from './bbs';
import Yulun from './yulun';

import Comment from './comment';
import Report from './report';
import Activity from './activity';
import FundLiuc from './fund/liucheng';
import Fund from './fund';
import Mianze from '../mianze';

import './index.scss';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            dataSource: '',
            bbsData: '',
        }
    }
    render() {
        const { history, onOpenChange } = this.props;
        const { isFetching, dataSource, bbsData } = this.state;
        return (
            <div className='ptTabBar'>
                <NavBar history={history} onOpenChange={onOpenChange} />
                {
                    isFetching ?
                        <Loading />
                        :
                        <div className='homeContent'>
                            <Num data={dataSource.homenum} />
                            <NavList />
                            <Dapan history={history} data={{ inamount: dataSource.inamount, markent: dataSource.markent, echartYulun: dataSource.sentviewlist, numYulun: dataSource.sentday, newBlack: dataSource.reblacklist, newZhengyi: dataSource.rezhengyilist, gongshang: dataSource.gongshanglist }} />
                            <BBs data={bbsData} />
                            <Pingce history={history} data={dataSource.mplisttop} />                           
                            <Yulun data={dataSource.sentlist} />
                            <Comment data={dataSource.commentlist} />
                            <Report data={dataSource.reportslist} />
                            <Activity data={dataSource.flmf} />
                            <Fund data={dataSource.listfund_firm} />
                            <FundLiuc data={dataSource.fund_process} />
                           
                            <Mianze />
                        </div>
                }

            </div>
        )
    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        const that = this;
        const url = Api.home

        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {

                if (json.result == 1) {
                    
                    that.setState({
                        dataSource: json
                    })
                    that.getDataBBs()
                }

            });
    }
    getDataBBs() {

        const that = this;
        const url = Api.bbs + 'gettype=apphome&getnum=5';

        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
              
                that.setState({
                    isFetching: false,
                    bbsData: json.forumlist,
                })

            });
    }
}