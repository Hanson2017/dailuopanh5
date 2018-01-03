import React, { Component, PropTypes } from 'react';
import TabBar from '../../../components/tabBar2/tabs';
import List from '../temp/list';

const tabNames = [
    { title: '风投系', type: { column: 'rongzi', type: 'rongzi', columnID: 'queryFengtou' }, Ttype: '风投' },
    { title: '上市系', type: { column: 'rongzi', type: 'shangshi', columnID: 'queryShangshi' }, Ttype: '上市' },
    { title: '国资系', type: { column: 'rongzi', type: 'guozi', columnID: 'queryGuozi' }, Ttype: '国资' },
    { title: '银行系', type: { column: 'rongzi', type: 'yinhang', columnID: 'queryYinhang' }, Ttype: '银行' },
    { title: '民营系', type: { column: 'rongzi', type: 'minying', columnID: 'queryMinying' }, Ttype: '民营' },

]

export default class Rongzi extends React.Component {
    render() {
        const tabIndex = this.props.tabIndex;
        return (
            <TabBar current={tabIndex}>
                {
                    tabNames.map((tab, i) => {
                        return (
                            <List key={i} name={tab.title} type={tab.type} Ttype={tab.Ttype} />
                        )
                    })
                }

            </TabBar>
        )

    }
}
