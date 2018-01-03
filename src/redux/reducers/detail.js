import { REQUEST_POSTS_DETAIL, RECEIVE_POSTS_DETAIL, REQUEST_LOADMORE_DETAIL, RECEIVE_LOADMORE_DETAIL } from '../actions/index';

export function deatail(state = {
    common: {
        isFetching: true,
        dataSource: null
    },
    pingji: {
        isFetching: true,
        dataSource: null
    },
    health: {
        isFetching: true,
        dataSource: null
    },
    data: {
        isFetching: true,
        dataSource: null
    },
    flow: {
        isFetching: true,
        dataSource: null
    },
    gudong: {
        isFetching: true,
        dataSource: null
    },
    yulun: {
        isFetching: true,
        loadMore: false,
        page: 1,
        pageCount: 1,
        totalNum: 0,
        items: [],
    },
    comment: {
        isFetching: true,
        loadMore: false,
        page: 1,
        pageCount: 1,
        totalNum: 0,
        items: [],
    },
    activity: {
        isFetching: true,
        dataSource: null
    }
}, action) {
    switch (action.column) {
        case 'common':
            if (action.type == REQUEST_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    common: {
                        isFetching: true
                    }
                })
            }
            else if (action.type == RECEIVE_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    common: {
                        isFetching: false,
                        dataSource: action.posts
                    }
                })
            }
        case 'pingji':
            if (action.type == REQUEST_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    pingji: {
                        isFetching: true
                    }
                })
            }
            else if (action.type == RECEIVE_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    pingji: {
                        isFetching: false,
                        dataSource: action.posts
                    }
                })
            }
        case 'health':
            if (action.type == REQUEST_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    health: {
                        isFetching: true
                    }
                })
            }
            else if (action.type == RECEIVE_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    health: {
                        isFetching: false,
                        dataSource: action.posts
                    }
                })
            }
        case 'data':
            if (action.type == REQUEST_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    data: {
                        isFetching: true
                    }
                })
            }
            else if (action.type == RECEIVE_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    data: {
                        isFetching: false,
                        dataSource: action.posts
                    }
                })
            }
        case 'flow':
            if (action.type == REQUEST_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    flow: {
                        isFetching: true
                    }
                })
            }
            else if (action.type == RECEIVE_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    flow: {
                        isFetching: false,
                        dataSource: action.posts
                    }
                })
            }
        case 'gudong':
            if (action.type == REQUEST_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    gudong: {
                        isFetching: true
                    }
                })
            }
            else if (action.type == RECEIVE_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    gudong: {
                        isFetching: false,
                        dataSource: action.posts
                    }
                })
            }
        case 'yulun':
            if (action.type == REQUEST_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    yulun: {
                        isFetching: true
                    }
                })
            }
            else if (action.type == RECEIVE_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    yulun: {
                        isFetching: false,
                        loadMore: false,
                        page: 2,
                        pageCount: action.posts.pageCount,
                        totalNum: action.posts.totalNum,
                        items: action.posts.dataList,
                    }
                })
            }
            else if (action.type == REQUEST_LOADMORE_DETAIL) {
                //更多加载中   
                return Object.assign({}, state, {
                    yulun: {
                        isFetching: false,
                        loadMore: true,
                        page: state.yulun.page,
                        pageCount: state.yulun.pageCount,
                        totalNum: state.yulun.totalNum,
                        items: state.yulun.items,
                    }
                })
            }
            else if (action.type == RECEIVE_LOADMORE_DETAIL) {
                //更多加载完成 
                return Object.assign({}, state, {
                    yulun: {
                        isFetching: false,
                        loadMore: false,
                        page: state.yulun.page + 1,
                        pageCount: state.yulun.pageCount,
                        totalNum: state.yulun.totalNum,
                        items: state.yulun.items.concat(action.posts.dataList),
                    }
                })
            }
        case 'comment':
            if (action.type == REQUEST_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    comment: {
                        isFetching: true
                    }
                })
            }
            else if (action.type == RECEIVE_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    comment: {
                        isFetching: false,
                        loadMore: false,
                        page: 2,
                        pageCount: action.posts.pageCount,
                        totalNum: action.posts.totalNum,
                        items: action.posts.comment,
                    }
                })
            }
            else if (action.type == REQUEST_LOADMORE_DETAIL) {
                //更多加载中   
                return Object.assign({}, state, {
                    comment: {
                        isFetching: false,
                        loadMore: true,
                        page: state.comment.page,
                        pageCount: state.comment.pageCount,
                        totalNum: state.comment.totalNum,
                        items: state.comment.items,
                    }
                })
            }
            else if (action.type == RECEIVE_LOADMORE_DETAIL) {
                //更多加载完成 
                return Object.assign({}, state, {
                    comment: {
                        isFetching: false,
                        loadMore: false,
                        page: state.comment.page + 1,
                        pageCount: state.comment.pageCount,
                        totalNum: state.comment.totalNum,
                        items: state.comment.items.concat(action.posts.comment),
                    }
                })
            }
        case 'activity':
            if (action.type == REQUEST_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    activity: {
                        isFetching: true
                    }
                })
            }
            else if (action.type == RECEIVE_POSTS_DETAIL) {
                return Object.assign({}, state, {
                    activity: {
                        isFetching: false,
                        dataSource: action.posts
                    }
                })
            }
        default:
            return state;
    }

}
