import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories from './categories';
import './Home.css';

function LikedProducts(props) {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [cproducts, setCproducts] = useState([]);
    const [search, setSearch] = useState('');
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const url = 'http://localhost:4000/liked-products';
        let data = { userId: localStorage.getItem('userId') };
        axios.post(url, data)
            .then((res) => {
                console.log(res);
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Server error');
            });
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        let filteredproducts = products.filter((item) => {
            return (
                item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())
            );
        });
        setCproducts(filteredproducts);
        setSearched(true);
    };

    const handleCategory = (value) => {
        let filteredproducts = products.filter((item) => {
            return item.category.toLowerCase() === value.toLowerCase();
        });
        setCproducts(filteredproducts);
        setSearched(false); // Reset search state when filtering by category
    };

    const handleClearSearch = () => {
        setSearch('');
        setSearched(false);
        setCproducts([]);
    };

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleclick={handleClick} />
            <h5>Liked Products</h5>
            {searched && 
                <h5>
                    Search Results 
                    <button className='clear-btn' onClick={handleClearSearch}>Clear Results</button>
                </h5>
            }

            {searched && (
                <div className='d-flex justify-content-center flex-wrap'>
                    {cproducts && cproducts.length > 0 ? (
                        cproducts.map((item, index) => (
                            <div key={index} className='card m-3'>
                                <img width="300px" src={'http://localhost:4000/' + item.pimage} alt={item.pname} />
                                <p className='m-2'>{item.pname} | {item.category}</p>
                                <p className='m-2 text-danger'>{item.price}</p>
                                <p className='m-2 text-success'>{item.pdesc}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            )}

            <hr />

            {!searched && (
                <div className='d-flex justify-content-center flex-wrap'>
                    {products && products.length > 0 ? (
                        products.map((item, index) => (
                            <div key={index} className='card m-3'>
                                <img width="300px" src={'http://localhost:4000/' + item.pimage} alt={item.pname} />
                                <p className='m-2'>{item.pname} | {item.category}</p>
                                <p className='m-2 text-danger'>{item.price}</p>
                                <p className='m-2 text-success'>{item.pdesc}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default LikedProducts;

