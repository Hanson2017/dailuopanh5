import { REQUEST_POSTS, RECEIVE_POSTS, REQUEST_LOADMORE, RECEIVE_LOADMORE, TOTALNUM, CHANGETOTALNUM, CHANGETABINDEX, CHANGEPATHNAME } from '../actions/index';

function cd(_id) {
    return (state = {
        isFetching: true,
        loadMore: false,
        page: 1,
        pageCount: 1,
        totalNum: 0,
        updatetime: '',
        items: []
    }, action) => {
        if (_id !== action.id) {
            return state
        }
        else if (_id == 'flmfList') {
            switch (action.type) {
                case REQUEST_POSTS:
                    return Object.assign({}, state, {
                        isFetching: true,
                    })

                case RECEIVE_POSTS:
                    return Object.assign({}, state, {
                        isFetching: false,
                        totalNum: action.posts.totalNum,
                        items: action.posts.dataList,
                    })
                default:
                    return state;
            }
        }
        else if (_id == 'yulunList' || _id == 'pingceList' || _id == 'guanzhuList' || _id == 'guanzhuListSider' || _id == 'commentListAccount' == _id == 'gongshangList') {
            switch (action.type) {
                case REQUEST_POSTS:
                    return Object.assign({}, state, {
                        isFetching: true,
                    })

                case RECEIVE_POSTS:
                    return Object.assign({}, state, {
                        isFetching: false,
                        page: 2,
                        pageCount: action.posts.pageCount,
                        totalNum: action.posts.totalNum,
                        items: action.posts[action.dataListName],
                        dataView: action.posts.dataView
                    })
                case REQUEST_LOADMORE:
                    return Object.assign({}, state, {
                        loadMore: true,
                    })
                case RECEIVE_LOADMORE:
                    return Object.assign({}, state, {
                        isFetching: false,
                        loadMore: false,
                        page: state.page + 1,
                        items: state.items.concat(action.posts[action.dataListName])
                    })
                default:
                    return state;
            }
        }
        else {
            switch (action.type) {
                case REQUEST_POSTS:
                    return Object.assign({}, state, {
                        isFetching: true,
                    })

                case RECEIVE_POSTS:
                    return Object.assign({}, state, {
                        isFetching: false,
                        page: 2,
                        pageCount: action.posts.pageCount,
                        totalNum: action.posts.totalNum,
                        updatetime: action.posts.updatetime,
                        items: action.posts[action.dataListName]
                    })
                case REQUEST_LOADMORE:
                    return Object.assign({}, state, {
                        loadMore: true,
                    })
                case RECEIVE_LOADMORE:
                    return Object.assign({}, state, {
                        isFetching: false,
                        loadMore: false,
                        page: state.page + 1,
                        items: state.items.concat(action.posts[action.dataListName])
                    })

                default:
                    return state;
            }
        }
    }
}

export function totalNum(state = { totalNum: 0, text: '' }, action) {
    switch (action.type) {
        case TOTALNUM:
            return Object.assign({}, state, {
                totalNum: action.totalNum
            })
        case CHANGETOTALNUM:
            return Object.assign({}, state, {
                text: action.text
            })
        default:
            return state
    }
}

export function tabIndex(state = { tabIndex: null }, action) {
    switch (action.type) {
        case CHANGETABINDEX:
            return Object.assign({}, state, {
                tabIndex: action.data
            })
        default:
            return state
    }
}

export function pathName(state = { pathName: null }, action) {
    switch (action.type) {
        case CHANGEPATHNAME:
            return Object.assign({}, state, {
                pathName: action.data
            })
        default:
            return state
    }
}


// 数据
export const dataList = cd('dataList')

// 评级
export const pjAll = cd('pjAll')
export const pjWdzj = cd('pjWdzj')
export const pjP2peye = cd('pjP2peye')
export const pjDlp = cd('pjDlp')
export const pjR360 = cd('pjR360')
export const pjXinghuo = cd('pjXinghuo')
export const pjYifei = cd('pjYifei')
export const pjYuanwang = cd('pjYuanwang')

// 健康度
export const healthAll = cd('healthAll')
export const healthZijin = cd('healthZijin')
export const healthFensan = cd('healthFensan')
export const healthLiudong = cd('healthLiudong')
export const healthShouyi = cd('healthShouyi')
export const healthRenqi = cd('healthRenqi')
export const healthTiliang = cd('healthTiliang')
export const healthZhongcheng = cd('healthZhongcheng')
export const healthChengzhang = cd('healthChengzhang')

// 舆论
export const yulunList = cd('yulunList')
export const pingceList = cd('pingceList')
export const pingceListHot = cd('pingceListHot')
export const commentList = cd('commentList')
export const commentPCList = cd('commentPCList')
export const gongshangList = cd('gongshangList')

// 流量
export const flowAll = cd('flowAll')
export const flowBaidu = cd('flowBaidu')
export const flowHaosou = cd('flowHaosou')
export const flowZhanzhang = cd('flowZhanzhang')
export const flowAizhan = cd('flowAizhan')
export const flow76676 = cd('flow76676')

// 多维度  
export const queryFengtou = cd('queryFengtou')
export const queryShangshi = cd('queryShangshi')
export const queryGuozi = cd('queryGuozi')
export const queryYinhang = cd('queryYinhang')
export const queryMinying = cd('queryMinying')
export const queryChedai = cd('queryChedai')
export const queryFangdai = cd('queryFangdai')
export const queryPiaoju = cd('queryPiaoju')
export const queryGexin = cd('queryGexin')
export const queryQiye = cd('queryQiye')
export const queryWangji = cd('queryWangji')
export const queryHuoqi = cd('queryHuoqi')
export const queryOther = cd('queryOther')
export const queryDiqu = cd('queryDiqu')
export const queryShangxian = cd('queryShangxian')
export const queryCunguan = cd('queryCunguan')

export const fiveYears = cd('fiveYears')
export const blackList = cd('blackList')
export const blackShengfen = cd('blackShengfen')
export const blackZimu = cd('blackZimu')
export const blackShijian = cd('blackShijian')
export const zhengyiList = cd('zhengyiList')

export const reportsZh = cd('reportsZh')
export const reportsWdzj = cd('reportsWdzj')
export const reportsP2peye = cd('reportsP2peye')
export const reportsDlp = cd('reportsDlp')
export const reportsR360 = cd('reportsR360')
export const reportsXinghuo = cd('reportsXinghuo')
export const reportsYifei = cd('reportsYifei')
export const reportsOther = cd('reportsOther')

export const flmfList = cd('flmfList')


// 账户中心

export const guanzhuList = cd('guanzhuList')
export const guanzhuListSider = cd('guanzhuListSider')
export const commentListAccount = cd('commentListAccount')
export const collectionListAccount = cd('collectionListAccount')