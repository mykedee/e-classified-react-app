import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { listProducts } from '../../components/Actions/productActions'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Errors/Message'


// import { listProducts, watchProduct } from '../../components/Actions/productActions'
import Product from '../../components/ProductSection/Product'


const HomeScreen = () => {
 // const [watchedBy, setWatchedBy] = useState('')
 // const [unwatchedBy, setUnwatchedBy] = useState('')
 const dispatch = useDispatch()
 const productList = useSelector(state => state.productList)
 const { loading, error, products } = productList
 // const userLogin = useSelector(state => state.userLogin)
 // const { userInfo } = userLogin
 useEffect(() => {
  dispatch(listProducts())
 }, [dispatch])

 // const [values, setValues] = useState({
 //  watch: watchProductHandler(props.post.watch),
 //  unwatch: props.post.unwatch.length,
 // })

 // const watchProductHandler = () => {
 //  let watchItem = watchedBy ? unwatchedBy : watchedBy

 //  dispatch(watchProduct(watchItem(watchedBy({ userId: userInfo.user._id }))))
 //  console.log(watchProduct(watchItem(watchedBy({ userId: userInfo.user._id }))))
 // }
 return (
  <>
   {loading ? (<Loader />) : error ? (<Message variant="danger">{error}</Message>) :
    (
     <Row>
      {/* <Card.Body> */}
      {products.map(product => (
       <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
        <Product product={product} />
       </Col>
      ))}
      {/* </Card.Body> */}

     </Row>
    )

   }

  </>
 )
}

export default HomeScreen