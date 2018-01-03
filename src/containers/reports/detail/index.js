import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Util from '../../../utils/util';
import Api from '../../../utils/api'
import Load from '../../../components/loading'
import { fetchPostsDeatail } from '../../../redux/actions/index'
import Header from '../../../components/navbar/index';
import './index.scss';

class ReportsDetail extends React.Component {

    render() {
        const { dataSource } = this.props;
        const data = dataSource.dataSource;
        return (
            <div className='containerReportDetail'>
                <Header title={'数据报表'} location={this.props.location} />
                {
                    dataSource.isFetching ?
                        <Load />
                        :
                        <div>
                            <div className='hd'>
                                <h6 className='title'>{data.title}</h6>
                                <p className='update'>发布时间  {Util.formatDate(data.addtime)}</p>
                            </div>
                            {data.type !== 'dlp' ?

                                <div className='content' dangerouslySetInnerHTML={{ __html: data.con_str.replace(/\/ueditor_net/g,  Api.domain+'/ueditor_net').replace(/.png\\/g, '.png') }} />
                                :
                                <div className='contentDlp'>
                                    <p>本文因为数据过多，暂时只支持PC端查看。</p>
                                    <p>贷罗盘PC端网址：Http://www.dailuopan.com</p>
                                </div>
                            }


                        </div>
                }
            </div>
        )
    }
    componentDidMount() {
        const { dispatch } = this.props;
        const type = this.props.location.state;
        const id = this.props.params.id;
        var url;
        if (type == 'dlp') {
            url = Api.getReportsDetail_dlp + '?id=' + id
        }
        else {
            url = Api.getReportsDetail + '?id=' + id
        }

        dispatch(fetchPostsDeatail('report', url))

    }
}
function mapStateToProps(state) {
    return {
        dataSource: state.detailReport
    };
}

export default connect(mapStateToProps)(ReportsDetail);

