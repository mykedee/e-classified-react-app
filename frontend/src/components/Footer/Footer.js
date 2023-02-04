import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './Footer.css'


const Footer = () => {
	return (
		<section className="py-5 footer-area">
			<Container>
				<Row>
					<Col sm>
						<h3>Logo</h3>
						<p>Logo</p>
						<p>Logo</p>
						<p>Logo</p>
					</Col>
					<Col sm><h6>About Us</h6>
					</Col>
					<Col sm><h6>Help & Support</h6></Col>
				</Row>
				<p className='text-center'>&copy; 2020</p>
			</Container>
		</section>
	);
};

export default Footer;
