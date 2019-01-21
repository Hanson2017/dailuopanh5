import React, { Component, PropTypes } from 'react';
import createReactClass from 'create-react-class';
import Title from '../../../components/title';
import TabList from './tabList';
import TabListFixed from './tabListFixed';

const ListContainer = createReactClass({
    getInitialState: function () {
        return {
            fixed: false,
        }
    },
    render() {
        const { data, field, history, title, routerName } = this.props;

        return (
            <div className="box mt10">
                <Title data={title} screenUrlInfo={{ screenUrl: routerName, tabId: null }} />
                <div className='listContainer'>
                    <div className='table' ref={'tabList'} >
                        <TabList data={data} history={history} field={field} />
                    </div>
                    <TabListFixed data={data} history={history} isFixed={this.state.fixed} />
                </div>
            </div>
        )
    },
    componentDidMount: function () {
        this.refs.tabList.addEventListener('scroll', this.handleScroll)
    },
    componentWillUnmount: function () {
        this.refs.tabList.removeEventListener('scroll', this.handleScroll);

    },
    handleScroll: function (e) {
        if (this.refs.tabList.scrollLeft > 0) {
            this.setState({
                fixed: true
            })
        }
        else {
            this.setState({
                fixed: false
            })
        }
    },

})


export default ListContainer;
