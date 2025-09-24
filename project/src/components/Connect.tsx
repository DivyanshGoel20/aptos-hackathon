import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { ArrowRight, Shield, Zap, TrendingUp, Wallet } from 'lucide-react';

export default function Connect() {
  const { connect, connected, wallets, account } = useWallet();
  
  const handleConnect = async (walletName: string) => {
    try {
      await connect(walletName);
    } catch (error) {
      console.error('Wallet connect error:', error);
    }
  };

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

  const features = [
    { icon: Shield, text: "Principal protected - never lose your deposit" },
    { icon: TrendingUp, text: "Earn yield from prize pools automatically" },
    { icon: Zap, text: "Instant withdrawals with no lock-up periods" }
  ];

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
              <p className="text-sm text-cyan-200/70">Aptos Edition</p>
            </div>
          </div>
          
          {connected && (
            <button className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white transition-all duration-300 hover:scale-105">
              Dashboard
            </button>
          )}
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-16 pt-16 pb-20">
          {/* Left Column - Hero Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-sm">
                <Zap className="w-4 h-4 text-purple-300 mr-2" />
                <span className="text-sm text-cyan-100">No-Loss DeFi Protocol</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent">
                  Win Big,
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Risk Nothing
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                Deposit your tokens into prize pools and win weekly rewards while your principal stays 100% safe. 
                The future of risk-free earning is here.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-300/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-4 h-4 text-cyan-300" />
                  </div>
                  <span className="text-slate-200">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Wallet Connection */}
          <div className="flex-1 max-w-lg w-full">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 via-blue-600/30 to-teal-600/30 rounded-3xl blur-xl"></div>
              
              {/* Main Card */}
              <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                {connected ? (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Wallet Connected</h3>
                      <div className="px-4 py-2 rounded-xl bg-black/20 border border-white/10">
                        <p className="text-slate-300 font-mono text-sm">{shortAddress(account?.address)}</p>
                      </div>
                    </div>
                    
                    <button className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                      <span className="flex items-center justify-center">
                        Enter Dashboard
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-300/30 flex items-center justify-center mb-4">
                        <Wallet className="w-8 h-8 text-cyan-300" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h3>
                      <p className="text-slate-300">Choose a wallet to start earning risk-free rewards</p>
                    </div>
                    
                    <div className="space-y-3">
                      {wallets && wallets.length > 0 ? (
                        wallets.map((wallet) => (
                          <button
                            key={wallet.name}
                            onClick={() => handleConnect(wallet.name)}
                            className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group"
                          >
                            {wallet.icon ? (
                              <img src={wallet.icon} alt="" className="w-10 h-10 rounded-xl" />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold">
                                {wallet.name.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 text-left">
                              <p className="font-semibold text-white">{wallet.name}</p>
                              <p className="text-sm text-slate-400">Connect with {wallet.name}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                          </button>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-orange-500/20 border border-orange-300/30 flex items-center justify-center mb-3">
                            <Wallet className="w-6 h-6 text-orange-300" />
                          </div>
                          <p className="text-slate-300 mb-4">No wallets detected</p>
                          <p className="text-sm text-slate-400">Install Petra, Pontem, or Martian wallet to continue</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}