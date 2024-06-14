import React from 'react';

const ProductList = ({ products}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4">
          <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
