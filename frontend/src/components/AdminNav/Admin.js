import React from 'react'
import { Nav, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const Admin = (userInfo) => {
 return (
  <>
   <Card className='inner-card p-3'>
    {/* {console.log(userInfo)} */}
    {/* <span className="profile-icon" >{userInfo.username}</span> */}
    {/* <p>Admin v</p> */}
    {/* <span className="profile-icon" >{userInfo.user.username}</span> */}
    <div className="" style={{ margin: "auto" }}>
     <span className="profile-icon" ><p>{userInfo.user.username.charAt(0)}</p></span>
     <LinkContainer to="/dashboard/settings"><Nav.Link>Edit Profile</Nav.Link></LinkContainer>
    </div>
    <h6 className='' style={{ fontWeight: "bold" }}>{userInfo.user.username.charAt(0).toUpperCase() + userInfo.user.username.slice(1)}</h6>
    <LinkContainer to="/admin/dashboard/manage-posts"><Nav.Link>Manage Ads</Nav.Link></LinkContainer>
    <LinkContainer to="/admin/dashboard/users"><Nav.Link>Manage Users</Nav.Link></LinkContainer>
    <LinkContainer to="/"><Nav.Link>Settings</Nav.Link></LinkContainer>
   </Card>
  </>
 )
}

export default Admin