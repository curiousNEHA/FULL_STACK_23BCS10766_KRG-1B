import React from 'react'

const ProductCart = ({name,price,description,inStock}) => {
  return (
    <div className="border border-gray-300 p-4 m-4 w-64 bg-gray-50 ">
  
        <h2>Name : {name}</h2>
        <h3>Price : {price}</h3>    
        <h3>Description : {description}</h3>
        <h3>In Stock : {inStock ? <button style = {{ background: "blue", color: "white", padding: "8px 16px" }}>Buy Now</button>
: <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>}</h3>
        
    </div>
  )
}

export default ProductCart
