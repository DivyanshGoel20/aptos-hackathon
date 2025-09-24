import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import Connect from './components/Connect';
import Dashboard from './components/Dashboard';

function App() {
  const { connected } = useWallet();
  
  return (
    <>
      {!connected && <Connect />}
      {connected && <Dashboard />}
    </>
  );
}

export default App;