import React, { Component, PropTypes } from 'react';
import Loading from '../../components/loading/index';
import Header from '../../components/navbar/index';
import Api from '../../utils/api';
import './index.scss';
const clientHeight = window.screen.height;
export default class HelpList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            dataList: []
        }
    }
    render() {
        const { history} = this.props;
        return (
            <div className='ptNoTab helpContainer' style={{ minHeight: clientHeight}}>
                <Header title={'常见问题'} search='null' history={history} />
                <div className='list'>
                    {
                        this.state.isFetching ?
                            <Loading />
                            :
                            <ul>
                                {
                                    this.state.dataList.map((item, i) => {
                                        return (
                                            <li key={i} onClick={() => history.push('/help/' + item.id)}>{item.title}</li>
                                        )
                                    })
                                }
                            </ul>
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
        const url = Api.helpList
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
                        dataList: json.data
                    })
                }

            });
    }
}
