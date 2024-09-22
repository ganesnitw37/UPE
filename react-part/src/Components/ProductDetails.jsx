import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'

function ProductDetails() {

  const [product, setProduct] = useState()
  const [user, setUser] = useState()

  const { productId } = useParams() // Destructure useParams to directly extract productId
  console.log(productId)

  useEffect(() => {
    const url = `http://localhost:4000/get-product/${productId}`;
    axios.get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product)
        }
      })
      .catch((err) => {
        console.log(err);
        alert('server err')
      })
  }, [productId])

  const handleContact = (userId) => {
    console.log('id ', userId);
    const url = `http://localhost:4000/get-user/${userId}`;
    axios.get(url)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user); // Update setUser with correct data
        }
      })
      .catch((err) => {
        console.error('Error:', err); // Add error logging
      });
  };


  return (
    <div>
      <Header />
      <div>
        {product && <div className='d-flex justify-content-center flex-wrap'>
          <div>
            <img width='700px' height='300px' src={"http://localhost:4000/" + product.pimage} alt='' />
            <h6> Product Details</h6>
          </div>
          <div>
            <h3 className='m-2 price-text'>₹ {product.price} /-</h3>
            <p className='m-2'>{product.pname} | {product.category}</p>
            <p className='m-2 text-success'>{product.pdesc}</p>

            {product.userId &&
              <button onClick={() => handleContact(product.userId)}>Show contact Details</button>
            }
            {/* Display user details */}
            {user && (
              <div>
                <h6>Username: {user.username}</h6>
                <h6>Email: {user.email}</h6>
                <h6>Mobile: {user.mobile}</h6> {/* Fixed mobile field */}
              </div>
            )}
          </div>
        </div>}
      </div>
    </div>
  )
}

export default ProductDetails
