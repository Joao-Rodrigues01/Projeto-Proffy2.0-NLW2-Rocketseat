import React from 'react';

import Routes from './routes/index';

import './assets/styles/global.css';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
