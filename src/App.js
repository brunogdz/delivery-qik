import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MenuProvider } from './context/menuContext';
import store from './redux/store';
// import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
// import ContactPage from './pages/ContactPage';
// import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import { TranslationProvider } from './context/translationContext';

function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <TranslationProvider>
          <Router>
            <Header />
            <Routes>
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/" element={<MenuPage />} />
              {/* <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
            </Routes>
          </Router>
        </TranslationProvider>
      </MenuProvider>
    </Provider>
  );
}

export default App;