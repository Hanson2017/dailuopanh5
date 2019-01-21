import React, { Component } from 'react';
import Api from '../../utils/api';
import Loading from '../../components/loading';
import NavBar from '../../components/navbar';

import Fund from './fund';
import FundLiuc from '../home/fund/liucheng';
import Activity from './activity';
import Mianze from '../mianze';
import './index.scss';


export default class TabFind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            dataSource: '',
        }
    }
    render() {
        const { history, onOpenChange } = this.props;
        const { isFetching, dataSource } = this.state;
        return (
            <div className="ptTabBar">
                <NavBar history={history} title={'发现'} onOpenChange={onOpenChange} />
                {
                    isFetching ?
                        <Loading />
                        :
                        <div className="tabFindContainer">
                            <Fund data={{ count: dataSource.fundcount, list: dataSource.fundlist_firm }} />
                            <FundLiuc  data={dataSource.fund_process} />
                           
                            <Activity data={dataSource.flmf} />
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
        const url = Api.findHome;
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
                        isFetching: false,
                        dataSource: json.data
                    })
                }

            });
    }
}