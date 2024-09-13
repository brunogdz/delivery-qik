import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const [menu, setMenu] = useState(null);
    const [store, setStore] = useState(null);

    useEffect(() => {
        const fetchMenuData = async () => {
            const menuData = await fetchData(
                'https://cdn-dev.preoday.com/challenge/menu',
                'menu.json'
            );
            setMenu(menuData);
        };

        const fetchStoreData = async () => {
            const storeData = await fetchData(
                'https://cdn-dev.preoday.com/challenge/venue/9',
                'store.json'
            );
            setStore(storeData);
        };

        fetchMenuData();
        fetchStoreData();
    }, []);

    return (
        <MenuContext.Provider value={{menu, store}}>
            {children}
        </MenuContext.Provider>
    );
};
