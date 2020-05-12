import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../utils/api';
import Header from '../../components/navbar/index';
import Title from '../../components/title';
import Loading from '../../components/loading';
const width = document.body.clientWidth;

class List extends React.Component {

    render() {
        const { titleText, navList, n } = this.props;
        return (
            <div className="listCon">
                <h6 className="tit">{titleText}</h6>
                <div className="list">
                    {
                        navList.map((item, i) => {
                            const tabId=item.tabId;
                            return (
                                <Link key={i} to={{pathname: '/query/index',state: {tabId}}} style={{width:(1/n)*100+'%'}} className="link">{item.name}</Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}


var beijingNav = [
    { name: '风投系', tabId: { tab1: 0, tab2: 0 } },
    { name: '上市系', tabId: { tab1: 0, tab2: 1 } },
    { name: '国资系', tabId: { tab1: 0, tab2: 2 } },
    { name: '银行系', tabId: { tab1: 0, tab2: 3 } },
    { name: '民营系', tabId: { tab1: 0, tab2: 4 } },
];
var yewuNav = [
    { name: '车贷', tabId: { tab1: 1, tab2: 0 } },
    { name: '房贷', tabId: { tab1: 1, tab2: 1 } },
    { name: '票据', tabId: { tab1: 1, tab2: 2 } },
    { name: '个信', tabId: { tab1: 1, tab2: 3 } },
    { name: '企业', tabId: { tab1: 1, tab2: 4 } },
    { name: '网基', tabId: { tab1: 1, tab2: 5 } },
    { name: '其他', tabId: { tab1: 1, tab2: 6 } },
];

var cunguanNav = [
    { name: '银行直连', tabId: { tab1: 4, tab2: 0 } },
    { name: '直接存管', tabId: { tab1: 4, tab2: 1 } },
    { name: '联合存管', tabId: { tab1: 4, tab2: 2 } },
]



export default class QueryEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            ref: false,
            isFetching: true,
            diquNav: [],
            dateTimeNav: [],
        };
    }
    render() {
        const { history } = this.props;
        const { dataSource, isFetching, diquNav, dateTimeNav } = this.state;
        return (
            <div className="ptNoTab">
                <Header title={'多维度分析'} history={history} />
                {
                    isFetching ?
                        <Loading />
                        :
                        <div className="queryEntryContainer">
                            <Title data={'多维度分析'} />
                            <div className="content">
                                <List titleText={'按背景'} navList={beijingNav} n={6} />
                                <List titleText={'按业务类型'} navList={yewuNav} n={8} />
                                <List titleText={'按地区'} navList={diquNav} n={6} />
                                <List titleText={'按时间'} navList={dateTimeNav} n={5} />
                                <List titleText={'按银行存管'} navList={cunguanNav} n={4} />
                            </div>
                        </div>
                }

            </div>
        )
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        const that = this;
        const url = Api.query
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (responseData) {
                if (responseData.result == 1) {
                    var diquNavNew = [];
                    var dateTimeNavNew = [];
                    for (let i = 0; i < responseData.data.diqu.length; i++) {
                        diquNavNew.push({ name: responseData.data.diqu[i].name, tabId: { tab1: 2, tab2: i } }, )
                    }
                    for (let j = 0; j < responseData.data.shijian.length; j++) {
                        dateTimeNavNew.push({ name: responseData.data.shijian[j].name + '年', tabId: { tab1: 3, tab2: j } }, )
                    }

                    that.setState({
                        dataSource: responseData.data,
                        isFetching: false,
                        diquNav: diquNavNew,
                        dateTimeNav: dateTimeNavNew
                    })
                }

            });
    }


}