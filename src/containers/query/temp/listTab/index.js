import React, { Component } from 'react';
import { History } from 'react-router';
import createReactClass from 'create-react-class';
import './index.scss';

const ListTab = createReactClass({
    mixins: [History],
    getInitialState() {
        return {
            tabList: [],
            tabName: '',
            tabCount: 0,
            tabIndex: 0
        }
    },
    render() {
        const data = this.props.data;
        const tabList = this.state.tabList;
        const tabName = this.state.tabName;
        const tabCount = this.state.tabCount;
        const tabIndex = this.state.tabIndex;
        return (
            <div>
                <ul className='queryDiquListTab'>
                    {
                        data.map((tab, i) => {
                            return (
                                <li style={this.props.tabWidth} className={tabIndex == i ? 'on' : null} key={i} onClick={this.filterArea.bind(this, i)}>{tab.name}{this.props.titleText ? this.props.titleText : null}</li>
                            )
                        })
                    }
                </ul>
                <div className='queryDiquContent'>
                    <h6 className='platName'>{tabName}<span>（{tabCount}家）</span></h6>
                    <ul className='list'>
                        {
                            tabList.length > 0 ?
                                tabList.map((text, i) => {
                                    return (
                                        <li key={i} onClick={() => { this.history.pushState(null, '/detail/' + text.id_dlp) }}>
                                            {text.plat_name}<span>{text.score != 0 && text.score && text.score != '' ? '（' + text.score + '）' : null}</span>
                                        </li>
                                    )
                                })
                                :
                                null
                        }
                    </ul>
                </div>
            </div>
        )
    },
    componentDidMount() {
        const data = this.props.data;
        this.setState({
            tabList: data[0].list,
            tabName: data[0].name,
            tabCount: data[0].count
        })
    },
    filterArea(index) {
        const data = this.props.data;
        this.setState({
            tabList: data[index].list,
            tabName: data[index].name,
            tabCount: data[index].count,
            tabIndex: index
        })
    }
})

export default ListTab;