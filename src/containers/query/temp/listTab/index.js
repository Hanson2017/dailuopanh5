import React, { Component } from 'react';
import './index.scss';

class ListTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [],
            tabName: '',
            tabCount: 0,
            tabIndex: 0
        }
    }
    componentWillMount() {
        this.setState({
            tabIndex: this.props.tabIndex?this.props.tabIndex:0,
        })
    }
    render() {
        const { data,updatetime, history } = this.props;
        const { tabList, tabName, tabCount, tabIndex } = this.state;
        return (
            <div className="ptTab querytabListContainer">
                <div className="updateT">更新时间  {updatetime}</div>   
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
                                        <li key={i} onClick={() => { history.push('/detail/' + text.id_dlp) }}>
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
    }
    componentDidMount() {
        const data = this.props.data;
        const tabIndex=this.state.tabIndex;
        this.setState({
            tabList: data[tabIndex].list,
            tabName: data[tabIndex].name,
            tabCount: data[tabIndex].count
        })
    }
    filterArea(index) {
        const data = this.props.data;
        this.setState({
            tabList: data[index].list,
            tabName: data[index].name,
            tabCount: data[index].count,
            tabIndex: index
        })
    }
}

export default ListTab;