import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from '@redux-devtools/extension';
import { userRegisterReducer,userListReducer, userLoginReducer, userBlockReducer} from './reducers/userReducers';
const reducer = combineReducers({   
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userList:userListReducer,
    userBlock:userBlockReducer,
    // changePicture:ChagnePictureReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store