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
import PingjiJG from '../containers/pingji/jigou';
import PingjiMT from '../containers/pingji/meiti';
import Health from '../containers/health';
import Flow from '../containers/flow';

import Data from '../containers/data';
import QueryEntry from '../containers/query/entry';
import Query from '../containers/query/index';
import Reports from '../containers/reports';
import ReportsDetail from '../containers/reports/detail';
import Black from '../containers/black/index';
import Zhengyi from '../containers/zhengyi/index';
import Gongshang from '../containers/gongshang';

import PingCe from '../containers/pingce';
import PingCeDetail from '../containers/pingce/detail/index';
import PingCeComments from '../containers/pingce/comments';
import PingCeCommentsForm from '../containers/pingce/comments/form';

//回复评论


import Yulun from '../containers/yulun';
import Comment from '../containers/comment';

import Funds from '../containers/fund';
import ShowHT from '../containers/fund/showHT';
import Activity from '../containers/activity';

import Account from '../containers/account/index';
import LoginCallback from '../containers/account/login/callback';
import HelpList from '../containers/help';
import HelpDetail from '../containers/help/detail';
import About from '../containers/about';

import Detail from '../containers/detail';
import DetailFund from '../containers/detail/fund/index2';
import DetailBiangeng from '../containers/detail/info/gudong/biangeng/list';
import CommentsForm from '../containers/detail/yuqing/comment/form';






import Pingji from '../containers/pingji/index';




import FiveYears from '../containers/fiveYears/index';




import Search from '../containers/search/index';
//

import Login from '../containers/account/login/index';

import Member from '../containers/account/member/index';


import AppDown from '../containers/appdown/index';
import NotFoundPage from '../containers/404/index';





import '../style/base.scss'

const store = configureStore()

const App = () => (
    <Provider store={store}>
        <div>
        <Router>
            <Switch>
                <Route exact path="/" component={TabBar} />
                <Route path="/tabPingji" component={TabBar} />
                <Route path="/tabData" component={TabBar} />
                <Route path="/tabYulun" component={TabBar} />
                <Route path="/tabFind" component={TabBar} />

                <Route path="/pingji/jigou" component={PingjiJG} />
                <Route path="/pingji/meiti" component={PingjiMT} />
                <Route path="/health" component={Health} />
                <Route path="/flow" component={Flow} />

                <Route path="/data" component={Data} />
                <Route exact path="/query" component={QueryEntry} />
                <Route path="/query/index" component={Query} />
                <Route exact path="/reports" component={Reports} />
                <Route path="/reports/:id" component={ReportsDetail} />
                <Route path="/black" component={Black} />
                <Route path="/zhengyi" component={Zhengyi} />
                <Route path="/gongshang" component={Gongshang} />

                <Route exact path="/pingce" component={PingCe} />
                <Route path="/pingce/:id" component={PingCeDetail} />
                <Route path="/pingceComment/:id" component={PingCeComments} />
                <Route path="/pingCeCommentsForm" component={PingCeCommentsForm} />
                
                <Route exact path="/yulun" component={Yulun} />
                <Route exact path="/comment" component={Comment} />

                <Route exact path="/fund" component={Funds} />
                <Route exact path="/showHt" component={ShowHT} />
                
                <Route path="/activity" component={Activity}></Route>

                <Route exact path="/member" component={Account} />
                <Route path="/member/Login/qqlogin" component={LoginCallback} />
                <Route exact path="/help" component={HelpList} />
                <Route path="/help/:id" component={HelpDetail} />
                <Route exact path="/about" component={About} />
                <Route path="/about/appdown" component={TabBar} />

                <Route exact path="/detail/:id" component={Detail} />
                <Route path="/detailFund" component={DetailFund} />
                <Route path="/biangenglist" component={DetailBiangeng} />
                <Route path="/commentForm" component={CommentsForm} />

                <Route path="/search" component={Search} />    


              
                
                <Route path="/pingji" component={Pingji} />
                
               
               
                {/* <Route path="/query" component={Query} /> */}
                <Route path="/fiveYears" component={FiveYears} />
               
               
                
                
                
               
               
                
               
                
                <Route path='/404' component={NotFoundPage} />
                <Redirect from='*' to='/404' />
            </Switch>
          
        </Router >
        {/* <DevTools /> */}
        </div>
    </Provider>
)

export default App;