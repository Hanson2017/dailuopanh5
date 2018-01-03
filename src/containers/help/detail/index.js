import React, { Component, PropTypes } from 'react';
import createReactClass from 'create-react-class';
import { History } from 'react-router';
import Loading from '../../../components/loading/index';
import Header from '../../../components/navbar/index';
import Api from '../../../utils/api';
import './index.scss';

const HelpDetail = createReactClass({
    getInitialState() {
        return {
            isFetching: true,
            dataSource: ''
        }
    },
    render() {
        const data=this.state.dataSource;
        if (!this.state.isFetching) {
            var con_str = data.con_str.replace(/\/ueditor_net/g, Api.domain+'/ueditor_net').replace(/.png\\/g, '.png')          
        }
        return (
            <div className='helpContainer'>
                 <Header title={'问答详情'} search='null' location={this.props.location} />
                 {
                     this.state.isFetching?
                     <Loading />
                     :
                     <div className='helpDetail'>
                         <h1 className='title'>{data.title}</h1>
                         <div className='content' dangerouslySetInnerHTML={{__html:con_str}} />
                     </div>
                 }   

            </div>
        )
    },
    componentDidMount(){
        this.getData();
    },
    getData() {
        const that = this;
        const id = this.props.params.id;
        const url = Api.helpDetail + '?id=' + id;
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
})

export default HelpDetail;