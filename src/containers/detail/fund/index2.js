import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd-mobile';
import WxImageViewer from 'react-wx-images-viewer';
import Theme from '../../../utils/theme';
import Util from '../../../utils/util';
import Api from '../../../utils/api';
import Header from '../../../components/navbar';
import Title from '../../../components/title';
import Loading from '../../../components/loading';
import Liucheng from '../../fund/liucheng';
import './index.scss';


export default class DetailFund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: '',
        };
    }
    render() {

        const { history } = this.props;
        const { loading, dataSource } = this.state;
        const stateData = this.props.location.state;
        const platName = stateData.platName;

        if (!loading) {
            var firmDetail = dataSource.firmDetail;
            var processlist = dataSource.processlist;
            var firmfile = dataSource.firmfile;
        }




        return (
            <div className="ptNoTab detailFundContainerNew">
                <Header title={platName + '  示范出借'} history={history} black={true} search={'null'} />
                <div className="content">
                    {
                        loading ?
                            <Loading />
                            :
                            <div>
                                <div className="box">
                                    <div className='titleContainer'>
                                        <div className="title"><i className="icon"></i> 示范出借概况</div>
                                        <Link to={'/Fund'} className='more'>
                                            <span className="fundName">
                                                {firmDetail.type}号
                                    {
                                                    firmDetail.type == 1 ?
                                                        '稳健型'
                                                        :
                                                        firmDetail.type == 2 ?
                                                            '平衡型'
                                                            :
                                                            '收益型'
                                                }
                                                示范出借
                                </span>
                                            <span className="icon">
                                                <Icon type={require('../../../assets/icons/new/arrow-right.svg')} color={'#ccc'} size={'xxs'} />
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="info">
                                        <div className={firmDetail.status_color == 'red' ? "state zy" : firmDetail.status_color == 'black' ? "state black" : "state"}>
                                            <div className={"icon"}>
                                                {
                                                    firmDetail.status_color == 'green' ?
                                                        <Icon type={require('../../../assets/icons/new/ico-money.svg')} color={'#fff'} size={'lg'} />
                                                        :
                                                        <Icon type={require('../../../assets/icons/new/ico-over.svg')} color={'#fff'} size={'lg'} />
                                                }

                                            </div>
                                            <div className="text">
                                                <p className="t1">{firmDetail.status_info}</p>
                                            </div>
                                        </div>
                                        <dl className="list">
                                            <dt className="item">
                                                <span className="ic1">出借本金</span>
                                                <span className="ic2">出借项目</span>
                                                <span className="ic3">年华收益率</span>
                                                <span className="ic4">已重复出借</span>
                                            </dt>
                                            <dd className="item">
                                                <span className="ic1">{firmDetail.invest_num}万</span>
                                                <span className="ic2">{firmDetail.invest_obj}</span>
                                                <span className="ic3">{firmDetail.invest_rate}%</span>
                                                <span className="ic4">{firmDetail.invest_renum}</span>
                                            </dd>
                                        </dl>
                                        <dl className="list mt15">
                                            <dt className="item">
                                                <span className="ic1">已回收</span>
                                                <span className="ic2">首次出借日期</span>
                                                <span className="ic3">本金到期日期</span>
                                            </dt>
                                            <dd className="item">
                                                <span className="ic1">{firmDetail.invest_back}元</span>
                                                <span className="ic2">{Util.formatDate(firmDetail.invest_startday)}</span>
                                                <span className="ic3">{Util.formatDate(firmDetail.invest_endday)}</span>
                                            </dd>
                                        </dl>
                                        <div className="reason">
                                            <p>出借理由：</p>       
                                            {
                                                firmDetail.invest_reason.split('\r\n').map((item, i) => {
                                                    return (
                                                        <p key={i}>{item}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                        {
                                            firmfile.file_url.indexOf('.pdf') != -1 ?
                                                <Link className="showHt" to={{ pathname: '/showHt', state: { url: Api.domain + firmfile.file_url } }}>查看出借合同</Link>
                                                :
                                                <a className="showHt" target="_blank" href={Api.domain + firmfile.file_url}>查看出借合同</a>
                                        }
                                    </div>
                                </div>
                                <Liucheng data={processlist} title={'示范出借动态'} plat={true} />

                            </div>
                    }


                </div>
            </div>
        )
    }
    componentDidMount() {
        this.getData();
    }
    getData() {

        const that = this;
        const stateData = this.props.location.state;
        const platId = stateData.platId;
        const url = Api.detail + '?type=firm' + '&id_dlp=' + platId;
        fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                that.setState({
                    loading: false,
                    dataSource: json,
                })
                console.log(url)
            });
    }

}