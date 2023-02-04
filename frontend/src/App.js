import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import UsersScreen from './screens/UsersScreen/UsersScreen';
import UsersDetails from './screens/UsersScreen/UserDetails';
import Dashboard from './screens/UsersScreen/Dashboard';
import AdminScreen from './screens/AdminScreen/AdminScreen';
import Test from './screens/AdminScreen/Test';
import ManagePosts from './screens/AdminScreen/ManagePosts';
import PostAds from './screens/UsersScreen/PostAds';
import Settings from './screens/UsersScreen/Settings';
import ShopDetails from './screens/UsersScreen/ShopDetails';
import Register from './screens/AuthScreens/Register/Register';
import Login from './screens/AuthScreens/Login/Login';
import VerifyEmail from './screens/AuthScreens/VerifyEmail/VerifyEmail';
import ResetPassword from './screens/AuthScreens/ResetPassword/ResetPassword';
import ProductDetails from './components/ProductSection/ProductDetails'
import TermsScreen from './screens/TermsScreen/TermsScreen'
import PrivacyScreen from './screens/PrivacyScreen/PrivacyScreen'

import './App.css';


function App() {
	return (
		<Router>
			<Header />
			<main className='my-5 py-5'>
				<Container>
					<Routes>
						<Route path="/" element={<HomeScreen />} exact />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/verify-email" element={<VerifyEmail />} />
						<Route path="/reset-password" element={<ResetPassword />} />
						<Route path="/products/:id" element={<ProductDetails />} />
						<Route path="/user/:id" element={<UsersDetails />} />
						<Route path="/post-ads" element={<PostAds />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/admin/dashboard/users" element={<UsersScreen />} />
						<Route path="/admin/dashboard" element={<AdminScreen />} />
						<Route path="/admin/dashboard/test" element={<Test />} />
						<Route path="/admin/dashboard/manage-posts" element={<ManagePosts />} />
						<Route path="/dashboard/settings" element={<Settings />} />
						<Route path="/shop/:id" element={<ShopDetails />} />
						<Route path="/terms" element={<TermsScreen />} />
						<Route path="/privacy" element={<PrivacyScreen />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
