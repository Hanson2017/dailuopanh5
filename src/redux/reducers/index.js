import { combineReducers } from 'redux';

import { deatail } from './detail';
import { detailReport } from './detailReport';
import { funds } from './fund';
import {
    tabIndex,
    pathName,
    totalNum,
    pjAll, pjWdzj, pjP2peye, pjDlp, pjR360, pjXinghuo, pjYifei,
    flmfList,
    dataList,
    healthAll, healthZijin, healthFensan, healthLiudong, healthShouyi, healthRenqi, healthTiliang, healthZhongcheng, healthChengzhang,
    yulunList,
    flowAll,flowBaidu,flowHaosou,flowZhanzhang,flowAizhan,flow76676,
    queryFengtou,queryShangshi,queryGuozi,queryYinhang,queryMinying,queryChedai,queryFangdai,queryPiaoju,queryGexin,queryQiye,queryWangji,queryHuoqi,queryOther,queryDiqu,queryShangxian,queryCunguan,
    fiveYears,
    blackList,blackShengfen,blackZimu,blackShijian,zhengyiList,
    reportsZh,reportsWdzj,reportsP2peye,reportsDlp,reportsR360,reportsXinghuo,reportsYifei,reportsOther,
    guanzhuList,
    guanzhuListSider
} from './listTab';

const App = combineReducers({
    tabIndex,
    pathName,
    totalNum,
    pjAll, pjWdzj, pjP2peye, pjDlp, pjR360, pjXinghuo, pjYifei,
    flmfList, 
    dataList,
    funds,
    healthAll, healthZijin, healthFensan, healthLiudong, healthShouyi, healthRenqi, healthTiliang, healthZhongcheng, healthChengzhang,
    yulunList,
    flowAll,flowBaidu,flowHaosou,flowZhanzhang,flowAizhan,flow76676,
    queryFengtou,queryShangshi,queryGuozi,queryYinhang,queryMinying,queryChedai,queryFangdai,queryPiaoju,queryGexin,queryQiye,queryWangji,queryHuoqi,queryOther,queryDiqu,queryShangxian,queryCunguan,
    fiveYears,
    blackList,blackShengfen,blackZimu,blackShijian,zhengyiList,
    reportsZh,reportsWdzj,reportsP2peye,reportsDlp,reportsR360,reportsXinghuo,reportsYifei,reportsOther,
    deatail,
    detailReport,
    guanzhuList,
    guanzhuListSider
})

export default App
