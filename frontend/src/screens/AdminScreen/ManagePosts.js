import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col, Nav, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct } from '../../components/Actions/productActions'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Errors/Message'
import Admin from '../../components/AdminNav/Admin';
// import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2'




// import User from '../../components/Users/User'

const ManageProducts = () => {
  const dispatch = useDispatch();
  // const [swalProps, setSwalProps] = useState({});

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // const userList = useSelector(state => state.userList);
  // const { error, loading, users } = userList;

  const productDelete = useSelector(state => state.productDelete);
  const { success: successDelete } = productDelete;

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList


  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

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
        dispatch(deleteProduct(id));
      }
    })
  }
  return (
    <>
      <Row>
        <Col md={3}>
          {/* <Card className="inner-card p-3"> */}
          {/* <span className="profile-icon" >{userInfo.user.username.charAt(0)}</span> */}
          <Admin {...userInfo} />
          {/* </Card> */}
        </Col>
        <Col>
          {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Featured</th>
                  <th>Date Created</th>
                  <th>Date Updated</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    {/* <td>{product.isFeatured === "admin" ? (
                      <i className="fas fa-check" style={{ color: 'green' }}></i>) : (<i className="fas fa-times" style={{ color: 'red' }}></i>)}
                    </td> */}
                    <td>{product.status}</td>
                    <td>{product.createdAt}</td>
                    <td>{product.updatedAt}</td>
                    {/* <td>{product.isActive === true ? ("Active") : ("Inactive")}</td> */}

                    <td>
                      <LinkContainer to={`/products/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>

                      {/* <Button variant="danger" className="btn-sm"> */}
                      <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)
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

        </Col>

      </Row>
    </>
  )
}
export default ManageProducts