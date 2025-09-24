import { useWallet } from '@aptos-labs/wallet-adapter-react'

export default function Dashboard() {
  const { connected, account } = useWallet()
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

  if (!connected) {
    return (
      <div className="dark min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 flex items-center justify-center">
        <div className="glass-card p-6 text-center max-w-sm w-full">
          <h2 className="text-lg font-medium mb-2">Wallet not connected</h2>
          <a href="/" className="inline-block rounded-lg bg-white/10 hover:bg-white/20 transition py-2 px-3">Back to connect</a>
        </div>
      </div>
    )
  }

  return (
    <div className="dark min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">PoolTogether Aptos</h1>
            <div className="text-xs opacity-75 break-all">{formatAddress(account?.address)}</div>
          </div>
          <p className="text-sm opacity-70 mt-2">No-loss lottery. Deposit USDC, earn tickets, win the yield.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="glass-card p-6 lg:col-span-2">
            <h2 className="text-base font-medium mb-4">Pool Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="glass-card p-5"><div className="text-xs opacity-70">Total Pool</div><div className="text-2xl font-semibold">— USDC</div></div>
              <div className="glass-card p-5"><div className="text-xs opacity-70">APY (est.)</div><div className="text-2xl font-semibold">—%</div></div>
              <div className="glass-card p-5"><div className="text-xs opacity-70">Round</div><div className="text-2xl font-semibold">Weekly</div></div>
              <div className="glass-card p-5"><div className="text-xs opacity-70">Time Left</div><div className="text-2xl font-semibold">—</div></div>
            </div>
          </section>

          <aside className="glass-card p-6">
            <h2 className="text-base font-medium mb-4">Your Position</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="opacity-70">Your Deposit</span><span>— USDC</span></div>
              <div className="flex items-center justify-between"><span className="opacity-70">Your Tickets</span><span>—</span></div>
              <div className="flex items-center justify-between"><span className="opacity-70">Win Chance</span><span>—%</span></div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="rounded-lg bg-emerald-400/15 hover:bg-emerald-400/25 text-emerald-300 py-2">Deposit</button>
              <button className="rounded-lg bg-rose-400/15 hover:bg-rose-400/25 text-rose-300 py-2">Withdraw</button>
            </div>
          </aside>
        </div>

        <section className="glass-card p-6 mt-6">
          <h2 className="text-base font-medium mb-3">Recent Winners</h2>
          <div className="text-sm opacity-70">No data yet.</div>
        </section>
      </div>
    </div>
  )
}


