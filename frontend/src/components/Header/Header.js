import React, { useState } from 'react';
import { Nav, Navbar, Container, NavDropdown, Button, } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { userLogout } from '../Actions/userAction';
import './Header.css'

const Header = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [show, setShow] = useState(false)
	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const signOut = () => {
		dispatch(userLogout())
		navigate('/')
	}

	// const showDropDown = (e) => {
	// 	setShow(!show)
	// }

	// const hideDropDown = (e) => {

	// 	setShow(false)
	// }
	return (
		<section className="header">
			<Navbar className="fixed-top" expand="lg">
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>Sella</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">

							{userInfo ? (
								<>
									<span className="profile-icon" >{userInfo.user.username.charAt(0)}</span>

									<NavDropdown id="basic-nav-dropdown">
										<LinkContainer to='/dashboard/settings'>
											<Nav.Link>Settings</Nav.Link>
										</LinkContainer>

										<LinkContainer to="/">
											<Nav.Link>Orders</Nav.Link>
										</LinkContainer>

										<Link onClick={signOut}>
											<Nav.Link>Logout</Nav.Link>
										</Link>

										{/* <NavDropdown.Item href="#action/3.1">Messages</NavDropdown.Item> */}
										{/* <NavDropdown.Item href="#action/3.3">Account Settings</NavDropdown.Item> */}
										{/* <NavDropdown.Divider /> */}
										{/*    */}
										{/* <NavDropdown.Item onClick={signOut}>
											Logout
										</NavDropdown.Item> */}
									</NavDropdown>
								</>

							) :
								(<>
									{/* <Link to="/login"> */}
									{/* <Nav.Link>Login</Nav.Link> */}

									{/* <Button type="button" className="mx-2">Login</Button> */}
									{/* </Link> */}
									<LinkContainer to='/login'>
										<Nav.Link>Login</Nav.Link>
									</LinkContainer>
									{/* <LinkContainer to="/register">
										<Nav.Link>Start Selling</Nav.Link>
									</LinkContainer> */}
								</>

								)
							}
							{userInfo && userInfo.user.role === 'admin' && (
								<>
									<NavDropdown title="Admin" id="adminmenu">
										<LinkContainer to='/admin/dashboard/users'>
											<Nav.Link>Manage Users</Nav.Link>
										</LinkContainer>

										<LinkContainer to='/admin/dashboard/manage-posts'>
											<Nav.Link>Manage Ads</Nav.Link>
										</LinkContainer>

										<LinkContainer to='/admin/orders'>
											<Nav.Link>Orders</Nav.Link>
										</LinkContainer>
									</NavDropdown>
								</>

							)}

							<LinkContainer to="/post-ads">
								{/* <Nav.Link>Start Selling</Nav.Link> */}
								<Button type="button" className="sell-btn mx-2">Start Selling</Button>
							</LinkContainer>

							<LinkContainer to="/cart" className="cart-btn mx-2">
								<Nav.Link><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
							</LinkContainer>



						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</section >
	);
};

export default Header;
