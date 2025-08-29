'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/message', fetcher)

  if (error) return <div>Failed to load messages</div>
  if (!data) return <div>Loading...</div>

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Vegah Demo App</h1>
      <p>Messages from MongoDB:</p>
      <ul>
        {data.map((m: any, i: number) => <li key={i}>{m.text}</li>)}
      </ul>
    </div>
  )
}
