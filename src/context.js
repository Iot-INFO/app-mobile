import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [signed, setSignIn] = useState(false);
  const [infoUser, setInfoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bases, setBases] = useState([]);
  const [location, setLocation] = useState();
  const [running, setRunning] = useState(false);
  const [travels, setTravels] = useState([]);

  return (
    <Context.Provider
      value={{
        signed,
        setSignIn,
        infoUser,
        setInfoUser,
        bases,
        setBases,
        loading,
        setLoading,
        location,
        setLocation,
        running,
        setRunning,
        travels,
        setTravels
      }}
    >
      {children}
    </Context.Provider>
  );
};
