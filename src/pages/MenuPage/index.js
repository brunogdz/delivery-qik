import React, { useState, useEffect } from 'react';
import { useMenu } from '../../context/menuContext';
import { useSelector } from 'react-redux';
import CategorySection from '../../components/CategorySection';
import './index.css';
import Basket from '../../components/Basket';

const MenuPage = () => {
  console.log(useMenu)

  const { menu, store } = useMenu()
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const basket = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (menu && store) {
      setLoading(false);
    }
  }, [menu, store]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const toggleBasketModal = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  const filteredSections = menu?.sections?.filter((section) => {
    if (selectedCategory && section.name !== selectedCategory) return false;
    return section.items.some((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) || [];

  if (loading) {
    return <p>Loading menu...</p>;
  }

  return (
    <div className="menu-page">
      <header style={{ backgroundColor: store?.webSettings?.navBackgroundColour || '#4f372f' }}>
        {store?.webSettings?.bannerImage && (
          <img
            src={store.webSettings.bannerImage}
            alt="Restaurant Banner"
            className="menu-banner-image"
          />
        )}

      </header>
      <div className='menu-page-content'>

        <div className="search-bar-wrapper">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.27506 15C5.59317 15 2.6084 12.0152 2.6084 8.33332C2.6084 4.65142 5.59317 1.66666 9.27506 1.66666C12.957 1.66666 15.9417 4.65142 15.9417 8.33332C15.9417 9.87392 15.4192 11.2925 14.5416 12.4214L19.031 16.9107L17.8525 18.0892L13.3631 13.5999C12.2342 14.4774 10.8157 15 9.27506 15ZM14.2751 8.33332C14.2751 11.0947 12.0365 13.3333 9.27506 13.3333C6.51364 13.3333 4.27506 11.0947 4.27506 8.33332C4.27506 5.5719 6.51364 3.33332 9.27506 3.33332C12.0365 3.33332 14.2751 5.5719 14.2751 8.33332Z"
              fill="#8A94A4"
            />
          </svg>
          <input
            type="text"
            placeholder="Search menu items"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        {isMobile ?
          <>

            <nav className="category-carousel">
              {menu?.sections?.map((section) => (
                <button
                  key={section.id}
                  className={`carousel-item ${selectedCategory === section.name ? 'active' : ''
                    }`}
                  onClick={() => handleCategoryClick(section.name)}
                >
                  <img
                    src={section.images?.[0]?.image}
                    alt={section.name}
                    className="category-image"
                  />
                  <span className="category-name">{section.name}</span>
                  {selectedCategory === section.name && (
                    <div className="active-indicator"></div>
                  )}
                </button>
              ))}
            </nav>

            {filteredSections.map((section) => (
              <CategorySection key={section.id} section={section} />
            ))}


            <Basket
              cartItems={basket}
              isOpen={isBasketOpen}
              toggleCart={toggleBasketModal}
              onAdd={() => { }}
              onRemove={() => { }}
              isDesktop={!isMobile}
            />
          </>
          :
          <div className='menu-top-content'>
            <div className='menu-top-left'>


              <nav className="category-carousel">
                {menu?.sections?.map((section) => (
                  <button
                    key={section.id}
                    className={`carousel-item ${selectedCategory === section.name ? 'active' : ''
                      }`}
                    onClick={() => handleCategoryClick(section.name)}
                  >
                    <img
                      src={section.images?.[0]?.image}
                      alt={section.name}
                      className="category-image"
                    />
                    <span className="category-name">{section.name}</span>
                    {selectedCategory === section.name && (
                      <div className="active-indicator"></div>
                    )}
                  </button>
                ))}
              </nav>

              {filteredSections.map((section) => (
                <CategorySection key={section.id} section={section} />
              ))}

            </div>
            <Basket
              cartItems={basket}
              isOpen={isBasketOpen}
              toggleCart={toggleBasketModal}
              onAdd={() => { }}
              onRemove={() => { }}
              isDesktop={!isMobile}
            />
          </div>

        }

      </div>
      {isMobile && (
        <>
          <div className='allergy-container'>
            <div className='allergy-content'>
              <p>View allergy information</p>
            </div>
          </div>
          {basket.length > 0 && (
            <div className='basket-button-container'>
              <button className="basket-button" onClick={toggleBasketModal}>
                Your basket • {basket.length} item{basket.length > 1 ? 's' : ''}
              </button>
            </div>
          )}
        </>
      )

      }
    </div>
  );
};

export default MenuPage;
