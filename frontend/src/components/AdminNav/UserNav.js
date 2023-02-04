import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const UserNav = () => {
 return (
  <>
   <p>Admin</p>
   {/* <span className="profile-icon" >{userInfo.user.username.charAt(0)}</span> */}
   <LinkContainer to="/admin/dashboard/manage-posts"><Nav.Link>Manage Ads</Nav.Link></LinkContainer>
   <LinkContainer to="/admin/dashboard/users"><Nav.Link>Manage Users</Nav.Link></LinkContainer>
   <LinkContainer to="/"><Nav.Link>Settings</Nav.Link></LinkContainer>
  </>
 )
}

export default UserNav