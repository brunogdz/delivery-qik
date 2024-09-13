import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/slices/cartSlice';
import ProductModal from '../components/ProductModal';
import { TranslationProvider } from '../context/translationContext'

const mockProduct = {
  id: 1,
  name: 'Smash Burger',
  description: 'Delicious burger with cheese',
  price: 10,
  images: [{ image: 'https://example.com/burger.jpg' }],
  modifiers: [
    {
      id: 1,
      name: 'Choose a size',
      minChoices: 1,
      maxChoices: 1,
      items: [
        { id: 101, name: 'Small', price: 0 },
        { id: 102, name: 'Medium', price: 2 },
        { id: 103, name: 'Large', price: 4 },
      ],
    },
  ],
};

const mockStore = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
  
  const renderWithProviders = (ui) => {
    return render(
      <Provider store={mockStore}>
        <TranslationProvider>
          {ui}
        </TranslationProvider>
      </Provider>
    );
  };
  
  describe('ProductModal', () => {
    it('renders product information correctly', () => {
      renderWithProviders(
        <ProductModal
          product={mockProduct}
          onClose={() => {}}
          section={242403}
          onAddToCart={() => {}}
        />
      );
  
      // Check if product name and description are rendered correctly
      expect(screen.getByText(/smash burger/i)).toBeInTheDocument();
      expect(screen.getByText(/delicious burger with cheese/i)).toBeInTheDocument();
      expect(screen.getByText(/add to order/i)).toBeInTheDocument();
    });
  
    it('updates the price when modifiers are selected', () => {
      renderWithProviders(
        <ProductModal
          product={mockProduct}
          onClose={() => {}}
          section={242403}
          onAddToCart={() => {}}
        />
      );
  
      // Verify initial price
      expect(screen.getByText(/R\$10\.00/i)).toBeInTheDocument();
  
      // Select the medium modifier
      const mediumOption = screen.getByLabelText(/medium/i);
      fireEvent.click(mediumOption);
  
      // Check if the price updated correctly
      expect(screen.getByText(/R\$12\.00/i)).toBeInTheDocument();
    });
  
    it('increments and decrements the quantity', () => {
      renderWithProviders(
        <ProductModal
          product={mockProduct}
          onClose={() => {}}
          section={242403}
          onAddToCart={() => {}}
        />
      );
  
      const quantityValue = screen.getByText('1');
      const incrementButton = screen.getByRole('button', { name: /increase quantity/i });
      const decrementButton = screen.getByRole('button', { name: /decrease quantity/i });
  
      // Increment quantity
      fireEvent.click(incrementButton);
      expect(quantityValue).toHaveTextContent('2');
  
      // Decrement quantity
      fireEvent.click(decrementButton);
      expect(quantityValue).toHaveTextContent('1');
    });
  
    it('calls onAddToCart and onClose when "Add to Order" is clicked', () => {
      const onAddToCart = jest.fn();
      const onClose = jest.fn();
  
      renderWithProviders(
        <ProductModal
          product={mockProduct}
          onClose={onClose}
          section={242403}
          onAddToCart={onAddToCart}
        />
      );
  
      // Click the add to order button
      const addToOrderButton = screen.getByText(/add to order/i);
      fireEvent.click(addToOrderButton);
  
      // Check if onAddToCart and onClose were called
      expect(onAddToCart).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });