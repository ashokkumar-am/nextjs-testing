import React from 'react'
import Link from 'next/link'

export default function index() {
  return (
    <div className='text-indigo-800'><h1>Welcome to Testing</h1>
      <Link href='/transactions'><a>Transactions</a></Link> <hr></hr>
    
    </div>
  )
}
