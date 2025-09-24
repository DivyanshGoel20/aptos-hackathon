import { useState } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { fetchGenesisAccountInfo } from './lib/aptosClient.js'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const { connect, disconnect, connected, account, network, wallets } = useWallet()
  const networkName = typeof network === 'string' ? network : network?.name
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Aptos</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <button onClick={async () => {
          try {
            const info = await fetchGenesisAccountInfo()
            console.log('Genesis account info', info)
            alert('Fetched account info. See console.')
          } catch (e) {
            console.error('Failed to fetch account info', e)
            alert('Failed to fetch account info. See console for details.')
          }
        }}>Fetch 0x1 account info</button>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        {connected ? (
          <>
            <div style={{ marginBottom: 8 }}>
              <strong>Connected:</strong> {account?.address}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>Network:</strong> {networkName || 'Unknown'}
            </div>
            <button onClick={async () => {
              try {
                await disconnect()
              } catch (e) {
                console.error('Failed to disconnect wallet', e)
                alert('Failed to disconnect. See console for details.')
              }
            }}>Disconnect Wallet</button>
          </>
        ) : (
          <>
            <div style={{ marginBottom: 8 }}>
              <strong>Detected wallets:</strong>
            </div>
            {wallets && wallets.length > 0 ? (
              wallets.map((w) => (
                <button
                  key={w.name}
                  style={{ display: 'block', marginBottom: 6 }}
                  onClick={async () => {
                    try {
                      await connect(w.name)
                    } catch (e) {
                      console.error('Wallet connect error', e)
                      alert(`Failed to connect ${w.name}. See console for details.`)
                    }
                  }}
                >
                  Connect {w.name}
                </button>
              ))
            ) : (
              <div>No Aptos wallets detected. Install Petra or Pontem.</div>
            )}
          </>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
