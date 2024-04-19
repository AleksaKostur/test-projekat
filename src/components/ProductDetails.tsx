import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Product {
  images: string[];
  brand: string;
  title: string;
  description: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  price: number;
}

interface RouteParams {
    id: string;
    [key: string]: string | undefined;
  }
  

export const ProductDetails: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useParams<RouteParams>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const showImage = (imagePath: string) => {
        const mainImage = document.getElementById("mainImage") as HTMLImageElement;
        mainImage.src = imagePath;
    }

    return (
        <div className="container-xxl py-5">
            <div className="row">
                <div className="col-md-6">
                    <div style={{ display: 'flex', justifyContent: 'center', height: '500px', overflow: 'hidden' }} id="imageContainer">
                        <img src={product.images[0]} alt="Main" id="mainImage" style={{ width: '500px', maxHeight: '100%', objectFit: 'contain', cursor: 'pointer' }} onClick={() => showImage(product.images[0])} />
                    </div>
                    <div className="thumbnails">
                        {product.images.map((image, index) => (
                            <img key={index} src={image} alt={`Thumbnail ${index + 1}`} onClick={() => showImage(image)} />
                        ))}
                    </div>
                    <br />                    
                </div>
                <div className="col-md-6">
                    <h1 className="text-uppercase"><b>{product.brand}</b> - {product.title}</h1>
                    <br />
                    <ul>
                        <li>{product.description}</li>
                        <li>Discount: {product.discountPercentage}%</li>
                        <li>Rating: {product.rating}</li>
                        <li>Stock: {product.stock}</li>
                        <li>Brand: {product.brand}</li>
                        <li>Category: {product.category}</li>
                    </ul>
                    <br />
                    <h3 className="text-uppercase-red">Price: {product.price}</h3>
                    <br /><br />
                    <div className="d-flex justify-content-start">
                        <button onClick={() => navigate(-1)} className="page-button">Back to Product Listing</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
