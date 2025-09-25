import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useState } from 'react';
import Connect from './components/Connect';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import RecentWinners from './components/RecentWinners';

function App() {
  const { connected } = useWallet();
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'transactions' | 'winners'>('dashboard');
  
  if (!connected) {
    return <Connect />;
  }

  if (currentPage === 'transactions') {
    return <Transactions onBack={() => setCurrentPage('dashboard')} />;
  }

  if (currentPage === 'winners') {
    return <RecentWinners onBack={() => setCurrentPage('dashboard')} />;
  }

  return (
    <Dashboard 
      onNavigateToTransactions={() => setCurrentPage('transactions')}
      onNavigateToWinners={() => setCurrentPage('winners')}
    />
  );
}

export default App;