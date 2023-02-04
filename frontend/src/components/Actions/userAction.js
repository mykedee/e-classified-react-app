import axios from 'axios'
import {
 USER_LIST_REQUEST,
 USER_LIST_SUCCESS,
 USER_LIST_FAIL,
 USER_SIGNUP_REQUEST,
 USER_SIGNUP_SUCCESS,
 USER_SIGNUP_FAIL,
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS,
 USER_LOGIN_FAIL,
 USER_LOGOUT,
 USER_DETAILS_REQUEST,
 USER_DETAILS_SUCCESS,
 USER_DETAILS_FAIL,
 USER_DELETE_REQUEST,
 USER_DELETE_SUCCESS,
 USER_DELETE_FAIL,
 USER_UPDATE_PROFILE_REQUEST,
 USER_UPDATE_PROFILE_SUCCESS,
 USER_UPDATE_PROFILE_FAIL
} from "../Constants/userConstants";


export const listUsers = () => async (dispatch, getState) => {
 try {
  dispatch({
   type: USER_LIST_REQUEST
  })
  const {
   userLogin: { userInfo }
  } = getState()

  const config = {
   headers: {
    Authorization: `Bearer ${userInfo.token}`
   }
  }
  const { data } = await axios.get('/api/v1/users', config)

  dispatch({
   type: USER_LIST_SUCCESS, payload: data
  })
 } catch (error) {
  dispatch({
   type: USER_LIST_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.message
  })
 }


}

export const signupUser = (username, email, password) => async (dispatch) => {
 try {
  dispatch({
   type: USER_SIGNUP_REQUEST
  })
  const config = {
   headers: {
    'Content-Type': 'application/json'
   }
  }
  const { data } = await axios.post('/api/v1/auth/signup', { username, email, password }, config)
  dispatch({
   type: USER_SIGNUP_SUCCESS, payload: data
  })
  // dispatch({
  //    type: USER_LOGIN_SUCCESS, payload: data
  //   })


  localStorage.setItem('userInfo', JSON.stringify(data))
 } catch (error) {
  dispatch({
   type: USER_SIGNUP_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.message


  })
 }


}

export const loginUser = (email, password) => async (dispatch) => {
 try {
  dispatch({
   type: USER_LOGIN_REQUEST
  })
  const config = {
   headers: {
    'Content-Type': 'application/json'
   }
  }
  const { data } = await axios.post('/api/v1/auth/signin', { email, password }, config)
  dispatch({
   type: USER_LOGIN_SUCCESS, payload: data
  })

  localStorage.setItem('userInfo', JSON.stringify(data))

 } catch (error) {
  dispatch({
   type: USER_LOGIN_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.message
  })
 }
}



export const listUserDetails = (id) => async (dispatch) => {
 try {
  dispatch({
   type: USER_DETAILS_REQUEST
  })
  const { data } = await axios.get(`/api/v1/user/${id}`)
  dispatch({
   type: USER_DETAILS_SUCCESS, payload: data
  })
 } catch (error) {
  dispatch({
   type: USER_DETAILS_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}



export const updateUserProfile = (user) => async (dispatch, getState) => {
 try {
  dispatch({
   type: USER_UPDATE_PROFILE_REQUEST
  })
  const {
   userLogin: { userInfo }
  } = getState()

  const config = {
   headers: {
    Authorization: `Bearer ${userInfo.token}`
   }
  }

  const { data } = await axios.put(`/api/v1/auth/me/`, user, config)
  dispatch({
   type: USER_UPDATE_PROFILE_SUCCESS
  })
 } catch (error) {
  dispatch({
   type: USER_UPDATE_PROFILE_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}


export const deleteUser = (id) => async (dispatch, getState) => {
 try {
  dispatch({
   type: USER_DELETE_REQUEST
  })
  const {
   userLogin: { userInfo }
  } = getState()

  const config = {
   headers: {
    Authorization: `Bearer ${userInfo.token}`
   }
  }

  const { data } = await axios.delete(`/api/v1/users/${id}`, config)
  dispatch({
   type: USER_DELETE_SUCCESS
  })
 } catch (error) {
  dispatch({
   type: USER_DELETE_FAIL,
   payload: error.response && error.response.data.message ? error.response.data.message : error.response
  })
 }
}



export const userLogout = () => async (dispatch) => {
 localStorage.removeItem('userInfo')
 dispatch({ type: USER_LOGOUT })
}

