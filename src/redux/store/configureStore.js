import { createStore ,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
import DevTools from '../../containers/DevTools';

const enhancer = compose(
    //你要使用的中间件，放在前面
    applyMiddleware(thunkMiddleware),
    //必须的！启用带有monitors（监视显示）的DevTools
    DevTools.instrument()
  )
  

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

export default  function configureStore(initialState){
    return createStoreWithMiddleware(rootReducer, initialState,enhancer);    
}