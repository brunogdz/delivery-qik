import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, toggleCart } from '../../redux/slices/cartSlice';
import './index.css'

const ProductModal = ({ product, onClose, section, onAddToCart }) => {
  const dispatch = useDispatch();
  const [selectedModifiers, setSelectedModifiers] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price);


  const sectionImages = {
    242403: "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe4c64a6f.png", // Burgers
    242404: "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe5dc1bf3.png", // Drinks
    242677: "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe93cb615.png"  // Desserts
  };

  const imageSrc = product.images?.[0]?.image || sectionImages[section];

  useEffect(() => {
    const modifierTotal = Object.values(selectedModifiers).reduce((acc, curr) => acc + curr.price, 0);
    setTotalPrice((product.price + modifierTotal) * quantity);
  }, [selectedModifiers, quantity, product.price]);

  const handleModifierChange = (modifierId, item) => {
    setSelectedModifiers((prev) => {
      const newModifiers = { ...prev };
      if (newModifiers[modifierId]?.id === item.id) {
        delete newModifiers[modifierId];
      } else {
        newModifiers[modifierId] = item;
      }
      return newModifiers;
    });
  };

  const handleAddToCart = () => {
    const productWithModifiers = {
      ...product,
      modifiers: selectedModifiers,
      quantity,
    };
    dispatch(addItem(productWithModifiers));
    onAddToCart(productWithModifiers);
    onClose();
  };

  return (
    <div className="product-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_10013_1188)">
              <rect x="2" width="28" height="28" rx="14" fill="white" shape-rendering="crispEdges" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7338 8.27531C21.3788 7.92036 20.8055 7.92036 20.4505 8.27531L16 12.7167L11.5495 8.26621C11.1945 7.91126 10.6212 7.91126 10.2662 8.26621C9.91126 8.62116 9.91126 9.19454 10.2662 9.54949L14.7167 14L10.2662 18.4505C9.91126 18.8055 9.91126 19.3788 10.2662 19.7338C10.6212 20.0887 11.1945 20.0887 11.5495 19.7338L16 15.2833L20.4505 19.7338C20.8055 20.0887 21.3788 20.0887 21.7338 19.7338C22.0887 19.3788 22.0887 18.8055 21.7338 18.4505L17.2833 14L21.7338 9.54949C22.0796 9.20364 22.0796 8.62116 21.7338 8.27531Z" fill="#4F372F" />
            </g>
            <defs>
              <filter id="filter0_d_10013_1188" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10013_1188" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10013_1188" result="shape" />
              </filter>
            </defs>
          </svg>
        </button>
        <img
          src={imageSrc}
          alt={product.name}
          className="modal-product-image"
        />
        <div className='modal-product-information'>
          <h2 className="modal-product-name">{product.name}</h2>
          <p className="modal-product-description">{product.description}</p>

          {product.modifiers?.length > 0 && (
            <div className="modifiers-scroll">
              {product.modifiers.map((modifier) => (
                <div key={modifier.id} className="modifier-section">
                  <div className='modifier-top'>
                    <h3 className="modifier-title">{modifier.name}</h3>
                    <p>Select {modifier.minChoices} option</p>
                  </div>
                  {modifier.items.map((item) => (
                    <label key={item.id} className="modifier-item">
                      <div className='modifier-item-content'>
                        <span className="modifier-item-name">
                          {item.name}
                        </span>
                        <span className="modifier-item-price">
                          R${item.price.toFixed(2)}
                        </span>
                      </div>
                      <input
                        type="radio"
                        name={`modifier-${modifier.id}`}
                        checked={selectedModifiers[modifier.id]?.id === item.id}
                        onChange={() => handleModifierChange(modifier.id, item)}
                      />
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <div className="quantity-control">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="quantity-button"
              style={{
                background: quantity > 1 ? '#4F372F' : '#DADADA',
              }}
            >
              <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.455078" width="18" height="3" rx="1.5" fill="#5F5F5F" />
              </svg>
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="quantity-button"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 16.5C7.5 17.3284 8.17157 18 9 18C9.82843 18 10.5 17.3284 10.5 16.5V10.5H16.5C17.3284 10.5 18 9.82843 18 9C18 8.17157 17.3284 7.5 16.5 7.5H10.5V1.5C10.5 0.671573 9.82843 0 9 0C8.17157 0 7.5 0.671573 7.5 1.5V7.5H1.5C0.671573 7.5 0 8.17157 0 9C0 9.82843 0.671573 10.5 1.5 10.5H7.5V16.5Z" fill="white" />
              </svg>
            </button>
          </div>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Order • R${totalPrice.toFixed(2)}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;