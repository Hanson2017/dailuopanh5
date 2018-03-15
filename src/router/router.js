import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import configureStore from '../redux/store/configureStore';
import DevTools from '../containers/DevTools';

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

import '../style/base.scss'

const store = configureStore()

const App = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={TabBar} />
                <Route path="/yulun" component={TabBar} />
                <Route path="/fund" component={TabBar} />
                <Route path="/activity" component={TabBar}></Route>
                <Route path="/about/appdown" component={TabBar} />
                <Route path="/pingji" component={Pingji} />
                <Route path="/data" component={Data} />
                <Route path="/health" component={Health} />
                <Route path="/flow" component={Flow} />
                <Route path="/query" component={Query} />
                <Route path="/fiveYears" component={FiveYears} />
                <Route path="/black" component={Black} />
                <Route path="/zhengyi" component={Zhengyi} />
                <Route path="/search" component={Search} />
                <Route path="/detail/:id" component={Detail} />
                <Route exact path="/pingce" component={PingCe} />
                <Route path="/pingce/:id" component={PingCeDetail} />
                <Route exact path="/reports" component={Reports} />
                <Route path="/reports/:id" component={ReportsDetail} />
                <Route exact path="/help" component={HelpList} />
                <Route path="/help/:id" component={HelpDetail} />
                <Route exact path="/member" component={TabBar} />
                <Route path="/member/Login/qqlogin" component={LoginCallback} />
                <Route path="/commentForm" component={CommentForm} />
                <Route path='/404' component={NotFoundPage} />
                <Redirect from='*' to='/404' />
            </Switch>
        </Router >
    </Provider>
)

export default App;