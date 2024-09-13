import React, { createContext, useContext, useState, useEffect } from 'react';
const TranslationContext = createContext();

export const useTranslation = () => useContext(TranslationContext);

const dictionaries = {
  en: {
    burgers: "Burgers",
    drinks: "Drinks",
    desserts: "Desserts",
    basket: "Basket",
    menu: "Menu",
    sign: "Sign In",
    contact: "Contact",
    your_basket: "Your basket",
    add_to_order: "Add to Order",
    checkout_now: "Checkout now",
    view_allergy_information: "View allergy information",
    empty_basket: "Your basket is empty"
  },
  pt: {
    burgers: "Burgers",
    drinks: "Bebidas",
    desserts: "Sobremesa",
    basket: "Carrinho",
    menu: "Menu",
    sign: "Entrar",
    contact: "Contato",
    your_basket: "Seu Carrinho",
    add_to_order: "Adicionar Pedido",
    checkout_now: "Checkout agora",
    view_allergy_information: "Informação alérgica",
    empty_basket: "Seu carrinho está vazio"
  },
};


export const TranslationProvider = ({ children }) => {
  const [setLocale] = useState('en'); 
  const [dictionary, setDictionary] = useState(dictionaries.en);


  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("https://cdn-dev.preoday.com/challenge/venue/9");
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();

        const userLocale = data.locale || 'en';
        setLocale(userLocale);

        const lang = userLocale.startsWith('pt') ? 'pt' : 'en';
        setDictionary(dictionaries[lang]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  );
};
