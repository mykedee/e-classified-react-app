import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'


const Product = ({ product }) => {
 return (
  <>
   <Card className="my-3 p-3 rounded">
    <Link to={`/products/${product._id}`}>
     <Card.Img src={product.photo}></Card.Img></Link>
    <Card.Title><p>{product.title}</p> </Card.Title>
    <Card.Title><strong>₦ {product.price}</strong>
    </Card.Title>
   </Card>
  </>
 )
}

export default Product