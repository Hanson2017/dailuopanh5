import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { Document, Page } from 'react-pdf';
import Loading from '../../../components/loading/index';
import Header from '../../../components/navbar/index';
import './index.scss';

const width = document.body.clientWidth;
const clientHeight = window.screen.height;

export default class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: null,
            pageNumber: 1,
            loading: true,
            url: ''
        }

    }
    componentWillMount() {

        this.setState({
            url: this.props.location.state.url,
        })
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({
            numPages: numPages,
            loading: false
        });
    }
    handlePrevious = () => {
        this.setState({ pageNumber: this.state.pageNumber - 1 });
    }
    handleNext = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 });
    }
    renderLoader() {
        return (
            <Loading />
        )
    }
    render() {
        const { pageNumber, numPages, loading, url } = this.state;
        const { history } = this.props;
        return (
            <div className="ptNoTab showPdfContainer" style={{ minHeight: clientHeight - 42 }}>
                <Header title={' '} history={history} search={'null'} />
                <Document
                    className="pdfDuc"
                    loading={this.renderLoader()}
                    file={url}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} renderTextLayer={false} width={width} />
                </Document>
                {
                    loading ?
                        null
                        :
                        <div className="pagepdf">
                            <a className="n" onClick={pageNumber === 1 ? null : this.handlePrevious}>
                                <Icon type={require('../../../assets/icons/new/arrow-left.svg')} color={pageNumber === 1 ? '#ccc' : '#999'} size={'xs'} />
                            </a>
                            <p className="p">{pageNumber}/{numPages}</p>
                            <a className="n" onClick={pageNumber === numPages ? null : this.handleNext}>
                                <Icon type={require('../../../assets/icons/new/arrow-right2.svg')} color={pageNumber === numPages ? '#ccc' : '#999'} size={'xs'} />
                            </a>
                        </div>
                }

            </div>
        );
    }
}