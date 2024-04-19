import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './bootstrap.min.css'
import './myStyles.css'

interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  discountPercentage: number;
  brand: string;
}

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products); 
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center">
                    <h1 className="mb-5">Products</h1>
                </div>
                <div className="row g-4">
                    <div className="col-12">
                        <div className="row gy-4">
                        {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
                            <div className="col-md-3" key={product.id}>
                                <div className="bg-light d-flex flex-column justify-content-center p-4">
                                    <Link to={`/products/${product.id}`}>
                                        <img src={product.thumbnail} alt={`product ${product.id}`} className="img-fluid mb-2 product-image"></img>
                                        <h5 className="text-uppercase">{product.title}</h5>
                                    </Link>
                                    <p className="m-0">Price: {product.price}</p>
                                    <p className="m-0">Discount: {product.discountPercentage}%</p>
                                    <p className="m-0">Brand: {product.brand}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="d-flex buttons">
                    {pageNumbers.map((number) => (
                        <button key={number} onClick={() => setCurrentPage(number)} className="page-button">{number}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};
