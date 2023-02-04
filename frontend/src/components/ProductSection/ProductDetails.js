import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { listProductDetails, listRelatedProducts } from '../Actions/productActions'
// import { listUserDetails } from '../Actions/userAction'
import RelatedProducts from '../ProductSection/RelatedProducts'
import './ProductDetails.css'



const ProductDetails = () => {
 const dispatch = useDispatch()
 const params = useParams()
 const productDetails = useSelector(state => state.productDetails)
 const relatedProducts = useSelector(state => state.relatedProducts)
 // const userDetails = useSelector(state => state.userDetails)
 const { product } = productDetails
 const { products } = relatedProducts
 // const { _id } = userDetails
 useEffect(() => {
  dispatch(listProductDetails(params.id))
 }, [dispatch, params.id])

 useEffect(() => {
  dispatch(listRelatedProducts(params.id))
 }, [dispatch, params.id])

 // useEffect(() => {
 //  dispatch(listUserDetails(params.id))
 // }, [dispatch, params.id])

 return (
  <>
   <Row>

    <Col sm={12} md={6} lg={8}>
     <Card className="my-3 p-3 rounded">
      <Card.Img src={product.photo}></Card.Img>
      <p>Other Images</p>

      {/* <Card.Text>{product.rating} from {product.numReviews}</Card.Text> */}

      <h2>{product.title}</h2>
      <span>
       <p>Posted 2 days ago</p> |
       <p>location: Ondo State</p>
      </span>
      <hr />
      <Row>
       <Col>
        <p>Condition: {product.condition}</p>
        <p>Condition: {product.condition}</p>
        <p>Condition: {product.condition}</p>
        <p>Other Details: This product is working perfectly</p>
        <p>Share: Facebook | Twitter | Instagram</p>
       </Col>
       <Col></Col>
      </Row>


     </Card>
    </Col>

    <Col>
     <Card className="my-3 p-3">
      <Card.Title><strong>{product.title}</strong></Card.Title>
      <Card.Title as="div">Price: <span>${product.price}</span></Card.Title>
      <Card.Title as="div">Condition: <span style={{ textTransform: "capitalize" }}>{product.condition}</span></Card.Title>
      <Button type="button">Proceed To Checkout</Button>
     </Card>

     <Card className="seller-info-card my-3 p-3">
      <h6><strong>Seller Infomation</strong></h6>
      <Card.Title as="div">
       {/* <Link to={`/products/${product._id}`}> */}

       <Link as="div" to={`/user/${product.postedBy._id}`}>
        {product.postedBy.username}
       </Link>
       <div>
        <Link to={`/`}>
         bookmark this seller
        </Link>
       </div>

       <Link as="div" to={`/`}>
        visit store
       </Link>

      </Card.Title>
      <Button type="button">Show Contact</Button>

     </Card>

    </Col>


   </Row>


   <Row>
    <h5>Similar Ads</h5>
    {products.map(product => (
     <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
      <RelatedProducts product={product} />
     </Col>
    ))}

   </Row>

  </>
 )
}

export default ProductDetails