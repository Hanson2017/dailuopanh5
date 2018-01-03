import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions/index';


export function funds(state = {
    isFetching: true,
    dataSource: null
}, action) {
    if (action.id == 'funds') {
        switch (action.type) {
            case REQUEST_POSTS:
                return Object.assign({}, state, {
                    isFetching: true,
                })

            case RECEIVE_POSTS:
                return Object.assign({}, state, {
                    isFetching: false,
                    dataSource: action.posts,
                })
            default:
                return state;
        }
    }
    else {
        return state
    }

}