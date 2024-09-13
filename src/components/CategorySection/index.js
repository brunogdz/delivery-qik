import React, { useState } from 'react';
import ProductModal from '../ProductModal';
import './index.css'
import { useSelector } from 'react-redux';

const CategorySection = ({ section }) => {
  console.log("section", section)
  const [expanded, setExpanded] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const basket = useSelector((state) => state.cart.items);

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const getProductQuantity = (productId) => {
    const productInBasket = basket.find((item) => item.id === productId);
    return productInBasket ? productInBasket.quantity : 0;
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    if (window.innerWidth <= 768) {
      handleOpenCart();
    }
  };

  return (
    <section className="category-section">
      <h2 onClick={() => setExpanded(!expanded)} className='category-title'>
        {section.name} {expanded ? <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.41414 9C2.02361 9.39053 1.39045 9.39053 0.999924 9C0.6094 8.60948 0.6094 7.97631 0.999926 7.58579L8.29282 0.292892C8.68334 -0.0976315 9.31651 -0.0976305 9.70703 0.292893L16.9999 7.58579C17.3904 7.97631 17.3904 8.60948 16.9999 9C16.6094 9.39053 15.9762 9.39053 15.5857 9L9.70703 3.12132C9.31651 2.7308 8.68334 2.7308 8.29282 3.12132L2.41414 9Z" fill="#4F372F" />
        </svg> : <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.41414 9C2.02361 9.39053 1.39045 9.39053 0.999924 9C0.6094 8.60948 0.6094 7.97631 0.999926 7.58579L8.29282 0.292892C8.68334 -0.0976315 9.31651 -0.0976305 9.70703 0.292893L16.9999 7.58579C17.3904 7.97631 17.3904 8.60948 16.9999 9C16.6094 9.39053 15.9762 9.39053 15.5857 9L9.70703 3.12132C9.31651 2.7308 8.68334 2.7308 8.29282 3.12132L2.41414 9Z" fill="#4F372F" />
        </svg>
        }
      </h2>
      {expanded && (
        <div className="products-list">
          {section.items.map(item => (
            <div key={item.id} className="product-item" onClick={() => setSelectedProduct(item)}>
              <div className='product-info'>
                <div className='amount-product-name'>
                  {getProductQuantity(item.id) > 0 && (
                    <span className="product-quantity-amount">{getProductQuantity(item.id)}</span>
                  )}
                  <h3 className='product-name'>{item.name}</h3>
                </div>
                <p className='product-description'>{item.description}</p>
                <span className='product-price'>{item.price > 0 ? `R$${item.price.toFixed(2)}` : 'Price on selection'}</span>
              </div>
              {item.images?.[0]?.image ? <img src={item.images?.[0]?.image} alt={item.name} className="product-image" /> : <></>}
            </div>
          ))}
        </div>
      )}
      {selectedProduct && (
        <ProductModal product={selectedProduct} section={section.id} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />
      )}
    </section>
  );
};

export default CategorySection;
