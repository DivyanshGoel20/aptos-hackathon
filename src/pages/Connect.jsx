import { useWallet } from '@aptos-labs/wallet-adapter-react'

export default function Connect() {
  const { connect, connected, wallets, account } = useWallet()
  const formatAddress = (addr) => {
    if (!addr) return ''
    if (typeof addr === 'string') return addr
    if (typeof addr === 'object') {
      if (addr.data) return String(addr.data)
      if (addr.address) return String(addr.address)
      try { return JSON.stringify(addr) } catch { return '' }
    }
    return String(addr)
  }

  return (
    <div className="dark min-h-screen w-full bg-gradient-to-b from-black via-gray-950 to-black text-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full px-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-semibold tracking-tight">PoolTogether Aptos</h1>
          <p className="opacity-70 mt-2">No-loss lottery on Aptos. Connect to continue.</p>
        </div>

        <div className="glass-card p-6">
          {connected ? (
            <div className="text-center">
              <div className="text-xs opacity-70 mb-1">Connected</div>
              <div className="text-sm break-all">{formatAddress(account?.address)}</div>
              <a href="/" className="sr-only">connected</a>
            </div>
          ) : (
            <>
              <div className="text-sm opacity-80 mb-3 text-center">Choose a wallet</div>
              <div className="grid grid-cols-1 gap-2">
                {wallets && wallets.length > 0 ? (
                  wallets.map((w) => (
                    <button
                      key={w.name}
                      className="rounded-lg bg-white/10 hover:bg-white/20 transition py-2"
                      onClick={async () => { try { await connect(w.name) } catch (e) { console.error(e) } }}
                    >Connect {w.name}</button>
                  ))
                ) : (
                  <div className="text-sm text-center">No wallets detected. Install Petra or Pontem.</div>
                )}
              </div>
            </>
          )}
        </div>

        {connected && (
          <a href="#dashboard" className="block text-center rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 py-2 mt-4">
            View Dashboard
          </a>
        )}
      </div>
    </div>
  )
}


