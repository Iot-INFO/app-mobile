import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Main from './src/index';
export default function App() {
  return (
    <>
      <Main />
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="white"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
    </>
  );
}
