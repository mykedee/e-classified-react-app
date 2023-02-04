import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Nav, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUserDetails, updateUserProfile } from '../../components/Actions/userAction'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Errors/Message'
import Admin from '../../components/AdminNav/Admin';
import FormContainer from '../../components/Forms/FormContainer';

// import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2'




// import User from '../../components/Users/User'

const Settings = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [state, setState] = useState('')

  const dispatch = useDispatch();
  // const [swalProps, setSwalProps] = useState({});

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;


  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    else {
      if (!user.name) {
        dispatch(listUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, navigate, userInfo, user])


  const HandleSubmit = (e) => {
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        dispatch(updateUserProfile({ id: user._id, firstname, lastname, email, gender, location, state }));
      }
    })
  }
  return (
    <>
      <Row>
        <Col md={3}>
          {/* <Card className="p-3 inner-card"> */}
          <Admin  {...userInfo} />
          {/* </Card> */}
        </Col>
        <Col>
          <h3>Update Profile</h3>
          {/* {message && <Message variant="danger">{message}</Message>} */}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">{success}</Message>}
          {loading && <Loader />}

          <Card className="inner-card p-3">
            <FormContainer>
              <Form onSubmit={HandleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control type="text" placeholder="Enter email" value={firstname} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control type="text" placeholder="Enter email" value={lastname} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" placeholder="Password" value={state} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" placeholder="Password" value={location} />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="text-right">
                  <Button variant="primary" type="submit">
                    Update Profile
                  </Button>
                </div>

              </Form>
            </FormContainer>
          </Card>


        </Col>

      </Row>
    </>
  )
}
export default Settings