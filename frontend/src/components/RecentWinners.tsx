import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { ArrowLeft, Trophy, Clock, DollarSign, Users } from 'lucide-react';

interface Winner {
  id: string;
  address: string;
  amount: string;
  timestamp: string;
  prizeType: string;
}

export default function RecentWinners({ onBack }: { onBack: () => void }) {
  const { account } = useWallet();

  // Mock data for recent winners - in real app, this would come from your backend
  const recentWinners: Winner[] = [
    {
      id: '1',
      address: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      amount: '1,250.50',
      timestamp: '2 hours ago',
      prizeType: 'Weekly Prize'
    },
    {
      id: '2',
      address: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      amount: '850.25',
      timestamp: '5 hours ago',
      prizeType: 'Daily Prize'
    },
    {
      id: '3',
      address: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
      amount: '2,100.75',
      timestamp: '1 day ago',
      prizeType: 'Weekly Prize'
    },
    {
      id: '4',
      address: '0x4d5e6f7890abcdef1234567890abcdef12345678',
      amount: '675.00',
      timestamp: '2 days ago',
      prizeType: 'Daily Prize'
    },
    {
      id: '5',
      address: '0x5e6f7890abcdef1234567890abcdef1234567890',
      amount: '1,800.30',
      timestamp: '3 days ago',
      prizeType: 'Weekly Prize'
    },
    {
      id: '6',
      address: '0x6f7890abcdef1234567890abcdef1234567890ab',
      amount: '950.15',
      timestamp: '4 days ago',
      prizeType: 'Daily Prize'
    },
    {
      id: '7',
      address: '0x7890abcdef1234567890abcdef1234567890abcd',
      amount: '3,200.80',
      timestamp: '5 days ago',
      prizeType: 'Weekly Prize'
    },
    {
      id: '8',
      address: '0x890abcdef1234567890abcdef1234567890abcde',
      amount: '1,150.45',
      timestamp: '6 days ago',
      prizeType: 'Daily Prize'
    }
  ];

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

  const getPrizeTypeIcon = () => {
    return '🏆';
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <p className="text-sm text-purple-200/70">Recent Winners</p>
            </div>
          </div>
          
          <div className="px-4 py-2 rounded-xl bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 backdrop-blur-md border border-white/5">
            <span className="text-sm text-slate-300 font-mono">{formatAddress(account?.address).length > 12 ? `${formatAddress(account?.address).slice(0, 6)}...${formatAddress(account?.address).slice(-4)}` : formatAddress(account?.address)}</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-16 pb-20">
          <div className="space-y-8">
            {/* Page Header */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-300/30 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-yellow-300" />
              </div>
              <h2 className="text-4xl font-bold text-white">Recent Winners</h2>
              <p className="text-xl text-slate-300">See who's been winning big prizes!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 backdrop-blur-2xl rounded-2xl border border-white/5 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                    <span className="text-sm text-yellow-300 font-medium">Total Winners</span>
                  </div>
                  <p className="text-3xl font-bold text-white">{recentWinners.length}</p>
                  <p className="text-sm text-slate-400 mt-1">Total winners</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 backdrop-blur-2xl rounded-2xl border border-white/5 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-cyan-400" />
                    <span className="text-sm text-cyan-300 font-medium">Total Prizes</span>
                  </div>
                  <p className="text-3xl font-bold text-white">$12,077.15</p>
                  <p className="text-sm text-slate-400 mt-1">Distributed</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 backdrop-blur-2xl rounded-2xl border border-white/5 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-green-400" />
                    <span className="text-sm text-green-300 font-medium">Active Players</span>
                  </div>
                  <p className="text-3xl font-bold text-white">1,247</p>
                  <p className="text-sm text-slate-400 mt-1">This week</p>
                </div>
              </div>
            </div>

            {/* Winners List */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-teal-600/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 backdrop-blur-2xl rounded-3xl border border-white/5 p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Latest Winners</h3>
                  <p className="text-slate-300">Recent prize winners and their rewards</p>
                </div>

                <div className="space-y-4">
                  {recentWinners.map((winner) => (
                    <div
                      key={winner.id}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-black/30 via-slate-800/20 to-black/30 border border-white/5 hover:from-black/50 hover:via-slate-700/30 hover:to-black/50 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600/50 to-slate-700/50 flex items-center justify-center">
                          <span className="text-lg">{getPrizeTypeIcon()}</span>
                        </div>
                        <div>
                          <div className="mb-1">
                            <span className="text-white font-mono text-sm">{formatAddress(winner.address)}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-slate-400 text-sm">
                            <Clock className="w-3 h-3" />
                            <span>{winner.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">${winner.amount}</p>
                        <p className="text-sm text-slate-400">APT</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
