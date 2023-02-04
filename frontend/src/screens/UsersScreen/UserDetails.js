import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap'
// import { listProductDetails, listRelatedProducts } from '../Actions/productActions'
import { listUserDetails } from '../../components/Actions/userAction'
import ShopDetails from '../../screens/UsersScreen/ShopDetails'
// import RelatedProducts from '../ProductSection/RelatedProducts'
// import './ProductDetails.css'

import { getShopDetails } from '../../components/Actions/shopAction'


const ProductDetails = () => {
 const dispatch = useDispatch()
 const params = useParams()


 const userDetails = useSelector(state => state.userDetails)
 const shopDetails = useSelector(state => state.shopDetails)
 const { user } = userDetails
 const { activeposts } = shopDetails




 useEffect(() => {
  dispatch(listUserDetails(params.id))
 }, [dispatch, params.id])

 useEffect(() => {
  dispatch(getShopDetails(params.id))
 }, [dispatch, params.id])


 return (
  <>
   <Row>

    {/* <Col sm={12} md={6} lg={8}>
     <Card className="my-3 p-3 rounded">

      <hr />

     </Card>
    </Col> */}

    <Col sm={12} md={3}>
     <Card className="inner-card my-3 p-3">
      {/* <span className="profile-icon">{user.username.charAt()}</span> */}
      <span className="profile-icon">{user.username ? user.username.charAt(0) : " "}</span>

      {/* <Card.Title><p>{user.username.charAt(0)}</p></Card.Title> */}

      <Card.Title><h3>{user.username}</h3></Card.Title>
      <span className="">{user.createdAt}</span>
      <span className="">Location</span>
      <Card.Title as="div">followers<span>{user.savedseller}</span></Card.Title>
      <Button type="button">View Contact</Button>
     </Card>
    </Col>
    {activeposts.map(x => (
     // Store Items: {activeposts.length}
     <Col sm={12} md={4} key={x._id}>
      <ShopDetails product={x} />
     </Col>
    ))}


   </Row>

   {/* <Row>
    <h5>Ads By This Seller</h5>
    {activeposts.map(x => (
     <Col sm={12} md={6} lg={4} xl={3}>
      <ShopDetails product={x} />
     </Col>
    ))}

   </Row> */}

  </>
 )
}

export default ProductDetails