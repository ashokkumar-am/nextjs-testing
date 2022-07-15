import React from 'react'
import Link from 'next/link'

export default function index({ txndata }) {
  return (
    <>
      <div className='text-indigo-800'><h1>Welcome to Testing</h1>
        <Link href='/transactions'><a>Transactions</a></Link> <hr></hr>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Matter Id</th>
              <th>Group Id</th>
              <th>Group Name</th>
              <th>Inventory Id</th>
              <th>Inventory Name</th>
            </tr>
          </thead>
          <tbody>
            {
              txndata.map((item, index) => {
                return (
                  <tr key={item.matterId} >
                    <td>{item.matterId}</td>
                    <td>{item.groupId} </td>
                    <td> {item.groupName}</td>
                    <td>{item.inventoryId}</td>
                    <td>{item.inventoryName}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>

  );
}


export async function getServerSideProps() {

  const response = await fetch('http://localhost:3000/api/alltransactions');
  const data = await response.json();

  return {
    props: {
      txndata: data
    }
  }

}