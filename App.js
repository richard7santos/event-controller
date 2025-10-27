import React from 'react';
import { AppProvider } from './src/context/AppContext';
import StackNavigation from './src/navigation/stackNavigation';

export default function App() {
  return (
    <AppProvider>
      <StackNavigation />
    </AppProvider>
  );
}
