import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "@redux-devtools/extension"
import thunk from "redux-thunk"
import {
 productListReducer, productDetailsReducer,
 listRelatedProductsReducer, listActivePostsReducer,
 watchProductReducer, productDeleteReducer
} from "./components/Reducers/productReducers"
import {
 userListReducer, userSignupReducer,
 userLoginReducer,
 userDetailsReducer, userUpdateProfileReducer, userDeleteReducer
} from "./components/Reducers/userReducers"
import { shopDetailsReducer } from "./components/Reducers/shopReducers"

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
 userLogin: { userInfo: userInfoFromStorage }
}

const reducers = combineReducers({
 productList: productListReducer,
 productDetails: productDetailsReducer,
 userList: userListReducer,
 userDetails: userDetailsReducer,
 userDelete: userDeleteReducer,
 userUpdateProfile: userUpdateProfileReducer,
 productDelete: productDeleteReducer,
 shopDetails: shopDetailsReducer,
 userSignup: userSignupReducer,
 userLogin: userLoginReducer,
 relatedProducts: listRelatedProductsReducer,
 activePosts: listActivePostsReducer,
 watchProduct: watchProductReducer,
})

const middleware = [thunk]



const store = createStore(
 reducers, initialState, composeWithDevTools(applyMiddleware(...middleware))
)

export default store