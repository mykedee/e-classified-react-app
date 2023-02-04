import React, { useEffect, useState } from 'react'
import { Table, Button, Col, Row, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../../components/Actions/userAction'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Errors/Message'
import Admin from '../../components/AdminNav/Admin'
// import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2'




// import User from '../../components/Users/User'

const UsersScreen = (props) => {
  const dispatch = useDispatch();
  // const [swalProps, setSwalProps] = useState({});

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  const userList = useSelector(state => state.userList);
  const { error, loading, users } = userList;

  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, successDelete]);
  const deleteHandler = (id) => {
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
        dispatch(deleteUser(id));
      }
    })
  }
  return (
    <>
      <Row>
        <Col md={3}>

          <Admin {...userInfo} />

          {/* <span className="profile-icon" >{userInfo.user.username.charAt(0)}</span> */}
          {/* </Admin> */}

        </Col>
        <Col>
          <Card className="inner-card">
            <h3> Manage Users</h3>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Date Registered</th>
                    <th>Status</th>
                    <th>Modify</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                      <td>{user.role === "admin" ? (
                        <i className="fas fa-check" style={{ color: 'green' }}></i>) : (<i className="fas fa-times" style={{ color: 'red' }}></i>)}
                      </td>
                      <td>{user.createdAt}</td>
                      <td>{user.isActive === true ? ("Active") : ("Inactive")}</td>

                      <td>
                        <LinkContainer to={`/user/${user._id}/edit`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>

                        {/* <Button variant="danger" className="btn-sm"> */}
                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)
                        }>
                          <i className="fas fa-trash"></i>
                        </Button>
                        {/* <SweetAlert2 {...swalProps}

                    onConfirm={result => {
                      deleteHandler()
                      // run when clieked in confirm and promise is resolved...
                    }}

                  /> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

            )}
          </Card>

        </Col>

      </Row>
    </>
  )
}
export default UsersScreen