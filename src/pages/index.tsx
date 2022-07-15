import React from 'react'
import Link from 'next/link'

export default function index({ allmatterids }) {
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
              allmatterids.map((item, index) => {
                return (
                  <tr key={index} >
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


export async function getServerSideProps(context) {
  const { params, req, res, query } = context
  console.log(query)
  console.log(params)
  console.log(req.headers.cookie)
  res.setHeader('Set-Cookie', ['name=medicaid'])
  // const { category } = params

  const response = await fetch(
    `http://localhost:3000/api/alltransactions`
  );
  const data = await response.json();

  return {
    props: {
      allmatterids: data,
    }
  }

}