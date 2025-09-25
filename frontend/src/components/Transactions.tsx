import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Aptos } from '@aptos-labs/ts-sdk';
import { ArrowLeft, DollarSign, ArrowDown, ArrowUp, Wallet } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TransactionsProps {
  onBack: () => void;
}

export default function Transactions({ onBack }: TransactionsProps) {
  const { account } = useWallet();
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

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

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    // TODO: Integrate with backend
    console.log('Depositing:', depositAmount, 'APT');
    alert(`Deposit feature coming soon! Amount: ${depositAmount} APT`);
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    // TODO: Integrate with backend
    console.log('Withdrawing:', withdrawAmount, 'APT');
    alert(`Withdraw feature coming soon! Amount: ${withdrawAmount} APT`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-slate-900 via-purple-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-cyan-600/8 via-blue-500/8 via-purple-500/8 to-teal-600/8 rounded-full blur-3xl animate-spin-slow"></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between pt-8 pb-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-xl bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 backdrop-blur-md border border-white/5 hover:from-black/50 hover:via-slate-700/30 hover:to-black/50 text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-teal-500 p-0.5">
              <div className="w-full h-full rounded-2xl bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <span className="text-lg font-bold text-white">PT</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">PoolTogether</h1>
              <p className="text-sm text-purple-200/70">Transactions</p>
            </div>
          </div>
          
          <div className="px-4 py-2 rounded-xl bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 backdrop-blur-md border border-white/5">
            <span className="text-sm text-slate-300 font-mono">{shortAddress(account?.address)}</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-16 pb-20">
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Deposit & Withdraw</h2>
              <p className="text-xl text-slate-300">Manage your APT transactions</p>
            </div>

            {/* Tab Selector */}
            <div className="flex justify-center">
              <div className="relative bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 backdrop-blur-2xl rounded-2xl border border-white/5 p-1">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('deposit')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'deposit'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <ArrowDown className="w-4 h-4 mr-2" />
                      Deposit
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'withdraw'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <ArrowUp className="w-4 h-4 mr-2" />
                      Withdraw
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Transaction Card */}
            <div className="mt-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-teal-600/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 backdrop-blur-2xl rounded-3xl border border-white/5 p-8">
                  {activeTab === 'deposit' ? (
                    // Deposit Card
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-300/30 flex items-center justify-center mb-4">
                          <ArrowDown className="w-8 h-8 text-cyan-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Deposit APT</h3>
                        <p className="text-slate-300">Add funds to start earning prizes</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            AMOUNT
                          </label>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-2xl blur-sm"></div>
                            <div className="relative bg-slate-800/50 border-2 border-cyan-500/50 rounded-2xl p-4 focus-within:border-cyan-400 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                  <DollarSign className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white font-medium">APT</span>
                                <div className="flex-1">
                                  <input
                                    type="number"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-transparent text-white text-2xl font-bold placeholder-slate-400 focus:outline-none"
                                    step="0.0001"
                                    min="0"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-slate-400">Available: {loading ? '...' : `${balance} APT`}</span>
                            <button
                              onClick={() => setDepositAmount(balance)}
                              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              Max
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handleDeposit}
                          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                        >
                          <span className="flex items-center justify-center">
                            <ArrowDown className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" />
                            Deposit
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Withdraw Card
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-300/30 flex items-center justify-center mb-4">
                          <ArrowUp className="w-8 h-8 text-blue-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Withdraw APT</h3>
                        <p className="text-slate-300">Withdraw your deposited funds</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            AMOUNT
                          </label>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-sm"></div>
                            <div className="relative bg-slate-800/50 border-2 border-blue-500/50 rounded-2xl p-4 focus-within:border-blue-400 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                  <DollarSign className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white font-medium">APT</span>
                                <div className="flex-1">
                                  <input
                                    type="number"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-transparent text-white text-2xl font-bold placeholder-slate-400 focus:outline-none"
                                    step="0.0001"
                                    min="0"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-slate-400">Deposited: 0.00 APT</span>
                            <button
                              onClick={() => setWithdrawAmount('0.00')}
                              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              Max
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handleWithdraw}
                          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                        >
                          <span className="flex items-center justify-center">
                            <ArrowUp className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform" />
                            Withdraw
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
