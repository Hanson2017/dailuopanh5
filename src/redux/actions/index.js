import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_LOADMORE = 'REQUEST_LOADMORE';
export const RECEIVE_LOADMORE = 'RECEIVE_LOADMORE';
export const TOTALNUM = 'TOTALNUM';
export const CHANGETOTALNUM = 'CHANGETOTALNUM';

export const REQUEST_POSTS_DETAIL = 'REQUEST_POSTS_DETAIL';
export const RECEIVE_POSTS_DETAIL = 'RECEIVE_POSTS_DETAIL';
export const REQUEST_LOADMORE_DETAIL = 'REQUEST_LOADMORE_DETAIL';
export const RECEIVE_LOADMORE_DETAIL = 'RECEIVE_LOADMORE_DETAIL';

export const CHANGETABINDEX = 'CHANGETABINDEX';
export const CHANGEPATHNAME = 'CHANGEPATHNAME';


/***列表页***/

// 加载中
function requestPosts(id) {
    return {
        id: id,
        type: REQUEST_POSTS
    }
}

//加载成功
function receivePosts(id, json,dataListName) {
    return {
        id: id,
        type: RECEIVE_POSTS,
        posts: json,
        dataListName:dataListName
    }
}

//加载更多中
function requestLoadMore(id) {
    return {
        id: id,
        type: REQUEST_LOADMORE
    }
}

//加载更多成功
function receiveLoadMore(id, json,dataListName) {
    return {
        id: id,
        type: RECEIVE_LOADMORE,
        posts: json,
        dataListName:dataListName
    }
}

function totalNum(totalNum) {
    return {
        type: TOTALNUM,
        totalNum: totalNum
    }
}

function changeTotalNum(num,text) {
    return {
        type: CHANGETOTALNUM,
        text:text       
    }
}

function changeTabIndex(data){
    return {
        type: CHANGETABINDEX,
        data:data       
    }
}

function changePathName(data){
    return {
        type: CHANGEPATHNAME,
        data:data       
    }
}


export function fetchPosts(id, url, type,dataListName) {

    return (dispatch) => {
        if (type == 1) {
            dispatch(requestPosts(id))
        }
        else if (type == 2) {
            dispatch(requestLoadMore(id))
        }

        return fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                if (type == 1) {
                    dispatch(totalNum(json.totalNum))
                    dispatch(receivePosts(id, json,dataListName))
                }
                else if (type == 2) {
                    dispatch(receiveLoadMore(id, json,dataListName))
                }

            });
    }
}


export function fetchPostsFund(id, url) {
    return (dispatch) => {
        dispatch(requestPosts(id))
        return fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                dispatch(receivePosts(id, json))
            });
    }
}


export function changeTotalNumF(text){
    return (dispatch) => {
        dispatch(changeTotalNum(text))
    } 
}


export function changeTabIndexF(data){
    return (dispatch) => {
        dispatch(changeTabIndex(data))
    } 
}

export function changePathNameF(data){
    return (dispatch) => {
        dispatch(changePathName(data))
    } 
}

/***详情页***/

// 加载中
function requestPostsDetail(column) {
    return {
        column: column,
        type: REQUEST_POSTS_DETAIL
    }
}

//加载成功
function receivePostsDetail(column, json) {
    return {
        column: column,
        type: RECEIVE_POSTS_DETAIL,
        posts: json
    }
}

// 加载更多中
function requestDetailLoadMore(column) {
    return {
        column: column,
        type: REQUEST_LOADMORE_DETAIL
    }
}

//加载更多成功
function receiveDetailLoadMore(column, json) {
    return {
        column: column,
        type: RECEIVE_LOADMORE_DETAIL,
        posts: json
    }
}



export function fetchPostsDeatail(column, url, type) {

    return (dispatch) => {
        if (type && type == 2) {
            dispatch(requestDetailLoadMore(column))
        }
        else {
            dispatch(requestPostsDetail(column))
        }

        return fetch(url)
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function (json) {
                if (type && type == 2) {
                    dispatch(receiveDetailLoadMore(column, json))
                }
                else {
                    dispatch(receivePostsDetail(column, json))
                }

            });
    }
}