import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './AddProduct.css';
import categories from './CategorieList';

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [pimage, setPimage] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleApi = () => {
        const formData = new FormData();
        formData.append('pname', pname);
        formData.append('pdesc', pdesc);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('pimage', pimage);
        formData.append('userId', localStorage.getItem('userId'));

        const url = 'http://localhost:4000/add-product';
        axios.post(url, formData)
            .then((res) => {
                if (res.data.message) {
                    toast.success(res.data.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    setTimeout(() => {
                        navigate('/');
                    }, 3000); // Delay navigation to let the toast display
                }
            })
            .catch(() => {
                toast.error('Server error', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    return (
        <div>
            <Header />
            <div className="add-product-container">
                <h2>ADD PRODUCT HERE</h2>
                <label>Product Name</label>
                <input
                    className="form-control"
                    type="text"
                    value={pname}
                    onChange={(e) => setPname(e.target.value)}
                />
                <label>Product Description</label>
                <input
                    className="form-control"
                    type="text"
                    value={pdesc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <label>Product Price</label>
                <input
                    className="form-control"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <label>Product Category</label>
                <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {
                        categories && categories.length > 0 && categories.map((item, index) => {
                            return (
                                <option key={'option ' + index} value={item}>
                                    {item}
                                </option>
                            )
                        })
                    }
                </select>
                <label>Product Image</label>
                <input
                    className="form-control"
                    type="file"
                    onChange={(e) => setPimage(e.target.files[0])}
                />
                <button onClick={handleApi} className="btn btn-primary mt-3">
                    Submit
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddProduct;
