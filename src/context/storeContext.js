import React, { createContext, useContext, useEffect, useState } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const defaultSettings = {
  name: "BURGERS RESTAURANT",
  primaryColour: "#4f372f",
  primaryColourHover: "#4f372f",
  navBackgroundColour: "#4f372f",
  ccySymbol: "R$",
  currency: "R$",
  bannerImage: "https://preodemo.gumlet.io/usr/venue/7602/web/646fbf3abf9d0.png",
};

export const StoreProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("https://cdn-dev.preoday.com/challenge/venue/9");
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        
        setSettings({
          name: data.name || defaultSettings.name,
          primaryColour: data.webSettings.primaryColour || defaultSettings.primaryColour,
          primaryColourHover: data.webSettings.primaryColourHover || defaultSettings.primaryColourHover,
          navBackgroundColour: data.webSettings.navBackgroundColour || defaultSettings.navBackgroundColour,
          ccySymbol: data.ccySymbol || defaultSettings.ccySymbol,
          currency: data.currency || defaultSettings.currency,
          bannerImage: data.webSettings.bannerImage || defaultSettings.bannerImage,
        });
      } catch (error) {
        console.error(error);
        setSettings(defaultSettings);
      }
    };

    fetchSettings();
  }, []);

  return <StoreContext.Provider value={settings}>{children}</StoreContext.Provider>;
};
