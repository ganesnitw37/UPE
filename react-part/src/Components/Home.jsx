import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories from './categories';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

function Home(props) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cProducts, setCProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [Issearch, setIsSearch] = useState(false);

    useEffect(() => {
        const url = 'http://localhost:4000/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error('Server error');
            });
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        // const filteredProducts = products.filter((item) =>
        //     item.pname.toLowerCase().includes(search.toLowerCase()) ||
        //     item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        //     item.category.toLowerCase().includes(search.toLowerCase())
        // );
        // setCProducts(filteredProducts);
        const url = 'http://localhost:4000/search?search='+search;
        axios.get(url)
            .then((res) => {
                setCProducts(res.data.products);
            })
            .catch((err) => {
                alert("Server Error");
            });
    };

    const handleCategory = (value) => {
        const filteredProducts = products.filter((item) =>
            item.category.toLowerCase() === value.toLowerCase()
        );
        setCProducts(filteredProducts);
        setIsSearch(true);
    };

    const handleLiked = (e, productId) => {
        e.stopPropagation(); // Prevent event from bubbling up
        const userId = localStorage.getItem('userId');
        const url = 'http://localhost:4000/like_product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    toast.success(res.data.message, {
                        position: 'top-right',
                        autoClose: 2000,
                    });
                }
            })
            .catch(() => {
                toast.error('Server error', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleclick={handleClick} />
            <Categories handleCategory={handleCategory} />
            {Issearch && 
                <h5>Search Results
                    <button className='clear-btn' onClick={()=> setIsSearch(false)}>Clear Results</button>
                </h5>}
            {Issearch && <div className='d-flex justify-content-center flex-wrap'>
                {Issearch && cProducts && cProducts.length > 0 ? (
                    cProducts.map((item, index) => (
                        <div key={index} className='card m-3' onClick={() => handleProduct(item._id)}>
                            <div onClick={(e) => handleLiked(e, item._id)} className='icon-con'>
                                <FaHeart className='icons' />
                            </div>
                            <img width="250px" src={'http://localhost:4000/' + item.pimage} alt={item.pname} />
                            <p className='m-2 price-text'>₹ {item.price} /-</p>
                            <p className='m-2'>{item.pname} | {item.category}</p>
                            <p className='m-2 text-success'>{item.pdesc}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>}

            <hr />
            {!Issearch && <div className='d-flex justify-content-center flex-wrap'>
                {products && products.length > 0 ? (
                    products.map((item, index) => (
                        <div key={index} className='card m-3' onClick={() => handleProduct(item._id)}>
                            <div onClick={(e) => handleLiked(e, item._id)} className='icon-con'>
                                <FaHeart className='icons' />
                            </div>
                            <img width="250px" src={'http://localhost:4000/' + item.pimage} alt={item.pname} />
                            <h3 className='m-2 price-text'>₹ {item.price} /-</h3>
                            <p className='m-2'>{item.pname} | {item.category}</p>
                            <p className='m-2 text-success'>{item.pdesc}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Home;
