import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Link } from 'react-router-dom';
import WxImageViewer from 'react-wx-images-viewer';
import Title from '../../../components/title';
import Util from '../../../utils/util';
import Api from '../../../utils/api';
import Item from './item';
import './index.scss';
const width = document.body.clientWidth;

export default class HomeFundLiuc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imags: [],
            index: [0, 0],
            isOpen: [],
            ref: false
        };
    }
    componentWillMount() {
        const { data } = this.props;
        var imagsNew = [];
        var isOpenNew = [];
        if (data != null && data.length > 0) {
            for (let i = 0; i < data.length; i++) {

                imagsNew.push([]);
                isOpenNew.push(false);

                if (data[i].imglist !== null && data[i].imglist.length > 0) {

                    for (let z = 0; z < data[i].imglist.length; z++) {
                        imagsNew[i].push(Api.domain + data[i].imglist[z].file_url)
                    }
                }
            }
        }

        this.setState({
            imags: imagsNew,
            isOpen: isOpenNew
        })

    }

    onClose = () => {
        this.state.isOpen[this.state.index[0]] = false;
        this.setState({
            ref: !this.state.ref
        })
    }

    openViewer(index, index2) {
        this.state.isOpen[index] = true;
        this.setState({
            index: [index, index2],
        })
    }
    render() {
        const { data } = this.props;
        const { imags, index, isOpen } = this.state;
        return (
            <div className={"homeFundLiucContainer box mt10"}>
                <Title data={'示范出借动态'} screenUrlInfo={{ screenUrl: '/fund', tabId: null }} />
                <div className="content">
                    {
                        data.map((item, i) => {
                           
                            return (
                                <div className="box list" key={i}>
                                    <div className="hd">
                                        <span className="icon">
                                            <Icon type={require('../../../assets/icons/new/ico-calendar.svg')} color={'#999'} size={'md'} />
                                        </span>
                                        <span className="date">{Util.formatDate(item.showday)}</span>
                                    </div>
                                    <div className="bd">
                                        <Link to={'/detail/' + item.id_dlp} className="platName">{item.plat_name}</Link>
                                        <div className='cc' dangerouslySetInnerHTML={{ __html: item.detailinfo }} />
                                        {
                                            item.imglist !== null && item.imglist.length > 0 ?
                                                <div className="relatePic">
                                                    <div className="tit">相关截图</div>
                                                    <ul className="picList">
                                                        {
                                                            item.imglist.map((list, j) => {
                                                                return (
                                                                    <li key={j} >
                                                                        <img src={Api.domain + list.file_url} width={(width - 60 - 17) / 3} height={(width - 60 - 17) / 3} onClick={this.openViewer.bind(this, i, j)} className="" />
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                                :
                                                null
                                        }
                                        {
                                            item.filelist !== null && item.filelist.length > 0 ?
                                                <div className="relateHt">
                                                    <div className="tit">相关合同</div>
                                                    {
                                                        item.filelist[0].file_url.indexOf('.pdf') != -1 ?
                                                            <Link className="showHt" to={{ pathname: '/showHt', state: { url: Api.domain + item.filelist[0].file_url } }}>查看出借合同</Link>
                                                            :
                                                            <a className="showHt" target="_blank" href={Api.domain + item.filelist[0].file_url}>查看出借合同</a>
                                                    }
                                                </div>
                                                :
                                                null
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        isOpen[index[0]] ? <WxImageViewer onClose={this.onClose} urls={imags[index[0]]} index={index[1]} zIndex={1000} /> : null
                    }
                </div>
            </div>
        )
    }
}