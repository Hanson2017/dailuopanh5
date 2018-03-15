import React, { Component, PropTypes } from 'react';
import Loading from '../../../components/loading/index';
import Header from '../../../components/navbar/index';
import Api from '../../../utils/api';
import Util from '../../../utils/util';
import './index.scss';


class HelpDetail extends React.Component {
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
        const pathname = this.props.location.pathname;
        const data = this.state.dataSource;
        if (!this.state.isFetching) {
            var con_str = data.detailinfo.replace(/\/atcpic/g, Api.domain + '/atcpic').replace(/.png\\/g, '.png')
        }
        return (
            <div className='helpContainer'>
                <Header title={'评测文章'} search='null' history={history} pathname={pathname} />
                {
                    this.state.isFetching ?
                        <Loading />
                        :
                        <div className='pingCeDetail'>
                            <h1 className='title'>{data.title}</h1>
                            <div className='header'>
                                <div className='source'>来源：微信公众号-{data.mpname}</div>
                                <div className='date'>时间：{Util.formatDate(data.updatetime)}</div>
                            </div>
                            <div className='content' dangerouslySetInnerHTML={{ __html: con_str }} />
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
                        dataSource: json.data.article
                    })
                }

            });
    }
}

export default HelpDetail;