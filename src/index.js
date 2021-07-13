import React from 'react';
import { ContextProvider } from './context';

import Routes from './routes';

export default function Main() {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  )
}
