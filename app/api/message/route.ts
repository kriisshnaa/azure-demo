import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || ''

export async function GET() {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db('demo')
    const collection = db.collection('messages')
    const messages = await collection.find({}).toArray()
    return NextResponse.json(messages)
  } catch (e) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function POST(request: NextRequest) {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db('demo')
    const collection = db.collection('messages')
    const { text } = await request.json()
    await collection.insertOne({ text })
    return NextResponse.json({ message: 'Saved' })
  } catch (e) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  } finally {
    await client.close()
  }
}
