import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';

function MyUploads() {
    const [products, setProducts] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            fetchUserProducts();
        }
    }, []);

    const fetchUserProducts = () => {
        const url = `http://localhost:4000/get-user-products/${userId}`;
        axios.get(url)
        .then((res) => {
            if (res.data.products) {
                console.log(res.data.products)
                setProducts(res.data.products);
            }
        })
        .catch((err) => {
            alert('server error');
        });
    };

    return (
        <div>
            <Header />
            {!!localStorage.getItem('token') && <Link to='/add-product'><button className='logout-btn'>Add Product </button> </Link>}
            <h2>My Uploads</h2>
            <div className="d-flex justify-content-center flex-wrap">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-item">
                            <img width="250px" src={`http://localhost:4000/${product.pimage}`} alt={product.pname} />
                            <h3>{product.pname}</h3>
                            <p className='m-2 price-text'>₹ {product.price} /-</p>
                            <p className='m-2'>{product.pname} | {product.category}</p> 
                            <p className='m-2 text-success'>{product.pdesc}</p>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default MyUploads;
