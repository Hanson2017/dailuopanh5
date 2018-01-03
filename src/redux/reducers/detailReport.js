import { REQUEST_POSTS_DETAIL, RECEIVE_POSTS_DETAIL } from '../actions/index';


export function detailReport(state = {
    isFetching: true,
    dataSource: null
}, action) {
    if (action.column == 'report') {
        switch (action.type) {
            case REQUEST_POSTS_DETAIL:
                return Object.assign({}, state, {
                    isFetching: true,
                })

            case RECEIVE_POSTS_DETAIL:
                return Object.assign({}, state, {
                    isFetching: false,
                    dataSource: action.posts.data,
                })
            default:
                return state;
        }
    }
    else {
        return state
    }

}