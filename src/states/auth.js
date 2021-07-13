import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import { Context } from '../context';

export function useAuth() {
  const { setSignIn, setInfoUser, setLoading } = useContext(Context);
  const AUTH_KEY = '@moobi-verde:auth';

  const login = async (token, user, password) => {
    try {
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ token, user, password }));
      setInfoUser({ token, user, password });
      setSignIn(true);
      setLoading(false);
    } catch (e) {
      // console.log(e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      setSignIn(false);
      setLoading(false);
    } catch (e) {
      // console.log(e);
    }
  };

  const checkLoggedUser = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_KEY);
      if (value) {
        const { token, user, password } = JSON.parse(value);
        login(token, user, password);
      } else {
        setSignIn(false);
        setLoading(false);
      }
    } catch (error) {
      // console.log("Error");
    }
  };

  return {
    login,
    logout,
    checkLoggedUser,
  };
}
