import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { loginUser } from '../../../components/Actions/userAction';
import FormContainer from '../../../components/Forms/FormContainer';
import Loader from '../../../components/Loader/Loader'
import Message from '../../../components/Errors/Message'

import './Login.css'

const Login = () => {
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const dispatch = useDispatch()
 const navigate = useNavigate()


 const userLogin = useSelector(state => state.userLogin)
 const { error, loading, userInfo } = userLogin
 useEffect(() => {
  if (userInfo) {
   navigate('/')
  }
 }, [navigate, userInfo])

 const submitHandler = (e) => {
  e.preventDefault()
  dispatch(loginUser(email, password))
 }

 return (
  <FormContainer className="login my-5">
   <Card className="form-card">
    <h4 className="mx-auto py-4">Sign in to your account</h4>

    <Form className="login-form mx-md-auto" onSubmit={submitHandler}>
     {error && <Message variant="danger">{error}</Message>}
     {loading && <Loader />}

     <Form.Group className="mb-4" controlId="formBasicEmail">
      <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Form.Text className="text-muted">
      </Form.Text>
     </Form.Group>

     <Form.Group className="mb-4" controlId="formBasicPassword">
      <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
     </Form.Group>

     <Button variant="primary" type="submit" className="w-100">
      Login
     </Button>

    </Form>

    <p className="mx-auto mt-3">Don't have an account? <span className="dont-have-account"><Link to="/register">Sign Up</Link></span></p>
   </Card>
  </FormContainer>
 )
}

export default Login