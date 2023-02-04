import { SHOP_DETAILS_REQUEST, SHOP_DETAILS_SUCCESS, SHOP_DETAILS_FAIL, } from '../Constants/shopConstant';


export const shopDetailsReducer = (state = { activeposts: [] }, action) => {
  switch (action.type) {
    case SHOP_DETAILS_REQUEST:
      return { loading: true, activeposts: [] }
    case SHOP_DETAILS_SUCCESS:
      return { loading: false, activeposts: action.payload }
    case SHOP_DETAILS_FAIL:
      return { loading: true, error: action.payload }
    default:
      return state
  }
}