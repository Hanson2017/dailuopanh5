import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';
import configureStore from '../redux/store/configureStore';
import DevTools from '../containers/DevTools';

import App from '../App';
import TabBar from '../containers/tabBar';
import Funds from '../containers/fund';
import FlmfList from '../containers/flmfList';
import Data from '../containers/data';
import Pingji from '../containers/pingji/index';
import Health from '../containers/health/index';
import Yulun from '../containers/yulun/index';
import Flow from '../containers/flow/index';
import Query from '../containers/query/index';
import FiveYears from '../containers/fiveYears/index';
import Black from '../containers/black/index';
import Zhengyi from '../containers/zhengyi/index';
import Reports from '../containers/reports/index';
import ReportsDetail from '../containers/reports/detail/index';
import Detail from '../containers/detail';
import Search from '../containers/search/index';
//
import Account from '../containers/account/index';
import Login from '../containers/account/login/index';
import LoginCallback from '../containers/account/login/callback';
import Member from '../containers/account/member/index';
import HelpList from '../containers/help/index';
import HelpDetail from '../containers/help/detail/index';

import AppDown from '../containers/appdown/index';
import NotFoundPage from '../containers/404/index';

import PingCe from '../containers/pingce';
import PingCeDetail from '../containers/pingce/detail/index';

//评论
import CommentForm from '../containers/commentForm/index';

const store = configureStore()

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Router history={browserHistory}>
                        <Route path="/" component={App}>
                            <IndexRoute component={TabBar} />
                            <Route path="pingji" component={Pingji} />
                            <Route path="fund" component={Funds} />
                            <Route path="activity" component={FlmfList}></Route>
                            <Route path="data" component={Data} />
                            <Route path="health" component={Health} />
                            <Route path="yulun" component={Yulun} />
                            <Route path="flow" component={Flow} />
                            <Route path="query" component={Query} />
                            <Route path="fiveYears" component={FiveYears} />
                            <Route path="black" component={Black} />
                            <Route path="zhengyi" component={Zhengyi} />
                            <Route path="reports" component={Reports} />
                            <Route path="reportDetail/:id" component={ReportsDetail} />
                            <Route path="detail/:id" component={Detail} />
                            <Route path="help" component={HelpList} />
                            <Route path="help/:id" component={HelpDetail} />
                            <Route path="member" component={Account} />
                            <Route path="member/Login/qqlogin" component={LoginCallback} />
                            <Route path="member/login" component={Login} />
                            <Route path="member/index" component={Member} />
                            <Route path="search" component={Search} />
                            <Route path="about/appdown" component={AppDown} />
                            <Route path="pingce" component={PingCe} />
                            <Route path="pingce/:id" component={PingCeDetail} />
                            <Route path="commentForm" component={CommentForm} />
                            
                            <Route path='/404' component={NotFoundPage} />
                            <Redirect from='*' to='/404' />

                        </Route>

                    </Router>

                    {/* <DevTools /> */}
                </div>
            </Provider>
        )
    }
}