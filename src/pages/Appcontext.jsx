import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  // Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Projects / Data State
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('trips');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Taj Mahal Getaway', destination: 'India', startDate: '2026-10-12', status: 'Upcoming' },
      { id: '2', title: 'Bali Retreat', destination: 'Indonesia', startDate: '2026-11-05', status: 'Planning' }
    ];
  });

  // Handle Theme Side Effects
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle Auth Persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Handle Trips Persistence
  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      user,
      login,
      logout,
      setUser,
      trips,
      setTrips
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
