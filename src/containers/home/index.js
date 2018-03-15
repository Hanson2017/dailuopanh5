import React, { Component } from 'react';
import { Drawer } from 'antd-mobile';
import NavBar from '../../components/navbar/'
import SearchBar from './searchBar/'
import NavList from './navList/'
import Sidebar from './sidebar/'
import './index.scss'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false,
        }
        this.onOpenChange = this.onOpenChange.bind(this)
    }
    render() {
        const { history } = this.props;
        const pathname = this.props.location.pathname;
        return (
            <div>
                <Drawer
                    className="drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    sidebarStyle={{ backgroundColor: '#1d2225', width: '90%', opacity: 0.97, zIndex: 1002 }}
                    overlayStyle={{ zIndex: 1001 }}
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    dragHandleStyle={{ width: 0 }}
                    sidebar={<Sidebar history={history} />}
                    open={this.state.openDrawer}
                    onOpenChange={this.onOpenChange}
                >
                   <div></div>
                </Drawer>
                <div className='homeContainer'>
                    <NavBar history={history} pathname={pathname} onOpenChange={this.onOpenChange} />
                    <div className='homeContent'>
                        <SearchBar history={history} />
                        <NavList history={history} />
                    </div>
                </div>
            </div>
        )
    }
    onOpenChange = (...args) => {
        this.setState({ openDrawer: !this.state.openDrawer });
    }
    componentDidMount() {

    }
}