import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/loading/index';
import Header from '../../../components/navbar/index';
import Api from '../../../utils/api';
import Util from '../../../utils/util';
import Foot from './foot';
import './index.scss';


class PingceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            dataSource: '',
            id:null
        }
    }
    componentWillMount() {
        var match = this.props.match;
        this.setState({
            id: match.params.id
        });
    }
    render() {
        const { history } = this.props;
        const {dataSource,id} = this.state;
        const article=dataSource.article;
        const plats=dataSource.plats;

        if (!this.state.isFetching) {
            var con_str = article.detailinfo.replace(/\/atcpic/g, Api.domain + '/atcpic').replace(/.png\\/g, '.png')
        }

        return (
            <div className='ptNoTab pingceDetailContainer'>
                <Header title={'评测文章'} search='null' history={history}/>
                {
                    this.state.isFetching ?
                        <Loading />
                        :
                        <div className='content'>
                            <div className="top">
                                <h1 className='title'>{article.title}</h1>
                                <div className="sourceCon">
                                    <span className="source">来源：微信公众号-{article.mpname}</span>
                                    <span className="date">发布时间：{Util.formatDate(article.updatetime)}</span>
                                </div>
                                <div className="relate">
                                    <span className="label">相关：</span>
                                    {
                                        plats !== '' && plats.length > 0 ?
                                            plats.map((item, i) => {
                                                return (
                                                    <Link to={'/detail/' + item.id_dlp} className="plat" key={i}>{item.plat_name}</Link>
                                                )
                                            })
                                            :
                                            <span className="plat">其它</span>
                                    }
                                </div>
                            </div>
                            <div className='con' dangerouslySetInnerHTML={{ __html: con_str }} />
                            <Foot  cid={id} history={history} commentcount={dataSource.commentcount} />
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
        const id = this.state.id;
        const url = Api.pingCeDetail + '?id=' + id;
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

export default PingceDetail;