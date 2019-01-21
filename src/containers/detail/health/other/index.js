import React, { Component } from 'react';
import Title from '../../../../components/title';
import BarEchart from '../barEchart';


class OtherModule extends React.Component {
    render() {
        const { dataList, title, field, echartID, echartName, echartTitle, echartX, mt } = this.props;
        return (
            <div className={mt ? 'box' : 'box mt10'}>
                <Title data={title} />
                <div className="echartCon">
                    <BarEchart data={dataList} field={field} echartID={echartID} name={echartName} title={echartTitle} x={echartX} />
                </div>
            </div>
        )
    }
}

export default class Other extends React.Component {
    render() {
        const {data} = this.props;
        if (data.listdata != null && data.listdata.length > 0) {
            return (
                <div className='detailHealthOther'>
                    <OtherModule dataList={data.listdata} title={'成交量走势'} field={'amount'} echartID={'barEchartChengjiao'} echartName={'成交量走势(万元)'} echartTitle={'成交量走势'} echartX={70} mt={true} />

                    <OtherModule dataList={data.listdata} title={'每日借款人数走势'} field={'borrowerNum'} echartID={'barEchartJiekuanrens'} echartName={'每日借款人数走势(人)'} echartTitle={'每日借款人数走势'} echartX={70} />

                    <OtherModule dataList={data.listdata} title={'待还借款人数走势'} field={'borrowWaitNum'} echartID={'barEchartDaihuan'} echartName={'待还借款人数走势(人)'} echartTitle={'待还借款人数走势'} echartX={70} />

                    <OtherModule dataList={data.listdata} title={'满标用时走势'} field={'fullloanTime'} echartID={'barEchartManBiao'} echartName={'满标用时走势(分钟)'} echartTitle={'满标用时走势'} echartX={70} />
                </div>
            )
        }
        else {
            return (
                <div className='detailHealthOther'>
                    <div className='null'>暂无数据</div>
                </div>
            )
        }

    }

}