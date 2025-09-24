import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

/**
 * Create an Aptos client using provided args or Vite env vars.
 * Falls back to TESTNET defaults when not provided.
 */
export function createAptosClient({ nodeApiUrl, apiKey } = {}) {
  const resolvedNodeUrl = nodeApiUrl || import.meta.env.VITE_APTOS_NODE_API_URL || 'https://fullnode.testnet.aptoslabs.com/v1'
  const resolvedApiKey = apiKey || import.meta.env.VITE_APTOS_API_KEY_TESTNET || undefined

  const clientConfig = resolvedApiKey
    ? { API_KEY: resolvedApiKey }
    : undefined

  const config = new AptosConfig({
    fullnode: resolvedNodeUrl,
    network: Network.TESTNET,
    clientConfig,
  })

  return new Aptos(config)
}

/**
 * Example: fetch account info for 0x1 and return it.
 */
export async function fetchGenesisAccountInfo(args) {
  const aptos = createAptosClient(args)
  const response = await aptos.account.getAccountInfo({ accountAddress: '0x1' })
  return response
}


