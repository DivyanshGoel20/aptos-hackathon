import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos } from '@aptos-labs/ts-sdk';
import { TrendingUp, Shield, Zap, Wallet } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { disconnect, account } = useWallet();
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(true);

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  // Convert address from decimal array to hex format
  const formatAddress = (addr: any) => {
    if (!addr) return '';
    
    // If it's already a string, return it
    if (typeof addr === 'string') return addr;
    
    // If it's an object with address property
    if (typeof addr === 'object' && addr.address) {
      return String(addr.address);
    }
    
    // If it's an array of numbers (decimal), convert to hex
    if (Array.isArray(addr)) {
      try {
        // Convert decimal array to hex string
        const hexString = addr.map(num => num.toString(16).padStart(2, '0')).join('');
        return '0x' + hexString;
      } catch (error) {
        console.error('Error converting address:', error);
        return '';
      }
    }
    
    return String(addr);
  };

  const shortAddress = (addr: any) => {
    const a = formatAddress(addr);
    if (!a) return '';
    return a.length > 12 ? `${a.slice(0, 6)}...${a.slice(-4)}` : a;
  };

  // Fetch wallet balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!account?.address) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const aptos = new Aptos();
        const address = formatAddress(account.address);
        
        // Get the account's APT balance
        const resources = await aptos.getAccountResources({ accountAddress: address });
        const aptResource = resources.find((resource: any) => 
          resource.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
        );
        
        const balance = (aptResource?.data as any)?.coin?.value || '0';
        
        // Convert from smallest unit (octas) to APT
        const balanceInApt = (parseInt(balance) / 100000000).toFixed(4);
        setBalance(balanceInApt);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance('0');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [account?.address]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-cyan-600/10 via-blue-500/10 to-teal-600/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between pt-8 pb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500 p-0.5">
              <div className="w-full h-full rounded-2xl bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <span className="text-lg font-bold text-white">PT</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">PoolTogether</h1>
              <p className="text-sm text-purple-200/70">Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-sm text-slate-300 font-mono">{shortAddress(account?.address)}</span>
            </div>
            <button 
              onClick={handleDisconnect}
              className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white transition-all duration-300 hover:scale-105"
            >
              Disconnect
            </button>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="pt-16 pb-20">
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Welcome to Your Dashboard</h2>
              <p className="text-xl text-slate-300">Your prize pools and earnings will appear here</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {/* Wallet Balance Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Wallet className="w-8 h-8 text-purple-400" />
                    <span className="text-sm text-purple-300 font-medium">Wallet Balance</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {loading ? '...' : `${balance} APT`}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">Available to deposit</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-cyan-400" />
                    <span className="text-sm text-cyan-300 font-medium">Total Deposited</span>
                  </div>
                  <p className="text-3xl font-bold text-white">$0.00</p>
                  <p className="text-sm text-slate-400 mt-1">Ready to start</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="w-8 h-8 text-green-400" />
                    <span className="text-sm text-green-300 font-medium">Prizes Won</span>
                  </div>
                  <p className="text-3xl font-bold text-white">$0.00</p>
                  <p className="text-sm text-slate-400 mt-1">First prize awaits</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-600/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8 text-teal-400" />
                    <span className="text-sm text-teal-300 font-medium">Win Chance</span>
                  </div>
                  <p className="text-3xl font-bold text-white">0.00%</p>
                  <p className="text-sm text-slate-400 mt-1">Deposit to increase</p>
                </div>
              </div>
            </div>

            {/* Coming Soon Message */}
            <div className="mt-16">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-teal-600/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-12">
                  <div className="max-w-2xl mx-auto text-center space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-300/30 flex items-center justify-center">
                      <Zap className="w-10 h-10 text-cyan-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Dashboard Coming Soon</h3>
                    <p className="text-slate-300 leading-relaxed">
                      We're building an amazing dashboard experience where you'll be able to manage your deposits, 
                      track your prizes, and monitor your earnings. Stay tuned for updates!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}