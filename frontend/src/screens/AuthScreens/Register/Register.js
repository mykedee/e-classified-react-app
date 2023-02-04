import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../../components/Actions/userAction'
import FormContainer from '../../../components/Forms/FormContainer';
import Loader from '../../../components/Loader/Loader'
import Message from '../../../components/Errors/Message'

import "./Register.css"

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userSignup = useSelector(state => state.userSignup)
  const { error, loading, userInfo } = userSignup
  useEffect(() => {
    if (userInfo) {
      navigate('/verify-email')
    }
  },
    [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signupUser(username, email, password))
  }
  return (
    <FormContainer className="register py-5 my-5">
      <Card className="form-card">
        {/* <Card className="mx-auto mx-md-5"> */}
        <h4 className="mx-auto py-4">Sign up to get started</h4>
        <Form className="register-form mx-md-auto" onClick={submitHandler}>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form.Group className="mb-4" controlId="Username">
            <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <p>By signing up, you agree to our <span className="terms"><Link to="/terms">Terms of Use</Link></span> and <span className='privacy'><Link to="/privacy">Privacy Policy</Link></span></p>

          <Button variant="primary" type="submit" className="w-100">
            Create Account
          </Button>
        </Form>
        <p className="text-center py-3"> Have an account? <Link to="/login">Login</Link></p>

      </Card>

    </FormContainer>
  )
}

export default Register