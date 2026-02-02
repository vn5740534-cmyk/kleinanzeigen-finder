'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [apiUrl, setApiUrl] = useState<string>('')
  const [apiStatus, setApiStatus] = useState<string>('Checking...')

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    setApiUrl(url)
    
    // Try to connect to the API
    fetch(`${url}/health`)
      .then(res => res.ok ? setApiStatus('✅ Connected') : setApiStatus('❌ Error'))
      .catch(() => setApiStatus('❌ Cannot reach API'))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Kleinanzeigen Finder
        </h1>
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="mb-2">
            <strong>API URL:</strong> {apiUrl}
          </p>
          <p>
            <strong>Status:</strong> {apiStatus}
          </p>
        </div>
      </div>
    </main>
  )
}
