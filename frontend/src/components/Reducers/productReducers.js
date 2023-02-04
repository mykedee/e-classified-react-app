import {
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  RELATED_PRODUCT_REQUEST, RELATED_PRODUCT_SUCCESS, RELATED_PRODUCT_FAIL,
  WATCH_PRODUCT_REQUEST, WATCH_PRODUCT_SUCCESS, WATCH_PRODUCT_FAIL,
  PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
  ACTIVE_POSTS_REQUEST, ACTIVE_POSTS_SUCCESS, ACTIVE_POSTS_FAIL
} from '../Constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: { postedBy: {} } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}


export const watchProductReducer = (state = { product: { watchedBy: {} } }, action) => {
  switch (action.type) {
    case WATCH_PRODUCT_REQUEST:
      return { loading: true, ...state }
    case WATCH_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload }
    case WATCH_PRODUCT_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}

export const listRelatedProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case RELATED_PRODUCT_REQUEST:
      return { loading: true, products: [] }
    case RELATED_PRODUCT_SUCCESS:
      return { loading: false, products: action.payload }
    case RELATED_PRODUCT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}


export const listActivePostsReducer = (state = { activeposts: [] }, action) => {
  switch (action.type) {
    case ACTIVE_POSTS_REQUEST:
      return { loading: true, activeposts: [] }
    case ACTIVE_POSTS_SUCCESS:
      return { loading: false, products: action.payload }
    case ACTIVE_POSTS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}