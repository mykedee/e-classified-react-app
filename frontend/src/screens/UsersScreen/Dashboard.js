import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col, Nav, Card, Tab, Tabs } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { listUsers, deleteUser } from '../../components/Actions/userAction'
import { listActivePosts } from '../../components/Actions/productActions'
// import Loader from '../../components/Loader/Loader'
// import Message from '../../components/Errors/Message'
// import FormContainer from '../../components/Forms/FormContainer';
// import SweetAlert2 from 'react-sweetalert2';
// import Swal from 'sweetalert2'




// import User from '../../components/Users/User'

const Dashboard = () => {
  const [key, setKey] = useState('home');

  const dispatch = useDispatch();
  // const [swalProps, setSwalProps] = useState({});

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const activePosts = useSelector(state => state.activePosts);
  const { activeposts } = activePosts;


  //  const userList = useSelector(state => state.userList);
  //  const { error, loading, users } = userList;

  //  const userDelete = useSelector(state => state.userDelete);
  //  const { success: successDelete } = userDelete;
  //  useEffect(() => {
  //   dispatch(listUsers());
  //  }, [dispatch, successDelete]);

  useEffect(() => {
    dispatch(listActivePosts());
  }, [dispatch]);

  // const deleteHandler = (id) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //       dispatch(deleteUser(id));
  //     }
  //   })
  // }
  return (
    <>
      <Row>
        <Col md={3}>
          <Card>
            <div style={{ textAlign: "center" }}>
              <span className="profile-icon ">{userInfo.user.username.charAt(0)}</span>
            </div>
            <div className='p-3'>
              <LinkContainer to="/"><Nav.Link>Ads</Nav.Link></LinkContainer>
              <LinkContainer to="/"><Nav.Link>Settings</Nav.Link></LinkContainer>
            </div> </Card>
        </Col>
        <Col>
          <Card>

            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="home" title="Active Ads">
                <p>
                  {activeposts.map((activepost) => (
                    <p>{activepost.title}</p>
                  ))}
                </p>


              </Tab>
              <Tab eventKey="reviewing" title="Reviewing">
                <p>loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Rhetorice igitur, inquam, nos mavis quam dialectice disputare? Indicant pueri, in quibus ut in speculis natura cernitur. Sic, et quidem diligentius saepiusque ista loquemur inter nos agemusque communiter. Roges enim Aristonem, bonane ei videantur haec: vacuitas doloris, divitiae, valitudo; Duo Reges: constructio interrete. Ut aliquid scire se gaudeant? Quae si potest singula consolando levare, universa quo modo sustinebit?
                </p>
              </Tab>
              <Tab eventKey="closed" title="Closed">
                <p>loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Rhetorice igitur, inquam, nos mavis quam dialectice disputare? Indicant pueri, in quibus ut in speculis natura cernitur. Sic, et quidem diligentius saepiusque ista loquemur inter nos agemusque communiter. Roges enim Aristonem, bonane ei videantur haec: vacuitas doloris, divitiae, valitudo; Duo Reges: constructio interrete. Ut aliquid scire se gaudeant? Quae si potest singula consolando levare, universa quo modo sustinebit?
                </p>
              </Tab>

              <Tab eventKey="all" title="All ads">
                <p>loremLorem ipsum dolor sit amet, consectetur adipiscing elit. Rhetorice igitur, inquam, nos mavis quam dialectice disputare? Indicant pueri, in quibus ut in speculis natura cernitur. Sic, et quidem diligentius saepiusque ista loquemur inter nos agemusque communiter. Roges enim Aristonem, bonane ei videantur haec: vacuitas doloris, divitiae, valitudo; Duo Reges: constructio interrete. Ut aliquid scire se gaudeant? Quae si potest singula consolando levare, universa quo modo sustinebit?
                </p>
              </Tab>
            </Tabs>

            {/* {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
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

            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)
            }>
             <i className="fas fa-trash"></i>
            </Button>
           </td>
          </tr>
         ))}
        </tbody>
       </Table>

      )} */}
          </Card>


        </Col>

      </Row>
    </>
  )
}
export default Dashboard