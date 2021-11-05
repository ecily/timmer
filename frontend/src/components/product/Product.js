import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product, col }) => {
    return (
        <div className="row justify-content-center align-items-center g-4">   
        <div className="fadeInUp" data-wow-delay="0.4s">
     
        <div className="pricing-item">
		<div className="pricing-inner text-center">
          
                    <div className="pricing-content">
                        <h3 className="pricing-title">
                            {product.name}
                        </h3>

                        {/* <div className="ratings mt-auto">
                            <div className="rating-outer">
                            <div className="rating-inner" 
                            style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                        </div> */}
                        <p className="pricing-price">EUR {product.price}</p>
                        <Link to={`/product/${product._id}`}  className="lab-btn">Details</Link>
                    </div>
        </div>
        </div>
        </div>
        </div>
        
        
    )
}

export default Product
