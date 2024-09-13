import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart } from '../../redux/slices/cartSlice';
import './index.css';
import { useTranslation } from '../../context/translationContext'

const Basket = ({ cartItems, onAdd, onRemove, isDesktop, isOpen, toggleCart }) => {
    const t = useTranslation()
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const subtotal = cartItems.reduce((acc, item) => {
        const modifierTotal = item.modifiers
            ? Object.values(item.modifiers).reduce((sum, mod) => sum + mod.price, 0)
            : 0;
        return acc + (item.price + modifierTotal) * item.quantity;
    }, 0);

    const handleRemove = (item) => {
        if (item.quantity > 1) {
            
            dispatch(removeItem({ ...item, quantity: 1 })); 
        } else {
          
            dispatch(removeItem(item));
        }
    };

    const handleAdd = (item) => {
        dispatch(addItem(item));
    };

    const handleCheckout = () => {
        dispatch(clearCart());
        toggleCart();
    };

    return (
        <>
            {isMobile ? (
                isOpen && (
                    <div className="basket-modal">
                        <div className="modal-overlay" onClick={toggleCart}></div>
                        <div className="modal-content">
                            <div className='modal-content-top'>
                                <button className="close-modal" onClick={toggleCart}>
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect x="2" width="28" height="28" rx="14" fill="white" />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M21.7338 8.27531C21.3788 7.92036 20.8055 7.92036 20.4505 8.27531L16 12.7167L11.5495 8.26621C11.1945 7.91126 10.6212 7.91126 10.2662 8.26621C9.91126 8.62116 9.91126 9.19454 10.2662 9.54949L14.7167 14L10.2662 18.4505C9.91126 18.8055 9.91126 19.3788 10.2662 19.7338C10.6212 20.0887 11.1945 20.0887 11.5495 19.7338L16 15.2833L20.4505 19.7338C20.8055 20.0887 21.3788 20.0887 21.7338 19.7338C22.0887 19.3788 22.0887 18.8055 21.7338 18.4505L17.2833 14L21.7338 9.54949C22.0796 9.20364 22.0796 8.62116 21.7338 8.27531Z"
                                            fill="#4F372F"
                                        />
                                    </svg>
                                </button>
                                <h2>{t.basket}</h2>
                            </div>
                            <div className="basket-items-container">
                                {cartItems.length === 0 ? (
                                    <p style={{padding: "0 16px"}}>{t.empty_basket}</p>
                                ) : (
                                    <>
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="cart-item">
                                                <div className='item-detail-amount'>


                                                    <div className="item-details">
                                                        <p className='item-details-name'>{item.name}</p>
                                                        {item.modifiers && (
                                                            <p className="modifier-details">
                                                                {Object.values(item.modifiers)
                                                                    .map((mod) => `${mod.name} (+R$${mod.price.toFixed(2)})`)
                                                                    .join(', ')}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="quantity-control-basket">
                                                        <button
                                                            onClick={() => handleRemove(item)}
                                                            className="quantity-button-basket"
                                                        >
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" fill="#4F372F" stroke="#4F372F" stroke-width="2" />
                                                                <rect x="4" y="8.5" width="12" height="3" rx="1.5" fill="white" />
                                                            </svg>

                                                        </button>
                                                        <span className="quantity-value">{item.quantity}</span>
                                                        <button
                                                            onClick={() => handleAdd(item)}
                                                            className="quantity-button-basket"
                                                        >
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#4F372F" />
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1429 10.8571H10.8571V15.1429C10.8571 15.6143 10.4714 16 10 16C9.52857 16 9.14286 15.6143 9.14286 15.1429V10.8571H4.85714C4.38571 10.8571 4 10.4714 4 10C4 9.52857 4.38571 9.14286 4.85714 9.14286H9.14286V4.85714C9.14286 4.38571 9.52857 4 10 4C10.4714 4 10.8571 4.38571 10.8571 4.85714V9.14286H15.1429C15.6143 9.14286 16 9.52857 16 10C16 10.4714 15.6143 10.8571 15.1429 10.8571Z" fill="white" />
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8891 11.1427L11.1429 11.1428V14.854C11.1429 15.4826 10.6286 15.9969 10.0001 15.9969C9.3715 15.9969 8.85721 15.4826 8.85721 14.854V11.1428H5.1453C4.51673 11.1428 4.00244 10.6285 4.00244 9.99997C4.00244 9.3714 4.51673 8.85712 5.1453 8.85712H8.85721V5.15555C8.85721 4.52698 9.3715 4.0127 10.0001 4.0127C10.6286 4.0127 11.1429 4.52698 11.1429 5.15555V8.85712L14.8891 8.85702C15.5177 8.85702 16.032 9.3713 16.032 9.99987C16.032 10.6284 15.5177 11.1427 14.8891 11.1427Z" fill="white" />
                                                            </svg>

                                                        </button>
                                                    </div>
                                                </div>

                                                <span className='basket-item-price'>
                                                    R$
                                                    {(
                                                        (item.price +
                                                            (item.modifiers
                                                                ? Object.values(item.modifiers).reduce((sum, mod) => sum + mod.price, 0)
                                                                : 0)) *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                        <div className='basket-subtotal-total'>


                                            <div className="subtotal">
                                                <p>Sub total</p>
                                                <span>R${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className='divider' />
                                            <div className="total">
                                                <p>Total:</p>
                                                <span>R${subtotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer-basket">
                                <button className="checkout-button" onClick={handleCheckout}>{t.checkout_now}</button>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <aside className="basket-sidebar">
                    <div className='header-basket'>
                    <h2>{t.basket}</h2>
                    </div>
                    {cartItems.length === 0 ? (
                        <p style={{padding: "0 16px"}}>{t.empty_basket}</p>
                    ) : (
                        <>
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className='item-detail-amount'>


                                        <div className="item-details">
                                            <p className='item-details-name'>{item.name}</p>
                                            {item.modifiers && (
                                                <p className="modifier-details">
                                                    {Object.values(item.modifiers)
                                                        .map((mod) => `${mod.name} (+R$${mod.price.toFixed(2)})`)
                                                        .join(', ')}
                                                </p>
                                            )}
                                        </div>
                                        <div className="quantity-control-basket">
                                            <button
                                                onClick={() => handleRemove(item)}
                                                className="quantity-button-basket"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" fill="#4F372F" stroke="#4F372F" stroke-width="2" />
                                                    <rect x="4" y="8.5" width="12" height="3" rx="1.5" fill="white" />
                                                </svg>

                                            </button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button
                                                onClick={() => handleAdd(item)}
                                                className="quantity-button-basket"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#4F372F" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1429 10.8571H10.8571V15.1429C10.8571 15.6143 10.4714 16 10 16C9.52857 16 9.14286 15.6143 9.14286 15.1429V10.8571H4.85714C4.38571 10.8571 4 10.4714 4 10C4 9.52857 4.38571 9.14286 4.85714 9.14286H9.14286V4.85714C9.14286 4.38571 9.52857 4 10 4C10.4714 4 10.8571 4.38571 10.8571 4.85714V9.14286H15.1429C15.6143 9.14286 16 9.52857 16 10C16 10.4714 15.6143 10.8571 15.1429 10.8571Z" fill="white" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8891 11.1427L11.1429 11.1428V14.854C11.1429 15.4826 10.6286 15.9969 10.0001 15.9969C9.3715 15.9969 8.85721 15.4826 8.85721 14.854V11.1428H5.1453C4.51673 11.1428 4.00244 10.6285 4.00244 9.99997C4.00244 9.3714 4.51673 8.85712 5.1453 8.85712H8.85721V5.15555C8.85721 4.52698 9.3715 4.0127 10.0001 4.0127C10.6286 4.0127 11.1429 4.52698 11.1429 5.15555V8.85712L14.8891 8.85702C15.5177 8.85702 16.032 9.3713 16.032 9.99987C16.032 10.6284 15.5177 11.1427 14.8891 11.1427Z" fill="white" />
                                                </svg>

                                            </button>
                                        </div>
                                    </div>
                                    <span className='basket-item-price'>
                                        R$
                                        {(
                                            (item.price +
                                                (item.modifiers
                                                    ? Object.values(item.modifiers).reduce((sum, mod) => sum + mod.price, 0)
                                                    : 0)) *
                                            item.quantity
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                            <div className="subtotal">
                                <p>Subtotal</p>
                                <span>R${subtotal.toFixed(2)}</span>
                            </div>
                            <div className='divider' />
                            <div className="total">
                                <p>Total:</p>
                                <span>R${subtotal.toFixed(2)}</span>
                            </div>
                        </>
                    )}
                </aside>
            )}
        </>
    );
};

export default Basket;
