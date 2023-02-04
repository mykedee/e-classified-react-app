import axios from 'axios'
import { SHOP_DETAILS_REQUEST, SHOP_DETAILS_SUCCESS, SHOP_DETAILS_FAIL, } from '../Constants/shopConstant';


export const getShopDetails = (id) => async (dispatch) => {
 try {
  dispatch({
   type: SHOP_DETAILS_REQUEST
  })
  const { data } = await axios.get(`/api/v1/postbyuser/${id}`)
  dispatch({
   type: SHOP_DETAILS_SUCCESS, payload: data
  })
 } catch (error) {
  dispatch({
   type: SHOP_DETAILS_FAIL,
   error: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}