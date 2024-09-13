import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../context/translationContext'
import './index.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();
    const t = useTranslation()


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setCurrentPage('Menu');
                break;
            case '/contact':
                setCurrentPage('Contato');
                break;
            case '/login':
                setCurrentPage('Entrar');
                break;
            default:
                setCurrentPage('');
        }
    }, [location]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="navbar">
                <div className="menu-title">{currentPage}</div>
                {isMobile ? (
                    <>
                        <div className="menu-toggle" onClick={toggleMenu}>
                            {isMenuOpen ? (

                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        zIndex: 999,
                                        width: 20,
                                        height: 20
                                    }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11.7338 0.275313C11.3788 -0.0796359 10.8055 -0.0796359 10.4505 0.275313L6 4.71672L1.54949 0.266212C1.19454 -0.0887372 0.62116 -0.0887372 0.266212 0.266212C-0.0887372 0.62116 -0.0887372 1.19454 0.266212 1.54949L4.71672 6L0.266212 10.4505C-0.0887372 10.8055 -0.0887372 11.3788 0.266212 11.7338C0.62116 12.0887 1.19454 12.0887 1.54949 11.7338L6 7.28328L10.4505 11.7338C10.8055 12.0887 11.3788 12.0887 11.7338 11.7338C12.0887 11.3788 12.0887 10.8055 11.7338 10.4505L7.28328 6L11.7338 1.54949C12.0796 1.20364 12.0796 0.62116 11.7338 0.275313Z"
                                        fill="#4F372F"
                                    />
                                </svg>
                            ) : (

                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_10013_357)">
                                        <rect x="6" y="6" width="16" height="2" rx="1" fill="white" />
                                        <rect x="6" y="13" width="16" height="2" rx="1" fill="white" />
                                        <rect x="6" y="20" width="16" height="2" rx="1" fill="white" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_10013_357">
                                            <rect
                                                width="16"
                                                height="16"
                                                fill="white"
                                                transform="translate(6 6)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            )}
                        </div>
                        {isMenuOpen && (
                            <ul className="menu-items-mobile">
                                <li>
                                    <button onClick={() => setCurrentPage('Menu')}>{t.menu}</button>
                                </li>
                                <li>
                                    <button onClick={() => setCurrentPage('Entrar')}>{t.sign}</button>
                                </li>
                                <li>
                                    <button onClick={() => setCurrentPage('Contato')}>{t.contact}</button>
                                </li>
                            </ul>
                        )}
                    </>
                ) : (
                    <ul className="menu-items">
                        <li>
                            <button onClick={() => setCurrentPage('Menu')}>{t.menu}</button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentPage('Entrar')}>{t.sign}</button>
                        </li>
                        <li>
                            <button onClick={() => setCurrentPage('Contato')}>{t.contact}</button>
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
};

export default Header;
