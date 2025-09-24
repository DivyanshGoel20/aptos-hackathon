import { useWallet } from '@aptos-labs/wallet-adapter-react'
import Connect from './pages/Connect.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'

function App() {
  const { connected } = useWallet()
  return (
    <>
      {!connected && <Connect />}
      <div id="dashboard" style={{ display: connected ? 'block' : 'none' }}>
        <Dashboard />
      </div>
    </>
  )
}

export default App
