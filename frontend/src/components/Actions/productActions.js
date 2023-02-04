import axios from 'axios'
import {
 PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
 PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
 RELATED_PRODUCT_REQUEST, RELATED_PRODUCT_SUCCESS, RELATED_PRODUCT_FAIL,
 WATCH_PRODUCT_SUCCESS, WATCH_PRODUCT_FAIL, WATCH_PRODUCT_REQUEST,
 PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
 ACTIVE_POSTS_REQUEST, ACTIVE_POSTS_SUCCESS, ACTIVE_POSTS_FAIL
} from '../Constants/productConstants'

export const listProducts = () => async (dispatch) => {
 try {
  dispatch({
   type: PRODUCT_LIST_REQUEST
  })
  const { data } = await axios.get('/api/v1/products')
  dispatch({
   type: PRODUCT_LIST_SUCCESS,
   payload: data
  })

 } catch (error) {
  dispatch({
   type: PRODUCT_LIST_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}

export const listProductDetails = (id) => async (dispatch) => {
 try {
  dispatch({
   type: PRODUCT_DETAILS_REQUEST
  })
  const { data } = await axios.get(`/api/v1/products/${id}`)


  dispatch({
   type: PRODUCT_DETAILS_SUCCESS,
   payload: data
  })
 } catch (error) {
  dispatch({
   type: PRODUCT_DETAILS_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}

export const listRelatedProducts = (id) => async (dispatch) => {
 try {
  dispatch({
   type: RELATED_PRODUCT_REQUEST
  })
  const { data } = await axios.get(`/api/v1/products/related/${id}`)

  dispatch({
   type: RELATED_PRODUCT_SUCCESS,
   payload: data
  })
 } catch (error) {
  dispatch({
   type: RELATED_PRODUCT_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}

export const watchProduct = (product) => async (dispatch, getState) => {
 try {
  dispatch({
   type: WATCH_PRODUCT_REQUEST
  })
  const { userLogin: { userInfo }, } = getState()

  const config = {
   headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${userInfo.token}`
   }
  }
  const { data } = await axios.put(`/api/v1/products/${product._id}`, config, product)

  dispatch({
   type: WATCH_PRODUCT_SUCCESS,
   payload: data
  })
 } catch (error) {
  dispatch({
   type: WATCH_PRODUCT_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
 try {
  dispatch({
   type: PRODUCT_DELETE_REQUEST
  })
  const {
   userLogin: { userInfo }
  } = getState()

  const config = {
   headers: {
    Authorization: `Bearer ${userInfo.token}`
   }
  }

  const { data } = await axios.delete(`/api/v1/products/${id}`, config)
  dispatch({
   type: PRODUCT_DELETE_SUCCESS
  })
 } catch (error) {
  dispatch({
   type: PRODUCT_DELETE_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}

export const listActivePosts = (id) => async (dispatch) => {
 try {
  dispatch({
   type: ACTIVE_POSTS_REQUEST
  })

  const { data } = await axios.get(`/api/v1/postby/${id}`)

  dispatch({
   type: ACTIVE_POSTS_SUCCESS,
   payload: data
  })
 } catch (error) {
  dispatch({
   type: ACTIVE_POSTS_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}